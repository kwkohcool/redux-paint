import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentStrokeSelector } from './selectors';
import { beginStroke, updateStroke, endStroke } from './actions';
import { drawStroke } from './canvasUtils';

const WIDTH = 1024;
const HEIGHT = 768;

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const currentStroke = useSelector(currentStrokeSelector);
    const dispatch = useDispatch();
    const isDrawing = !!currentStroke.points.length;

    const getCanvasWithContext = (canvas = canvasRef.current) => {
        return { canvas, context: canvas?.getContext('2d') };
    };

    useEffect(() => {
        const { context } = getCanvasWithContext();
        if (!context) {
            return;
        }
        requestAnimationFrame(() =>
            drawStroke(context, currentStroke.points, currentStroke.color)
        );
    }, [currentStroke]);

    const startDrawing = ({
        nativeEvent,
    }: React.MouseEvent<HTMLCanvasElement>) => {
        const { offsetX, offsetY } = nativeEvent;
        dispatch(beginStroke(offsetX, offsetY));
    };

    const endDrawing = () => {
        if (isDrawing) {
            dispatch(endStroke());
        }
    };

    const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        dispatch(updateStroke(offsetX, offsetY));
    };

    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">Redux Paint</div>
                <div className="title-bar-controls">
                    <button aria-label="Close" />
                </div>
            </div>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseOut={endDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
        </div>
    );
}

export default App;

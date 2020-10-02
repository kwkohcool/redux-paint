import React, { useRef } from 'react';

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return <canvas ref={canvasRef} />;
}

export default App;

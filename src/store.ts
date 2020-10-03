import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import historyIndex from './modules/historyIndex/slice';
import { currentStroke } from './modules/currentStroke/slice';
import strokes from './modules/strokes/slice';
import logger from 'redux-logger';

const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
    reducer: {
        historyIndex,
        currentStroke,
        strokes,
    },
    middleware,
});

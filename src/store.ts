import { rootReducer } from './rootReducer';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
//import { devToolsEnhancer } from 'redux-devtools-extension';
//import { createStore } from 'redux';

// export const store = createStore(rootReducer, devToolsEnhancer({}));

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger))
);

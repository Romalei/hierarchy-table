import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { AppState, appReducer } from './app-reducer';
import logger from './middlewares/logger';

const isProduction = process.env.NODE_ENV === 'production';

export default function configureStore(preloadedState?: AppState) {
    const middlewares = [logger];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = isProduction ? [] : [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    return createStore(appReducer, preloadedState, composedEnhancers);
}

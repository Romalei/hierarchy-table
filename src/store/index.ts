import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { AppState, rootReducer } from './root-reducer';
import logger from './middlewares/logger';

export default function configureStore(preloadedState?: AppState) {
    const middlewares = [logger];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const enhancers = [middlewareEnhancer];
    const composedEnhancers = composeWithDevTools(...enhancers);

    return createStore(rootReducer, preloadedState, composedEnhancers);
}

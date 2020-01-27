import reducers from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

const middleware = [ thunk ];
const defaultState = {};
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

export const store = createStore(reducers, defaultState, enhancer);

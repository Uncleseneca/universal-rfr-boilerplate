import { createStore, applyMiddleware, compose, combineReducers } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRoutes } from 'redux-first-router';
import reduxThunk from 'redux-thunk';
import windowSize, { REDUCER_KEY } from 'redux-windowsize';

import routesMap from './routesMap';
import * as reducers from './reducers';
import * as actionCreators from './actions';


const composeEnhancers = (...args) =>
  (typeof window !== 'undefined'
    ? composeWithDevTools({ actionCreators })(...args)
    : compose(...args));

export default (history, preloadedState) => {
  const {
    reducer, middleware, enhancer, thunk,
  } = connectRoutes(
    history,
    routesMap,
  );

  const rootReducer = combineReducers({
    ...reducers,
    location: reducer,
    [REDUCER_KEY]: windowSize,
  });
  const middlewares = applyMiddleware(middleware, reduxThunk);
  const enhancers = composeEnhancers(enhancer, middlewares);
  const store = createStore(rootReducer, preloadedState, enhancers);

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers/index', () => {
      const devReducers = require('./reducers/index');
      const devRootReducer = combineReducers({
        ...devReducers,
        location: reducer,
      });
      store.replaceReducer(devRootReducer);
    });
  }

  return { store, thunk };
};

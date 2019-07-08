import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import logger from 'redux-logger';
import reducer from './reducers';
import { isDebug } from '../../config/app';

export function configureStore(history, preloadedState) {
  const reducers = combineReducers({
    router: connectRouter(history),
    reducer
  });
  const middleware = [thunk, routerMiddleware(history)];
  if (isDebug) {
    middleware.push(logger);
  }
  const store = createStore(
    reducers,
    preloadedState,
    applyMiddleware(...middleware)
  );

  return { store };
}

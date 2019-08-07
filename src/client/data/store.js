import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import reducer from './reducers';
import { isDebug } from '../../config/app';

export default preloadedState => {
  const middleware = [thunk];
  if (isDebug) {
    middleware.push(logger);
  }
  const store = createStore(
    combineReducers({ reducer }),
    preloadedState,
    applyMiddleware(...middleware)
  );

  return store;
};

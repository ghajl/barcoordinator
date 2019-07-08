import actionTypes from '../actions/types';
import { combineReducers } from 'redux';

const service = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_MAP_SERVICE:
      return action.service;
    default:
      return state;
  }
};

export default combineReducers({ service });

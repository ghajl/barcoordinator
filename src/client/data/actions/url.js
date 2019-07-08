import { push, replace } from 'connected-react-router';
import actionTypes from './types';

export function replaceLocation(address) {
  return dispatch => {
    dispatch(replace(encodeURI(`/places?loc=${address}&bar=show`)));
  };
}

// sets url for page that shows list of bars
export function setPlacesLocation(address) {
  return dispatch => {
    dispatch(push(encodeURI(`/places?loc=${address}&bar=show`)));
  };
}

export function saveReturnTo(path) {
  return {
    type: actionTypes.SAVE_PATH,
    path
  };
}

import actionTypes from './types';

export function setMapService(service) {
  return {
    type: actionTypes.SET_MAP_SERVICE,
    service
  };
}

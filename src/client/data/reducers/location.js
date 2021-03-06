import { combineReducers } from 'redux';
import actionTypes from '../actions/types';
import { defaultLocation } from '../../util/locations';

const bars = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FIND_LOCATION_SUCCESS:
    case actionTypes.ZERO_RESULTS_SEARCH_ERROR:
      return [];
    case actionTypes.FIND_BARS_SUCCESS:
      return action.bars;
    case actionTypes.INCREMENT_VISITORS_COUNT: {
      const i = state.findIndex(elem => elem.id === action.barId);
      const updateBar = {
        ...state[i],
        ...{ visitorsCount: state[i].visitorsCount + 1 }
      };
      const updateLocationBars = [
        ...state.slice(0, i),
        updateBar,
        ...state.slice(i + 1)
      ];
      return updateLocationBars;
    }
    case actionTypes.DECREMENT_VISITORS_COUNT: {
      // remove current user from the list of bar
      const i = state.findIndex(elem => elem.id === action.barId);
      if (i >= 0) {
        const updateBar = {
          ...state[i],
          ...{ visitorsCount: state[i].visitorsCount - 1 }
        };
        const updateLocationBars = [
          ...state.slice(0, i),
          updateBar,
          ...state.slice(i + 1)
        ];

        return updateLocationBars;
      }
      return state;
    }
    default:
      return state;
  }
};

const address = (state = defaultLocation.address, action) => {
  switch (action.type) {
    case actionTypes.FIND_LOCATION_SUCCESS:
      return action.address;
    case actionTypes.FIND_BARS_SUCCESS:
      return action.address;
    default:
      return state;
  }
};

const lat = (state = defaultLocation.lat, action) => {
  switch (action.type) {
    case actionTypes.FIND_LOCATION_SUCCESS:
      return action.lat;
    case actionTypes.FIND_BARS_SUCCESS:
      return action.lat;
    default:
      return state;
  }
};

const lng = (state = defaultLocation.lng, action) => {
  switch (action.type) {
    case actionTypes.FIND_LOCATION_SUCCESS:
      return action.lng;
    case actionTypes.FIND_BARS_SUCCESS:
      return action.lng;
    default:
      return state;
  }
};

const locationReducer = combineReducers({
  bars,
  address,
  lat,
  lng
});

export default locationReducer;

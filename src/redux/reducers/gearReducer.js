import { combineReducers } from 'redux';
import { GEAR_ACTIONS } from '../actions/gearActions';

const tripGear = (state = [], action) => {
  switch (action.type) {
    case GEAR_ACTIONS.SET_TRIP_GEAR:
      return action.tripGear || state;
    default:
      return state;
  }
};

export default combineReducers({
  tripGear,
});

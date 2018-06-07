import { combineReducers } from 'redux';
import { TRIP_ACTIONS } from '../actions/tripActions';

const userTrips = (state = [{ id: 0, location: "default" }], action) => {
  switch (action.type) {
    case TRIP_ACTIONS.SET_USER_TRIPS:
      return action.userTrips || state;
    default:
      return state;
  }
};

const currentTrip = (state = '', action) => {
  switch (action.type) {
    case TRIP_ACTIONS.SET_CURRENT_TRIP:
      return action.payload || state;
    case TRIP_ACTIONS.UNSET_CURRENT_TRIP:
      return null;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case TRIP_ACTIONS.SET_CURRENT_TRIP_START:
      return true;
    case TRIP_ACTIONS.SET_CURRENT_TRIP_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  userTrips,
  currentTrip,
  isLoading,
});

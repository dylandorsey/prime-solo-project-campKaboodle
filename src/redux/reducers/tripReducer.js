import { combineReducers } from 'redux';
import { TRIP_ACTIONS } from '../actions/tripActions';

const userTrips = (state = [{id: 0, location: "default"}], action) => {
  switch (action.type) {
    case TRIP_ACTIONS.SET_USER_TRIPS:
    console.log(action.userTrips);
      return action.userTrips || state;
    default:
      return state;
  }
};

export default combineReducers({
  userTrips,
});

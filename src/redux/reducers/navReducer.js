import { combineReducers } from 'redux';
import { NAV_ACTIONS } from '../actions/navActions';

const navTo = (state = '', action) => {
  switch (action.type) {
    case NAV_ACTIONS:TO_USER_MAIN_MENU
      return 'user-main-menu';
    default:
      return state;
  }
};

export default combineReducers({
 navTo
});

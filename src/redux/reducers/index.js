import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import trip from './tripReducer';
import gear from './gearReducer';

const store = combineReducers({
  user,
  login,
  trip,
  gear,
});

export default store;

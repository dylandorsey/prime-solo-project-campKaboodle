import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import trip from './tripReducer';

const store = combineReducers({
  user,
  login,
  trip,
});

export default store;

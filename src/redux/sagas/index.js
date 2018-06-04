import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import navSaga from './navSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    navSaga(),
    // watchIncrementAsync()
  ]);
}

import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import navSaga from './navSaga';
import tripSaga from './tripSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    navSaga(),
    tripSaga(),
    // watchIncrementAsync()
  ]);
}

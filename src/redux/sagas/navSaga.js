import { put, takeEvery } from 'redux-saga/effects';
import { NAV_ACTIONS } from '../actions/navActions';


// worker Saga: will be fired on "LOGIN" actions


// worker Saga: will be fired on "LOGOUT" actions
function* navTo(action) {
  try {
    yield put({
      type: NAV_ACTIONS.TO_USER_MAIN_MENU,
    });
  } catch (error) {
    console.log('NAV TO MAIN MENU FAILED', error);
  }
}

function* navSaga() {
  yield takeEvery(NAV_ACTIONS.TO_USER_MAIN_MENU, navTo);

}

export default navSaga;

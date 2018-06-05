import { put, takeLatest } from 'redux-saga/effects';
import { TRIP_ACTIONS } from '../actions/tripActions';
import { callUserTrips } from '../requests/tripRequests';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUserTrips() {
    try {
        const userTrips = yield callUserTrips();
        yield put({
            type: TRIP_ACTIONS.SET_USER_TRIPS,
            userTrips,
        })
    } catch (error) {
        console.log('error fetching user trips', error);
    };
}


function* tripSaga() {
    yield takeLatest(TRIP_ACTIONS.FETCH_USER_TRIPS, fetchUserTrips);
}

export default tripSaga;

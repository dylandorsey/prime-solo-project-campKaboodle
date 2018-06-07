import { put, takeLatest } from 'redux-saga/effects';
import { TRIP_ACTIONS } from '../actions/tripActions';
import { callUserTrips } from '../requests/tripRequests';
import { callUserJoinTrip } from '../requests/tripRequests';
import { callUserLeaveTrip } from '../requests/tripRequests';

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

function* initiateSetCurrentTrip(action) {
    try {
        const trip_ID = action.payload;
        yield put({ type: TRIP_ACTIONS.SET_CURRENT_TRIP_START })
        yield put({
            type: TRIP_ACTIONS.SET_CURRENT_TRIP,
            payload: trip_ID,
        })
        yield put({ type: TRIP_ACTIONS.SET_CURRENT_TRIP_DONE })
    } catch (error) {
        console.log('error setting current trip', error);
    }
}

function* initiateUnsetCurrentTrip() {
    try {
        yield put({ type: TRIP_ACTIONS.SET_CURRENT_TRIP_START })
        yield put({
            type: TRIP_ACTIONS.UNSET_CURRENT_TRIP,
        })
        yield put({ type: TRIP_ACTIONS.SET_CURRENT_TRIP_DONE })
    } catch (error) {
        console.log('error unsetting current trip', error);
    }
}

function* joinUserToTrip(action) {
    try {
        console.log('init joinUserToTrip')
        yield callUserJoinTrip(action.payload);
        yield fetchUserTrips();
    } catch (error) {
        console.log('error joining user to trip', error);
    };
}

function* removeUserFromTrip(action) {
    try {
        console.log('init removeUserFromTrip')
        yield callUserLeaveTrip(action.payload);
        yield fetchUserTrips();
    } catch (error) {
        console.log('error removing user from trip', error);
    };
}

function* tripSaga() {
    yield takeLatest(TRIP_ACTIONS.FETCH_USER_TRIPS, fetchUserTrips);
    yield takeLatest(TRIP_ACTIONS.REQUEST_USER_JOIN_TRIP, joinUserToTrip);
    yield takeLatest(TRIP_ACTIONS.REQUEST_USER_LEAVE_TRIP, removeUserFromTrip);
    yield takeLatest(TRIP_ACTIONS.START_SAGA_SET_CURRENT_TRIP, initiateSetCurrentTrip);
    yield takeLatest(TRIP_ACTIONS.START_UNSET_CURRENT_TRIP, initiateUnsetCurrentTrip);
}

export default tripSaga;

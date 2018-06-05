import { put, takeLatest } from 'redux-saga/effects';
import { TRIP_ACTIONS } from '../actions/tripActions';
import { callUserTrips } from '../requests/tripRequests';
import { callUserJoinTrip } from '../requests/tripRequests';
// import { callCreateNewTrip } from '../requests/tripRequests';

// worker Saga: will be fired on "FETCH_USER" actions
// function* createNewTrip(action) {
//     try {
//         console.log('init createNewTrip')
//         yield callCreateNewTrip(action.payload);
//         yield fetchUserTrips();
//     } catch (error) {
//         console.log('error creating new trip', error);
//     };
// }

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

function* joinUserToTrip() {
    try {
        console.log('init joinUserToTrip')
        yield callUserJoinTrip();
        yield fetchUserTrips();
    } catch (error) {
        console.log('error joining user to trip', error);
    };
}

function* tripSaga() {
    yield takeLatest(TRIP_ACTIONS.FETCH_USER_TRIPS, fetchUserTrips);
    yield takeLatest(TRIP_ACTIONS.REQUEST_USER_JOIN_TRIP, joinUserToTrip);
    // yield takeLatest(TRIP_ACTIONS.INITIATE_NEW_TRIP, createNewTrip);
}

export default tripSaga;

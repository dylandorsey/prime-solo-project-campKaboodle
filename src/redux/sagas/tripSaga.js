import { put, takeLatest } from 'redux-saga/effects';
import { TRIP_ACTIONS } from '../actions/tripActions';
import { callGetCurrentTripID } from '../requests/tripRequests';
import { callGetCurrentTripData } from '../requests/tripRequests';
import { callInviteUserToTrip } from '../requests/tripRequests';
import { callPutCurrentTrip } from '../requests/tripRequests';
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
    let trip_ID = action.payload;
    let trip_data = action.payload
    console.log(trip_ID);
    try {
        yield put({ type: TRIP_ACTIONS.SET_CURRENT_TRIP_START })
        if (trip_ID !== undefined) {
            yield callPutCurrentTrip(trip_ID);
        } else {
            console.log('getting trip id from database');
            let responseGetCurrentTripID = yield callGetCurrentTripID();
            console.log(responseGetCurrentTripID);
            trip_ID = responseGetCurrentTripID[0].userCurrentTripID;
            console.log(`trip id is ${trip_ID} and now fetching trip data from database`);
            let responseGetCurrentTripData = yield callGetCurrentTripData(trip_ID);
            console.log('reponse from GetCurrentTripData = ', responseGetCurrentTripData[0]);
            trip_data = responseGetCurrentTripData[0];
            console.log(`trip data is now for trip id# ${trip_data.id}`);
        }
        yield put({
            type: TRIP_ACTIONS.SET_CURRENT_TRIP,
            payload: trip_data,
        })
        yield put({ type: TRIP_ACTIONS.SET_CURRENT_TRIP_DONE })
    } catch (error) {
        console.log('error setting current trip', error);
    }
}

function* intiateInviteUser(action) {
    try {
        yield callInviteUserToTrip(action.payload);
    } catch (error) {
        console.log('error inviting user to current trip', error);
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
    yield takeLatest(TRIP_ACTIONS.INVITE_USER, intiateInviteUser);
    yield takeLatest(TRIP_ACTIONS.REQUEST_USER_JOIN_TRIP, joinUserToTrip);
    yield takeLatest(TRIP_ACTIONS.REQUEST_USER_LEAVE_TRIP, removeUserFromTrip);
    yield takeLatest(TRIP_ACTIONS.START_SAGA_SET_CURRENT_TRIP, initiateSetCurrentTrip);
    yield takeLatest(TRIP_ACTIONS.START_UNSET_CURRENT_TRIP, initiateUnsetCurrentTrip);
}

export default tripSaga;

import { put, takeLatest } from 'redux-saga/effects';
import { TRIP_ACTIONS } from '../actions/tripActions';
import { callCreateNewTrip } from '../requests/tripRequests';
import { callDeleteCamper } from '../requests/tripRequests';
import { callGetCurrentTripID } from '../requests/tripRequests';
import { callGetCurrentTripCamperList } from '../requests/tripRequests';
import { callGetCurrentTripData } from '../requests/tripRequests';
import { callGetUsersNewTripID } from '../requests/tripRequests';
import { callGetInviteeUserID } from '../requests/tripRequests';
import { callAddUserToTrip } from '../requests/tripRequests';
import { callPutCurrentTrip } from '../requests/tripRequests';
import { callUserTrips } from '../requests/tripRequests';
import { callUserJoinTrip } from '../requests/tripRequests';
import { callUserLeaveTrip } from '../requests/tripRequests';

function* createNewTrip(action) {
    let newTrip = action.payload.newTrip;
    console.log(newTrip);
    try {
        yield callCreateNewTrip(newTrip);
        let response = yield callGetUsersNewTripID();
        let trip_id = response[0].max;
        let body = { trip_id: trip_id }
        console.log(trip_id);
        yield callAddUserToTrip(body);
    } catch (error) {
        console.log('error creating new trip', error);
    };
}

function* deleteCamper(action) {
    let payload = action.payload;
    try {
        yield callDeleteCamper(payload);
        let responseGetCurrentTripID = yield callGetCurrentTripID();
        const trip_ID = responseGetCurrentTripID[0].userCurrentTripID;
        yield initiateSetTripCamperList(trip_ID);
    } catch (error) {
        console.log('error deleting camper from trip', error);
    };
}

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
    console.log('init initiateSetCurrentTripData with action', action);
    // action.payload = trip from triplisttable.js
    // action.payload = nothing from tripOverview, tripGearList, tripCamperList
    try {
        yield put({ type: TRIP_ACTIONS.SET_CURRENT_TRIP_START })
        if (action.payload) {
            console.log(`given trip.id of ${action.payload.id}, editing database.`);
            const trip_ID = action.payload.id;
            yield callPutCurrentTrip(trip_ID);
            // wet code: see else statement
            yield put({
                type: TRIP_ACTIONS.SET_CURRENT_TRIP,
                payload: action.payload,
            });
            yield initiateSetTripCamperList(trip_ID);
        } else {
            console.log('getting trip id from database');
            let responseGetCurrentTripID = yield callGetCurrentTripID();
            console.log('db responsed with current trip: ', responseGetCurrentTripID);
            const trip_ID = responseGetCurrentTripID[0].userCurrentTripID;
            console.log(`trip id is ${trip_ID} and now fetching trip data from database`);
            let responseGetCurrentTripData = yield callGetCurrentTripData(trip_ID);
            console.log('reponse from GetCurrentTripData = ', responseGetCurrentTripData[0]);
            const trip = responseGetCurrentTripData[0];
            console.log(`trip data is now for trip id# ${trip.id}`);
            // wet code: see if statement
            yield put({
                type: TRIP_ACTIONS.SET_CURRENT_TRIP,
                payload: trip,
            })
            yield initiateSetTripCamperList(trip_ID);
        }
        yield put({ type: TRIP_ACTIONS.SET_CURRENT_TRIP_DONE })
    } catch (error) {
        console.log('error setting current trip', error);
    }
}

function* initiateSetTripCamperList(trip_ID) {
    // let trip_ID = action.payload.trip_ID;
    console.log(trip_ID);
    try {
        const currentTripCamperList = yield callGetCurrentTripCamperList(trip_ID);
        console.log('GET for currentTripCamperList back with: ', currentTripCamperList);
        yield put({
            type: TRIP_ACTIONS.SET_CURRENT_TRIP_CAMPER_LIST,
            payload: { currentTripCamperList },
        })
    } catch (error) {
        console.log('error setting current trip', error);
    }
}

function* intiateInviteUser(action) {
    console.log('init initiateInviteUser', action);
    const inviteeUserName = action.payload.inviteeUsername;
    const trip_id = action.payload.trip_id;
    console.log('invitee username is ', inviteeUserName);
    try {
        const response = yield callGetInviteeUserID(inviteeUserName);
        const inviteeUserID = response[0].id;
        console.log(inviteeUserID);
        const body = {
            inviteeUserID: inviteeUserID,
            trip_id: trip_id,
        }
        yield callAddUserToTrip(body);
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
    yield takeLatest(TRIP_ACTIONS.CREATE_NEW_TRIP, createNewTrip);
    yield takeLatest(TRIP_ACTIONS.DELETE_CAMPER, deleteCamper);
    yield takeLatest(TRIP_ACTIONS.FETCH_USER_TRIPS, fetchUserTrips);
    yield takeLatest(TRIP_ACTIONS.INVITE_USER, intiateInviteUser);
    yield takeLatest(TRIP_ACTIONS.REQUEST_USER_JOIN_TRIP, joinUserToTrip);
    yield takeLatest(TRIP_ACTIONS.REQUEST_USER_LEAVE_TRIP, removeUserFromTrip);
    yield takeLatest(TRIP_ACTIONS.START_SAGA_SET_CURRENT_TRIP, initiateSetCurrentTrip);
    yield takeLatest(TRIP_ACTIONS.START_SAGA_SET_TRIP_CAMPER_LIST, initiateSetTripCamperList);
    yield takeLatest(TRIP_ACTIONS.START_UNSET_CURRENT_TRIP, initiateUnsetCurrentTrip);
}

export default tripSaga;

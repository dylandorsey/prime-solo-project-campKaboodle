import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { GEAR_ACTIONS } from '../actions/gearActions';
import { callTripGear } from '../requests/gearRequests';
import { callPostTripGearItem } from '../requests/gearRequests';
import { callPutItemProvider } from '../requests/gearRequests';
import { callRemoveItemProvider } from '../requests/gearRequests';

function* createNewGearItem(action) {
    try {
        console.log(action);
        yield callPostTripGearItem(action);
        yield fetchTripGear(action);
        // DOM reflects newest gear item only after a second fetchTripGear call... this is an issue I dont understand
        yield fetchTripGear(action);
        yield fetchTripGear(action);
    } catch (error) {
        console.log('error creating new gear item', error);
    };
}

function* fetchTripGear(action) {
    try {
        const trip_id = action.payload.id;
        console.log('init fetchTripGear with', action);
        console.log('trip_id is now' ,trip_id);
        const tripGear = yield callTripGear(trip_id);
        yield put({
            type: GEAR_ACTIONS.SET_TRIP_GEAR,
            tripGear,
        })
    } catch (error) {
        console.log('error fetching trip gear', error);
    };
}

function* removeItemProvider(action) {
    try {
        yield callRemoveItemProvider(action);
        // console.log(action);
        yield fetchTripGear(action);
        yield fetchTripGear(action);
    }
    catch (error) {
        console.log('error putting item provider', error);
    };
}

function* updateItemProvider(action) {
    try {
        console.log('init updateItemProvider with action', action);
        yield callPutItemProvider(action);
        yield fetchTripGear(action);
        yield fetchTripGear(action);
    }
    catch (error) {
        console.log('error putting item provider', error);
    };
}

function* gearSaga() {
    yield takeLatest(GEAR_ACTIONS.FETCH_TRIP_GEAR, fetchTripGear);
    yield takeLatest(GEAR_ACTIONS.CREATE_NEW_GEAR_ITEM, createNewGearItem);
    yield takeEvery(GEAR_ACTIONS.UPDATE_ITEM_PROVIDER, updateItemProvider);
    yield takeEvery(GEAR_ACTIONS.REMOVE_ITEM_PROVIDER, removeItemProvider);
}

export default gearSaga;

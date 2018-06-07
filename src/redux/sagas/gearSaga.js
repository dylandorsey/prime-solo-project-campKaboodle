import { put, takeLatest } from 'redux-saga/effects';
import { GEAR_ACTIONS } from '../actions/gearActions';
import { callTripGear } from '../requests/gearRequests';

function* fetchTripGear(action) {
    try {
        const tripGear = yield callTripGear(action);
        yield put({
            type: GEAR_ACTIONS.SET_TRIP_GEAR,
            tripGear,
        })
    } catch (error) {
        console.log('error fetching user trips', error);
    };
}


function* gearSaga() {
    yield takeLatest(GEAR_ACTIONS.FETCH_TRIP_GEAR, fetchTripGear);
}

export default gearSaga;

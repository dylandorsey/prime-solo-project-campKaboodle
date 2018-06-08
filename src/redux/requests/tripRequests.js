import axios from 'axios';


export function callUserTrips() {
    return axios.get(`api/trip/user-trips`)
        .then(response => response.data)
        .catch((error) => { throw error.response || error; });
}


// fetch user's current trip data
export function callGetCurrentTripData(trip_id) {
    const params = {
        trip_id: trip_id
    };
    return axios.get(`api/trip/user-current-trip-data`, {params})
        .then(response => response.data)
        .catch((error) => { throw error.response || error; });
}

// fetch user's current trip ID
export function callGetCurrentTripID() {
    return axios.get(`api/trip/user-current-trip-id`)
        .then(response => response.data)
        .catch((error) => { throw error.response || error; });
}

// fetch trip participants

// invite user to join trip
export function callInviteUserToTrip(payload) {
    // axios POST to user_trip to add new row for a user
}

// put user's current trip
export function callPutCurrentTrip(trip_id) {
    const body = {
        trip_id: trip_id
    };
    return axios.put(`api/trip/user-current-trip`, body)
    .then(response => console.log(response))
    .catch((error) => { throw error.response || error; });
}

// join trip
export function callUserJoinTrip(trip_id) {
    const body = {
        id: trip_id
    };
    return axios.put(`api/trip/join`, body)
        .then(response => console.log(response))
        .catch((error) => { throw error.response || error; });
}

export function callUserLeaveTrip(trip_id) {
    const body = {
        id: trip_id
    };
    return axios.put(`api/trip/leave`, body)
        .then(response => console.log(response))
        .catch((error) => { throw error.response || error; });
}
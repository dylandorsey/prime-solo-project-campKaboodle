import axios from 'axios';

export function callCreateNewTrip(newTrip) {
    console.log('init callCreateNewTrip');
    return axios.post(`api/trip/new-trip`, newTrip)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
} 

export function callDeleteCamper(payload) {
    console.log(`init callDeleteCamper from trip: ${payload.trip_id} with user id: ${payload.user_id}`);
    axios.delete(`api/trip/delete-camper`, {data: payload})
      .then(response => response.data)
      .catch((error) => {
        throw error.response || error;
      });
}

export function callDeleteTrip(payload) {
    console.log(`init callDeleteTrip for trip_id: ${payload.trip_id}`);
    axios.delete(`api/trip/delete-trip`, {data: payload})
      .then(response => response.data)
      .catch((error) => {
        throw error.response || error;
      });
}

export function callUserTrips() {
    return axios.get(`api/trip/user-trips`)
        .then(response => response.data)
        .catch((error) => { throw error.response || error; });
}

// fetch user's current trip data
export function callGetCurrentTripData(trip_id) {
    const params = {
        trip_id: trip_id,
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

// fetch invitee user ID (given invitee username)
export function callGetInviteeUserID(inviteeUserName) {
    console.log('init callGetInviteeUserID. Given username: ', inviteeUserName);
    const params = {
        inviteeUserName: inviteeUserName,
    }
    return axios.get(`api/user/invitee-user-id`, {params})
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch user's new trip id
export function callGetUsersNewTripID() {
    return(axios.get(`api/trip/users-new-trip-id`))
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip camper list
export function callGetCurrentTripCamperList(trip_ID) {
    console.log('init callGetCurrentTripCamperList. Given trip_ID: ', trip_ID);
    const params = {
        trip_ID: trip_ID,
    }
    return axios.get(`api/trip/current-camper-list`, {params})
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// Add user to trip
export function callAddUserToTrip(body) {
    // axios POST to user_trip to add new row for a user
    axios.post(`api/trip/add-user-to-trip`, body)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
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
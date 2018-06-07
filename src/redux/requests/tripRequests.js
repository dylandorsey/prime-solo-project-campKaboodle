import axios from 'axios';


export function callUserTrips() {
  return axios.get(`api/trip`)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip participants

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
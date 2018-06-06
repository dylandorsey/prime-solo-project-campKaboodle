import axios from 'axios';


export function callUserTrips() {
  return axios.get(`api/trip`)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip participants

// join trip
export function callUserJoinTrip() {
    return axios.put(`api/trip/join`)
    .then(response => console.log(response))
    .catch((error) => { throw error.response || error; });
}
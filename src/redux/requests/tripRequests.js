import axios from 'axios';


export function callUserTrips(userID) {
  return axios.get(`api/trip/2`)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip gear

// fetch trip participants



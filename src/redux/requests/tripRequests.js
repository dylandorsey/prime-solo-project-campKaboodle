import axios from 'axios';


export function callUserTrips() {
  return axios.get(`api/trip`)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip gear

// fetch trip participants



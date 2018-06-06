import axios from 'axios';

// fetch trip gear
export function callTripGear() {
  return axios.get(`api/gear`)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip participants

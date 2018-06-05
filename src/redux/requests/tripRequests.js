import axios from 'axios';

export function fetchUsersTrips() {
  return axios.get('api/trip/1', config)
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip gear

// fetch trip participants



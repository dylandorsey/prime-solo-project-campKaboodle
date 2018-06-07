import axios from 'axios';

// fetch trip gear
export function callTripGear(action) {
  console.log(action);
  console.log(action.payload);
  console.log(action.payload.id);
  const params = {
    trip_id: action.payload.id,
  }
  return axios.get(`api/gear`, {params})
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip participants

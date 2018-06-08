import axios from 'axios';

// fetch trip gear
export function callTripGear(trip_id) {
  console.log(trip_id);
  const params = {
    trip_id: trip_id,
  }
  return axios.get(`api/gear`, {params})
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// post new gear item
export function callPostTripGearItem(action) {
  const body = action.payload
  axios.post(`api/gear/new-item`, body)
  .then(response => response.data)
  .catch((error) => {
    throw error.response || error;
  });
}

// put gear item new provider
export function callPutItemProvider(action) {
    console.log(action);
    const body = {
        item_id: action.payload.item.id
    }
    axios.put(`api/gear/new-item-provider`, body)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

// put gear item provider as null
export function callRemoveItemProvider(action) {
    console.log(action);
    const body = {
        item_id: action.payload.item.id
    }
    axios.put(`api/gear/null-item-provider`, body)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
}

// fetch trip participants

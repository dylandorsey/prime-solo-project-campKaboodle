import axios from 'axios';

// delete gear item
export function callDeleteGearItem(action) {
  console.log('init callDeleteGearItem with action: ', action);
  const gear_id = action.payload.item.id;
  console.log('init axios DELETE');
  axios.delete(`api/gear/${gear_id}`)
    .then(response => response.data)
    .catch((error) => {
      throw error.response || error;
    });
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

// fetch trip gear by description order ASC
export function callTripGear(trip_id) {
  console.log(trip_id);
  const params = {
    trip_id: trip_id,
  }
  return axios.get(`api/gear/asc`, { params })
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip gear by description order DESC
export function callTripGearByDescriptionDESC(trip_id) {
  console.log(trip_id);
  const params = {
    trip_id: trip_id,
  }
  return axios.get(`api/gear/desc`, { params })
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip gear by provider order ASC
export function callTripGearByProviderASC(trip_id) {
  console.log(trip_id);
  const params = {
    trip_id: trip_id,
  }
  return axios.get(`api/gear/provider-asc`, { params })
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip gear by provider order DESC
export function callTripGearByProviderDESC(trip_id) {
  console.log(trip_id);
  const params = {
    trip_id: trip_id,
  }
  return axios.get(`api/gear/provider-desc`, { params })
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip gear by quantity order ASC
export function callTripGearByQuantityASC(trip_id) {
  console.log(trip_id);
  const params = {
    trip_id: trip_id,
  }
  return axios.get(`api/gear/quantity-asc`, { params })
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}

// fetch trip gear by quantity order DESC
export function callTripGearByQuantityDESC(trip_id) {
  console.log(trip_id);
  const params = {
    trip_id: trip_id,
  }
  return axios.get(`api/gear/quantity-DESC`, { params })
    .then(response => response.data)
    .catch((error) => { throw error.response || error; });
}
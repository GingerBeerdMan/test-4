import {
	takeEvery,
	call,
	put
} from 'redux-saga/effects';

import {
	GeolocationTypes,
} from '../actions/geolocation';

export default function* geolocationSaga() {
	yield takeEvery(GeolocationTypes.GET_LOCATIONS, getLocations);
}

function* getLocations(x) {
	console.log('saga', x);
}
import {
	takeEvery,
	call,
} from 'redux-saga/effects';

import {
	GeolocationTypes,
} from '../actions/geolocation';

export default function* geolocationSaga() {
	yield takeEvery(GeolocationTypes.GET_LOCATIONS, getLocations);
}

function* getLocations(ipList) {
	const queryParams = ipList.payload.toJS()
		.slice(0, 10)
		.join(',').concat('?access_key=f623ac39bc733c8f237409b7f192dbf2');
	const data
		= yield call(fetch, 'http://api.ipstack.com/' + queryParams);
	const jsonData = yield data.json();
	console.log('jsonData', jsonData);
}
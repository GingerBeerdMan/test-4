import {
	takeEvery,
	call,
	put,
} from 'redux-saga/effects';

import {
	GeolocationTypes,
	fetchLocationSucceeded,
} from '../actions/geolocation';

import {
	fromJS,
} from 'immutable';

export default function* geolocationSaga() {
	yield takeEvery(GeolocationTypes.GET_LOCATIONS, getLocations);
	yield takeEvery(GeolocationTypes.GET_LOCATION, getLocation);
}

function* getLocation(person) {
	if(person == null){
		return;
	}
	const queryParams = person.payload.get('ip_address').concat('?access_key=f623ac39bc733c8f237409b7f192dbf2');
	const data
		= yield call(fetch, 'http://api.ipstack.com/' + queryParams);

	if (data) {
		const jsonData = yield data.json();
		console.log('jsonData', jsonData);
		yield put(fetchLocationSucceeded(fromJS(jsonData)));
	}
}

function* getLocations(ipList) {
	// TODO: get rid of the access_key from github
	const queryParams = ipList.payload.toJS()
		.slice(0, 10)
		.join(',').concat('?access_key=f623ac39bc733c8f237409b7f192dbf2');
	const data
		= yield call(fetch, 'http://api.ipstack.com/' + queryParams);
	const jsonData = yield data.json();
	console.log('jsonData', jsonData);
}
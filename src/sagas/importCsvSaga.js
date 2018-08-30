import {
	takeEvery,
	put,
	select,
} from 'redux-saga/effects';

import {
	ImportCsvTypes,
	importCsvSucceeded,
	importCsvFailed,
} from '../actions/importCSV';

import {
	fetchLocations,
} from '../actions/geolocation';

import { getIps } from "../selectors/data";

export default function* importCsvSaga() {
	yield takeEvery(ImportCsvTypes.IMPORT_CSV, storeData);
}

function* storeData(data) {
	if (data) {
		yield put(importCsvSucceeded(data.payload));

		// Attempt to bulk geolocate, fails due to being poor.
		// I guess I have 10,000 requests a month so I could do individual requests :D
		const ipList = yield select(getIps);
		yield put(fetchLocations(ipList));
	} else {
		yield put(importCsvFailed());
	}
}
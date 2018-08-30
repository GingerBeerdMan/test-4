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
		const ipList = yield select(getIps);
		yield put(fetchLocations(ipList));
	} else {
		yield put(importCsvFailed());
	}
}
import {
	takeEvery,
	put
} from 'redux-saga/effects';

import {
	ImportCsvTypes,
	importCsvSucceeded,
	importCsvFailed,
} from '../actions/importCSV';

export default function* importCsvSaga() {
	yield takeEvery(ImportCsvTypes.IMPORT_CSV, storeData);
}

function* storeData(data) {
	if (data) {
		yield put(importCsvSucceeded(data.payload));
	} else {
		yield put(importCsvFailed());
	}
}
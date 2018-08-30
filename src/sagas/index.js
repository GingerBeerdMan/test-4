import {
	all
} from 'redux-saga/effects';
import geolocationSaga from './geolocationSaga';
import importCsvSaga from './importCsvSaga';

export default function* rootSaga() {
	yield all([
		geolocationSaga(),
		importCsvSaga(),
	]);
}
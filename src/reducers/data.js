import Immutable from 'immutable';
import { Map } from 'immutable';

import {
	ImportCsvTypes,
} from '../actions/importCSV';

import {
	GeolocationTypes,
} from '../actions/geolocation';

const initialState = Map({});

const processParsedCSV = (csv) => {
	const columns =  csv.first();
	return csv
		.slice(1, -2)
		.map((item) => {
			return item.zip(columns)
				.reduce((result, col) => {
					return result.setIn([col[1]], col[0]);
				}, Map({}));
	});
};

const updateUsers = (state, metadata) => {
	return state
		.map(x => {
			return x.get('ip_address') === metadata.get('ip')
				? x.set('metadata', metadata)
				: x
		});
};

const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case ImportCsvTypes.IMPORT_CSV_SUCCEEDED:
			return processParsedCSV(Immutable.fromJS(action.payload));
		case ImportCsvTypes.IMPORT_CSV_FAILED:
			return state;
		case GeolocationTypes.GET_LOCATION_SUCCEEDED:
			return updateUsers(state, action.payload);
		default:
			return state;
	}
};

export default dataReducer;
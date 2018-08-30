import Immutable from 'immutable';
import { Map } from 'immutable';

import {
	ImportCsvTypes,
} from '../actions/importCSV';

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

const dataReducer = (state = initialState, action) => {
	switch (action.type) {
		case ImportCsvTypes.IMPORT_CSV_SUCCEEDED:
			return processParsedCSV(Immutable.fromJS(action.payload));
		case ImportCsvTypes.IMPORT_CSV_FAILED:
			return state;
		default:
			return state;
	}
};

export default dataReducer;
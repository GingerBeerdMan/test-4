import Immutable from 'immutable';
import { Map } from 'immutable';

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
		case 'STORE_DATA':
			return processParsedCSV(Immutable.fromJS(action.payload));
		default:
			return state;
	}
};

export default dataReducer;
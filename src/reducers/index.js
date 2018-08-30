import { combineReducers } from 'redux-immutable';
import dataReducer from './data';

const rootReducer = combineReducers({
	data: dataReducer,
});

export default rootReducer;
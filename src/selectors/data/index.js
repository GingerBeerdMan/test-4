import { createSelector } from 'reselect';

export const getState = () => (state) => state;

export const getData = createSelector(
	getState(),
	(state) => state.get('data')
);

export const getIps = createSelector(
	getData,
	(state) => {
		return state.map(x => x.get('ip_address'));
	}
);

export const GeolocationTypes = {
	GET_LOCATIONS: 'GET_LOCATIONS',
	GET_LOCATIONS_SUCCEEDED: 'GET_LOCATIONS_SUCCEEDED',
	GET_LOCATIONS_FAILED: 'GET_LOCATIONS_FAILED',
};

export const fetchLocations = (ipList) => ({
	type: GeolocationTypes.GET_LOCATIONS,
	payload: ipList
});

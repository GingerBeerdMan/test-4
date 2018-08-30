export const GeolocationTypes = {
	GET_LOCATIONS: 'GET_LOCATIONS',
	GET_LOCATIONS_SUCCEEDED: 'GET_LOCATIONS_SUCCEEDED',
	GET_LOCATIONS_FAILED: 'GET_LOCATIONS_FAILED',
	GET_LOCATION: 'GET_LOCATION',
	GET_LOCATION_SUCCEEDED: 'GET_LOCATION_SUCCEEDED',
	GET_LOCATION_FAILED: 'GET_LOCATION_FAILED',
};

export const fetchLocations = (ipList) => ({
	type: GeolocationTypes.GET_LOCATIONS,
	payload: ipList
});

export const fetchLocation = (person) => ({
	type: GeolocationTypes.GET_LOCATION,
	payload: person
});

export const fetchLocationSucceeded = (data) => ({
	type: GeolocationTypes.GET_LOCATION_SUCCEEDED,
	payload: data
});
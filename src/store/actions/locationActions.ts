import { Location } from "@/helpers/types.ts";

// Action Types
export const FETCH_LOCATIONS_REQUEST = 'FETCH_LOCATIONS_REQUEST';
export const FETCH_LOCATIONS_SUCCESS = 'FETCH_LOCATIONS_SUCCESS';
export const FETCH_LOCATIONS_FAILURE = 'FETCH_LOCATIONS_FAILURE';
export const CREATE_LOCATION_SUCCESS = 'CREATE_LOCATION_SUCCESS';
export const CREATE_LOCATION_FAILURE = 'CREATE_LOCATION_FAILURE';
export const RETRIEVE_LOCATION_SUCCESS = 'RETRIEVE_LOCATION_SUCCESS';
export const RETRIEVE_LOCATION_FAILURE = 'RETRIEVE_LOCATION_FAILURE';
export const UPDATE_LOCATION_SUCCESS = 'UPDATE_LOCATION_SUCCESS';
export const UPDATE_LOCATION_FAILURE = 'UPDATE_LOCATION_FAILURE';
export const DELETE_LOCATION_SUCCESS = 'DELETE_LOCATION_SUCCESS';
export const DELETE_LOCATION_FAILURE = 'DELETE_LOCATION_FAILURE';

// Action Creators
export const fetchLocationsRequest = () => ({
    type: FETCH_LOCATIONS_REQUEST,
});

export const fetchLocationsSuccess = (locations: Location[]) => ({
    type: FETCH_LOCATIONS_SUCCESS,
    payload: locations,
});

export const fetchLocationsFailure = (error: string) => ({
    type: FETCH_LOCATIONS_FAILURE,
    payload: error,
});

export const createLocationSuccess = (location: Location) => ({
    type: CREATE_LOCATION_SUCCESS,
    payload: location,
});

export const createLocationFailure = (error: string) => ({
    type: CREATE_LOCATION_FAILURE,
    payload: error,
});

export const retrieveLocationSuccess = (location: Location) => ({
    type: RETRIEVE_LOCATION_SUCCESS,
    payload: location,
});

export const retrieveLocationFailure = (error: string) => ({
    type: RETRIEVE_LOCATION_FAILURE,
    payload: error,
});

export const updateLocationSuccess = (location: Location) => ({
    type: UPDATE_LOCATION_SUCCESS,
    payload: location,
});

export const updateLocationFailure = (error: string) => ({
    type: UPDATE_LOCATION_FAILURE,
    payload: error,
});

export const deleteLocationSuccess = (id: string) => ({
    type: DELETE_LOCATION_SUCCESS,
    payload: id,
});

export const deleteLocationFailure = (error: string) => ({
    type: DELETE_LOCATION_FAILURE,
    payload: error,
});
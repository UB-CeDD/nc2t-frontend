import {
    fetchLocationsSuccess,
    fetchLocationsFailure,
    createLocationSuccess,
    createLocationFailure,
    retrieveLocationSuccess,
    retrieveLocationFailure,
    updateLocationSuccess,
    updateLocationFailure,
    deleteLocationSuccess,
    deleteLocationFailure,
} from '../actions/locationActions';
import {
    listLocations,
    createLocation,
    retrieveLocation,
    updateLocation,
    deleteLocation,
} from '../../services/locationService';
import { Location } from '@/helpers/types';

export const fetchLocationsThunk = ( queryParams: Record<string, string> = {}) => async (dispatch) => {
    try {
        const locations = await listLocations(queryParams);
        dispatch(fetchLocationsSuccess(locations));
    } catch (error) {
        dispatch(fetchLocationsFailure(error.message));
    }
};

export const createLocationThunk = (locationData: Location)  => async (dispatch) => {
    try {
        const location = await createLocation(locationData);
        dispatch(createLocationSuccess(location));
    } catch (error) {
        dispatch(createLocationFailure(error.message));
    }
};

export const retrieveLocationThunk = ( id: string ) => async ( dispatch ) => {
    try {
        const location = await retrieveLocation(id);
        dispatch(retrieveLocationSuccess(location));
    } catch (error) {
        dispatch(retrieveLocationFailure(error.message));
    }
};

export const updateLocationThunk = ( id: string, locationData: Location ) => async (dispatch) => {
    try {
        const location = await updateLocation(id, locationData);
        dispatch(updateLocationSuccess(location));
    } catch (error) {
        dispatch(updateLocationFailure(error.message));
    }
};

export const deleteLocationThunk = (id: string) => async (dispatch) => {
    try {
        await deleteLocation(id);
        dispatch(deleteLocationSuccess(id));
    } catch (error) {
        dispatch(deleteLocationFailure(error.message));
    }
};
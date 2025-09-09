import {
    fetchLocationsRequest,
    fetchLocationsSuccess,
    fetchLocationsFailure,
    createLocationRequest,
    createLocationSuccess,
    createLocationFailure,
    retrieveLocationSuccess,
    retrieveLocationFailure,
    updateLocationRequest,
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

export const fetchLocationsThunk = ( queryParams: Record<string, string> = {}) => async (dispatch: any) => {
    dispatch(fetchLocationsRequest());
    try {
        const locations = await listLocations(queryParams);
        dispatch(fetchLocationsSuccess(locations));
        return locations;
    } catch (error) {
        dispatch(fetchLocationsFailure(error.message));
        throw error;
    }
};

export const createLocationThunk = (locationData: Location)  => async (dispatch: any) => {
    dispatch(createLocationRequest());
    try {
        const location = await createLocation(locationData);
        dispatch(createLocationSuccess(location));
        return location;
    } catch (error) {
        dispatch(createLocationFailure(error.message));
        throw error;
    }
};

export const retrieveLocationThunk = ( id: string ) => async ( dispatch: any ) => {
    try {
        const location = await retrieveLocation(id);
        dispatch(retrieveLocationSuccess(location));
        return location;
    } catch (error) {
        dispatch(retrieveLocationFailure(error.message));
        throw error;
    }
};

export const updateLocationThunk = ( id: string, locationData: Location ) => async (dispatch: any) => {
    dispatch(updateLocationRequest());
    try {
        const location = await updateLocation(id, locationData);
        dispatch(updateLocationSuccess(location));
        return location;
    } catch (error) {
        dispatch(updateLocationFailure(error.message));
        throw error;
    }
};

export const deleteLocationThunk = (id: string) => async (dispatch: any) => {
    try {
        await deleteLocation(id);
        dispatch(deleteLocationSuccess(id));
        return id;
    } catch (error) {
        dispatch(deleteLocationFailure(error.message));
        throw error;
    }
};
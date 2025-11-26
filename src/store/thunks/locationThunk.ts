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
    setLocationCount, // Import new action type
} from '../actions/locationActions';
import {
    listLocations,
    createLocation,
    retrieveLocation,
    updateLocation,
    deleteLocation,
} from '../../services/locationService';
import { Location } from '@/helpers/types';
import { AppDispatch } from '../../store/store'; // Import AppDispatch

export const fetchLocationsThunk = ( queryParams: Record<string, string> = {}) => async (dispatch: AppDispatch) => {
    dispatch(fetchLocationsRequest());
    try {
        const locations = await listLocations(queryParams);
        dispatch(fetchLocationsSuccess(locations));
        return locations;
    } catch (error) {
        dispatch(fetchLocationsFailure((error as Error).message));
        throw error;
    }
};

export const fetchTotalLocationCount = () => async (dispatch: AppDispatch) => {
    dispatch(fetchLocationsRequest()); // Use the existing request action for loading state
    try {
        const locations = await listLocations(); // Fetch all locations
        dispatch(setLocationCount(locations.length)); // Dispatch the count
    } catch (error) {
        dispatch(fetchLocationsFailure((error as Error).message || 'Failed to fetch location count.'));
        throw error;
    }
};

export const createLocationThunk = (locationData: Location)  => async (dispatch: AppDispatch) => {
    dispatch(createLocationRequest());
    try {
        const location = await createLocation(locationData);
        dispatch(createLocationSuccess(location));
        return location;
    } catch (error) {
        dispatch(createLocationFailure((error as Error).message));
        throw error;
    }
};

export const retrieveLocationThunk = ( id: string ) => async ( dispatch: AppDispatch ) => {
    try {
        const location = await retrieveLocation(id);
        dispatch(retrieveLocationSuccess(location));
        return location;
    } catch (error) {
        dispatch(retrieveLocationFailure((error as Error).message));
        throw error;
    }
};

export const updateLocationThunk = ( id: string, locationData: Location ) => async (dispatch: AppDispatch) => {
    dispatch(updateLocationRequest());
    try {
        const location = await updateLocation(id, locationData);
        dispatch(updateLocationSuccess(location));
        return location;
    } catch (error) {
        dispatch(updateLocationFailure((error as Error).message));
        throw error;
    }
};

export const deleteLocationThunk = (id: string) => async (dispatch: AppDispatch) => {
    try {
        await deleteLocation(id);
        dispatch(deleteLocationSuccess(id));
        return id;
    } catch (error) {
        dispatch(deleteLocationFailure((error as Error).message));
        throw error;
    }
};
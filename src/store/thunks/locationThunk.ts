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
} from "../actions/locationActions";
import {
  listLocations,
  createLocation,
  retrieveLocation,
  updateLocation,
  deleteLocation,
} from "../../services/locationService";
import { Location } from "@/helpers/types";

export const fetchLocationsThunk =
  (queryParams: Record<string, string> = {}) =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchLocationsRequest());
    try {
      const locations = await listLocations(queryParams);
      dispatch(fetchLocationsSuccess(locations));
      return locations;
    } catch (error: Error) {
      dispatch(fetchLocationsFailure(error.message));
      throw error;
    }
  };

export const createLocationThunk =
  (locationData: Location) => async (dispatch: AppDispatch) => {
    dispatch(createLocationRequest());
    try {
      const location = await createLocation(locationData);
      dispatch(createLocationSuccess(location));
      return location;
    } catch (error: Error) {
      dispatch(createLocationFailure(error.message));
      throw error;
    }
  };

export const retrieveLocationThunk = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const location = await retrieveLocation(id);
    dispatch(retrieveLocationSuccess(location));
    return location;
  } catch (error: Error) {
    dispatch(retrieveLocationFailure(error.message));
    throw error;
  }
};

export const updateLocationThunk =
  (id: string, locationData: Location) => async (dispatch: AppDispatch) => {
    dispatch(updateLocationRequest());
    try {
      const location = await updateLocation(id, locationData);
      dispatch(updateLocationSuccess(location));
      return location;
    } catch (error: Error) {
      dispatch(updateLocationFailure(error.message));
      throw error;
    }
  };

export const deleteLocationThunk = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await deleteLocation(id);
    dispatch(deleteLocationSuccess(id));
    return id;
  } catch (error: Error) {
    dispatch(deleteLocationFailure(error.message));
    throw error;
  }
};

import {
  createHerbarium,
  listHerbariums,
  retrieveHerbarium,
  updateHerbarium,
  deleteHerbarium,
} from "@/services/herbariumService";
import {
  fetchHerbariumsRequest,
  fetchHerbariumsSuccess,
  fetchHerbariumsFailure,
  createHerbariumSuccess,
  createHerbariumFailure,
  retrieveHerbariumSuccess,
  retrieveHerbariumFailure,
  updateHerbariumSuccess,
  updateHerbariumFailure,
  deleteHerbariumSuccess,
  deleteHerbariumFailure,
} from "../actions/herbariumActions";

import { Herbarium } from "@/helpers/types";

export const fetchHerbariumsThunk =
  (queryParams: Record<string, string> = {}) =>
  async (dispatch: AppDispatch) => {
    dispatch(fetchHerbariumsRequest());
    try {
      const herbariums = await listHerbariums(queryParams);
      dispatch(fetchHerbariumsSuccess(herbariums));
    } catch (error: Error) {
      dispatch(
        fetchHerbariumsFailure(error.message || "Failed to fetch herbariums."),
      );
    }
  };

export const createHerbariumThunk =
  (herbariumData: Herbarium) => async (dispatch: AppDispatch) => {
    try {
      const newHerbarium = await createHerbarium(herbariumData);
      dispatch(createHerbariumSuccess(newHerbarium));
    } catch (error: Error) {
      dispatch(
        createHerbariumFailure(error.message || "Failed to create herbarium."),
      );
    }
  };

export const retrieveHerbariumThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const herbarium = await retrieveHerbarium(id);
      dispatch(retrieveHerbariumSuccess(herbarium));
    } catch (error: Error) {
      dispatch(
        retrieveHerbariumFailure(
          error.message || "Failed to retrieve herbarium.",
        ),
      );
    }
  };

export const updateHerbariumThunk =
  (id: string, herbariumData: Partial<Herbarium>) =>
  async (dispatch: AppDispatch) => {
    try {
      const updatedHerbarium = await updateHerbarium(id, herbariumData);
      dispatch(updateHerbariumSuccess(updatedHerbarium));
    } catch (error: Error) {
      dispatch(
        updateHerbariumFailure(error.message || "Failed to update herbarium."),
      );
    }
  };

export const deleteHerbariumThunk =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      await deleteHerbarium(id);
      dispatch(deleteHerbariumSuccess(id));
    } catch (error: Error) {
      dispatch(
        deleteHerbariumFailure(error.message || "Failed to delete herbarium."),
      );
    }
  };

import {
  createSpecies,
  listSpecies,
  updateSpecies,
  deleteSpecies,
  retrieveSingleSpecies,
} from "@/services/speciesService.ts";
import {
  fetchSpeciesRequest,
  fetchSpeciesSuccess,
  fetchSpeciesFailure,
  createSpeciesRequest,
  createSpeciesSuccess,
  createSpeciesFailure,
  retrieveSpeciesSuccess,
  retrieveSpeciesFailure,
  updateSpeciesRequest,
  updateSpeciesSuccess,
  updateSpeciesFailure,
  deleteSpeciesSuccess,
  deleteSpeciesFailure,
  searchSpeciesRequest,
  searchSpeciesFailure,
  searchSpeciesSuccess,
} from "../actions/speciesActions";

import { Species } from "@/helpers/types";
import { searchReferences } from "@/services/referenceService";

import { Dispatch } from "redux";

export const fetchSpecies =
  (queryParams: Record<string, string> = {}) =>
  async (dispatch: Dispatch) => {
    dispatch(fetchSpeciesRequest());
    try {
      const species = await listSpecies(queryParams);
      dispatch(fetchSpeciesSuccess(species));
    } catch (error: unknown) {
      dispatch(
        fetchSpeciesFailure(
          (error as Error).message || "Failed to fetch species.",
        ),
      );
    }
  };

export const createSpeciesThunk =
  (
    speciesData: Species,
    addNotification: (
      message: string,
      type: "success" | "warning" | "error",
    ) => void,
  ) =>
  async (dispatch) => {
    dispatch(createSpeciesRequest());
    try {
      const response = await createSpecies(speciesData);
      dispatch(createSpeciesSuccess(response.data));
      addNotification("Species created successfully!", "success");
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      dispatch(
        createSpeciesFailure(error.message || "Failed to create species."),
      );
      addNotification(error.message || "Failed to create species.", "error");
    }
  };

export const retrieveSingleSpeciesThunk =
  (
    id: string,
    addNotification: (
      message: string,
      type: "success" | "warning" | "error",
    ) => void,
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const specie = await retrieveSingleSpecies(id);
      dispatch(retrieveSpeciesSuccess(specie));
    } catch (error) {
      console.log(error.response?.data || error.message);
      dispatch(retrieveSpeciesFailure("Failed to retrieve species."));
      addNotification("Failed to retrieve species.", "error");
    }
  };

export const updateSpeciesThunk =
  (
    id: string,
    speciesData: Species,
    addNotification: (
      message: string,
      type: "success" | "warning" | "error",
    ) => void,
  ) =>
  async (dispatch: Dispatch) => {
    dispatch(updateSpeciesRequest());
    try {
      const updatedSpecies = await updateSpecies(id, speciesData);
      dispatch(updateSpeciesSuccess(updatedSpecies));
      addNotification("Species updated successfully!", "success");
    } catch (error: any) {
      dispatch(
        updateSpeciesFailure(error.message || "Failed to update species."),
      );
      addNotification(error.message || "Failed to update species.", "error");
    }
  };

export const deleteSpeciesThunk =
  (
    id: string,
    addNotification: (
      message: string,
      type: "success" | "warning" | "error",
    ) => void,
  ) =>
  async (dispatch) => {
    try {
      await deleteSpecies(id);
      dispatch(deleteSpeciesSuccess(id));
      addNotification("Species deleted successfully!", "success");
    } catch (error: any) {
      dispatch(
        deleteSpeciesFailure(error.message || "Failed to delete species."),
      );
      addNotification(error.message || "Failed to delete species.", "error");
    }
  };

export const searchSpeciesByReference =
  (query: string) => async (dispatch: any) => {
    dispatch(searchSpeciesRequest());
    try {
      const searchSpecies = await searchReferences(query);
      dispatch(searchSpeciesSuccess(searchSpecies));
    } catch (error) {
      dispatch(searchSpeciesFailure("Failed to search species by reference."));
    }
  };

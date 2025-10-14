import {
  createCompound,
  listCompounds,
  retrieveCompound,
  updateCompound,
  deleteCompound,
} from "@/services/compoundService.ts";
import {
  fetchCompoundsRequest,
  fetchCompoundsSuccess,
  fetchCompoundsFailure,
  createCompoundRequest,
  createCompoundSuccess,
  createCompoundFailure,
  retrieveCompoundSuccess,
  retrieveCompoundFailure,
  updateCompoundRequest,
  updateCompoundSuccess,
  updateCompoundFailure,
  deleteCompoundSuccess,
  deleteCompoundFailure,
} from "../actions/compoundActions";
import { Compound } from "@/helpers/types";

export const fetchCompounds =
  (queryParams: Record<string, string> = {}) =>
  async (dispatch: any) => {
    dispatch(fetchCompoundsRequest());
    try {
      const compounds = await listCompounds(queryParams);
      dispatch(fetchCompoundsSuccess(compounds));
      return compounds;
    } catch (error) {
      dispatch(fetchCompoundsFailure("Failed to fetch compounds."));
      throw error;
    }
  };

export const createCompoundThunk =
  (
    compoundData: Compound,
    addNotification: (
      message: string,
      type: "success" | "warning" | "error",
    ) => void,
  ) =>
  async (dispatch: any) => {
    dispatch(createCompoundRequest());
    try {
      const newCompound = await createCompound(compoundData);
      dispatch(createCompoundSuccess(newCompound));
      addNotification("Compound created successfully", "success");
      return newCompound;
    } catch (error: any) {
      dispatch(createCompoundFailure(error.message));
      addNotification(error.message, "error");
      throw error;
    }
  };

export const retrieveCompoundThunk = (id: string) => async (dispatch: any) => {
  try {
    const compound = await retrieveCompound(id);
    dispatch(retrieveCompoundSuccess(compound));
    return compound;
  } catch (error: any) {
    dispatch(retrieveCompoundFailure(error.message));
    throw error;
  }
};

export const updateCompoundThunk =
  (
    id: string,
    compoundData: { compound_class?: string; smiles?: string },
    addNotification: (
      message: string,
      type: "success" | "warning" | "error",
    ) => void,
  ) =>
  async (dispatch: any) => {
    dispatch(updateCompoundRequest());
    try {
      const updatedCompound = await updateCompound(id, compoundData);
      dispatch(updateCompoundSuccess(updatedCompound));
      addNotification("Compound updated successfully", "success");
      return updatedCompound;
    } catch (error: any) {
      dispatch(updateCompoundFailure(error.message));
      addNotification(error.message, "error");
      throw error;
    }
  };

export const deleteCompoundThunk = (id: string) => async (dispatch: any) => {
  try {
    await deleteCompound(id);
    dispatch(deleteCompoundSuccess(id));
    return id;
  } catch (error) {
    dispatch(deleteCompoundFailure("Failed to delete compound."));
    throw error;
  }
};

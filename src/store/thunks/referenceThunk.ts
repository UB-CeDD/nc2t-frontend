import {
  listReferences,
  createReference,
  updateReference,
} from "@/services/referenceService.ts";
import {
  fetchReferencesRequest,
  fetchReferencesSuccess,
  fetchReferencesFailure,
  createReferenceRequest,
  createReferenceSuccess,
  createReferenceFailure,
  updateReferenceRequest,
  updateReferenceSuccess,
  updateReferenceFailure,
} from "../actions/referenceActions";
import { Reference } from "@/helpers/types";

export const fetchReferencesThunk = () => async (dispatch: any) => {
  dispatch(fetchReferencesRequest());
  try {
    const references = await listReferences();
    dispatch(fetchReferencesSuccess(references));
  } catch (error: any) {
    dispatch(
      fetchReferencesFailure(error.message || "Failed to fetch references."),
    );
  }
};

export const createReferenceThunk =
  (
    referenceData: Reference,
    addNotification: (
      message: string,
      type: "success" | "warning" | "error",
    ) => void,
  ) =>
  async (dispatch: any) => {
    dispatch(createReferenceRequest());
    try {
      const newReference = await createReference(referenceData);
      dispatch(createReferenceSuccess(newReference));
      addNotification("Reference created successfully", "success");
      return newReference;
    } catch (error: any) {
      dispatch(createReferenceFailure(error.message));
      addNotification(error.message, "error");
      throw error;
    }
  };

export const updateReferenceThunk =
  (
    id: string,
    referenceData: Partial<Reference>,
    addNotification: (
      message: string,
      type: "success" | "warning" | "error",
    ) => void,
  ) =>
  async (dispatch: any) => {
    dispatch(updateReferenceRequest());
    try {
      const updatedReference = await updateReference(id, referenceData);
      dispatch(updateReferenceSuccess(updatedReference));
      addNotification("Reference updated successfully", "success");
      return updatedReference;
    } catch (error: any) {
      dispatch(updateReferenceFailure(error.message));
      addNotification(error.message, "error");
      throw error;
    }
  };

import {
  addSpeciesUser,
  updateSpeciesUserRole,
  removeSpeciesUser,
  listSpeciesUsers,
} from "@/services/speciesUserRoleService";
import {
  fetchSpeciesUsersRequest,
  fetchSpeciesUsersSuccess,
  fetchSpeciesUsersFailure,
  addSpeciesUserSuccess,
  addSpeciesUserFailure,
  updateSpeciesUserRoleSuccess,
  updateSpeciesUserRoleFailure,
  removeSpeciesUserSuccess,
  removeSpeciesUserFailure,
} from "../actions/speciesUserRoleActions";

export const fetchSpeciesUsersThunk =
  (speciesId: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchSpeciesUsersRequest());
    try {
      const speciesUsers = await listSpeciesUsers(speciesId);
      dispatch(fetchSpeciesUsersSuccess(speciesUsers));
    } catch (error: Error) {
      dispatch(
        fetchSpeciesUsersFailure(
          error.message || "Failed to fetch species users.",
        ),
      );
    }
  };

export const addSpeciesUserThunk =
  (speciesId: string, userId: number, role: string) => async (dispatch: AppDispatch) => {
    try {
      const newSpeciesUser = await addSpeciesUser(speciesId, userId, role);
      dispatch(addSpeciesUserSuccess(newSpeciesUser));
    } catch (error: Error) {
      dispatch(
        addSpeciesUserFailure(
          error.message || "Failed to add user to species.",
        ),
      );
    }
  };

export const updateSpeciesUserRoleThunk =
  (speciesId: string, userId: number, role: string) => async (dispatch: AppDispatch) => {
    try {
      const updatedSpeciesUser = await updateSpeciesUserRole(
        speciesId,
        userId,
        role,
      );
      dispatch(updateSpeciesUserRoleSuccess(updatedSpeciesUser));
    } catch (error: Error) {
      dispatch(
        updateSpeciesUserRoleFailure(
          error.message || "Failed to update user role for species.",
        ),
      );
    }
  };

export const removeSpeciesUserThunk =
  (speciesId: string, userId: number) => async (dispatch: AppDispatch) => {
    try {
      await removeSpeciesUser(speciesId, userId);
      dispatch(removeSpeciesUserSuccess(userId));
    } catch (error: Error) {
      dispatch(
        removeSpeciesUserFailure(
          error.message || "Failed to remove user from species.",
        ),
      );
    }
  };

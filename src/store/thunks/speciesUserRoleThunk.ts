import {
    addSpeciesUser,
    updateSpeciesUserRole,
    removeSpeciesUser,
    listSpeciesUsers,
} from '@/services/speciesUserRoleService';
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
} from '../actions/speciesUserRoleActions';

export const fetchSpeciesUsersThunk = (speciesId: string) => async (dispatch: any) => {
    dispatch(fetchSpeciesUsersRequest());
    try {
        const speciesUsers = await listSpeciesUsers(speciesId);
        dispatch(fetchSpeciesUsersSuccess(speciesUsers));
    } catch (error: any) {
        dispatch(fetchSpeciesUsersFailure(error.message || 'Failed to fetch species users.'));
    }
};

export const addSpeciesUserThunk = (speciesId: string, userId: number, role: any) => async (dispatch: any) => {
    try {
        const newSpeciesUser = await addSpeciesUser(speciesId, userId, role);
        dispatch(addSpeciesUserSuccess(newSpeciesUser));
    } catch (error: any) {
        dispatch(addSpeciesUserFailure(error.message || 'Failed to add user to species.'));
    }
};

export const updateSpeciesUserRoleThunk = (speciesId: string, userId: number, role: any) => async (dispatch: any) => {
    try {
        const updatedSpeciesUser = await updateSpeciesUserRole(speciesId, userId, role);
        dispatch(updateSpeciesUserRoleSuccess(updatedSpeciesUser));
    } catch (error: any) {
        dispatch(updateSpeciesUserRoleFailure(error.message || 'Failed to update user role for species.'));
    }
};

export const removeSpeciesUserThunk = (speciesId: string, userId: number) => async (dispatch: any) => {
    try {
        await removeSpeciesUser(speciesId, userId);
        dispatch(removeSpeciesUserSuccess(userId));
    } catch (error: any) {
        dispatch(removeSpeciesUserFailure(error.message || 'Failed to remove user from species.'));
    }
};

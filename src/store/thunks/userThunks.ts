import {
    addUser,
    editUser,
    listUsers,
    getUserDetails,
    deleteUser,
} from '@/services/userService';
import {
    listUsersRequestAction,
    listUsersSuccessAction,
    listUsersFailureAction,
    createUserRequestAction,
    createUserSuccessAction,
    createUserFailureAction,
    updateUserRequestAction,
    updateUserSuccessAction,
    updateUserFailureAction,
    viewUserAction,
    deleteUserAction,
} from '../actions/userActions';
import { UserModel } from '@/helpers/types';
import { AppDispatch } from '../../store/store'; // Import AppDispatch

export const createUserThunk = (userData: UserModel) => async (dispatch: AppDispatch) => {

    dispatch(createUserRequestAction());
    try {
        const user: UserModel = await addUser(userData);
        dispatch(createUserSuccessAction(user));
    } catch (error: any) {
        dispatch(createUserFailureAction(error.message));
        console.error('Failed to add user:', error);
    }
};

export const updateUserThunk = (id: string, userData: Partial<UserModel>) => async (dispatch: AppDispatch) => {
    dispatch(updateUserRequestAction());
    try {
        const user = await editUser(id, userData);
        dispatch(updateUserSuccessAction(user));
    } catch (error: any) {
        dispatch(updateUserFailureAction(error.message));
        console.error('Failed to edit user:', error);
    }
};

export const fetchUsersThunk = (filters: Record<string, string> = {}) => async (dispatch: AppDispatch) => {
    dispatch(listUsersRequestAction());
    try {
        const users = await listUsers(filters);
        dispatch(listUsersSuccessAction(users));
    } catch (error: any) {
        dispatch(listUsersFailureAction(error.message));
        console.error('Failed to list users:', error);
    }
};

export const fetchUserThunk = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const user = await getUserDetails(id);
        dispatch(viewUserAction(user));
    } catch (error: any) {
        console.error('Failed to view user:', error);
    }
};

export const deleteUserThunk = (id: string) => async (dispatch: AppDispatch) => {
    try {
        await deleteUser(id);
        dispatch(deleteUserAction(id));
    } catch (error: any) {
        console.error('Failed to delete user:', error);
    }
};
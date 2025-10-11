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

export const createUserThunk = (userData) => async (dispatch) => {

    dispatch(createUserRequestAction());
    try {
        const user: UserModel = await addUser(userData);
        dispatch(createUserSuccessAction(user));
    } catch (error) {
        dispatch(createUserFailureAction(error.message));
        console.error('Failed to add user:', error);
    }
};

export const updateUserThunk = (id, userData) => async (dispatch) => {
    dispatch(updateUserRequestAction());
    try {
        const user = await editUser(id, userData);
        dispatch(updateUserSuccessAction(user));
    } catch (error) {
        dispatch(updateUserFailureAction(error.message));
        console.error('Failed to edit user:', error);
    }
};

export const fetchUsersThunk = (filters) => async (dispatch) => {
    dispatch(listUsersRequestAction());
    try {
        const users = await listUsers(filters);
        dispatch(listUsersSuccessAction(users));
    } catch (error) {
        dispatch(listUsersFailureAction(error.message));
        console.error('Failed to list users:', error);
    }
};

export const fetchUserThunk = (id) => async (dispatch) => {
    try {
        const user = await getUserDetails(id);
        dispatch(viewUserAction(user));
    } catch (error) {
        console.error('Failed to view user:', error);
    }
};

export const deleteUserThunk = (id) => async (dispatch) => {
    try {
        await deleteUser(id);
        dispatch(deleteUserAction(id));
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
};
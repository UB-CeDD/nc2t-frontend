import {
    addUser,
    editUser,
    listUsers,
    getUserDetails,
    deleteUser,
} from '@/services/userService';
import {
    addUserAction,
    editUserAction,
    listUsersAction,
    viewUserAction,
    deleteUserAction,
} from '../actions/userActions';

export const createUserThunk = (userData) => async (dispatch) => {
    try {
        const user = await addUser(userData);
        dispatch(addUserAction(user));
    } catch (error) {
        console.error('Failed to add user:', error);
    }
};

export const updateUserThunk = (id, userData) => async (dispatch) => {
    try {
        const user = await editUser(id, userData);
        dispatch(editUserAction(user));
    } catch (error) {
        console.error('Failed to edit user:', error);
    }
};

export const fetchUsersThunk = (filters) => async (dispatch) => {
    try {
        const users = await listUsers(filters);
        dispatch(listUsersAction(users));
    } catch (error) {
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
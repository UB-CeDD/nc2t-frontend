export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const LIST_USERS = 'LIST_USERS';
export const VIEW_USER = 'VIEW_USER';
export const DELETE_USER = 'DELETE_USER';
export const FILTER_USERS = 'FILTER_USERS';

export const addUserAction = (user) => ({
    type: ADD_USER,
    payload: user,
});

export const editUserAction = (user) => ({
    type: EDIT_USER,
    payload: user,
});

export const listUsersAction = (users) => ({
    type: LIST_USERS,
    payload: users,
});

export const viewUserAction = (user) => ({
    type: VIEW_USER,
    payload: user,
});

export const deleteUserAction = (id) => ({
    type: DELETE_USER,
    payload: id,
});

export const filterUsersAction = (filters) => ({
    type: FILTER_USERS,
    payload: filters,
});
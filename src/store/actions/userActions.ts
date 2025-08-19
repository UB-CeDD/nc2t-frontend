import { UserModel } from "@/helpers/types.ts";

export const ADD_USER = 'ADD_USER';
export const EDIT_USER = 'EDIT_USER';
export const LIST_USERS = 'LIST_USERS';
export const VIEW_USER = 'VIEW_USER';
export const DELETE_USER = 'DELETE_USER';
export const FILTER_USERS = 'FILTER_USERS';

export const addUserAction = (user: UserModel) => ({
    type: ADD_USER,
    payload: user,
});

export const editUserAction = (user: UserModel) => ({
    type: EDIT_USER,
    payload: user,
});

export const listUsersAction = (users: UserModel[]) => ({
    type: LIST_USERS,
    payload: users,
});

export const viewUserAction = (user: UserModel) => ({
    type: VIEW_USER,
    payload: user,
});

export const deleteUserAction = (id: string) => ({
    type: DELETE_USER,
    payload: id,
});

export const filterUsersAction = (filters: any) => ({
    type: FILTER_USERS,
    payload: filters,
});
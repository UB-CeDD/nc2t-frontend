import { UserModel } from "@/helpers/types.ts";

export const LIST_USERS_REQUEST = "LIST_USERS_REQUEST";
export const LIST_USERS_SUCCESS = "LIST_USERS_SUCCESS";
export const LIST_USERS_FAILURE = "LIST_USERS_FAILURE";
export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const VIEW_USER = "VIEW_USER";
export const DELETE_USER = "DELETE_USER";
export const FILTER_USERS = "FILTER_USERS";

export const listUsersRequestAction = () => ({
  type: LIST_USERS_REQUEST,
});

export const listUsersSuccessAction = (users: UserModel[]) => ({
  type: LIST_USERS_SUCCESS,
  payload: users,
});

export const listUsersFailureAction = (error: string) => ({
  type: LIST_USERS_FAILURE,
  payload: error,
});

export const createUserRequestAction = () => ({
  type: CREATE_USER_REQUEST,
});

export const createUserSuccessAction = (user: UserModel) => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
});

export const createUserFailureAction = (error: string) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});

export const updateUserRequestAction = () => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccessAction = (user: UserModel) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailureAction = (error: string) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const viewUserAction = (user: UserModel) => ({
  type: VIEW_USER,
  payload: user,
});

export const deleteUserAction = (id: string) => ({
  type: DELETE_USER,
  payload: id,
});

export const filterUsersAction = (filters: UserFilters) => ({
  type: FILTER_USERS,
  payload: filters,
});

interface UserFilters {
    username?: string;
    email?: string;
    role?: string;
}

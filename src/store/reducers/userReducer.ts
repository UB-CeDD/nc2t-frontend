import { UserModel } from "@/helpers/types.ts";
import {
  LIST_USERS_REQUEST,
  LIST_USERS_SUCCESS,
  LIST_USERS_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  VIEW_USER,
  DELETE_USER,
  FILTER_USERS,
  UserFilters,
} from "../actions/userActions";

const initialState = {
  users: [],
  userDetails: null,
  filters: {},
  loading: false,
  error: null,
};

interface Action {
  type: string;
  payload?: UserModel[] | UserModel | string | UserFilters;
}

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LIST_USERS_REQUEST:
    case CREATE_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case LIST_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, error: null };
    case LIST_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
        error: null,
      };
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user,
        ),
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case VIEW_USER:
      return { ...state, userDetails: action.payload, error: null };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        error: null,
      };
    case FILTER_USERS:
      return { ...state, filters: action.payload, error: null };
    default:
      return state;
  }
};

export default userReducer;

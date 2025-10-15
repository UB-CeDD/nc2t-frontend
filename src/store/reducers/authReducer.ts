import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
} from "../actions/authActions";

const initialState = {
  isAuthenticated: !!localStorage.getItem("access_token"), // Check if token exists
  user: JSON.parse(localStorage.getItem("current_user") || "null"),
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("current_user", JSON.stringify(action.payload.user));
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("access_token", action.payload.accessToken);
      localStorage.setItem("refresh_token", action.payload.refreshToken);
      console.log(
        "LOGIN_SUCCESS: isAuthenticated set to true in localStorage and state.",
      );
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      localStorage.removeItem("current_user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isAuthenticated");
      console.log(
        "LOGIN_FAILURE: isAuthenticated set to false in localStorage and state.",
      );
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        loading: false,
        error: action.type === LOGIN_FAILURE ? action.payload : null,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("current_user");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("isAuthenticated");
      console.log(
        "LOGOUT_SUCCESS: isAuthenticated set to false in localStorage and state.",
      );
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        error: action.type === LOGIN_FAILURE ? action.payload : null,
      };
    default:
      return state;
  }
};

export default authReducer;

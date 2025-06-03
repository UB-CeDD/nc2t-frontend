import {LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS} from '../actions/authActions';

const initialState = {
    isAuthenticated: !!localStorage.getItem('access_token'), // Check if token exists
    user: JSON.parse(localStorage.getItem('current_user') || 'null'),
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('current_user', JSON.stringify(action.payload.user));
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('access_token', action.payload.accessToken);
            localStorage.setItem('refresh_token', action.payload.refreshToken);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                error: null,
            };
        case LOGIN_FAILURE:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('current_user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
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
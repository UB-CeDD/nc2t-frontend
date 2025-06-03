export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginSuccess = (response) => ({
    type: LOGIN_SUCCESS,
    payload: { user: response.user, accessToken: response.access, refreshToken: response.refresh},
});

export const loginFailure = (error: string) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});
import { loginRequest, loginSuccess, loginFailure, logoutSuccess } from '../actions/authActions';
import * as authService from '../../services/authService';
import { AppDispatch } from '../../store/store'; // Import AppDispatch
import { unsetLoading } from '../actions/loadingActions'; // Import unsetLoading

export const login = (username: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(loginRequest());
        try {
            const response = await authService.login(username, password);
            if (response.status === 200) {
                dispatch(loginSuccess(response)); // Pass user data
            } else {
                const errorMessage = 'Login failed. Invalid status received.';
                dispatch(unsetLoading());
                dispatch(loginFailure(errorMessage));
            }
        } catch (error: any) { // Catch the error to get the message
            const errorMessage = error.message || 'An error occurred during login';
            dispatch(unsetLoading());
            dispatch(loginFailure(errorMessage));
        }
    };
};

export const validateToken = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const user = JSON.parse(localStorage.getItem('current_user') || 'null');
            if (refreshToken && user) {
                const response = await authService.validateRefreshToken(refreshToken);
                if (response.status === 200) {
                    dispatch(loginSuccess({ user, access: response.access, refresh: refreshToken }));
                }
            }
        } catch (error) {
            console.error(error);
            dispatch(logoutSuccess());
        }
    };
};

export const logout = () => {
    return async (dispatch: AppDispatch) => {
        try {
            await authService.logout();
            dispatch(logoutSuccess());
        } catch {
            dispatch(loginFailure('An error occurred during logout'));
        }
    };
};
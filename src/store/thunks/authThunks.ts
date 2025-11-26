import { loginRequest, loginSuccess, loginFailure, logoutSuccess } from '../actions/authActions';
import * as authService from '../../services/authService';
import { AppDispatch } from '../../store/store'; // Import AppDispatch

export const login = (username: string, password: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(loginRequest());
        try {
            const response = await authService.login(username, password);
            if (response.status === 200) {
                dispatch(loginSuccess(response)); // Pass user data
            } else {
                dispatch(loginFailure('Invalid username or password'));
            }
        } catch {
            dispatch(loginFailure('An error occurred during login'));
        }
    };
};

export const validateToken = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                const response = await authService.validateRefreshToken(refreshToken);
                if (response.status === 200) {
                    const user = JSON.parse(localStorage.getItem('current_user') || 'null');
                    dispatch(loginSuccess(user));
                }
            }
        } catch (error) {
            console.error(error);
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
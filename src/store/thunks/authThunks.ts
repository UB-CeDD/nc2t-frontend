import { loginRequest, loginSuccess, loginFailure, logoutSuccess } from '../actions/authActions';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as authService from '../../services/authService';
import { RootState } from '../store';

export const login = (username: string, password: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
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

export const validateToken = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                const response = await authService.validateRefreshToken(refreshToken);
                if (response.status === 200) {
                    const user = JSON.parse(localStorage.getItem('current_user') || 'null');
                    dispatch(loginSuccess(user));
                } else {
                    dispatch(loginFailure('Session expired. Please log in again.'));
                }
            }
        } catch {
            dispatch(loginFailure('An error occurred during token validation'));
        }
    };
};
export const logout = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        try {
            await authService.logout();
            dispatch(logoutSuccess());
        } catch {
            dispatch(loginFailure('An error occurred during logout'));
        }
    };
};
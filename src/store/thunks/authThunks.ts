import { loginSuccess, loginFailure, logoutSuccess } from '../actions/authActions';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as authService from '../../services/authService';

export const login = (username: string, password: string): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch) => {
        try {
            const response = await authService.login(username, password);
            if (response.status === 200) {
                console.log(response)
                dispatch(loginSuccess(response)); // Pass user data
            } else {
                dispatch(loginFailure('Invalid username or password'));
            }
        } catch (error) {
            dispatch(loginFailure('An error occurred during login'));
        }
    };
};

export const validateToken = (): ThunkAction<void, {}, {}, AnyAction> => {
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
        } catch (error) {
            dispatch(loginFailure('An error occurred during token validation'));
        }
    };
};
export const logout = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch) => {
        try {
            await authService.logout();
            dispatch(logoutSuccess());
        } catch (error) {
            dispatch(loginFailure('An error occurred during logout'));
        }
    };
};
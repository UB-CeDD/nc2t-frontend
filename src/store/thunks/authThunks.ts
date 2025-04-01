import { loginSuccess, loginFailure, logoutSuccess } from '../actions/authActions';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as authService from '../../services/authService';

export const login = (email: string, password: string): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch) => {
        try {
            const response = await authService.login(email, password);
            if (response.status === 200) {
                dispatch(loginSuccess());
            } else {
                dispatch(loginFailure('Invalid email or password'));
            }
        } catch (error) {
            dispatch(loginFailure('An error occurred during login'));
        }
    };
};

export const logout = (): ThunkAction<void, {}, {}, AnyAction> => {
    return async (dispatch) => {
        try {
            await authService.logout();
            dispatch(logoutSuccess());
        } catch (error) {
            // Handle logout error if needed
            dispatch(loginFailure('An error occurred during logout'));
            await authService.logout();
        }
    };
};
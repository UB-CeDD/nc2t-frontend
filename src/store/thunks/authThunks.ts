// ncct_backend/store/thunks/authThunks.ts
import { loginSuccess, logoutSuccess } from '../actions/authActions';

export const login = (email: string, password: string) => {
    return (dispatch: any) => {
        // Mock authentication
        if (email === 'admin@example.com' && password === 'password') {
            dispatch(loginSuccess());
        } else {
            // Handle login failure
        }
    };
};

export const logout = () => {
    return (dispatch: any) => {
        dispatch(logoutSuccess());
    };
};
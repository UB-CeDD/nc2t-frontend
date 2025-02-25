// ncct_backend/store/reducers/authReducer.ts
import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/authActions';

const initialState = {
    isAuthenticated: false,
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer;
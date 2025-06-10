import {
    ADD_USER,
    EDIT_USER,
    LIST_USERS,
    VIEW_USER,
    DELETE_USER,
    FILTER_USERS,
} from '../actions/userActions';

const initialState = {
    users: [],
    userDetails: null,
    filters: {},
    error: null,
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LIST_USERS:
            return { ...state, users: action.payload, error: null };
        case ADD_USER:
            return { ...state, users: [...state.users, action.payload], error: null };
        case EDIT_USER:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id === action.payload.id ? action.payload : user
                ),
                error: null,
            };
        case VIEW_USER:
            return { ...state, userDetails: action.payload, error: null };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
                error: null,
            };
        case FILTER_USERS:
            return { ...state, filters: action.payload, error: null };
        default:
            return state;
    }
};

export default userReducer;
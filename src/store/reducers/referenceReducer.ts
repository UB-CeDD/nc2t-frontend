import {
    FETCH_REFERENCES_SUCCESS,
    FETCH_REFERENCES_FAILURE,
    CREATE_REFERENCE_SUCCESS,
    CREATE_REFERENCE_FAILURE,
    RETRIEVE_REFERENCE_SUCCESS,
    RETRIEVE_REFERENCE_FAILURE,
    UPDATE_REFERENCE_SUCCESS,
    UPDATE_REFERENCE_FAILURE,
    DELETE_REFERENCE_SUCCESS,
    DELETE_REFERENCE_FAILURE,
} from '../actions/referenceActions';

const initialState = {
    references: [],
    error: null,
};

const referenceReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_REFERENCES_SUCCESS:
            return { ...state, references: action.payload, error: null };
        case FETCH_REFERENCES_FAILURE:
            return { ...state, error: action.payload };
        case CREATE_REFERENCE_SUCCESS:
            return { ...state, references: [...state.references, action.payload], error: null };
        case CREATE_REFERENCE_FAILURE:
            return { ...state, error: action.payload };
        case RETRIEVE_REFERENCE_SUCCESS:
            return { ...state, error: null }; // Handle as needed
        case RETRIEVE_REFERENCE_FAILURE:
            return { ...state, error: action.payload };
        case UPDATE_REFERENCE_SUCCESS:
            return {
                ...state,
                references: state.references.map((reference) =>
                    reference.id === action.payload.id ? action.payload : reference
                ),
                error: null,
            };
        case UPDATE_REFERENCE_FAILURE:
            return { ...state, error: action.payload };
        case DELETE_REFERENCE_SUCCESS:
            return {
                ...state,
                references: state.references.filter((reference) => reference.id !== action.payload),
                error: null,
            };
        case DELETE_REFERENCE_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default referenceReducer;
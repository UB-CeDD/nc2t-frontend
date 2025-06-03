import {
    FETCH_COMPOUNDS_SUCCESS,
    FETCH_COMPOUNDS_FAILURE,
    CREATE_COMPOUND_SUCCESS,
    CREATE_COMPOUND_FAILURE,
    RETRIEVE_COMPOUND_SUCCESS,
    RETRIEVE_COMPOUND_FAILURE,
    UPDATE_COMPOUND_SUCCESS,
    UPDATE_COMPOUND_FAILURE,
    DELETE_COMPOUND_SUCCESS,
    DELETE_COMPOUND_FAILURE,
} from '../actions/compoundActions';

const initialState = {
    compounds: [],
    error: null,
};

const compoundReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_COMPOUNDS_SUCCESS:
            console.log('Reducer received compounds:', action.payload);
            return {...state, compounds: action.payload, error: null};
        case FETCH_COMPOUNDS_FAILURE:
            return {...state, error: action.payload};
        case CREATE_COMPOUND_SUCCESS:
            return {...state, compounds: [...state.compounds, action.payload], error: null};
        case CREATE_COMPOUND_FAILURE:
            return {...state, error: action.payload};
        case RETRIEVE_COMPOUND_SUCCESS:
            return {...state, error: null}; // Handle as needed
        case RETRIEVE_COMPOUND_FAILURE:
            return {...state, error: action.payload};
        case UPDATE_COMPOUND_SUCCESS:
            return {
                ...state,
                compounds: state.compounds.map((compound) =>
                    compound.id === action.payload.id ? action.payload : compound
                ),
                error: null,
            };
        case UPDATE_COMPOUND_FAILURE:
            return {...state, error: action.payload};
        case DELETE_COMPOUND_SUCCESS:
            return {
                ...state,
                compounds: state.compounds.filter((compound) => compound.id !== action.payload),
                error: null,
            };
        case DELETE_COMPOUND_FAILURE:
            return {...state, error: action.payload};
        default:
            return state;
    }
};

export default compoundReducer;
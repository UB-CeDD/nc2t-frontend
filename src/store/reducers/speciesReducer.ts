import { Specie } from "@/helpers/types.ts";
import {
    FETCH_SPECIES_REQUEST,
    FETCH_SPECIES_SUCCESS,
    FETCH_SPECIES_FAILURE,
    CREATE_SPECIES_SUCCESS,
    CREATE_SPECIES_FAILURE,
    RETRIEVE_SPECIES_SUCCESS,
    RETRIEVE_SPECIES_FAILURE,
    UPDATE_SPECIES_SUCCESS,
    UPDATE_SPECIES_FAILURE,
    DELETE_SPECIES_SUCCESS,
    DELETE_SPECIES_FAILURE,
    SEARCH_SPECIES_SUCCESS,
    SEARCH_SPECIES_FAILURE,
} from '../actions/speciesActions';

const initialState = {
    species: [],
    searchResults: [],
    loading: false,
    error: null,
};

interface Action {
    type: string;
    payload?: Specie[] | Specie | string;
}

const speciesReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case FETCH_SPECIES_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_SPECIES_SUCCESS:
            return {...state, loading: false, species: Array.isArray(action.payload) ? action.payload : [], error: null};
        case FETCH_SPECIES_FAILURE:
            return {...state, loading: false, error: action.payload};
        case CREATE_SPECIES_SUCCESS:
            return {...state, species: [...state.species, action.payload], error: null};
        case CREATE_SPECIES_FAILURE:
            return {...state, error: action.payload};
        case RETRIEVE_SPECIES_SUCCESS:
            return {...state, error: null}; // Handle as needed
        case RETRIEVE_SPECIES_FAILURE:
            return {...state, error: action.payload};
        case UPDATE_SPECIES_SUCCESS:
            return {
                ...state,
                species: state.species.map((specie) =>
                    specie.id === action.payload.id ? action.payload : specie
                ),
                error: null,
            };
        case UPDATE_SPECIES_FAILURE:
            return {...state, error: action.payload};
        case DELETE_SPECIES_SUCCESS:
            return {
                ...state,
                species: state.species.filter((specie) => specie.id !== action.payload),
                error: null,
            };
        case DELETE_SPECIES_FAILURE:
            return {...state, error: action.payload};
        case SEARCH_SPECIES_SUCCESS:
            return { ...state, searchResults: action.payload, error: null };
        case SEARCH_SPECIES_FAILURE:
            return { ...state, searchResults: null, error: action.payload };
        default:
            return state;
    }
};

export default speciesReducer;
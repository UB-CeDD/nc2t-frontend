import { Species } from "@/helpers/types.ts";
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
    species: [] as Species[],
    specie: null as Species | null,
    searchResults: null,
    loading: false,
    error: null,
};

interface Action {
    type: string;
    payload?: unknown;
}

const speciesReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case FETCH_SPECIES_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_SPECIES_SUCCESS:
            return {...state, loading: false, species: action.payload, error: null};
        case FETCH_SPECIES_FAILURE:
            return {...state, loading: false, error: action.payload as string};
        case CREATE_SPECIES_SUCCESS:
            return {...state, species: [...state.species, action.payload], error: null};
        case CREATE_SPECIES_FAILURE:
            return {...state, error: action.payload as string};
        case RETRIEVE_SPECIES_SUCCESS:
            return {...state, species: action.payload, error: null};
        case RETRIEVE_SPECIES_FAILURE:
            return {...state, error: action.payload as string};
        case UPDATE_SPECIES_SUCCESS:
            if (action.payload && typeof action.payload === 'object' && 'id' in action.payload) {
                return {
                    ...state,
                    species: state.species.map((specie) =>
                        specie.id === action.payload.id ? action.payload : specie
                    ),
                    error: null,
                };
            }
            return state;
        case UPDATE_SPECIES_FAILURE:
            return {...state, error: action.payload as string};
        case DELETE_SPECIES_SUCCESS:
            return {
                ...state,
                species: state.species.filter((specie) => specie.id !== action.payload),
                error: null,
            };
        case DELETE_SPECIES_FAILURE:
            return {...state, error: action.payload as string};
        case SEARCH_SPECIES_SUCCESS:
            return { ...state, searchResults: action.payload, error: null };
        case SEARCH_SPECIES_FAILURE:
            return { ...state, searchResults: null, error: action.payload as string };
        default:
            return state;
    }
};

export default speciesReducer;
import { Location } from "@/helpers/types.ts";
import {
    FETCH_LOCATIONS_REQUEST,
    FETCH_LOCATIONS_SUCCESS,
    FETCH_LOCATIONS_FAILURE,
    CREATE_LOCATION_REQUEST,
    CREATE_LOCATION_SUCCESS,
    CREATE_LOCATION_FAILURE,
    RETRIEVE_LOCATION_SUCCESS,
    RETRIEVE_LOCATION_FAILURE,
    UPDATE_LOCATION_REQUEST,
    UPDATE_LOCATION_SUCCESS,
    UPDATE_LOCATION_FAILURE,
    DELETE_LOCATION_SUCCESS,
    DELETE_LOCATION_FAILURE,
} from '../actions/locationActions';

const initialState = {
    locations: [],
    loading: false,
    error: null,
};

interface Action {
    type: string;
    payload?: Location[] | Location | string;
}

const locationReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case FETCH_LOCATIONS_REQUEST:
        case CREATE_LOCATION_REQUEST:
        case UPDATE_LOCATION_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_LOCATIONS_SUCCESS:
            return { ...state, loading: false, locations: action.payload, error: null };
        case FETCH_LOCATIONS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case CREATE_LOCATION_SUCCESS:
            return { ...state, loading: false, locations: [...state.locations, action.payload], error: null };
        case CREATE_LOCATION_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case RETRIEVE_LOCATION_SUCCESS:
            return { ...state, error: null }; // Handle as needed
        case RETRIEVE_LOCATION_FAILURE:
            return { ...state, error: action.payload };
        case UPDATE_LOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                locations: state.locations.map((location) =>
                    location.id === action.payload.id ? action.payload : location
                ),
                error: null,
            };
        case UPDATE_LOCATION_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case DELETE_LOCATION_SUCCESS:
            return {
                ...state,
                locations: state.locations.filter((location) => location.id !== action.payload),
                error: null,
            };
        case DELETE_LOCATION_FAILURE:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default locationReducer;
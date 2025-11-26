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
  SET_LOCATION_COUNT, // Import new action type
} from "../actions/locationActions";

const initialState = {
  locations: [] as Location[],
  loading: false,
  error: null,
  totalLocationCount: 0, // New state property for total location count
};

interface Action {
  type: string;
  payload?: Location[] | Location | string | number;
}

const locationReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_LOCATIONS_REQUEST:
    case CREATE_LOCATION_REQUEST:
    case UPDATE_LOCATION_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: action.payload as Location[],
        error: null,
      };
    case FETCH_LOCATIONS_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case CREATE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: [...state.locations, action.payload as Location],
        error: null,
        totalLocationCount: state.totalLocationCount + 1, // Increment count on successful creation
      };
    case CREATE_LOCATION_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case RETRIEVE_LOCATION_SUCCESS:
      return { ...state, error: null }; // Handle as needed
    case RETRIEVE_LOCATION_FAILURE:
      return { ...state, error: action.payload as string };
    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        locations: state.locations.map((location) =>
          location.id === (action.payload as Location).id
            ? (action.payload as Location)
            : location,
        ),
        error: null,
      };
    case UPDATE_LOCATION_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location.id !== action.payload,
        ),
        error: null,
        totalLocationCount: state.totalLocationCount - 1, // Decrement count on successful deletion
      };
    case DELETE_LOCATION_FAILURE:
      return { ...state, error: action.payload as string };
    case SET_LOCATION_COUNT: // Handle new action to set total count
      return { ...state, totalLocationCount: action.payload as number };
    default:
      return state;
  }
};

export default locationReducer;

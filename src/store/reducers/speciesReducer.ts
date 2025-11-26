import { Species } from "@/helpers/types.ts";
import {
  FETCH_SPECIES_REQUEST,
  FETCH_SPECIES_SUCCESS,
  FETCH_SPECIES_FAILURE,
  CREATE_SPECIES_REQUEST,
  CREATE_SPECIES_SUCCESS,
  CREATE_SPECIES_FAILURE,
  RETRIEVE_SPECIES_SUCCESS,
  RETRIEVE_SPECIES_FAILURE,
  UPDATE_SPECIES_REQUEST,
  UPDATE_SPECIES_SUCCESS,
  UPDATE_SPECIES_FAILURE,
  DELETE_SPECIES_SUCCESS,
  DELETE_SPECIES_FAILURE,
  SEARCH_SPECIES_REQUEST,
  SEARCH_SPECIES_SUCCESS,
  SEARCH_SPECIES_FAILURE,
  SET_SPECIES_FOR_EDIT,
  CLEAR_CURRENT_SPECIES,
  SET_SPECIES_COUNT, // Import new action type
} from "../actions/speciesActions";

const initialState = {
  species: [] as Species[],
  currentSpecies: null as Species | null, // New state property for single species
  searchResults: null,
  loading: false,
  error: null,
  totalSpeciesCount: 0, // New state property for total species count
};

interface Action {
  type: string;
  payload?: unknown;
}

const speciesReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_SPECIES_REQUEST:
    case CREATE_SPECIES_REQUEST:
    case UPDATE_SPECIES_REQUEST:
      return { ...state, loading: true, error: null };
    case SEARCH_SPECIES_REQUEST:
      return { ...state, loading: true, searchResults: null, error: null };
    case FETCH_SPECIES_SUCCESS:
      return { ...state, loading: false, species: action.payload, error: null };
    case FETCH_SPECIES_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case CREATE_SPECIES_SUCCESS:
      return {
        ...state,
        loading: false,
        species: [...state.species, action.payload],
        error: null,
        totalSpeciesCount: state.totalSpeciesCount + 1, // Increment count on successful creation
      };
    case CREATE_SPECIES_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case RETRIEVE_SPECIES_SUCCESS:
      return {
        ...state,
        currentSpecies: action.payload as Species,
        error: null,
      }; // Update currentSpecies
    case RETRIEVE_SPECIES_FAILURE:
      return { ...state, error: action.payload as string };
    case UPDATE_SPECIES_SUCCESS:
      if (
        action.payload &&
        typeof action.payload === "object" &&
        "id" in action.payload
      ) {
        return {
          ...state,
          loading: false,
          species: state.species.map((specie) =>
            specie.id === (action.payload as Species).id
              ? (action.payload as Species)
              : specie,
          ),
          error: null,
        };
      }
      return state;
    case DELETE_SPECIES_SUCCESS:
      return {
        ...state,
        species: state.species.filter((specie) => specie.id !== action.payload),
        error: null,
        totalSpeciesCount: state.totalSpeciesCount - 1, // Decrement count on successful deletion
      };
    case DELETE_SPECIES_FAILURE:
      return { ...state, error: action.payload as string };
    case SEARCH_SPECIES_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
        error: null,
      };
    case SEARCH_SPECIES_FAILURE:
      return {
        ...state,
        loading: false,
        searchResults: null,
        error: action.payload as string,
      };
    case SET_SPECIES_FOR_EDIT:
      return {
        ...state,
        currentSpecies: action.payload as Species,
        error: null,
      };
    case CLEAR_CURRENT_SPECIES:
      return { ...state, currentSpecies: null };
    case SET_SPECIES_COUNT: // Handle new action to set total count
      return { ...state, totalSpeciesCount: action.payload as number };
    default:
      return state;
  }
};

export default speciesReducer;

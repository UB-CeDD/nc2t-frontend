import { Reference } from "@/helpers/types.ts";
import {
  FETCH_REFERENCES_REQUEST,
  FETCH_REFERENCES_SUCCESS,
  FETCH_REFERENCES_FAILURE,
  CREATE_REFERENCE_REQUEST,
  CREATE_REFERENCE_SUCCESS,
  CREATE_REFERENCE_FAILURE,
  RETRIEVE_REFERENCE_SUCCESS,
  RETRIEVE_REFERENCE_FAILURE,
  UPDATE_REFERENCE_REQUEST,
  UPDATE_REFERENCE_SUCCESS,
  UPDATE_REFERENCE_FAILURE,
  DELETE_REFERENCE_SUCCESS,
  DELETE_REFERENCE_FAILURE,
} from "../actions/referenceActions";

const initialState = {
  references: [],
  searchResults: [],
  loading: false,
  error: null,
};

interface Action {
  type: string;
  payload?: Reference[] | Reference | string;
}

const referenceReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_REFERENCES_REQUEST:
    case CREATE_REFERENCE_REQUEST:
    case UPDATE_REFERENCE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_REFERENCES_SUCCESS:
      return {
        ...state,
        loading: false,
        references: action.payload,
        error: null,
      };
    case FETCH_REFERENCES_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case CREATE_REFERENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        references: [...state.references, action.payload],
        error: null,
      };
    case CREATE_REFERENCE_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case RETRIEVE_REFERENCE_SUCCESS:
      return { ...state, error: null }; // Handle as needed
    case RETRIEVE_REFERENCE_FAILURE:
      return { ...state, error: action.payload as string }; // Handle as needed
    case UPDATE_REFERENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        references: state.references.map((reference) =>
          reference.id === action.payload.id ? action.payload : reference,
        ),
        error: null,
      };
    case UPDATE_REFERENCE_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case DELETE_REFERENCE_SUCCESS:
      return {
        ...state,
        references: state.references.filter(
          (reference) => reference.id !== action.payload,
        ),
        error: null,
      };
    case DELETE_REFERENCE_FAILURE:
      return { ...state, error: action.payload as string };
    default:
      return state;
  }
};

export default referenceReducer;

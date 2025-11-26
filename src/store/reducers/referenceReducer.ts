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
  SET_REFERENCE_COUNT, // Import new action type
} from "../actions/referenceActions";

const initialState = {
  references: [] as Reference[],
  searchResults: [],
  loading: false,
  error: null,
  totalReferenceCount: 0, // New state property for total reference count
};

interface Action {
  type: string;
  payload?: Reference[] | Reference | string | number;
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
        references: action.payload as Reference[],
        error: null,
      };
    case FETCH_REFERENCES_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case CREATE_REFERENCE_SUCCESS:
      return {
        ...state,
        loading: false,
        references: [...state.references, action.payload as Reference],
        error: null,
        totalReferenceCount: state.totalReferenceCount + 1, // Increment count on successful creation
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
          reference.id === (action.payload as Reference).id
            ? (action.payload as Reference)
            : reference,
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
        totalReferenceCount: state.totalReferenceCount - 1, // Decrement count on successful deletion
      };
    case DELETE_REFERENCE_FAILURE:
      return { ...state, error: action.payload as string };
    case SET_REFERENCE_COUNT: // Handle new action to set total count
      return { ...state, totalReferenceCount: action.payload as number };
    default:
      return state;
  }
};

export default referenceReducer;

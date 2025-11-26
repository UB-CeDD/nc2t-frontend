import { Compound } from "@/helpers/types.ts";
import {
  FETCH_COMPOUNDS_REQUEST,
  FETCH_COMPOUNDS_SUCCESS,
  FETCH_COMPOUNDS_FAILURE,
  CREATE_COMPOUND_REQUEST,
  CREATE_COMPOUND_SUCCESS,
  CREATE_COMPOUND_FAILURE,
  RETRIEVE_COMPOUND_SUCCESS,
  RETRIEVE_COMPOUND_FAILURE,
  UPDATE_COMPOUND_REQUEST,
  UPDATE_COMPOUND_SUCCESS,
  UPDATE_COMPOUND_FAILURE,
  DELETE_COMPOUND_SUCCESS,
  DELETE_COMPOUND_FAILURE,
  SET_COMPOUND_COUNT, // Import new action type
} from "../actions/compoundActions";

const initialState = {
  compounds: [] as Compound[],
  loading: false,
  error: null,
  totalCompoundCount: 0, // New state property for total compound count
};

interface Action {
  type: string;
  payload?: Compound[] | Compound | string | number;
}

const compoundReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_COMPOUNDS_REQUEST:
    case CREATE_COMPOUND_REQUEST:
    case UPDATE_COMPOUND_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COMPOUNDS_SUCCESS:
      return {
        ...state,
        loading: false,
        compounds: action.payload as Compound[],
        error: null,
      };
    case FETCH_COMPOUNDS_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case CREATE_COMPOUND_SUCCESS:
      return {
        ...state,
        loading: false,
        compounds: [...state.compounds, action.payload as Compound],
        error: null,
        totalCompoundCount: state.totalCompoundCount + 1, // Increment count on successful creation
      };
    case CREATE_COMPOUND_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case RETRIEVE_COMPOUND_SUCCESS:
      return { ...state, error: null }; // Handle as needed
    case RETRIEVE_COMPOUND_FAILURE:
      return { ...state, error: action.payload as string };
    case UPDATE_COMPOUND_SUCCESS:
      return {
        ...state,
        loading: false,
        compounds: state.compounds.map((compound) =>
          compound.id === (action.payload as Compound).id
            ? (action.payload as Compound)
            : compound,
        ),
        error: null,
      };
    case UPDATE_COMPOUND_FAILURE:
      return { ...state, loading: false, error: action.payload as string };
    case DELETE_COMPOUND_SUCCESS:
      return {
        ...state,
        compounds: state.compounds.filter(
          (compound) => compound.id !== action.payload,
        ),
        error: null,
        totalCompoundCount: state.totalCompoundCount - 1, // Decrement count on successful deletion
      };
    case DELETE_COMPOUND_FAILURE:
      return { ...state, error: action.payload as string };
    case SET_COMPOUND_COUNT: // Handle new action to set total count
      return { ...state, totalCompoundCount: action.payload as number };
    default:
      return state;
  }
};

export default compoundReducer;

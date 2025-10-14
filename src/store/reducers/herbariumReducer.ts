import {
  FETCH_HERBARIUMS_REQUEST,
  FETCH_HERBARIUMS_SUCCESS,
  FETCH_HERBARIUMS_FAILURE,
  CREATE_HERBARIUM_SUCCESS,
  CREATE_HERBARIUM_FAILURE,
  RETRIEVE_HERBARIUM_SUCCESS,
  RETRIEVE_HERBARIUM_FAILURE,
  UPDATE_HERBARIUM_SUCCESS,
  UPDATE_HERBARIUM_FAILURE,
  DELETE_HERBARIUM_SUCCESS,
  DELETE_HERBARIUM_FAILURE,
} from "../actions/herbariumActions";
import { Herbarium } from "@/helpers/types";

interface HerbariumState {
  herbariums: Herbarium[];
  herbarium: Herbarium | null;
  loading: boolean;
  error: string | null;
}

const initialState: HerbariumState = {
  herbariums: [],
  herbarium: null,
  loading: false,
  error: null,
};

interface Action {
  type: string;
  payload?: any;
}

const herbariumReducer = (
  state = initialState,
  action: Action,
): HerbariumState => {
  switch (action.type) {
    case FETCH_HERBARIUMS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_HERBARIUMS_SUCCESS:
      return {
        ...state,
        loading: false,
        herbariums: action.payload,
        error: null,
      };
    case FETCH_HERBARIUMS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_HERBARIUM_SUCCESS:
      return {
        ...state,
        loading: false,
        herbariums: [...state.herbariums, action.payload],
        error: null,
      };
    case CREATE_HERBARIUM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case RETRIEVE_HERBARIUM_SUCCESS:
      return {
        ...state,
        loading: false,
        herbarium: action.payload,
        error: null,
      };
    case RETRIEVE_HERBARIUM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_HERBARIUM_SUCCESS:
      return {
        ...state,
        loading: false,
        herbariums: state.herbariums.map((h) =>
          h.id === action.payload.id ? action.payload : h,
        ),
        herbarium: action.payload,
        error: null,
      };
    case UPDATE_HERBARIUM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_HERBARIUM_SUCCESS:
      return {
        ...state,
        loading: false,
        herbariums: state.herbariums.filter((h) => h.id !== action.payload),
        error: null,
      };
    case DELETE_HERBARIUM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default herbariumReducer;

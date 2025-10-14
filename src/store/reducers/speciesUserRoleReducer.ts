import {
  FETCH_SPECIES_USERS_REQUEST,
  FETCH_SPECIES_USERS_SUCCESS,
  FETCH_SPECIES_USERS_FAILURE,
  ADD_SPECIES_USER_SUCCESS,
  ADD_SPECIES_USER_FAILURE,
  UPDATE_SPECIES_USER_ROLE_SUCCESS,
  UPDATE_SPECIES_USER_ROLE_FAILURE,
  REMOVE_SPECIES_USER_SUCCESS,
  REMOVE_SPECIES_USER_FAILURE,
} from "../actions/speciesUserRoleActions";
import { SpeciesUser } from "@/services/speciesUserRoleService";

interface SpeciesUserRoleState {
  speciesUsers: SpeciesUser[];
  loading: boolean;
  error: string | null;
}

const initialState: SpeciesUserRoleState = {
  speciesUsers: [],
  loading: false,
  error: null,
};

const speciesUserRoleReducer = (
  state = initialState,
  action: any,
): SpeciesUserRoleState => {
  switch (action.type) {
    case FETCH_SPECIES_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SPECIES_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        speciesUsers: action.payload,
        error: null,
      };
    case FETCH_SPECIES_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_SPECIES_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        speciesUsers: [...state.speciesUsers, action.payload],
        error: null,
      };
    case ADD_SPECIES_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_SPECIES_USER_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        speciesUsers: state.speciesUsers.map((su) =>
          su.user.id === action.payload.user.id ? action.payload : su,
        ),
        error: null,
      };
    case UPDATE_SPECIES_USER_ROLE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REMOVE_SPECIES_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        speciesUsers: state.speciesUsers.filter(
          (su) => su.user.id !== action.payload,
        ),
        error: null,
      };
    case REMOVE_SPECIES_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default speciesUserRoleReducer;

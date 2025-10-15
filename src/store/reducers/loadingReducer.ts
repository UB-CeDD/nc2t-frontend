import { SET_LOADING, UNSET_LOADING } from "../actions/loadingActions";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

interface Action {
  type: string;
}

const loadingReducer = (state = initialState, action: Action): LoadingState => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UNSET_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;

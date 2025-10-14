import { SET_LOADING, UNSET_LOADING } from "../actions/loadingActions";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

const loadingReducer = (state = initialState, action: any): LoadingState => {
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

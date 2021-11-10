import * as actionTypes from "../constants/directory";

export const directoryReducer = (state = { directories: [], directory: {} }, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.GET_DIRECTORIES_REQUEST:
    case actionTypes.GET_DIRECTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // Success actions
    case actionTypes.GET_DIRECTORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        directories: action.payload,
      };
    case actionTypes.GET_DIRECTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        directory: action.payload,
      };
    // Fail actions
    case actionTypes.GET_DIRECTORIES_FAIL:
    case actionTypes.GET_DIRECTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

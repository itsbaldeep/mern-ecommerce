import * as actionTypes from "../constants/directory";

export const directoryReducer = (state = { directories: [], directory: {} }, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.GET_DIRECTORIES_REQUEST:
    case actionTypes.GET_DIRECTORY_REQUEST:
    case actionTypes.GET_ALL_DIRECTORIES_REQUEST:
    case actionTypes.GET_ANY_DIRECTORY_REQUEST:
    case actionTypes.ADD_DIRECTORY_REQUEST:
    case actionTypes.EDIT_DIRECTORY_REQUEST:
    case actionTypes.APPROVE_DIRECTORY_REQUEST:
    case actionTypes.REMOVE_DIRECTORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // Success actions
    case actionTypes.GET_DIRECTORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        directories: action.payload,
      };
    case actionTypes.GET_DIRECTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        directory: action.payload,
      };
    case actionTypes.GET_ALL_DIRECTORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        directories: action.payload,
      };
    case actionTypes.GET_ANY_DIRECTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        directory: action.payload,
      };
    case actionTypes.ADD_DIRECTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        isAdded: true,
        directories: state.directories.concat([action.payload]),
      };
    case actionTypes.REMOVE_DIRECTORY_SUCCESS:
      const removeIndex = state.directories.findIndex((user) => user._id === action.payload._id);
      state.directories.splice(removeIndex, 1);
      return {
        ...state,
        loading: false,
        isRemoved: true,
        error: null,
        success: true,
      };
    case actionTypes.EDIT_DIRECTORY_SUCCESS:
    case actionTypes.APPROVE_DIRECTORY_SUCCESS:
      const editIndex = state.directories.findIndex((user) => user._id === action.payload._id);
      state.directories[editIndex] = action.payload;
      return {
        ...state,
        loading: false,
        isUpdated: true,
        error: null,
        success: true,
      };
    // Fail actions
    case actionTypes.GET_DIRECTORIES_FAIL:
    case actionTypes.GET_DIRECTORY_FAIL:
    case actionTypes.ADD_DIRECTORY_FAIL:
    case actionTypes.EDIT_DIRECTORY_FAIL:
    case actionTypes.APPROVE_DIRECTORY_FAIL:
    case actionTypes.REMOVE_DIRECTORY_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    // Clear errors
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: null,
      };
    case actionTypes.ADD_DIRECTORY_RESET:
      return {
        ...state,
        error: null,
        isAdded: null,
      };
    case actionTypes.EDIT_DIRECTORY_RESET:
      return {
        ...state,
        error: null,
        isUpdated: null,
      };
    case actionTypes.REMOVE_DIRECTORY_RESET:
      return {
        ...state,
        error: null,
        isRemoved: null,
      };
    default:
      return state;
  }
};

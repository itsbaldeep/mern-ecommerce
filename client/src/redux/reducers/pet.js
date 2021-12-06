import * as actionTypes from "../constants/pet";

export const petReducer = (state = { pets: [], pet: {} }, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.GET_PETS_REQUEST:
    case actionTypes.GET_PET_REQUEST:
    case actionTypes.ADD_PET_REQUEST:
    case actionTypes.EDIT_PET_REQUEST:
    case actionTypes.REMOVE_PET_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // Success actions
    case actionTypes.GET_PETS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        pets: action.payload,
      };
    case actionTypes.GET_PET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        pet: action.payload,
      };
    case actionTypes.ADD_PET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        isAdded: true,
        pets: state.pets.concat([action.payload]),
      };
    case actionTypes.REMOVE_PET_SUCCESS:
      const removeIndex = state.pets.findIndex((user) => user._id === action.payload._id);
      state.pets.splice(removeIndex, 1);
      return {
        ...state,
        loading: false,
        isRemoved: true,
        error: null,
        success: true,
      };
    case actionTypes.EDIT_PET_SUCCESS:
      const editIndex = state.pets.findIndex((user) => user._id === action.payload._id);
      state.pets[editIndex] = action.payload;
      return {
        ...state,
        loading: false,
        isUpdated: true,
        error: null,
        success: true,
      };
    // Fail actions
    case actionTypes.GET_PETS_FAIL:
    case actionTypes.GET_PET_FAIL:
    case actionTypes.ADD_PET_FAIL:
    case actionTypes.EDIT_PET_FAIL:
    case actionTypes.REMOVE_PET_FAIL:
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
    case actionTypes.ADD_PET_RESET:
      return {
        ...state,
        error: null,
        isAdded: null,
      };
    case actionTypes.EDIT_PET_RESET:
      return {
        ...state,
        error: null,
        isUpdated: null,
      };
    case actionTypes.REMOVE_PET_RESET:
      return {
        ...state,
        error: null,
        isRemoved: null,
      };
    default:
      return state;
  }
};

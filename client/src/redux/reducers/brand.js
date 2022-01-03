import * as actionTypes from "../constants/brand";

export const brandReducer = (state = { brands: [], brand: {} }, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.GET_BRANDS_REQUEST:
    case actionTypes.GET_BRAND_REQUEST:
    case actionTypes.ADD_BRAND_REQUEST:
    case actionTypes.EDIT_BRAND_REQUEST:
    case actionTypes.REMOVE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // Success actions
    case actionTypes.GET_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        brands: action.payload,
      };
    case actionTypes.GET_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        brand: action.payload,
      };
    case actionTypes.ADD_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        isAdded: true,
        brands: state.brands.concat([action.payload]),
      };
    case actionTypes.REMOVE_BRAND_SUCCESS:
      const removeIndex = state.brands.findIndex((brand) => brand._id === action.payload._id);
      state.brands.splice(removeIndex, 1);
      return {
        ...state,
        loading: false,
        isRemoved: true,
        error: null,
        success: true,
      };
    case actionTypes.EDIT_BRAND_SUCCESS:
      const editIndex = state.brands.findIndex((brand) => brand._id === action.payload._id);
      state.brands[editIndex] = action.payload;
      return {
        ...state,
        loading: false,
        isUpdated: true,
        error: null,
        success: true,
      };
    // Fail actions
    case actionTypes.GET_BRANDS_FAIL:
    case actionTypes.GET_BRAND_FAIL:
    case actionTypes.ADD_BRAND_FAIL:
    case actionTypes.EDIT_BRAND_FAIL:
    case actionTypes.REMOVE_BRAND_FAIL:
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
    case actionTypes.ADD_BRAND_RESET:
      return {
        ...state,
        error: null,
        isAdded: null,
      };
    case actionTypes.EDIT_BRAND_RESET:
      return {
        ...state,
        error: null,
        isUpdated: null,
      };
    case actionTypes.REMOVE_BRAND_RESET:
      return {
        ...state,
        error: null,
        isRemoved: null,
      };
    default:
      return state;
  }
};

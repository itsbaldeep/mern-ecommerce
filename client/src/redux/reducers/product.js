import * as actionTypes from "../constants/product";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
    case actionTypes.GET_OWN_PRODUCTS_REQUEST:
    case actionTypes.GET_OWN_PRODUCT_REQUEST:
    case actionTypes.GET_PRODUCT_REQUEST:
    case actionTypes.ADD_PRODUCT_REQUEST:
    case actionTypes.EDIT_PRODUCT_REQUEST:
    case actionTypes.REMOVE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
    case actionTypes.GET_PRODUCT_SUCCESS:
    case actionTypes.GET_OWN_PRODUCTS_SUCCESS:
    case actionTypes.GET_OWN_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case actionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: state.products.concat([action.payload]),
      };
    case actionTypes.REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case actionTypes.EDIT_PRODUCT_SUCCESS:
      const index = state.products.findIndex((product) => product._id === action.payload._id);
      state.products[index] = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
      };
    case actionTypes.GET_PRODUCTS_FAIL:
    case actionTypes.GET_OWN_PRODUCTS_FAIL:
    case actionTypes.GET_PRODUCT_FAIL:
    case actionTypes.GET_OWN_PRODUCT_FAIL:
    case actionTypes.ADD_PRODUCT_FAIL:
    case actionTypes.EDIT_PRODUCT_FAIL:
    case actionTypes.REMOVE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

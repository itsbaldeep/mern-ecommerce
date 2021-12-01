import * as actionTypes from "../constants/product";

export const productsReducer = (state = { products: [], product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
    case actionTypes.GET_OWN_PRODUCTS_REQUEST:
    case actionTypes.GET_ALL_PRODUCTS_REQUEST:
    case actionTypes.GET_OWN_PRODUCT_REQUEST:
    case actionTypes.GET_ANY_PRODUCT_REQUEST:
    case actionTypes.GET_PRODUCT_REQUEST:
    case actionTypes.ADD_PRODUCT_REQUEST:
    case actionTypes.EDIT_PRODUCT_REQUEST:
    case actionTypes.APPROVE_PRODUCT_REQUEST:
    case actionTypes.REMOVE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
    case actionTypes.GET_OWN_PRODUCTS_SUCCESS:
    case actionTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: action.payload,
      };
    case actionTypes.GET_PRODUCT_SUCCESS:
    case actionTypes.GET_OWN_PRODUCT_SUCCESS:
    case actionTypes.GET_ANY_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    case actionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isAdded: true,
        products: state.products.concat([action.payload]),
      };
    case actionTypes.REMOVE_PRODUCT_SUCCESS:
      const removeIndex = state.products.findIndex((product) => product._id === action.payload._id);
      state.products.splice(removeIndex, 1);
      return {
        ...state,
        isRemoved: true,
        loading: false,
        success: true,
      };
    case actionTypes.EDIT_PRODUCT_SUCCESS:
    case actionTypes.APPROVE_PRODUCT_SUCCESS:
      const editIndex = state.products.findIndex((product) => product._id === action.payload._id);
      state.products[editIndex] = action.payload;
      return {
        ...state,
        isUpdated: true,
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
    case actionTypes.GET_ALL_PRODUCTS_FAIL:
    case actionTypes.GET_ANY_PRODUCT_FAIL:
    case actionTypes.APPROVE_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        success: false,
        loading: false,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: null,
      };
    case actionTypes.ADD_PRODUCT_RESET:
      return {
        ...state,
        isAdded: null,
      };
    case actionTypes.EDIT_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: null,
      };
    case actionTypes.REMOVE_PRODUCT_RESET:
      return {
        ...state,
        isRemoved: null,
      };
    default:
      return state;
  }
};

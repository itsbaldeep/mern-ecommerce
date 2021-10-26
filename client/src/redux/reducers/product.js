import * as actionTypes from "../constants/product";

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
    case actionTypes.GET_PRODUCT_REQUEST:
      return { loading: true };
    case actionTypes.GET_PRODUCTS_SUCCESS:
    case actionTypes.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case actionTypes.GET_PRODUCTS_FAIL:
    case actionTypes.GET_PRODUCT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

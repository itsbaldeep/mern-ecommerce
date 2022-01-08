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
    case actionTypes.REVIEW_PRODUCT_REQUEST:
    case actionTypes.REMOVE_PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        reviewLoading: true,
      };
    case actionTypes.QUESTION_PRODUCT_REQUEST:
    case actionTypes.REMOVE_PRODUCT_QUESTION_REQUEST:
    case actionTypes.ANSWER_PRODUCT_REQUEST:
    case actionTypes.REMOVE_PRODUCT_ANSWER_REQUEST:
      return {
        ...state,
        questionLoading: true,
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
    case actionTypes.GET_OWN_PRODUCTS_SUCCESS:
    case actionTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        products: action.payload,
      };
    case actionTypes.GET_PRODUCT_SUCCESS:
    case actionTypes.GET_OWN_PRODUCT_SUCCESS:
    case actionTypes.GET_ANY_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        product: action.payload,
      };
    case actionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isAdded: true,
        error: null,
        products: state.products.concat([action.payload]),
      };
    case actionTypes.REMOVE_PRODUCT_SUCCESS:
      const removeIndex = state.products.findIndex((product) => product._id === action.payload._id);
      state.products.splice(removeIndex, 1);
      return {
        ...state,
        isRemoved: true,
        loading: false,
        error: null,
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
        error: null,
        success: true,
      };
    case actionTypes.REVIEW_PRODUCT_SUCCESS:
      return {
        ...state,
        product: {
          ...state.product,
          reviews: state.product.reviews.concat([action.payload]),
        },
        reviewLoading: false,
        success: true,
      };
    case actionTypes.REMOVE_PRODUCT_REVIEW_SUCCESS:
      const reviewIndex = state.product.reviews.findIndex(
        (review) => review._id === action.payload._id
      );
      state.product.reviews.splice(reviewIndex, 1);
      return {
        ...state,
        reviewLoading: false,
        success: true,
      };
    case actionTypes.QUESTION_PRODUCT_SUCCESS:
    case actionTypes.ANSWER_PRODUCT_SUCCESS:
      return {
        ...state,
        product: {
          ...state.product,
          questions: state.product.questions.concat([action.payload]),
        },
        questionLoading: false,
        success: true,
      };
    case actionTypes.REMOVE_PRODUCT_QUESTION_SUCCESS:
      const questionIndex = state.product.questions.findIndex(
        (question) => question._id === action.payload._id
      );
      state.product.questions.splice(questionIndex, 1);
      return {
        ...state,
        questionLoading: false,
        success: true,
      };
    case actionTypes.REMOVE_PRODUCT_ANSWER_SUCCESS:
      const updatedIndex = state.product.questions.findIndex(
        (question) => question._id === action.payload._id
      );
      state.product.questions[updatedIndex] = action.payload;
      return {
        ...state,
        questionLoading: false,
        success: true,
      };
    // Fail actions
    case actionTypes.REVIEW_PRODUCT_FAIL:
    case actionTypes.REMOVE_PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        reviewLoading: false,
        success: false,
        error: action.payload,
      };
    case actionTypes.QUESTION_PRODUCT_FAIL:
    case actionTypes.ANSWER_PRODUCT_FAIL:
    case actionTypes.REMOVE_PRODUCT_QUESTION_FAIL:
    case actionTypes.REMOVE_PRODUCT_ANSWER_FAIL:
      return {
        ...state,
        questionLoading: false,
        success: false,
        error: action.payload,
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

import * as actionTypes from "../constants/category";

export const categoryReducer = (
  state = {
    categories: [],
    directoryCategories: [],
    productCategories: [],
    serviceCategories: [],
    category: {},
  },
  action
) => {
  switch (action.type) {
    // Request actions
    case actionTypes.GET_CATEGORIES_REQUEST:
    case actionTypes.GET_CATEGORY_REQUEST:
    case actionTypes.GET_DIRECTORY_CATEGORIES_REQUEST:
    case actionTypes.GET_PRODUCT_CATEGORIES_REQUEST:
    case actionTypes.GET_SERVICE_CATEGORIES_REQUEST:
    case actionTypes.ADD_CATEGORY_REQUEST:
    case actionTypes.EDIT_CATEGORY_REQUEST:
    case actionTypes.REMOVE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // Success actions
    case actionTypes.GET_DIRECTORY_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        directoryCategories: action.payload,
      };
    case actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        productCategories: action.payload,
      };
    case actionTypes.GET_SERVICE_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        serviceCategories: action.payload,
      };
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        categories: action.payload,
      };
    case actionTypes.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        category: action.payload,
      };
    case actionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        isAdded: true,
        categories: state.categories.concat([action.payload]),
        directoryCategories:
          action.payload.type === "Directory"
            ? state.directoryCategories.concat([action.payload])
            : state.directoryCategories,
        productCategories:
          action.payload.type === "Product"
            ? state.productCategories.concat([action.payload])
            : state.productCategories,
        serviceCategories:
          action.payload.type === "Service"
            ? state.serviceCategories.concat([action.payload])
            : state.serviceCategories,
      };
    case actionTypes.REMOVE_CATEGORY_SUCCESS:
      const removeIndex = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );
      state.categories.splice(removeIndex, 1);
      if (action.payload.type === "Directory") {
        const removeIndex = state.directoryCategories.findIndex(
          (category) => category._id === action.payload._id
        );
        state.directoryCategories.splice(removeIndex, 1);
      }
      if (action.payload.type === "Product") {
        const removeIndex = state.productCategories.findIndex(
          (category) => category._id === action.payload._id
        );
        state.productCategories.splice(removeIndex, 1);
      }
      if (action.payload.type === "Service") {
        const removeIndex = state.serviceCategories.findIndex(
          (category) => category._id === action.payload._id
        );
        state.serviceCategories.splice(removeIndex, 1);
      }
      return {
        ...state,
        loading: false,
        isRemoved: true,
        error: null,
        success: true,
      };
    case actionTypes.EDIT_CATEGORY_SUCCESS:
      const editIndex = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );
      state.categories[editIndex] = action.payload;
      if (action.payload.type === "Directory") {
        const editIndex = state.directoryCategories.findIndex(
          (category) => category._id === action.payload._id
        );
        state.directoryCategories[editIndex] = action.payload;
      }
      if (action.payload.type === "Product") {
        const editIndex = state.productCategories.findIndex(
          (category) => category._id === action.payload._id
        );
        state.productCategories[editIndex] = action.payload;
      }
      if (action.payload.type === "Service") {
        const editIndex = state.serviceCategories.findIndex(
          (category) => category._id === action.payload._id
        );
        state.serviceCategories[editIndex] = action.payload;
      }
      return {
        ...state,
        loading: false,
        isUpdated: true,
        error: null,
        success: true,
      };
    // Fail actions
    case actionTypes.GET_CATEGORIES_FAIL:
    case actionTypes.GET_DIRECTORY_CATEGORIES_FAIL:
    case actionTypes.GET_PRODUCT_CATEGORIES_FAIL:
    case actionTypes.GET_SERVICE_CATEGORIES_FAIL:
    case actionTypes.GET_CATEGORY_FAIL:
    case actionTypes.ADD_CATEGORY_FAIL:
    case actionTypes.EDIT_CATEGORY_FAIL:
    case actionTypes.REMOVE_CATEGORY_FAIL:
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
    case actionTypes.ADD_CATEGORY_RESET:
      return {
        ...state,
        error: null,
        isAdded: null,
      };
    case actionTypes.EDIT_CATEGORY_RESET:
      return {
        ...state,
        error: null,
        isUpdated: null,
      };
    case actionTypes.REMOVE_CATEGORY_RESET:
      return {
        ...state,
        error: null,
        isRemoved: null,
      };
    default:
      return state;
  }
};

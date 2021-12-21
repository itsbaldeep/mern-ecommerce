import * as actionTypes from "../constants/inquiry";

export const inquiryReducer = (state = { inquiries: [], inquiry: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_INQUIRIES_REQUEST:
    case actionTypes.GET_OWN_INQUIRIES_REQUEST:
    case actionTypes.GET_OWN_INQUIRY_REQUEST:
    case actionTypes.GET_INQUIRY_REQUEST:
    case actionTypes.ADD_INQUIRY_REQUEST:
    case actionTypes.EDIT_INQUIRY_REQUEST:
    case actionTypes.REMOVE_INQUIRY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_INQUIRIES_SUCCESS:
    case actionTypes.GET_OWN_INQUIRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        inquiries: action.payload,
      };
    case actionTypes.GET_INQUIRY_SUCCESS:
    case actionTypes.GET_OWN_INQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        inquiry: action.payload,
      };
    case actionTypes.ADD_INQUIRY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        isAdded: true,
      };
    case actionTypes.REMOVE_INQUIRY_SUCCESS:
      const removeIndex = state.inquiries.findIndex(
        (inquiry) => inquiry._id === action.payload._id
      );
      state.inquiries.splice(removeIndex, 1);
      return {
        ...state,
        isRemoved: true,
        loading: false,
        success: true,
      };
    case actionTypes.EDIT_INQUIRY_SUCCESS:
      const editIndex = state.inquiries.findIndex((inquiry) => inquiry._id === action.payload._id);
      state.inquiries[editIndex] = action.payload;
      return {
        ...state,
        isUpdated: true,
        loading: false,
        success: true,
      };
    case actionTypes.GET_INQUIRIES_FAIL:
    case actionTypes.GET_OWN_INQUIRIES_FAIL:
    case actionTypes.GET_INQUIRY_FAIL:
    case actionTypes.GET_OWN_INQUIRY_FAIL:
    case actionTypes.ADD_INQUIRY_FAIL:
    case actionTypes.EDIT_INQUIRY_FAIL:
    case actionTypes.REMOVE_INQUIRY_FAIL:
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
    default:
      return state;
  }
};

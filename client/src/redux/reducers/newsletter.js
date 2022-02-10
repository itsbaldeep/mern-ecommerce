import * as actionTypes from "../constants/newsletter";

export const newsletterReducer = (state = { newsletter: {} }, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.NEWSLETTER_SUBSCRIBE_REQUEST:
    case actionTypes.NEWSLETTER_UNSUBSCRIBE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    // Success actions
    case actionTypes.NEWSLETTER_SUBSCRIBE_SUCCESS:
    case actionTypes.NEWSLETTER_UNSUBSCRIBE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        success: true,
        newsletter: action.payload,
      };
    // Fail actions
    case actionTypes.NEWSLETTER_SUBSCRIBE_FAIL:
    case actionTypes.NEWSLETTER_UNSUBSCRIBE_FAIL:
      return {
        ...state,
        loading: false,
        success: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

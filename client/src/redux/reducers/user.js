import * as actionTypes from "../constants/user";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.REGISTER_REQUEST:
    case actionTypes.LOAD_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case actionTypes.VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        isVerified: false,
      };
    // Success actions
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case actionTypes.VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        isVerified: true,
        user: action.payload,
        isAuthenticated: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        emailSent: true,
        message: action.payload,
      };

    // Fail actions
    case actionTypes.LOGIN_FAIL:
    case actionTypes.VERIFY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        emailSent: false,
        error: action.payload,
      };
    case actionTypes.LOAD_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case actionTypes.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear errors
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.UPDATE_PROFILE_REQUEST:
    case actionTypes.UPDATE_PASSWORD_REQUEST:
    case actionTypes.EDIT_USER_REQUEST:
    case actionTypes.ADD_USER_REQUEST:
    case actionTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // Success actions
    case actionTypes.UPDATE_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PASSWORD_SUCCESS:
    case actionTypes.EDIT_USER_SUCCESS:
    case actionTypes.ADD_USER_SUCCESS:
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    // Fail actions
    case actionTypes.UPDATE_PROFILE_FAIL:
    case actionTypes.UPDATE_PASSWORD_FAIL:
    case actionTypes.EDIT_USER_FAIL:
    case actionTypes.ADD_USER_FAIL:
    case actionTypes.DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Reset actions
    case actionTypes.UPDATE_PROFILE_RESET:
    case actionTypes.UPDATE_PASSWORD_RESET:
    case actionTypes.EDIT_USER_RESET:
    case actionTypes.DELETE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    // Clear errors
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.FORGOT_PASSWORD_REQUEST:
    case actionTypes.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Success actions
    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    // Fail actions
    case actionTypes.FORGOT_PASSWORD_FAIL:
    case actionTypes.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear errors
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.GET_USERS_REQUEST:
    case actionTypes.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // Success actions
    case actionTypes.GET_USERS_SUCCESS:
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    // Fail actions
    case actionTypes.GET_USERS_FAIL:
    case actionTypes.GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear errors
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const detailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case actionTypes.GET_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

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
      return {
        ...state,
        loading: true,
      };

    // Success actions
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        isUpdatedProfile: true,
      };

    case actionTypes.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        isUpdatedPassword: true,
      };
    // Fail actions
    case actionTypes.UPDATE_PROFILE_FAIL:
    case actionTypes.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isUpdatedPassword: false,
        isUpdatedProfile: false,
      };

    // Reset actions
    case actionTypes.UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdatedPassword: false,
      };
    case actionTypes.UPDATE_PROFILE_RESET:
      return {
        ...state,
        isUpdatedProfile: false,
      };

    // Clear errors
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        isUpdatedProfile: false,
        isUpdatedPassword: false,
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
        emailSent: action.payload,
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

export const adminReducer = (state = { users: [], user: {} }, action) => {
  switch (action.type) {
    // Request actions
    case actionTypes.GET_USER_REQUEST:
    case actionTypes.GET_USERS_REQUEST:
    case actionTypes.ADD_USER_REQUEST:
    case actionTypes.EDIT_USER_REQUEST:
    case actionTypes.REMOVE_USER_REQUEST:
    case actionTypes.VERIFY_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // Success actions
    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        users: action.payload,
      };
    case actionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case actionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        isAdded: true,
        users: state.users.concat([action.payload]),
      };
    case actionTypes.REMOVE_USER_SUCCESS:
      const removeIndex = state.users.findIndex((user) => user._id === action.payload._id);
      state.users.splice(removeIndex, 1);
      return {
        ...state,
        loading: false,
        error: null,
        isRemoved: true,
        success: true,
      };
    case actionTypes.EDIT_USER_SUCCESS:
    case actionTypes.VERIFY_USER_SUCCESS:
      const editIndex = state.users.findIndex((user) => user._id === action.payload._id);
      state.users[editIndex] = action.payload;
      return {
        ...state,
        loading: false,
        error: null,
        isUpdated: true,
        success: true,
      };
    // Fail actions
    case actionTypes.GET_USER_FAIL:
    case actionTypes.GET_USERS_FAIL:
    case actionTypes.ADD_USER_FAIL:
    case actionTypes.EDIT_USER_FAIL:
    case actionTypes.REMOVE_USER_FAIL:
    case actionTypes.VERIFY_USER_FAIL:
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
    case actionTypes.ADD_USER_RESET:
      return {
        ...state,
        error: null,
        isAdded: null,
      };
    case actionTypes.EDIT_USER_RESET:
      return {
        ...state,
        error: null,
        isUpdated: null,
      };
    case actionTypes.REMOVE_USER_RESET:
      return {
        ...state,
        error: null,
        isRemoved: null,
      };

    default:
      return state;
  }
};

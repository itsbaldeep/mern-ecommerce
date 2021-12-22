import * as actionTypes from "../constants/user";
import axios from "axios";

// POST /api/user/login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    const { data } = await axios.post("/api/user/login", { email, password });
    localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, data.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAIL, payload: error.response.data.error });
  }
};

export const logout = () => async (dispatch) => {
  try {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: actionTypes.LOGOUT_FAIL, payload: "Logout failed" });
  }
};

// POST /api/user/register
export const register = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REGISTER_REQUEST });
    const { data } = await axios.post("/api/user/register", user);
    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: actionTypes.REGISTER_FAIL, payload: error.response.data.error });
  }
};

// GET /api/user/verify/:verificationToken
export const verify = (token) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.VERIFY_REQUEST });
    const { data } = await axios.get(`/api/user/verify/${token}`);
    localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, data.token);
    dispatch({ type: actionTypes.VERIFY_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.VERIFY_FAIL, payload: error.response.data.error });
  }
};

// POST /api/user/forgotpassword
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post("/api/user/forgotpassword", { email });
    dispatch({ type: actionTypes.FORGOT_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: actionTypes.FORGOT_PASSWORD_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/user/resetpassword/:resetToken
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.RESET_PASSWORD_REQUEST });
    const { data } = await axios.put(`/api/user/resetpassword/${token}`, { password });
    dispatch({ type: actionTypes.RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: actionTypes.RESET_PASSWORD_FAIL, payload: error.response.data.error });
  }
};

// GET /api/user/me
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOAD_REQUEST });
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const { data } = await axios.get("/api/user/me");
    dispatch({ type: actionTypes.LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
    delete axios.defaults.headers.common["Authorization"];
    dispatch({ type: actionTypes.LOAD_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/user/updateprofile
export const updateProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put("/api/user/updateprofile", user);
    dispatch({ type: actionTypes.UPDATE_PROFILE_SUCCESS, payload: data.user });
    dispatch({ type: actionTypes.LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_PROFILE_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/user/updatepassword
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_PASSWORD_REQUEST });
    const { data } = await axios.put("/api/user/updatepassword", passwords);
    localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, data.token);
    dispatch({ type: actionTypes.UPDATE_PASSWORD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_PASSWORD_FAIL, payload: error.response.data.error });
  }
};

/*
 * Admin Routes
 */

// GET /api/user
export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_USERS_REQUEST });
    const { data } = await axios.get("/api/user");
    dispatch({ type: actionTypes.GET_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: actionTypes.GET_USERS_FAIL, payload: error.response.data.error });
  }
};

// GET /api/user/:id
export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_USER_REQUEST });
    const { data } = await axios.get(`/api/user/${id}`);
    dispatch({ type: actionTypes.GET_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.GET_USER_FAIL, payload: error.response.data.error });
  }
};

// POST /api/user/add
export const addUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_USER_REQUEST });
    const { data } = await axios.post(`/api/user/add`, user);
    dispatch({ type: actionTypes.ADD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_USER_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/user/edit/:id
export const editUser = (user, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_USER_REQUEST });
    const { data } = await axios.put(`/api/user/edit/${id}`, user);
    dispatch({ type: actionTypes.EDIT_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_USER_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/user/verifyaccount/:id
export const verifyUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.VERIFY_USER_REQUEST });
    const { data } = await axios.put(`/api/user/verifyaccount/${id}`);
    dispatch({ type: actionTypes.VERIFY_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.VERIFY_USER_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/user/remove/:id
export const removeUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_USER_REQUEST });
    const { data } = await axios.delete(`/api/user/remove/${id}`);
    dispatch({ type: actionTypes.REMOVE_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_USER_FAIL, payload: error.response.data.error });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

export const addUserReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_USER_RESET });
};

export const editUserReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_USER_RESET });
};

export const removeUserReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_USER_RESET });
};

import * as actionTypes from "../constants/directory";
import axios from "axios";

const getConfig = () => {
  const authToken = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
  const Authorization = `Bearer ${authToken}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  };
  return config;
};

const getConfigFD = () => {
  const config = getConfig();
  config.headers["Content-Type"] = "multipart/form-data";
  return config;
};

// GET /api/directory
export const loadDirectories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_DIRECTORIES_REQUEST });
    const { data } = await axios.get("/api/directory");
    dispatch({ type: actionTypes.GET_DIRECTORIES_SUCCESS, payload: data.directories });
  } catch (error) {
    dispatch({ type: actionTypes.GET_DIRECTORIES_FAIL, payload: error.response.data.error });
  }
};

// GET /api/directory/:username
export const loadDirectory = (username) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_DIRECTORY_REQUEST });
    const { data } = await axios.get(`/api/directory/${username}`);
    dispatch({ type: actionTypes.GET_DIRECTORY_SUCCESS, payload: data.directory });
  } catch (error) {
    dispatch({ type: actionTypes.GET_DIRECTORY_FAIL, payload: error.response.data.error });
  }
};

/*
 * Admin Routes
 */

// GET /api/directory/all
export const getAllDirectories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ALL_DIRECTORIES_REQUEST });
    const { data } = await axios.get("/api/directory/all", getConfig());
    dispatch({ type: actionTypes.GET_ALL_DIRECTORIES_SUCCESS, payload: data.directories });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ALL_DIRECTORIES_FAIL, payload: error.response.data.error });
  }
};

// GET /api/directory/any/:id
export const getAnyDirectory = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ANY_DIRECTORY_REQUEST });
    const { data } = await axios.get(`/api/directory/${id}`, getConfig());
    dispatch({ type: actionTypes.GET_ANY_DIRECTORY_SUCCESS, payload: data.directory });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ANY_DIRECTORY_FAIL, payload: error.response.data.error });
  }
};

// POST /api/directory/add
export const addDirectory = (directory) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_DIRECTORY_REQUEST });
    const { data } = await axios.post(`/api/directory/add`, directory, getConfig());
    dispatch({ type: actionTypes.ADD_DIRECTORY_SUCCESS, payload: data.directory });
    // In case a user ref is added
    if (data.user) dispatch({ type: "EDIT_USER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_DIRECTORY_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/directory/edit/:id
export const editDirectory = (directory, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_DIRECTORY_REQUEST });
    const { data } = await axios.put(`/api/directory/edit/${id}`, directory, getConfigFD());
    dispatch({ type: actionTypes.EDIT_DIRECTORY_SUCCESS, payload: data.directory });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_DIRECTORY_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/directory/approve/:id
export const approveDirectory = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.APPROVE_DIRECTORY_REQUEST });
    const { data } = await axios.put(`/api/directory/approve/${id}`, {}, getConfig());
    dispatch({ type: actionTypes.APPROVE_DIRECTORY_SUCCESS, payload: data.directory });
  } catch (error) {
    dispatch({ type: actionTypes.APPROVE_DIRECTORY_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/directory/remove/:id
export const removeDirectory = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_DIRECTORY_REQUEST });
    const { data } = await axios.delete(`/api/directory/remove/${id}`, getConfig());
    dispatch({ type: actionTypes.REMOVE_DIRECTORY_SUCCESS, payload: data.directory });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_DIRECTORY_FAIL, payload: error.response.data.error });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

export const addDirectoryReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_DIRECTORY_RESET });
};

export const editDirectoryReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_DIRECTORY_RESET });
};

export const removeDirectoryReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_DIRECTORY_RESET });
};

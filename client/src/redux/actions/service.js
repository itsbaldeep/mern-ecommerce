import * as actionTypes from "../constants/service";
import axios from "axios";

const headers = { "Content-Type": "application/json" };
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

// GET /api/service/
export const getServices = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_SERVICES_REQUEST });
    const { data } = await axios.get("/api/service", { headers });
    dispatch({ type: actionTypes.GET_SERVICES_SUCCESS, payload: data.services });
  } catch (error) {
    dispatch({ type: actionTypes.GET_SERVICES_FAIL, payload: error.response.data.error });
  }
};

// GET /api/service/:id
export const getService = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_SERVICE_REQUEST });
    const { data } = await axios.get(`/api/service/${id}`, { headers });
    dispatch({ type: actionTypes.GET_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.GET_SERVICE_FAIL, payload: error.response.data.error });
  }
};

// GET /api/service/own
export const getOwnServices = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OWN_SERVICES_REQUEST });
    const { data } = await axios.get("/api/service/own", getConfig());
    dispatch({ type: actionTypes.GET_OWN_SERVICES_SUCCESS, payload: data.services });
  } catch (error) {
    dispatch({ type: actionTypes.GET_OWN_SERVICES_FAIL, payload: error.response.data.error });
  }
};

// GET /api/service/own/:id
export const getOwnService = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OWN_SERVICE_REQUEST });
    const { data } = await axios.get(`/api/service/own/${id}`, getConfig());
    dispatch({ type: actionTypes.GET_OWN_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.GET_OWN_SERVICE_FAIL, payload: error.response.data.error });
  }
};

// POST /api/service/add
export const addService = (service) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_SERVICE_REQUEST });
    const { data } = await axios.post("/api/service/add/", service, getConfigFD());
    dispatch({ type: actionTypes.ADD_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_SERVICE_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/service/remove/:id
export const removeService = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_SERVICE_REQUEST });
    const { data } = await axios.delete(`/api/service/remove/${id}`, getConfig());
    dispatch({ type: actionTypes.REMOVE_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_SERVICE_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/service/edit/:id
export const editService = (service, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_SERVICE_REQUEST });
    const { data } = await axios.put(`/api/service/edit/${id}`, service, getConfigFD());
    dispatch({ type: actionTypes.EDIT_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_SERVICE_FAIL, payload: error.response.data.error });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

import * as actionTypes from "../constants/service";
import axios from "axios";

// GET /api/service/
export const getServices = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_SERVICES_REQUEST });
    const { data } = await axios.get("/api/service");
    dispatch({ type: actionTypes.GET_SERVICES_SUCCESS, payload: data.services });
  } catch (error) {
    dispatch({ type: actionTypes.GET_SERVICES_FAIL, payload: error.response.data.error });
  }
};

// GET /api/service/:id
export const getService = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_SERVICE_REQUEST });
    const { data } = await axios.get(`/api/service/${id}`);
    dispatch({ type: actionTypes.GET_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.GET_SERVICE_FAIL, payload: error.response.data.error });
  }
};

/*
 * Client routes
 */

// GET /api/service/own
export const getOwnServices = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OWN_SERVICES_REQUEST });
    const { data } = await axios.get("/api/service/own");
    dispatch({ type: actionTypes.GET_OWN_SERVICES_SUCCESS, payload: data.services });
  } catch (error) {
    dispatch({ type: actionTypes.GET_OWN_SERVICES_FAIL, payload: error.response.data.error });
  }
};

// GET /api/service/own/:id
export const getOwnService = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OWN_SERVICE_REQUEST });
    const { data } = await axios.get(`/api/service/own/${id}`);
    dispatch({ type: actionTypes.GET_OWN_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.GET_OWN_SERVICE_FAIL, payload: error.response.data.error });
  }
};

// POST /api/service/add
export const addService = (service) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_SERVICE_REQUEST });
    const { data } = await axios.post("/api/service/add/", service);
    dispatch({ type: actionTypes.ADD_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_SERVICE_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/service/remove/:id
export const removeService = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_SERVICE_REQUEST });
    const { data } = await axios.delete(`/api/service/remove/${id}`);
    dispatch({ type: actionTypes.REMOVE_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_SERVICE_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/service/edit/:id
export const editService = (service, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_SERVICE_REQUEST });
    const { data } = await axios.put(`/api/service/edit/${id}`, service);
    dispatch({ type: actionTypes.EDIT_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_SERVICE_FAIL, payload: error.response.data.error });
  }
};

/*
 * Admin specific routes
 */

// GET /api/service/all
export const getAllServices = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ALL_SERVICES_REQUEST });
    const { data } = await axios.get("/api/service/all");
    dispatch({ type: actionTypes.GET_ALL_SERVICES_SUCCESS, payload: data.services });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ALL_SERVICES_FAIL, payload: error.response.data.error });
  }
};

// GET /api/service/any/:id
export const getAnyService = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_ANY_SERVICE_REQUEST });
    const { data } = await axios.get(`/api/service/any/${id}`);
    dispatch({ type: actionTypes.GET_ANY_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.GET_ANY_SERVICE_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/service/approve
export const approveService = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.APPROVE_SERVICE_REQUEST });
    const { data } = await axios.put(`/api/service/approve/${id}`);
    dispatch({ type: actionTypes.APPROVE_SERVICE_SUCCESS, payload: data.service });
  } catch (error) {
    dispatch({ type: actionTypes.APPROVE_SERVICE_FAIL, payload: error.response.data.error });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

export const editServiceReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_SERVICE_RESET });
};

export const addServiceReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_SERVICE_RESET });
};

export const removeServiceReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_SERVICE_RESET });
};

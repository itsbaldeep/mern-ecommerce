import * as actionTypes from "../constants/inquiry";
import axios from "axios";

// POST /api/inquiry/add
export const addInquiry = (inquiry) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_INQUIRY_REQUEST });
    const { data } = await axios.post("/api/inquiry/add", inquiry);
    dispatch({ type: actionTypes.ADD_INQUIRY_SUCCESS, payload: data.inquiry });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_INQUIRY_FAIL, payload: error.response.data.error });
  }
};

// GET /api/inquiry/own
export const getOwnInquiries = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OWN_INQUIRIES_REQUEST });
    const { data } = await axios.get("/api/inquiry/own");
    dispatch({ type: actionTypes.GET_OWN_INQUIRIES_SUCCESS, payload: data.inquiries });
  } catch (error) {
    dispatch({ type: actionTypes.GET_OWN_INQUIRIES_FAIL, payload: error.response.data.error });
  }
};

// GET /api/inquiry/own/:id
export const getOwnInquiry = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OWN_INQUIRY_REQUEST });
    const { data } = await axios.get(`/api/inquiry/own/${id}`);
    dispatch({ type: actionTypes.GET_OWN_INQUIRY_SUCCESS, payload: data.inquiry });
  } catch (error) {
    dispatch({ type: actionTypes.GET_OWN_INQUIRY_FAIL, payload: error.response.data.error });
  }
};

// GET /api/inquiry/
export const getInquiries = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_INQUIRIES_REQUEST });
    const { data } = await axios.get("/api/inquiry/");
    dispatch({ type: actionTypes.GET_INQUIRIES_SUCCESS, payload: data.inquiries });
  } catch (error) {
    dispatch({ type: actionTypes.GET_INQUIRIES_FAIL, payload: error.response.data.error });
  }
};

// GET /api/inquiry/:id
export const getInquiry = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_INQUIRY_REQUEST });
    const { data } = await axios.get(`/api/inquiry/${id}`);
    dispatch({ type: actionTypes.GET_INQUIRY_SUCCESS, payload: data.inquiry });
  } catch (error) {
    dispatch({ type: actionTypes.GET_INQUIRY_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/inquiry/edit/:id
export const editInquiry = (inquiry, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_INQUIRY_REQUEST });
    const { data } = await axios.put(`/api/inquiry/edit/${id}`, inquiry);
    dispatch({ type: actionTypes.EDIT_INQUIRY_SUCCESS, payload: data.inquiry });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_INQUIRY_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/inquiry/remove/:id
export const removeInquiry = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_INQUIRY_REQUEST });
    const { data } = await axios.delete(`/api/inquiry/remove/${id}`);
    dispatch({ type: actionTypes.REMOVE_INQUIRY_SUCCESS, payload: data.inquiry });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_INQUIRY_FAIL, payload: error.response.data.error });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

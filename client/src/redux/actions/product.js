import * as actionTypes from "../constants/product";
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

// GET /api/product/
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/product", { headers });
    dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.response.data.error });
  }
};

// GET /api/product/:id
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/product/${id}`, { headers });
    dispatch({ type: actionTypes.GET_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.GET_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// GET /api/product/own
export const getOwnProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OWN_PRODUCTS_REQUEST });
    const { data } = await axios.get("/api/product/own", getConfig());
    dispatch({ type: actionTypes.GET_OWN_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: actionTypes.GET_OWN_PRODUCTS_FAIL, payload: error.response.data.error });
  }
};

// GET /api/product/own/:id
export const getOwnProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_OWN_PRODUCT_REQUEST });
    const { data } = await axios.get(`/api/product/own/${id}`, getConfig());
    dispatch({ type: actionTypes.GET_OWN_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.GET_OWN_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// POST /api/product/add
export const addProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_PRODUCT_REQUEST });
    const { data } = await axios.post("/api/product/add/", product, getConfigFD());
    dispatch({ type: actionTypes.ADD_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/product/remove/:id
export const removeProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_PRODUCT_REQUEST });
    const { data } = await axios.delete(`/api/product/remove/${id}`, getConfig());
    dispatch({ type: actionTypes.REMOVE_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/product/edit/:id
export const editProduct = (product, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_PRODUCT_REQUEST });
    const { data } = await axios.put(`/api/product/edit/${id}`, product, getConfigFD());
    dispatch({ type: actionTypes.EDIT_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_PRODUCT_FAIL, payload: error.response.data.error });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

import * as actionTypes from "../constants/brand";
import axios from "axios";

// GET /api/brand/
export const getBrands = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_BRANDS_REQUEST });
    const { data } = await axios.get("/api/brand");
    dispatch({ type: actionTypes.GET_BRANDS_SUCCESS, payload: data.brands });
  } catch (error) {
    dispatch({ type: actionTypes.GET_BRANDS_FAIL, payload: error.response.data.error });
  }
};

// GET /api/brand/:id
export const getBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_BRAND_REQUEST });
    const { data } = await axios.get(`/api/brand/${id}`);
    dispatch({ type: actionTypes.GET_BRAND_SUCCESS, payload: data.brand });
  } catch (error) {
    dispatch({ type: actionTypes.GET_BRAND_FAIL, payload: error.response.data.error });
  }
};

/*
 * Admin routes
 */

// POST /api/brand/add
export const addBrand = (brand) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_BRAND_REQUEST });
    const { data } = await axios.post("/api/brand/add", brand);
    dispatch({ type: actionTypes.ADD_BRAND_SUCCESS, payload: data.brand });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_BRAND_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/brand/edit/:id
export const editBrand = (brand, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_BRAND_REQUEST });
    const { data } = await axios.put(`/api/brand/edit/${id}`, brand);
    dispatch({ type: actionTypes.EDIT_BRAND_SUCCESS, payload: data.brand });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_BRAND_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/brand/remove/:id
export const removeBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_BRAND_REQUEST });
    const { data } = await axios.delete(`/api/brand/remove/${id}`);
    dispatch({ type: actionTypes.REMOVE_BRAND_SUCCESS, payload: data.brand });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_BRAND_FAIL, payload: error.response.data.error });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

export const editBrandReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_BRAND_RESET });
};

export const addBrandReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_BRAND_RESET });
};

export const removeBrandReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_BRAND_RESET });
};

import * as actionTypes from "../constants/category";
import axios from "axios";

// GET /api/category/
export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CATEGORIES_REQUEST });
    const { data } = await axios.get("/api/category");
    dispatch({ type: actionTypes.GET_CATEGORIES_SUCCESS, payload: data.categories });
  } catch (error) {
    dispatch({ type: actionTypes.GET_CATEGORIES_FAIL, payload: error.response.data.error });
  }
};

// GET /api/category/directory
export const getDirectoryCategories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_DIRECTORY_CATEGORIES_REQUEST });
    const { data } = await axios.get("/api/category/directory");
    dispatch({ type: actionTypes.GET_DIRECTORY_CATEGORIES_SUCCESS, payload: data.categories });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_DIRECTORY_CATEGORIES_FAIL,
      payload: error.response.data.error,
    });
  }
};

// GET /api/category/product
export const getProductCategories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_CATEGORIES_REQUEST });
    const { data } = await axios.get("/api/category/product");
    dispatch({ type: actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS, payload: data.categories });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_CATEGORIES_FAIL,
      payload: error.response.data.error,
    });
  }
};

// GET /api/category/service
export const getServiceCategories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_SERVICE_CATEGORIES_REQUEST });
    const { data } = await axios.get("/api/category/service");
    dispatch({ type: actionTypes.GET_SERVICE_CATEGORIES_SUCCESS, payload: data.categories });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_SERVICE_CATEGORIES_FAIL,
      payload: error.response.data.error,
    });
  }
};

// GET /api/category/:id
export const getCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CATEGORY_REQUEST });
    const { data } = await axios.get(`/api/category/${id}`);
    dispatch({ type: actionTypes.GET_CATEGORY_SUCCESS, payload: data.category });
  } catch (error) {
    dispatch({ type: actionTypes.GET_CATEGORY_FAIL, payload: error.response.data.error });
  }
};

/*
 * Admin routes
 */

// POST /api/category/add
export const addCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_CATEGORY_REQUEST });
    const { data } = await axios.post("/api/category/add", category);
    dispatch({ type: actionTypes.ADD_CATEGORY_SUCCESS, payload: data.category });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_CATEGORY_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/category/edit/:id
export const editCategory = (category, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_CATEGORY_REQUEST });
    const { data } = await axios.put(`/api/category/edit/${id}`, category);
    dispatch({ type: actionTypes.EDIT_CATEGORY_SUCCESS, payload: data.category });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_CATEGORY_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/category/remove/:id
export const removeCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_CATEGORY_REQUEST });
    const { data } = await axios.delete(`/api/category/remove/${id}`);
    dispatch({ type: actionTypes.REMOVE_CATEGORY_SUCCESS, payload: data.category });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_CATEGORY_FAIL, payload: error.response.data.error });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

export const editCategoryReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_CATEGORY_RESET });
};

export const addCategoryReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_CATEGORY_RESET });
};

export const removeCategoryReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_CATEGORY_RESET });
};

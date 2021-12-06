import * as actionTypes from "../constants/pet";
import axios from "axios";

// GET /api/pet/
export const getPets = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PETS_REQUEST });
    const { data } = await axios.get("/api/pet");
    dispatch({ type: actionTypes.GET_PETS_SUCCESS, payload: data.pets });
  } catch (error) {
    dispatch({ type: actionTypes.GET_PETS_FAIL, payload: error.response.data.error });
  }
};

// GET /api/pet/:id
export const getPet = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PET_REQUEST });
    const { data } = await axios.get(`/api/pet/${id}`);
    dispatch({ type: actionTypes.GET_PET_SUCCESS, payload: data.pet });
  } catch (error) {
    dispatch({ type: actionTypes.GET_PET_FAIL, payload: error.response.data.error });
  }
};

/*
 * Admin routes
 */

// POST /api/pet/add
export const addPet = (pet) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ADD_PET_REQUEST });
    const { data } = await axios.post("/api/pet/add", pet);
    dispatch({ type: actionTypes.ADD_PET_SUCCESS, payload: data.pet });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_PET_FAIL, payload: error.response.data.error });
  }
};

// PUT /api/pet/edit/:id
export const editPet = (pet, id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.EDIT_PET_REQUEST });
    const { data } = await axios.put(`/api/pet/edit/${id}`, pet);
    dispatch({ type: actionTypes.EDIT_PET_SUCCESS, payload: data.pet });
  } catch (error) {
    dispatch({ type: actionTypes.EDIT_PET_FAIL, payload: error.response.data.error });
  }
};

// DEL /api/pet/remove/:id
export const removePet = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.REMOVE_PET_REQUEST });
    const { data } = await axios.delete(`/api/pet/remove/${id}`);
    dispatch({ type: actionTypes.REMOVE_PET_SUCCESS, payload: data.pet });
  } catch (error) {
    dispatch({ type: actionTypes.REMOVE_PET_FAIL, payload: error.response.data.error });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_ERRORS });
};

export const editPetReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.EDIT_PET_RESET });
};

export const addPetReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_PET_RESET });
};

export const removePetReset = () => async (dispatch) => {
  dispatch({ type: actionTypes.REMOVE_PET_RESET });
};

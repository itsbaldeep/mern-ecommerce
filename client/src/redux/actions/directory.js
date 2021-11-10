import * as actionTypes from "../constants/directory";
import axios from "axios";

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

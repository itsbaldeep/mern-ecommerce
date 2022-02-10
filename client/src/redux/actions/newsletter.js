import * as actionTypes from "../constants/newsletter";
import axios from "axios";

// POST /api/newsletter/subscribe
export const subscribe = (email) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.NEWSLETTER_SUBSCRIBE_REQUEST });
    const { data } = await axios.post(`/api/newsletter/subscribe`, { email });
    dispatch({ type: actionTypes.NEWSLETTER_SUBSCRIBE_SUCCESS, payload: data.newsletter });
  } catch (error) {
    dispatch({ type: actionTypes.NEWSLETTER_SUBSCRIBE_FAIL, payload: error.response.data.error });
  }
};

// POST /api/newsletter/unsubscribe
export const unsubscribe = (email) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.NEWSLETTER_UNSUBSCRIBE_REQUEST });
    const { data } = await axios.post(`/api/newsletter/unsubscribe`, { email });
    dispatch({ type: actionTypes.NEWSLETTER_UNSUBSCRIBE_SUCCESS, payload: data.newsletter });
  } catch (error) {
    dispatch({ type: actionTypes.NEWSLETTER_UNSUBSCRIBE_FAIL, payload: error.response.data.error });
  }
};

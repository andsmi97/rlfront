import {
  CHANGE_TITLE_FIELD,
  CHANGE_BODY_FIELD,
  REQUEST_POSTS_PENDING,
  REQUEST_POSTS_FAILED,
  REQUEST_POSTS_SUCCESS,
  SELECT_LAST_POSTS_ON_LOAD
} from "./constants";
import { BACKEND_URI } from "../../constants";
export const setTitleField = text => ({
  type: CHANGE_TITLE_FIELD,
  payload: text
});

export const setBodyField = text => ({
  type: CHANGE_BODY_FIELD,
  payload: text
});

export const requestPosts = () => dispatch => {
  dispatch({ type: REQUEST_POSTS_PENDING });
  fetch(`${BACKEND_URI}/getposts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: Date.now()
    })
  })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_POSTS_SUCCESS, payload: data }))
    .then(data =>
      dispatch({
        type: SELECT_LAST_POSTS_ON_LOAD,
        payload: data.payload
      })
    )
    .catch(error => dispatch({ type: REQUEST_POSTS_FAILED, payload: error }));
};

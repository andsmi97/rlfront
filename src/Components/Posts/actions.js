import {
  CHANGE_TITLE_FIELD,
  CHANGE_POST_BODY_FIELD,
  REQUEST_POSTS_PENDING,
  REQUEST_POSTS_FAILED,
  REQUEST_POSTS_SUCCESS,
  SELECT_LAST_POSTS_ON_LOAD,
  OPEN_INSERT_POST_WINDOW,
  CLOSE_INSERT_POST_WINDOW,
  OPEN_EDIT_POST_WINDOW,
  CLOSE_EDIT_POST_WINDOW,
  SELECT_EDIT_POST,
  CHANGE_EDIT_TITLE_FIELD,
  CHANGE_EDIT_POST_BODY_FIELD,
  SWITCH_INSERTION_POST_SUCCESS,
  SWITCH_UPDATE_POST_SUCCESS,
  SWITCH_DELETE_POST_SUCCESS,
  SWITCH_INSERTION_POST_SUCCESS_CLOSE,
  SWITCH_UPDATE_POST_SUCCESS_CLOSE,
  SWITCH_DELETE_POST_SUCCESS_CLOSE,
  RESET_INSERT_POST_FIELDS,
  RESET_UPDATE_POST_FIELDS
} from "./constants";
import { BACKEND_URI } from "../../constants";
export const setTitleField = text => ({
  type: CHANGE_TITLE_FIELD,
  payload: text
});

export const setPostBodyField = text => ({
  type: CHANGE_POST_BODY_FIELD,
  payload: text
});

export const setEditTitleField = text => ({
  type: CHANGE_EDIT_TITLE_FIELD,
  payload: text
});

export const setEditPostBodyField = text => ({
  type: CHANGE_EDIT_POST_BODY_FIELD,
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

export const openInsertPostWindow = () => ({
  type: OPEN_INSERT_POST_WINDOW,
  payload: true
});

export const openEditPostWindow = () => ({
  type: OPEN_EDIT_POST_WINDOW,
  payload: true
});

export const closeInsertPostWindow = () => ({
  type: CLOSE_INSERT_POST_WINDOW,
  payload: false
});

export const closeEditPostWindow = () => ({
  type: CLOSE_EDIT_POST_WINDOW,
  payload: false
});

export const selectEditPost = id => ({
  type: SELECT_EDIT_POST,
  payload: id
});

//CHANGE
export const openInsertPostSuccessPopUp = () => ({
  type: SWITCH_INSERTION_POST_SUCCESS,
  payload: true
});

export const openUpdatePostSuccessPopUp = () => ({
  type: SWITCH_UPDATE_POST_SUCCESS,
  payload: true
});

export const openDeletePostSuccessPopUp = () => ({
  type: SWITCH_DELETE_POST_SUCCESS,
  payload: true
});

export const closeInsertPostSuccessPopUp = () => ({
  type: SWITCH_INSERTION_POST_SUCCESS_CLOSE,
  payload: false
});

export const closeUpdatePostSuccessPopUp = () => ({
  type: SWITCH_UPDATE_POST_SUCCESS_CLOSE,
  payload: false
});

export const closeDeletePostSuccessPopUp = () => ({
  type: SWITCH_DELETE_POST_SUCCESS_CLOSE,
  payload: false
});

export const resetInsertPostFields = () => ({
  type: RESET_INSERT_POST_FIELDS,
  payload: ""
});

export const resetUpdatePostFields = () => ({
  type: RESET_UPDATE_POST_FIELDS,
  payload: ""
});

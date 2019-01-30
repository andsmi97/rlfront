import {
  CHANGE_TITLE_FIELD,
  CHANGE_BODY_FIELD,
  REQUEST_PROJECTS_PENDING,
  REQUEST_PROJECTS_FAILED,
  REQUEST_PROJECTS_SUCCESS,
  OPEN_INSERT_PROJECT_WINDOW,
  CLOSE_INSERT_PROJECT_WINDOW,
  OPEN_EDIT_PROJECT_WINDOW,
  CLOSE_EDIT_PROJECT_WINDOW,
  SELECT_EDIT_PROJECT,
  CHANGE_EDIT_TITLE_FIELD,
  CHANGE_EDIT_BODY_FIELD,
  SWITCH_INSERTION_PROJECT_SUCCESS,
  SWITCH_UPDATE_PROJECT_SUCCESS,
  SWITCH_DELETE_PROJECT_SUCCESS,
  SWITCH_INSERTION_PROJECT_SUCCESS_CLOSE,
  SWITCH_UPDATE_PROJECT_SUCCESS_CLOSE,
  SWITCH_DELETE_PROJECT_SUCCESS_CLOSE,
  RESET_INSERT_PROJECT_FIELDS,
  RESET_UPDATE_PROJECT_FIELDS
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

export const setEditTitleField = text => ({
  type: CHANGE_EDIT_TITLE_FIELD,
  payload: text
});

export const setEditBodyField = text => ({
  type: CHANGE_EDIT_BODY_FIELD,
  payload: text
});

export const requestProjects = () => dispatch => {
  const token = window.localStorage.getItem("token");
  dispatch({ type: REQUEST_PROJECTS_PENDING });
  fetch(`${BACKEND_URI}/getprojects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      date: Date.now()
    })
  })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_PROJECTS_SUCCESS, payload: data }))
    .catch(error =>
      dispatch({ type: REQUEST_PROJECTS_FAILED, payload: error })
    );
};

export const openInsertProjectWindow = () => ({
  type: OPEN_INSERT_PROJECT_WINDOW,
  payload: true
});

export const openEditProjectWindow = () => ({
  type: OPEN_EDIT_PROJECT_WINDOW,
  payload: true
});

export const closeInsertProjectWindow = () => ({
  type: CLOSE_INSERT_PROJECT_WINDOW,
  payload: false
});

export const closeEditProjectWindow = () => ({
  type: CLOSE_EDIT_PROJECT_WINDOW,
  payload: false
});

export const selectEditProject = id => ({
  type: SELECT_EDIT_PROJECT,
  payload: id
});

//CHANGE
export const openInsertProjectSuccessPopUp = () => ({
  type: SWITCH_INSERTION_PROJECT_SUCCESS,
  payload: true
});

export const openUpdateProjectSuccessPopUp = () => ({
  type: SWITCH_UPDATE_PROJECT_SUCCESS,
  payload: true
});

export const openDeleteProjectSuccessPopUp = () => ({
  type: SWITCH_DELETE_PROJECT_SUCCESS,
  payload: true
});

export const closeInsertProjectSuccessPopUp = () => ({
  type: SWITCH_INSERTION_PROJECT_SUCCESS_CLOSE,
  payload: false
});

export const closeUpdateProjectSuccessPopUp = () => ({
  type: SWITCH_UPDATE_PROJECT_SUCCESS_CLOSE,
  payload: false
});

export const closeDeleteProjectSuccessPopUp = () => ({
  type: SWITCH_DELETE_PROJECT_SUCCESS_CLOSE,
  payload: false
});

export const resetInsertProjectFields = () => ({
  type: RESET_INSERT_PROJECT_FIELDS,
  payload: ""
});

export const resetUpdateProjectFields = () => ({
  type: RESET_UPDATE_PROJECT_FIELDS,
  payload: ""
});

import {
  SWITCH_INSERTION_SUCCESS,
  SWITCH_UPDATE_SUCCESS,
  SWITCH_DELETE_SUCCESS,
  SWITCH_INSERTION_SUCCESS_CLOSE,
  SWITCH_UPDATE_SUCCESS_CLOSE,
  SWITCH_DELETE_SUCCESS_CLOSE,
  SET_EDIT_WINDOW_PROJECT_ID
} from "./constants.js";

export const openInsertSuccessPopUp = () => ({
    type: SWITCH_INSERTION_SUCCESS,
    payload: true
});

export const openUpdateSuccessPopUp = () => ({
    type: SWITCH_UPDATE_SUCCESS,
    payload: true
});

export const openDeleteSuccessPopUp = () => ({
    type: SWITCH_DELETE_SUCCESS,
    payload: true
});

export const closeInsertSuccessPopUp = () => ({
    type: SWITCH_INSERTION_SUCCESS_CLOSE,
    payload: false
});

export const closeUpdateSuccessPopUp = () => ({
    type: SWITCH_UPDATE_SUCCESS_CLOSE,
    payload: false
});

export const closeDeleteSuccessPopUp = () => ({
    type: SWITCH_DELETE_SUCCESS_CLOSE,
    payload: false
});
export const setEditableProjectID = (id) => ({
    type: SET_EDIT_WINDOW_PROJECT_ID,
    payload: id
});

import {
  CHANGE_SEARCH_FIELD,
  INSERT_TENANT,
  DELETE_TENANT,
  UPDATE_TENANT,
  REQUEST_TENANTS_FAILED,
  REQUEST_TENANTS_SUCCESS,
  REQUEST_TENANTS_PENDING,
  SEND_MESSAGES,
  UPLOAD_FILES,
  CHANGE_INSERT_NAME_FIELD,
  CHANGE_INSERT_EMAIL_FIELD,
  CHANGE_INSERT_HOUSENUMBER_FIELD,
  CHANGE_UPDATE_NAME_FIELD,
  CHANGE_UPDATE_EMAIL_FIELD,
  CHANGE_DELETE_HOUSENUMBER_FIELD,
  CHANGE_MESSAGE_FIELD,
  CHANGE_SUBJECT_FIELD
} from "./constants.js";

//APP part
export const requestTenatns = () => dispatch => {
  dispatch({ type: REQUEST_TENANTS_PENDING });
  fetch("http://localhost:3001/tenants")
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_TENANTS_SUCCESS, patyload: data }))
    .catch(error => dispatch({ type: REQUEST_TENANTS_FAILED, payload: error }));
};

//Tenant part
export const setInsertNameField = text => ({
  type: CHANGE_INSERT_NAME_FIELD,
  payload: text
});

export const setInsertEmailField = text => ({
  type: CHANGE_INSERT_EMAIL_FIELD,
  payload: text
});

export const setInsertHouseNumberField = text => ({
  type: CHANGE_INSERT_HOUSENUMBER_FIELD,
  payload: text
});

export const setUpdateNameField = text => ({
  type: CHANGE_UPDATE_NAME_FIELD,
  payload: text
});

export const setUpdateEmailField = text => ({
  type: CHANGE_UPDATE_EMAIL_FIELD,
  payload: text
});

export const setDeleteHouseNumberField = text => ({
  type: CHANGE_DELETE_HOUSENUMBER_FIELD,
  payload: text
});

export const setSearchField = text => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text
});

//Message part
export const setMessageField = text => ({
  type: CHANGE_MESSAGE_FIELD,
  payload: text
});

export const setSubjectField = text => ({
  type: CHANGE_SUBJECT_FIELD,
  payload: text
});

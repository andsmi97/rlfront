import {
  INSERT_TENANT_FAILED,
  INSERT_TENANT_SUCCESS,
  INSERT_TENANT_PENDING,
  DELETE_TENANT_FAILED,
  DELETE_TENANT_SUCCESS,
  DELETE_TENANT_PENDING,
  UPDATE_TENANT_FAILED,
  UPDATE_TENANT_SUCCESS,
  UPDATE_TENANT_PENDING,
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
  CHANGE_SUBJECT_FIELD,
  CHANGE_SELECTED_TENANTS
} from "./constants.js";


// exportConst insertTenant = () => dispatch => {
//   dispatch({ type: INSERT_TENANT_PENDING});
//   fetch("http://localhost:3001/tenantinsert",{method:"POST",body:})
// }
//APP part
export const requestTenants = () => dispatch => {
  dispatch({ type: REQUEST_TENANTS_PENDING });
  fetch("http://localhost:3001/tenants")
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_TENANTS_SUCCESS, patyload: data }))
    .catch(error => dispatch({ type: REQUEST_TENANTS_FAILED, payload: error }));
};

export const changeTenants = tenants => ({
  type: CHANGE_SELECTED_TENANTS,
  payload: tenants
});

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

//Message part
export const setMessageField = text => ({
  type: CHANGE_MESSAGE_FIELD,
  payload: text
});

export const setSubjectField = text => ({
  type: CHANGE_SUBJECT_FIELD,
  payload: text
});

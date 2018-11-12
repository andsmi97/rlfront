import {
  REQUEST_TENANTS_FAILED,
  REQUEST_TENANTS_SUCCESS,
  REQUEST_TENANTS_PENDING,
  CHANGE_SENDING_FILES,
  REMOVE_SENDING_FILES,
  CHANGE_INSERT_NAME_FIELD,
  CHANGE_INSERT_EMAIL_FIELD,
  CHANGE_INSERT_HOUSENUMBER_FIELD,
  CHANGE_UPDATE_NAME_FIELD,
  CHANGE_UPDATE_EMAIL_FIELD,
  CHANGE_UPDATE_HOUSENUMBER_FIELD,
  CHANGE_DELETE_HOUSENUMBER_FIELD,
  CHANGE_MESSAGE_FIELD,
  CHANGE_SUBJECT_FIELD,
  CHANGE_SELECTED_TENANTS,
  SELECT_ALL_TENANTS_ON_LOAD,
  SWITCH_INSERTION_SUCCESS,
  SWITCH_UPDATE_SUCCESS,
  SWITCH_DELETE_SUCCESS,
  SWITCH_MESSAGE_SEND_SUCCESS,
  SWITCH_INSERTION_SUCCESS_CLOSE,
  SWITCH_UPDATE_SUCCESS_CLOSE,
  SWITCH_DELETE_SUCCESS_CLOSE,
  SWITCH_MESSAGE_SEND_SUCCESS_CLOSE,
  RESET_EMAIL_FIELDS,
  RESET_TENANT_INSERT_FIELDS,
  RESET_TENANT_UPDATE_FIELDS,
  RESET_TENANT_DELETE_FIELDS
} from "./constants.js";
import { createTenantsStringArray } from "./tenantsSupportFunctions";
//APP part
export const requestTenants = () => dispatch => {
  dispatch({ type: REQUEST_TENANTS_PENDING });
  fetch("http://localhost:3001/tenants")
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_TENANTS_SUCCESS, payload: data }))
    .then(data =>
      dispatch({
        type: SELECT_ALL_TENANTS_ON_LOAD,
        payload: createTenantsStringArray(data.payload)
      })
    )
    .catch(error => dispatch({ type: REQUEST_TENANTS_FAILED, payload: error }));
};

export const changeTenants = tenants => ({
  type: CHANGE_SELECTED_TENANTS,
  payload: tenants
});

export const selectAllTenants = tenants => ({
  type: SELECT_ALL_TENANTS_ON_LOAD,
  payload: Object.values(tenants).map(tenant => tenant.name)
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

export const setUpdateHouseNumberField = text => ({
  type: CHANGE_UPDATE_HOUSENUMBER_FIELD,
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

export const setSendingFiles = files => ({
  type: CHANGE_SENDING_FILES,
  payload: files
});

export const removeSendingFiles = () => ({
  type: REMOVE_SENDING_FILES,
  payload: []
});

//Snackbars part
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

export const openMessageSuccessPopUp = () => ({
  type: SWITCH_MESSAGE_SEND_SUCCESS,
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

export const closeMessageSuccessPopUp = () => ({
  type: SWITCH_MESSAGE_SEND_SUCCESS_CLOSE,
  payload: false
});

export const resetEmailFields = () => ({
  type: RESET_EMAIL_FIELDS,
  payload: ""
});
export const resetInsertTenantFields = () => ({
  type: RESET_TENANT_INSERT_FIELDS,
  payload: ""
});
export const resetUpdateTenantFields = () => ({
  type: RESET_TENANT_UPDATE_FIELDS,
  payload: ""
});
export const resetDeleteTenantFields = () => ({
  type: RESET_TENANT_DELETE_FIELDS,
  payload: ""
});

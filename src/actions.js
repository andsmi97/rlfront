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
  CHANGE_DELETE_HOUSENUMBER_FIELD,
  CHANGE_MESSAGE_FIELD,
  CHANGE_SUBJECT_FIELD,
  CHANGE_SELECTED_TENANTS,
  SELECT_ALL_TENANTS_ON_LOAD
} from "./constants.js";
import { createTenantsStringArray } from "./tenantsSupportFunctions";
// exportConst insertTenant = () => dispatch => {
//   dispatch({ type: INSERT_TENANT_PENDING});
//   fetch("http://localhost:3001/tenantinsert",{method:"POST",body:})
// }
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

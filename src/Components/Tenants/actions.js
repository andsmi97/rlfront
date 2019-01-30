import {
  CHANGE_INSERT_TENANT_NAME,
  CHANGE_INSERT_TENANT_EMAIL,
  CHANGE_INSERT_TENANT_HOUSENUMBER,
  CHANGE_EDIT_TENANT_NAME,
  CHANGE_EDIT_TENANT_EMAIL,
  CHANGE_EDIT_TENANT_HOUSENUMBER,
  OPEN_INSERT_TENANT_WINDOW,
  CLOSE_INSERT_TENANT_WINDOW,
  OPEN_EDIT_TENANT_WINDOW,
  CLOSE_EDIT_TENANT_WINDOW,
  RESET_UPDATE_TENANT_FIELDS,
  RESET_INSERT_TENANT_FIELDS,
  SELECT_EDIT_TENANT,
  REQUEST_TENANTS_PENDING,
  REQUEST_TENANTS_SUCCESS,
  REQUEST_TENANTS_FAILED
} from "./constants";

import { BACKEND_URI } from "../../constants";

export const setInsertTenantNameField = text => ({
  type: CHANGE_INSERT_TENANT_NAME,
  payload: text
});

export const setInsertTenantEmailField = text => ({
  type: CHANGE_INSERT_TENANT_EMAIL,
  payload: text
});

export const setInsertTenantHouseNumberField = text => ({
  type: CHANGE_INSERT_TENANT_HOUSENUMBER,
  payload: text
});

export const setEditTenantNameField = text => ({
  type: CHANGE_EDIT_TENANT_NAME,
  payload: text
});

export const setEditTenantEmailField = text => ({
  type: CHANGE_EDIT_TENANT_EMAIL,
  payload: text
});

export const setEditTenantHouseNumberField = text => ({
  type: CHANGE_EDIT_TENANT_HOUSENUMBER,
  payload: text
});

export const requestTenants = () => dispatch => {
  const token = window.localStorage.getItem("token");
  dispatch({ type: REQUEST_TENANTS_PENDING });
  fetch(`${BACKEND_URI}/gettenants`, {
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
    .then(data => dispatch({ type: REQUEST_TENANTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_TENANTS_FAILED, payload: error }));
};

export const openInsertTenantWindow = () => ({
  type: OPEN_INSERT_TENANT_WINDOW,
  payload: true
});

export const openEditTenantWindow = () => ({
  type: OPEN_EDIT_TENANT_WINDOW,
  payload: true
});

export const closeInsertTenantWindow = () => ({
  type: CLOSE_INSERT_TENANT_WINDOW,
  payload: false
});

export const closeEditTenantWindow = () => ({
  type: CLOSE_EDIT_TENANT_WINDOW,
  payload: false
});

export const selectEditTenant = id => ({
  type: SELECT_EDIT_TENANT,
  payload: id
});

export const resetInsertTenantFields = () => ({
  type: RESET_INSERT_TENANT_FIELDS,
  payload: ""
});

export const resetUpdateTenantFields = () => ({
  type: RESET_UPDATE_TENANT_FIELDS,
  payload: ""
});

import {
  REQUEST_TENANTS_FAILED,
  REQUEST_TENANTS_SUCCESS,
  REQUEST_TENANTS_PENDING,
  CHANGE_SELECTED_TENANTS,
  SELECT_ALL_TENANTS_ON_LOAD,
  SELECT_ALL_TENANTS,
  RESET_ALL_TENANTS,
  BACKEND_URI,
  AUTH_PENDING,
  AUTH_SUCCESS,
  AUTH_FAILED,
  SNACK_STATUS_CLOSE,
  SNACK_STATUS_OPEN,
  ALERT_STATUS_CLOSE,
  ALERT_STATUS_OPEN,
  ALERT_STATUS_ACCEPT
} from "./constants.js";
import {
  ON_CORRECT_RESPONSE,
  ON_WRONG_RESPONSE
} from "./Components/Auth/constants";
import { createTenantsStringArray } from "./tenantsSupportFunctions";

//APP part
export const requestTenants = () => dispatch => {
  const token = window.localStorage.getItem("token");
  dispatch({ type: REQUEST_TENANTS_PENDING });
  fetch(`${BACKEND_URI}/tenants`, {
    method: "get",
    headers: {
      Authorization: token
    }
  })
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

export const selectAllTenants = () => ({ type: SELECT_ALL_TENANTS });
export const resetAllTenants = () => ({ type: RESET_ALL_TENANTS });

export const closeSnack = () => ({
  type: SNACK_STATUS_CLOSE,
  payload: false
});

export const openSnack = (type, message) => ({
  type: SNACK_STATUS_OPEN,
  payload: { message, type, status: true }
});

export const closeAlert = () => ({
  type: ALERT_STATUS_CLOSE,
  payload: false
});
export const acceptAlert = () => ({
  type: ALERT_STATUS_ACCEPT,
  payload: { status: false, alertFunction: () => {} }
});

export const openAlert = (message, alertFunction) => ({
  type: ALERT_STATUS_OPEN,
  payload: { message, alertFunction, status: true }
});
//auth
export const authenticate = () => dispatch => {
  const token = window.localStorage.getItem("token");
  if (token) {
    dispatch({ type: AUTH_PENDING, payload: true });
    fetch(`${BACKEND_URI}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.success === "true") {
          dispatch({ type: ON_CORRECT_RESPONSE, payload: true });
        }
        return data;
      })
      .then(data => dispatch({ type: AUTH_SUCCESS, payload: data }))
      .catch(error => {
        dispatch({ type: AUTH_FAILED, payload: error });
        dispatch({ type: ON_WRONG_RESPONSE, payload: error });
      });
  }
};

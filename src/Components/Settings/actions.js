import {
  CHANGE_UPDATE_ADMIN_EMAIL_FIELD,
  CHANGE_UPDATE_ADMIN_MAIL_PASS_FIELD,
  CHANGE_UPDATE_ADMIN_PHONE2_FIELD,
  CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_OLD_FIELD,
  CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_NEW_FIELD,
  CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_REPEAT_FIELD,
  CHANGE_UPDATE_ADMIN_PHONE_FIELD,
  RESET_EMAIL_SETTINGS_FIELDS,
  RESET_ACCOUNT_SETTINGS_FIELDS,
  REQUEST_SETTINGS_PENDING,
  REQUEST_SETTINGS_SUCCESS,
  REQUEST_SETTINGS_FAILED,
    SWITCH_ACCOUNT_UPDATE_SUCCESS,
    SWITCH_ACCOUNT_UPDATE_SUCCESS_CLOSE
} from "./constants";
import { BACKEND_URI } from "../../constants";
//Admin settings

export const requestSettings = () => dispatch => {
  const token = window.localStorage.getItem("token");
  dispatch({ type: REQUEST_SETTINGS_PENDING });
  fetch(`${BACKEND_URI}/users`, {
    method: "get",
    headers: {
      Authorization: token
    }
  })
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_SETTINGS_SUCCESS, payload: data }))
    .catch(error =>
      dispatch({ type: REQUEST_SETTINGS_FAILED, payload: error })
    );
};

export const setUpdateAdminEmail = text => ({
  type: CHANGE_UPDATE_ADMIN_EMAIL_FIELD,
  payload: text
});

export const setUpdateAdminMailPass = text => ({
  type: CHANGE_UPDATE_ADMIN_MAIL_PASS_FIELD,
  payload: text
});

export const setUpdateAdminAccountPassOld = text => ({
  type: CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_OLD_FIELD,
  payload: text
});
export const setUpdateAdminAccountPassNew = text => ({
  type: CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_NEW_FIELD,
  payload: text
});
export const setUpdateAdminAccountPassRepeat = text => ({
  type: CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_REPEAT_FIELD,
  payload: text
});
export const setUpdateAdminPhone = text => ({
  type: CHANGE_UPDATE_ADMIN_PHONE_FIELD,
  payload: text
});
export const setUpdateAdminPhone2 = text => ({
  type: CHANGE_UPDATE_ADMIN_PHONE2_FIELD,
  payload: text
});

export const resetEmailSettingsField = () => ({
  type: RESET_EMAIL_SETTINGS_FIELDS,
  payload: ""
});
export const resetAccountSettingsField = () => ({
  type: RESET_ACCOUNT_SETTINGS_FIELDS,
  payload: ""
});

// export const openEmailUpdateSuccessPopUp = () => ({
//     type: SWITCH_EMAIL_UPDATE_SUCCESS,
//     payload: true
// });

// export const closeEmailUpdateSuccessPopUp = () => ({
//     type: SWITCH_EMAIL_UPDATE_SUCCESS_CLOSE,
//     payload: false
// });

export const openAccountUpdateSuccessPopUp = () => ({
    type: SWITCH_ACCOUNT_UPDATE_SUCCESS,
    payload: true
});

export const closeAccountUpdateSuccessPopUp = () => ({
    type: SWITCH_ACCOUNT_UPDATE_SUCCESS_CLOSE,
    payload: false
});

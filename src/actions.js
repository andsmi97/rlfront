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
  RESET_TENANT_DELETE_FIELDS,
  CHANGE_UPDATE_ADMIN_EMAIL_FIELD,
  CHANGE_UPDATE_ADMIN_MAIL_PASS_FIELD,
  CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_OLD_FIELD,
  CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_NEW_FIELD,
  CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_REPEAT_FIELD,
  CHANGE_UPDATE_ADMIN_PHONE_FIELD,
  RESET_EMAIL_SETTINGS_FIELDS,
  RESET_ACCOUNT_SETTINGS_FIELDS,
  SWITCH_EMAIL_UPDATE_SUCCESS,
  SWITCH_EMAIL_UPDATE_SUCCESS_CLOSE,
  SWITCH_ACCOUNT_UPDATE_SUCCESS,
  SWITCH_ACCOUNT_UPDATE_SUCCESS_CLOSE,
  CHANGE_UPDATE_TARIFFS_FIELD,
  SWITCH_TARIFFS_UPDATE_SUCCESS,
  SWITCH_TARIFFS_UPDATE_SUCCESS_CLOSE,
  RESET_TARIFFS_FIELDS,
  SWITCH_SETTINGS_SUCCESS,
  SWITCH_SETTINGS_SUCCESS_CLOSE,
  SWITCH_TARIFFS_SUCCESS,
  SWITCH_TARIFFS_SUCCESS_CLOSE,
  BACKEND_URI
} from "./constants.js";
import { createTenantsStringArray } from "./tenantsSupportFunctions";

//APP part
export const requestTenants = () => dispatch => {
  dispatch({ type: REQUEST_TENANTS_PENDING });
  fetch(`${BACKEND_URI}/tenants`)
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

//Admin settings

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
export const resetEmailSettingsField = () => ({
  type: RESET_EMAIL_SETTINGS_FIELDS,
  payload: ""
});
export const resetAccountSettingsField = () => ({
  type: RESET_ACCOUNT_SETTINGS_FIELDS,
  payload: ""
});

export const openEmailUpdateSuccessPopUp = () => ({
  type: SWITCH_EMAIL_UPDATE_SUCCESS,
  payload: true
});

export const closeEmailUpdateSuccessPopUp = () => ({
  type: SWITCH_EMAIL_UPDATE_SUCCESS_CLOSE,
  payload: false
});

export const openAccountUpdateSuccessPopUp = () => ({
  type: SWITCH_ACCOUNT_UPDATE_SUCCESS,
  payload: true
});

export const closeAccountUpdateSuccessPopUp = () => ({
  type: SWITCH_ACCOUNT_UPDATE_SUCCESS_CLOSE,
  payload: false
});

//Tariffs

export const setUpdateTariffs = text => ({
  type: CHANGE_UPDATE_TARIFFS_FIELD,
  payload: text
});

export const openUpdateTariffsSuccessPopUp = () => ({
  type: SWITCH_TARIFFS_UPDATE_SUCCESS,
  payload: true
});

export const closeUpdateTariffsSuccessPopUp = () => ({
  type: SWITCH_TARIFFS_UPDATE_SUCCESS_CLOSE,
  payload: false
});

export const resetTariffsField = () => ({
  type: RESET_TARIFFS_FIELDS,
  payload: ""
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

export const openSettingsSuccessPopUp = () => ({
  type: SWITCH_SETTINGS_SUCCESS,
  payload: true
});

export const closeSettingsSuccessPopUp = () => ({
  type: SWITCH_SETTINGS_SUCCESS_CLOSE,
  payload: false
});
export const openTariffsSuccessPopUp = () => ({
  type: SWITCH_TARIFFS_SUCCESS,
  payload: true
});

export const closeTariffsSuccessPopUp = () => ({
  type: SWITCH_TARIFFS_SUCCESS_CLOSE,
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

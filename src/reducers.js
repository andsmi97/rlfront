import {
  REQUEST_TENANTS_FAILED,
  REQUEST_TENANTS_SUCCESS,
  REQUEST_TENANTS_PENDING,
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
  CHANGE_SENDING_FILES,
  REMOVE_SENDING_FILES,
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
  CHANGE_UPDATE_ADMIN_PHONE2_FIELD,
  CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_OLD_FIELD,
  CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_NEW_FIELD,
  CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_REPEAT_FIELD,
  CHANGE_UPDATE_ADMIN_PHONE_FIELD,
  RESET_EMAIL_SETTINGS_FIELDS,
  RESET_ACCOUNT_SETTINGS_FIELDS,
  CHANGE_UPDATE_TARIFFS_FIELD,
  RESET_TARIFFS_FIELDS,
  SWITCH_SETTINGS_SUCCESS,
  SWITCH_SETTINGS_SUCCESS_CLOSE,
  SWITCH_TARIFFS_SUCCESS,
  SWITCH_TARIFFS_SUCCESS_CLOSE,
  ACTION_TENANT_PENDING,
  ACTION_TENANT_SUCCESS,
  ACTION_TENANTS_FAILED,
  SENDING_EMAIL_PENDING,
  SENDING_EMAIL_SUCCESS,
  SENDING_EMAIL_ERROR
} from "./constants.js";
import { getTenantsObjectsFromSelected } from "./tenantsSupportFunctions";
const initialStateEmail = {
  subjectField: "",
  messageField: "",
  files: [],
  isEmailPending: false
};

export const changeEmailInputs = (state = initialStateEmail, action = {}) => {
  switch (action.type) {
    case CHANGE_MESSAGE_FIELD:
      return Object.assign({}, state, { messageField: action.payload });
    case CHANGE_SUBJECT_FIELD:
      return Object.assign({}, state, { subjectField: action.payload });
    case CHANGE_SENDING_FILES:
      return Object.assign({}, state, { files: action.payload });
    case REMOVE_SENDING_FILES:
      return Object.assign({}, state, { files: action.payload });
    case RESET_EMAIL_FIELDS:
      return Object.assign({}, state, {
        subjectField: "",
        messageField: "",
        files: []
      });
    case SENDING_EMAIL_PENDING:
      return Object.assign({}, state, { isEmailPending: true });
    case SENDING_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        isEmailPending: false
      });
    case SENDING_EMAIL_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        isEmailPending: false
      });
    default:
      return state;
  }
};

const initialStateTenants = {
  tenants: [],
  tenantsArray: [],
  selectedTenants: [],
  selectedTenantsObject: {},
  isPending: false,
  error: "",
  isTenantActionPending: false
};

export const requestTenants = (state = initialStateTenants, action = {}) => {
  switch (action.type) {
    case REQUEST_TENANTS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_TENANTS_SUCCESS:
      return Object.assign({}, state, {
        tenants: action.payload,
        isPending: false
      });
    case REQUEST_TENANTS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false
      });
    case SELECT_ALL_TENANTS_ON_LOAD:
      return Object.assign({}, state, {
        tenantsArray: action.payload,
        selectedTenants: action.payload,
        selectedTenantsObject: getTenantsObjectsFromSelected(
          action.payload,
          state.tenants
        )
      });
    case CHANGE_SELECTED_TENANTS:
      return Object.assign({}, state, {
        selectedTenants: action.payload,
        selectedTenantsObject: getTenantsObjectsFromSelected(
          action.payload,
          state.tenants
        )
      });
    case ACTION_TENANT_PENDING:
      return Object.assign({}, state, { isTenantActionPending: true });
    case ACTION_TENANT_SUCCESS:
      return Object.assign({}, state, {
        tenants: action.payload,
        isTenantActionPending: false
      });
    case ACTION_TENANTS_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        isTenantActionPending: false
      });
    default:
      return state;
  }
};

const initialStateFields = {
  insertNameField: "",
  insertEmailField: "",
  insertHouseNumberField: "",
  updateNameField: "",
  updateEmailField: "",
  updateHouseNumberField: "",
  deleteHouseNumberField: ""
};

export const changeTenantsInputs = (
  state = initialStateFields,
  action = {}
) => {
  switch (action.type) {
    case CHANGE_INSERT_NAME_FIELD:
      return Object.assign({}, state, { insertNameField: action.payload });
    case CHANGE_INSERT_EMAIL_FIELD:
      return Object.assign({}, state, { insertEmailField: action.payload });
    case CHANGE_INSERT_HOUSENUMBER_FIELD:
      return Object.assign({}, state, {
        insertHouseNumberField: action.payload
      });
    case CHANGE_UPDATE_HOUSENUMBER_FIELD:
      return Object.assign({}, state, {
        updateHouseNumberField: action.payload
      });
    case CHANGE_UPDATE_NAME_FIELD:
      return Object.assign({}, state, { updateNameField: action.payload });
    case CHANGE_UPDATE_EMAIL_FIELD:
      return Object.assign({}, state, { updateEmailField: action.payload });
    case CHANGE_DELETE_HOUSENUMBER_FIELD:
      return Object.assign({}, state, {
        deleteHouseNumberField: action.payload
      });
    case RESET_TENANT_INSERT_FIELDS:
      return Object.assign({}, state, {
        insertNameField: "",
        insertEmailField: "",
        insertHouseNumberField: ""
      });
    case RESET_TENANT_UPDATE_FIELDS:
      return Object.assign({}, state, {
        updateNameField: "",
        updateEmailField: "",
        updateHouseNumberField: ""
      });
    case RESET_TENANT_DELETE_FIELDS:
      return Object.assign({}, state, {
        deleteHouseNumberField: ""
      });
    default:
      return state;
  }
};

const initialStateSettingsFields = {
  updateAdminEmailField: "",
  updateAdminMailPassField: "",
  updateAdminPhoneField:"",
  updateAdminPhone2Field:"",
  updateAdminAccountPassOldField: "",
  updateAdminAccountPassNewField: "",
  updateAdminAccountPassRepeatField: ""
};

export const changeAdminInputs = (
  state = initialStateSettingsFields,
  action = {}
) => {
  switch (action.type) {
    case CHANGE_UPDATE_ADMIN_EMAIL_FIELD:
      return Object.assign({}, state, {
        updateAdminEmailField: action.payload
      });
    case CHANGE_UPDATE_ADMIN_MAIL_PASS_FIELD:
      return Object.assign({}, state, {
        updateAdminMailPassField: action.payload
      });
    case CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_OLD_FIELD:
      return Object.assign({}, state, {
        updateAdminAccountPassOldField: action.payload
      });
    case CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_NEW_FIELD:
      return Object.assign({}, state, {
        updateAdminAccountPassNewField: action.payload
      });
    case CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_REPEAT_FIELD:
      return Object.assign({}, state, {
        updateAdminAccountPassRepeatField: action.payload
      });
    case CHANGE_UPDATE_ADMIN_PHONE_FIELD:
      return Object.assign({}, state, {
        updateAdminPhoneField: action.payload
      });
    case CHANGE_UPDATE_ADMIN_PHONE2_FIELD:
      return Object.assign({}, state, {
        updateAdminPhoneField2: action.payload
      });
    case RESET_EMAIL_SETTINGS_FIELDS:
      return Object.assign({}, state, {
        updateAdminEmailField: "",
        updateAdminMailPassField: "",
        updateAdminPhoneField: ""
      });
    case RESET_ACCOUNT_SETTINGS_FIELDS:
      return Object.assign({}, state, {
        updateAdminAccountPassOldField: "",
        updateAdminAccountPassNewField: "",
        updateAdminAccountPassRepeatField: ""
      });
    default:
      return state;
  }
};

const initialStateTariffsFields = {
  updateTariffsField: ""
};

export const changeTariffsInputs = (
  state = initialStateTariffsFields,
  action = {}
) => {
  switch (action.type) {
    case CHANGE_UPDATE_TARIFFS_FIELD:
      return Object.assign({}, state, {
        updateTariffsField: action.payload
      });
    case RESET_TARIFFS_FIELDS:
      return Object.assign({}, state, {
        updateTariffsField: ""
      });
    default:
      return state;
  }
};

const initialStateSnackbars = {
  snackInsert: false,
  snackUpdate: false,
  snackDelete: false,
  snackMessageSend: false,
  snackSettings: false,
  snackTariffs: false
};
export const handleSnackbars = (state = initialStateSnackbars, action = {}) => {
  switch (action.type) {
    case SWITCH_INSERTION_SUCCESS:
    case SWITCH_INSERTION_SUCCESS_CLOSE:
      return Object.assign({}, state, { snackInsert: action.payload });
    case SWITCH_UPDATE_SUCCESS:
    case SWITCH_UPDATE_SUCCESS_CLOSE:
      return Object.assign({}, state, { snackUpdate: action.payload });
    case SWITCH_DELETE_SUCCESS:
    case SWITCH_DELETE_SUCCESS_CLOSE:
      return Object.assign({}, state, { snackDelete: action.payload });
    case SWITCH_MESSAGE_SEND_SUCCESS:
    case SWITCH_MESSAGE_SEND_SUCCESS_CLOSE:
      return Object.assign({}, state, { snackMessageSend: action.payload });
    case SWITCH_SETTINGS_SUCCESS:
    case SWITCH_SETTINGS_SUCCESS_CLOSE:
      return Object.assign({}, state, { snackSettings: action.payload });
    case SWITCH_TARIFFS_SUCCESS:
    case SWITCH_TARIFFS_SUCCESS_CLOSE:
      return Object.assign({}, state, { snackTariffs: action.payload });
    default:
      return state;
  }
};

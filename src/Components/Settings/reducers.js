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

} from "./constants";
const initialStateSettingsFields = {
  updateAdminEmailField: "",
  updateAdminMailPassField: "",
  updateAdminPhoneField: "",
  updateAdminPhone2Field: "",
  updateAdminAccountPassOldField: "",
  updateAdminAccountPassNewField: "",
  updateAdminAccountPassRepeatField: "",
  isPending: false,
  error: ""
};

export const settingsReducer = (
  state = initialStateSettingsFields,
  action = {}
) => {
  switch (action.type) {
    case REQUEST_SETTINGS_PENDING:
      return { ...state, isPending: true };
    case REQUEST_SETTINGS_SUCCESS:
      return {
        ...state,
        updateAdminEmailField: action.payload[0].MAIL.USER,
        updateAdminPhoneField: action.payload[0].phone,
        updateAdminPhone2Field: action.payload[0].phone2,
        updateAdminMailPassField: action.payload[0].MAIL.PASSWORD,

        isPending: false
      };
    case REQUEST_SETTINGS_FAILED:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case CHANGE_UPDATE_ADMIN_EMAIL_FIELD:
      return { ...state, updateAdminEmailField: action.payload };
    case CHANGE_UPDATE_ADMIN_MAIL_PASS_FIELD:
      return { ...state, updateAdminMailPassField: action.payload };
    case CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_OLD_FIELD:
      return { ...state, updateAdminAccountPassOldField: action.payload };
    case CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_NEW_FIELD:
      return { ...state, updateAdminAccountPassNewField: action.payload };
    case CHANGE_UPDATE_ADMIN_ACCOUNT_PASS_REPEAT_FIELD:
      return { ...state, updateAdminAccountPassRepeatField: action.payload };
    case CHANGE_UPDATE_ADMIN_PHONE_FIELD:
      return { ...state, updateAdminPhoneField: action.payload };
    case CHANGE_UPDATE_ADMIN_PHONE2_FIELD:
      return { ...state, updateAdminPhone2Field: action.payload };
    case RESET_EMAIL_SETTINGS_FIELDS:
      return {
        ...state,
        updateAdminEmailField: "",
        updateAdminMailPassField: "",
        updateAdminPhoneField: "",
        updateAdminPhone2Field: ""
      };
    case RESET_ACCOUNT_SETTINGS_FIELDS:
      return {
        ...state,
        updateAdminAccountPassOldField: "",
        updateAdminAccountPassNewField: "",
        updateAdminAccountPassRepeatField: ""
      };
    default:
      return state;
  }
};

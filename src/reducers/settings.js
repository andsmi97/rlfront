import {
  ASYNC_START,
  CHANGE_SETTING_FIELD,
  SETTINGS_SAVED,
  PASSWORD_SAVED,
  SETTINGS_LOADED,
  SETTINGS_UNLOADED
} from "../constants/actionTypes.js";

const initialState = {
  email: "",
  mailPass: "",
  phone: "",
  phone2: "",
  oldPass: "",
  newPass: "",
  repeatPass: "",
  isPending: false,
  error: ""
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ASYNC_START:
      return { ...state, isPending: true };
    case CHANGE_SETTING_FIELD:
      return { ...state, [action.field]: action.payload };
    case PASSWORD_SAVED:
      return { ...state, oldPass: "", newPass: "", repeatPass: "" };
    case SETTINGS_SAVED:
      return { ...state, mailPass: "" };
    case SETTINGS_LOADED:
      return {
        ...state,
        email: action.payload.user.emailAccount,
        phone: action.payload.user.phone,
        phone2: action.payload.user.phone2
      };
    case SETTINGS_UNLOADED:
      return initialState;
    default:
      return state;
  }
};

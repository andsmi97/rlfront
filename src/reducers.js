import {
  INSERT_TENANT,
  DELETE_TENANT,
  UPDATE_TENANT,
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
  CHANGE_SUBJECT_FIELD
} from "./constants.js";

const initialStateEmail = {
  subjectField: "",
  messageField: ""
};
export const changeEmailInputs = (state = initialStateEmail, action = {}) => {
  switch (action.type) {
    case CHANGE_MESSAGE_FIELD:
      return Object.assign({}, state, {
        subjectField: action.payload
      });
    case CHANGE_SUBJECT_FIELD:
      return Object.assign({}, state, {
        messageField: action.payload
      });
    default:
      return state;
  }
};
const initialStateTenants = {
  tenants: [],
  insertNameField: "",
  insertEmailField: "",
  insertHouseNumberField: "",
  updateNameField: "",
  updateEmailField: "",
  deleteHouseNumberField: "",
  isPending: false
};

export const changeTenantsInputs = (
  state = initialStateTenants,
  action = {}
) => {
  switch (action.type) {
    case CHANGE_INSERT_NAME_FIELD:
      return Object.assign({}, state, {
        insertNameField: action.payload
      });
    case CHANGE_INSERT_EMAIL_FIELD:
      return Object.assign({}, state, {
        insertEmailField: action.payload
      });
    case CHANGE_INSERT_HOUSENUMBER_FIELD:
      return Object.assign({}, state, {
        insertHouseNumberField: action.payload
      });
    case CHANGE_UPDATE_NAME_FIELD:
      return Object.assign({}, state, {
        updateNameField: action.payload
      });
    case CHANGE_UPDATE_EMAIL_FIELD:
      return Object.assign({}, state, {
        updateEmailField: action.payload
      });
    case CHANGE_DELETE_HOUSENUMBER_FIELD:
      return Object.assign({}, state, {
        deleteHouseNumberField: action.payload
      });
    default:
      return state;
  }
};

const initialStateFiles = {
  files: []
};

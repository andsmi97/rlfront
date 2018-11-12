import {
  REQUEST_TENANTS_FAILED,
  REQUEST_TENANTS_SUCCESS,
  REQUEST_TENANTS_PENDING,
  CHANGE_INSERT_NAME_FIELD,
  CHANGE_INSERT_EMAIL_FIELD,
  CHANGE_INSERT_HOUSENUMBER_FIELD,
  CHANGE_UPDATE_NAME_FIELD,
  CHANGE_UPDATE_EMAIL_FIELD,
  CHANGE_DELETE_HOUSENUMBER_FIELD,
  CHANGE_MESSAGE_FIELD,
  CHANGE_SUBJECT_FIELD,
  CHANGE_SELECTED_TENANTS,
  CHANGE_SENDING_FILES,
  REMOVE_SENDING_FILES,
  SELECT_ALL_TENANTS_ON_LOAD
} from "./constants.js";
import { getTenantsObjectsFromSelected } from "./tenantsSupportFunctions";
const initialStateEmail = {
  subjectField: "",
  messageField: "",
  files: []
};

export const changeEmailInputs = (state = initialStateEmail, action = {}) => {
  switch (action.type) {
    case CHANGE_MESSAGE_FIELD:
      return Object.assign({}, state, {
        messageField: action.payload
      });
    case CHANGE_SUBJECT_FIELD:
      return Object.assign({}, state, {
        subjectField: action.payload
      });
    case CHANGE_SENDING_FILES:
      return Object.assign({}, state, {
        files: action.payload
      });
    case REMOVE_SENDING_FILES:
      return Object.assign({}, state, {
        files: action.payload
      });
    default:
      return state;
  }
};

const initialStateTenants = {
  tenants: {},
  tenantsArray: [],
  selectedTenants: [],
  selectedTenantsObject: {},
  isPending: false,
  error: ""
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
    default:
      return state;
  }
};
// const initialStateSelectedTenants = {
//   selectedTenants: [],
//   selectedTenantsObjects: {}
// };
// export const changeSelectedTenants = (
//   state = initialStateSelectedTenants,
//   action = {}
// ) => {
//   switch (action.type) {
//     case CHANGE_SELECTED_TENANTS:
//       return Object.assign({}, state, {
//         selectedTenants: action.payload
//       });

//     default:
//       return state;
//   }
// };

const initialStateFields = {
  insertNameField: "",
  insertEmailField: "",
  insertHouseNumberField: "",
  updateNameField: "",
  updateEmailField: "",
  deleteHouseNumberField: ""
};

export const changeTenantsInputs = (
  state = initialStateFields,
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

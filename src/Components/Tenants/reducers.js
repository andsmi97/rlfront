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
  RENDER_NEW_TENANT,
  RESET_UPDATE_TENANT_FIELDS,
  RESET_INSERT_TENANT_FIELDS,
  SELECT_EDIT_TENANT,
  REQUEST_TENANTS_PENDING,
  REQUEST_TENANTS_SUCCESS,
  REQUEST_TENANTS_FAILED,
  ACTION_TENANT_PENDING,
  ACTION_TENANT_SUCCESS,
  ACTION_TENANTS_FAILED
} from "./constants.js";
const initialStateTenants = {
  insertTenantName: "",
  insertTenantEmail: "",
  insertTenantHouseNumber: "",
  insertWindowOpened: false,
  editWindowOpened: false,
  editTenantName: "",
  editTenantEmail: "",
  editTenantHouseNumber: "",
  editTenantID: "",
  tenants: [],
  emailError:"",
  nameError:"",
  houseNumberError:"",
  isPending: false,
};

const findTenantByID = (id, state) => {
  return state.tenants.filter(tenant => tenant._id === id)[0];
};
export const tenantsReducer = (state = initialStateTenants, action = {}) => {
  switch (action.type) {
    case REQUEST_TENANTS_PENDING:
      return { ...state, isPending: true };
    case REQUEST_TENANTS_SUCCESS:
      return {
        ...state,
        tenants: action.payload,
        isPending: false
      };
    case REQUEST_TENANTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case CHANGE_INSERT_TENANT_NAME:
      return { ...state, insertTenantName: action.payload };
    case CHANGE_INSERT_TENANT_EMAIL:
      return { ...state, insertTenantEmail: action.payload };
    case CHANGE_INSERT_TENANT_HOUSENUMBER:
      return { ...state, insertTenantHouseNumber: action.payload };
    case CHANGE_EDIT_TENANT_NAME:
      return { ...state, editTenantName: action.payload };
    case CHANGE_EDIT_TENANT_EMAIL:
      return { ...state, editTenantEmail: action.payload };
    case CHANGE_EDIT_TENANT_HOUSENUMBER:
      return { ...state, editTenantHouseNumber: action.payload };
    case OPEN_INSERT_TENANT_WINDOW:
    case CLOSE_INSERT_TENANT_WINDOW:
      return { ...state, insertWindowOpened: action.payload };
    case OPEN_EDIT_TENANT_WINDOW:
    case CLOSE_EDIT_TENANT_WINDOW:
      return { ...state, editWindowOpened: action.payload };
    case SELECT_EDIT_TENANT:
      return {
        ...state,
        editTenantID: action.payload,
        editTenantName: findTenantByID(action.payload, state).name,
        editTenantEmail: findTenantByID(action.payload, state).email,
        editTenantHouseNumber: findTenantByID(action.payload, state)
          .houseNumber,
        editWindowOpened: true,
        insertWindowOpened: false
      };
    case RESET_INSERT_TENANT_FIELDS:
      return {
        ...state,
        insertTenantEmail: "",
        insertTenantHouseNumber: "",
        insertTenantName: "",
        insertWindowOpened: false
      };
    case RESET_UPDATE_TENANT_FIELDS:
      return {
        ...state,
        editTenantEmail: "",
        editTenantHouseNumber: "",
        editTenantName: "",
        editTenantID: "",
        editWindowOpened: false
      };
    case RENDER_NEW_TENANT:
      return {
        ...state,
        loadedTenants: [action.payload, ...state.loadedTenants]
      };
    case ACTION_TENANT_PENDING:
      return { ...state, isTenantActionPending: true };
    case ACTION_TENANT_SUCCESS:
      return {
        ...state,
        tenants: action.payload,
        isTenantActionPending: false
      };
    case ACTION_TENANTS_FAILED:
      return {
        ...state,
        error: action.payload,
        isTenantActionPending: false
      };
    default:
      return state;
  }
};

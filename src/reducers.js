import {
  REQUEST_TENANTS_FAILED,
  REQUEST_TENANTS_SUCCESS,
  REQUEST_TENANTS_PENDING,
  CHANGE_SELECTED_TENANTS,
  SELECT_ALL_TENANTS_ON_LOAD,
  SELECT_ALL_TENANTS,
  RESET_ALL_TENANTS,
  ACTION_TENANT_PENDING,
  ACTION_TENANT_SUCCESS,
  ACTION_TENANTS_FAILED,
  AUTH_PENDING,
  AUTH_SUCCESS,
  AUTH_FAILED,
  SNACK_STATUS_CLOSE,
  SNACK_STATUS_OPEN,
  ALERT_STATUS_CLOSE,
  ALERT_STATUS_OPEN,
  ALERT_STATUS_ACCEPT
} from "./constants.js";
import { getTenantsObjectsFromSelected } from "./tenantsSupportFunctions";

const initialStateApp = {
  snackType: "success",
  snackMessage: "",
  snackStatus: false,
  authPending: false,
  isResponseCorrect: false,
  alertMessage: "",
  alertStatus: false,
  alertFunction: () => {}
};

export const appReducer = (state = initialStateApp, action = {}) => {
  switch (action.type) {
    case AUTH_PENDING:
      return { ...state, authPending: action.payload };
    case AUTH_SUCCESS:
      return {
        ...state,
        isResponseCorrect: true,
        authPending: false
      };
    case AUTH_FAILED:
      return {
        ...state,
        error: action.payload,
        authPending: false
      };
    case SNACK_STATUS_CLOSE:
      return { ...state, snackStatus: action.payload };
    case SNACK_STATUS_OPEN:
      return {
        ...state,
        snackStatus: action.payload.status,
        snackType: action.payload.type,
        snackMessage: action.payload.message
      };
    case ALERT_STATUS_CLOSE:
      return { ...state, alertStatus: action.payload };
    case ALERT_STATUS_OPEN:
      return {
        ...state,
        alertStatus: action.payload.status,
        alertFunction: action.payload.alertFunction,
        alertMessage: action.payload.message
      };
    case ALERT_STATUS_ACCEPT:
      return {
        ...state,
        alertStatus: action.payload.status,
        alertFunction: action.payload.alertFunction
      };
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
    case SELECT_ALL_TENANTS_ON_LOAD:
      return {
        ...state,
        tenantsArray: action.payload,
        selectedTenants: action.payload,
        selectedTenantsObject: getTenantsObjectsFromSelected(
          action.payload,
          state.tenants
        )
      };
    case SELECT_ALL_TENANTS:
      return {
        ...state,
        selectedTenants: [...state.tenantsArray],
        selectedTenantsObject: getTenantsObjectsFromSelected(
          state.tenantsArray,
          state.tenants
        )
      };
    case RESET_ALL_TENANTS:
      return {
        ...state,
        selectedTenants: [],
        selectedTenantsObject: getTenantsObjectsFromSelected(
          [],
          state.tenants
        )
      };
    case CHANGE_SELECTED_TENANTS:
      return {
        ...state,
        selectedTenants: action.payload,
        selectedTenantsObject: getTenantsObjectsFromSelected(
          action.payload,
          state.tenants
        )
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

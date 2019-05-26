import {
  ASYNC_START,
  CHANGE_TABLE_STATE,
  TENANTS_PAGE_LOADED,
  TENANTS_PAGE_UNLOADED,
  TENANT_ADDED,
  TENANT_UPDATED,
  TENANT_DELETED
} from "../constants/actionTypes.js";

const initialState = {
  rows: [],
  sorting: [],
  editingRowIds: [],
  addedRows: [],
  rowChanges: {},
  currentPage: 0,
  pageSize: 10,
  pageSizes: [5, 10, 0],
  selection: [],
  searchValue: "",
  inProgress: true
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_TABLE_STATE:
      return { ...state, [action.key]: action.value };
    case TENANTS_PAGE_LOADED:
      return { ...state, rows: action.payload, inProgress: false };
    case TENANTS_PAGE_UNLOADED:
      return initialState;
    case TENANT_ADDED:
      return { ...state, rows: [...state.rows, action.payload] };
    case TENANT_UPDATED:
      return {
        ...state,
        rows: state.rows.map(row => {
          return row._id === action._id ? action.payload : row;
        })
      };
    case TENANT_DELETED:
      return {
        ...state,
        rows: state.rows.filter(row => row._id !== action._id)
      };
    case ASYNC_START:
      if (action.subtype === TENANTS_PAGE_LOADED) {
        return { ...state, inProgress: true };
      }
      return state;
    default:
      return state;
  }
};

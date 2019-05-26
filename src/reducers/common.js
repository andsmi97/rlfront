import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  SNACK_STATUS_CLOSE,
  SNACK_STATUS_OPEN,
  ARTICLE_SUBMITTED,
  PASSWORD_SAVED
} from "../constants/actionTypes";

const defaultState = {
  appName: "Conduit",
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: "/", token: null, currentUser: null };
    case LOGIN:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case ARTICLE_SUBMITTED:
      return { ...state, redirectTo: `/${action.payload.type}s` };
    case PASSWORD_SAVED:
      return {
        ...state,
        currentUser: action.error ? null : action.payload.user
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
    case LOGIN_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    default:
      return state;
  }
};

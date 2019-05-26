import {
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH
} from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case LOGIN_PAGE_UNLOADED:
      return {};
    case ASYNC_START:
      if (action.subtype === LOGIN) {
        return { ...state, inProgress: true };
      }
      break;
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
  return state;
};

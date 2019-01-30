import {
  SWITCH_INSERTION_SUCCESS,
  SWITCH_UPDATE_SUCCESS,
  SWITCH_DELETE_SUCCESS,
  SWITCH_INSERTION_SUCCESS_CLOSE,
  SWITCH_UPDATE_SUCCESS_CLOSE,
  SWITCH_DELETE_SUCCESS_CLOSE
} from "./constants.js";

const initialStateSnackbars = {
  snackInsert: false,
  snackUpdate: false,
  snackDelete: false,
  snackMessageSend: false
};

export const postReducer = (state = initialStateSnackbars, action = {}) => {
  switch (action.type) {
    case SWITCH_INSERTION_SUCCESS:
    case SWITCH_INSERTION_SUCCESS_CLOSE:
      return { ...state, snackInsert: action.payload };
    case SWITCH_DELETE_SUCCESS:
    case SWITCH_DELETE_SUCCESS_CLOSE:
      return { ...state, snackDelete: action.payload };
    case SWITCH_UPDATE_SUCCESS:
    case SWITCH_UPDATE_SUCCESS_CLOSE:
      return { ...state, snackUpdate: action.payload };
    default:
      return state;
  }
};

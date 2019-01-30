import {
  SWITCH_INSERTION_SUCCESS,
  SWITCH_UPDATE_SUCCESS,
  SWITCH_DELETE_SUCCESS,
  SWITCH_INSERTION_SUCCESS_CLOSE,
  SWITCH_UPDATE_SUCCESS_CLOSE,
  SWITCH_DELETE_SUCCESS_CLOSE,
  SET_EDIT_WINDOW_PROJECT_ID
} from "./constants.js";

const initialStateSnackbars = {
  snackInsert: false,
  snackUpdate: false,
  snackDelete: false,
  snackMessageSend: false,
  editableProjectID: 0
};

export const projectReducer = (state = initialStateSnackbars, action = {}) => {
  switch (action.type) {
    case SET_EDIT_WINDOW_PROJECT_ID:
      return { ...state, editableProjectID: action.payload };
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

import {
  CHANGE_PASSWORD_FIELD,
  SENDING_PASSWORD_PENDING,
  SENDING_PASSWORD_SUCCESS,
  SENDING_PASSWORD_ERROR,
  ON_CORRECT_RESPONSE,
  ON_WRONG_RESPONSE
} from "./constants.js";

const initialStatePassword = {
  passwordField: "",
  isPasswordPending: false,
  error: "",
  isResponseCorrect: false
};
export const authReducer = (state = initialStatePassword, action = {}) => {
  switch (action.type) {
    case CHANGE_PASSWORD_FIELD:
      return {
        ...state,
        passwordField: action.payload,
        error: ""
      };
    case SENDING_PASSWORD_PENDING:
      return { ...state, isPasswordPending: true };
    case SENDING_PASSWORD_SUCCESS:
      return { ...state, isPasswordPending: false };
    case SENDING_PASSWORD_ERROR:
      return {
        ...state,
        error: action.payload,
        isPasswordPending: false
      };
    case ON_CORRECT_RESPONSE:
      return { ...state, isResponseCorrect: true };
    case ON_WRONG_RESPONSE:
      return { ...state, isResponseCorrect: false };
    default:
      return state;
  }
};

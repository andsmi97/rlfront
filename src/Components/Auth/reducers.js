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
      return Object.assign({}, state, {
        passwordField: action.payload
      });
    case SENDING_PASSWORD_PENDING:
      return Object.assign({}, state, {
        isPasswordPending: true
      });
    case SENDING_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isPasswordPending: false
      });
    case SENDING_PASSWORD_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        isPasswordPending: false
      });
    case ON_CORRECT_RESPONSE:
      return Object.assign({}, state, {
        isResponseCorrect: true
      });
    case ON_WRONG_RESPONSE:
      return Object.assign({}, state, {
        isResponseCorrect: false
      });
    default:
      return state;
  }
};

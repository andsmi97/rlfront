import { CHANGE_PASSWORD_FIELD } from "./constants";
export const setPasswordField = text => ({
  type: CHANGE_PASSWORD_FIELD,
  payload: text
});


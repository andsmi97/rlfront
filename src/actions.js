import {
  SNACK_STATUS_CLOSE,
  SNACK_STATUS_OPEN
} from "./constants/actionTypes.js";

export const closeSnack = () => ({
  type: SNACK_STATUS_CLOSE
});

export const openSnack = (type, message) => ({
  type: SNACK_STATUS_OPEN,
  payload: { message, type, status: true }
});

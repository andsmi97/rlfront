import {
  CHANGE_MESSAGE_FIELD,
  CHANGE_SUBJECT_FIELD,
  CHANGE_SENDING_FILES,
  REMOVE_SENDING_FILES,
  RESET_EMAIL_FIELDS
} from "./constants";

export const setMessageField = text => ({
  type: CHANGE_MESSAGE_FIELD,
  payload: text
});

export const setSubjectField = text => ({
  type: CHANGE_SUBJECT_FIELD,
  payload: text
});

export const setSendingFiles = files => ({
  type: CHANGE_SENDING_FILES,
  payload: files
});

export const removeSendingFiles = () => ({
  type: REMOVE_SENDING_FILES,
  payload: []
});
export const resetEmailFields = () => ({
  type: RESET_EMAIL_FIELDS,
  payload: ""
});

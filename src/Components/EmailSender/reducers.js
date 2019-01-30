import {
  CHANGE_MESSAGE_FIELD,
  CHANGE_SUBJECT_FIELD,
  CHANGE_SENDING_FILES,
  REMOVE_SENDING_FILES,
  RESET_EMAIL_FIELDS,
  SENDING_EMAIL_PENDING,
  SENDING_EMAIL_SUCCESS,
  SENDING_EMAIL_ERROR
} from "./constants";
const initialStateEmail = {
  subjectField: "",
  messageField: "",
  files: [],
  isEmailPending: false
};

export const emailReducer = (state = initialStateEmail, action = {}) => {
  switch (action.type) {
    case CHANGE_MESSAGE_FIELD:
      return { ...state, messageField: action.payload };
    case CHANGE_SUBJECT_FIELD:
      return { ...state, subjectField: action.payload };
    case CHANGE_SENDING_FILES:
      return { ...state, files: action.payload };
    case REMOVE_SENDING_FILES:
      return { ...state, files: action.payload };
    case RESET_EMAIL_FIELDS:
      return {
        ...state,
        subjectField: "",
        messageField: "",
        files: []
      };
    case SENDING_EMAIL_PENDING:
      return { ...state, isEmailPending: true };
    case SENDING_EMAIL_SUCCESS:
      return { ...state, isEmailPending: false };
    case SENDING_EMAIL_ERROR:
      return {
        ...state,
        error: action.payload,
        isEmailPending: false
      };
    default:
      return state;
  }
};

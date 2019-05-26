import {
  CHANGE_MESSAGE_FIELD,
  ASYNC_START,
  ASYNC_END,
  EMAIL_SEND
} from "../constants/actionTypes";
const initialStateEmail = {
  subjectField: "",
  messageField: "",
  files: [],
  isPending: false
};

export default (state = initialStateEmail, action = {}) => {
  switch (action.type) {
    case CHANGE_MESSAGE_FIELD:
      return { ...state, [action.key]: action.value };
    case EMAIL_SEND:
      return initialStateEmail;
    case ASYNC_START:
      if (action.subtype === EMAIL_SEND) {
        return { ...state, isPending: true };
      }
      return state;
    case ASYNC_END:
      return { ...state, isPending: false };
    default:
      return state;
  }
};

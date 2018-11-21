import { CHANGE_TITLE_FIELD, CHANGE_BODY_FIELD } from "./constants";
const initialStatePosts = {
  titleField: "",
  bodyField: ""
};

export const postsReducer = (state = initialStatePosts, action = {}) => {
  switch (action.type) {
    case CHANGE_TITLE_FIELD:
      return Object.assign({}, state, {
        titleField: action.payload
      });
    case CHANGE_BODY_FIELD:
      return Object.assign({}, state, {
        bodyField: action.payload
      });
    default:
      return state;
  }
};

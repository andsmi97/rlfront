import {
  CHANGE_TITLE_FIELD,
  CHANGE_BODY_FIELD,
  REQUEST_POSTS_PENDING,
  REQUEST_POSTS_FAILED,
  REQUEST_TPOSTS_SUCCESS
} from "./constants";
import { BACKEND_URI } from "../../constants";
export const setTitleField = text => ({
  type: CHANGE_TITLE_FIELD,
  payload: text
});

export const setBodyField = text => ({
  type: CHANGE_BODY_FIELD,
  payload: text
});

export const requestPosts = () => dispatch => {
  dispatch({ type: REQUEST_POSTS_PENDING });
  fetch(`${BACKEND_URI}/getposts`);
};

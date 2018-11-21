import {
     CHANGE_TITLE_FIELD,
     CHANGE_BODY_FIELD,
 } from "./constants";


export const setTitleField = text => ({
  type: CHANGE_TITLE_FIELD,
  payload: text
});

export const setBodyField = text => ({
    type: CHANGE_BODY_FIELD,
    payload: text
});

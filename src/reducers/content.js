import { arrayMove } from "react-sortable-hoc";
import {
  REORDER_LIST,
  CONTENT_LOADED,
  CONTENT_UNLOADED,
  CONTENT_DELETED,
  CONTENT_UPDATED,
  CONTENT_ADDED,
  ASYNC_START,
  ON_SALES_TEXT_CHANGE
} from "../constants/actionTypes";
const initialState = {
  carousel: [],
  advertising: [],
  genPlan: [],
  gallery: [],
  path: [],
  isPending: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REORDER_LIST:
      return {
        ...state,
        [action.section]: arrayMove(
          state[action.section],
          action.payload.oldIndex,
          action.payload.newIndex
        )
      };
    case ASYNC_START:
      if (action.subtype === CONTENT_LOADED) {
        return { ...state, isPending: true };
      }
      return state;
    case ON_SALES_TEXT_CHANGE:
      return { ...state, salesText: action.payload };
    case CONTENT_LOADED:
      return { ...state, ...action.payload, isPending: false };
    case CONTENT_UPDATED:
      return { ...state, [action.section]: action.values };
    case CONTENT_ADDED:
      return {
        ...state,
        [action.payload.section]: [
          ...state[action.payload.section],
          action.payload.content
        ]
      };
    case CONTENT_DELETED:
      return {
        ...state,
        [action.section]: [
          ...state[action.section].filter((_item, index) => index !== action.id)
        ]
      };
    case CONTENT_UNLOADED:
      return initialState;
    default:
      return state;
  }
};

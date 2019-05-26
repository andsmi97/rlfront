import { arrayMove } from "react-sortable-hoc";
import {
  REORDER_LIST,
  CONTENT_LOADED,
  CONTENT_UNLOADED,
  ASYNC_START
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
    case CONTENT_LOADED:
      return { ...state, ...action.payload, isPending: false };
    case CONTENT_UNLOADED:
      return initialState;
    default:
      return state;
  }
};

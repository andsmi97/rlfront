import {
  RENDER_NEW_PHOTO,
  RENDER_UPDATE_PHOTO,
  RENDER_DELETE_PHOTO

  // SELECT_LAST_POSTS_ON_LOAD
} from "./constants.js";
const initialStateSections = {
  carousel: [],
  advertising: [],
  genPlan: [],
  gallery: [],
  path: []
};
const replaceImage = (array, findImage, insertImage) => {
  let changedArray = [...array];
  let index = changedArray.indexOf(findImage);
  if (index !== -1) {
    changedArray[index] = insertImage;
  }
  return changedArray;
};
export const sectionReducer = (state = initialStateSections, action = {}) => {
  switch (action.type) {
    case RENDER_NEW_PHOTO:
      return {
        ...state,
        [action.payload.section]: [...state.loadedPosts, action.payload.photo]
      };
    case RENDER_UPDATE_PHOTO:
      return {
        ...state,
        [action.payload.section]: replaceImage(
          state[action.payload.section],
          action.payload.oldImage,
          action.payload.newImage
        )
      };
    case RENDER_DELETE_PHOTO:
      return {
        ...state,
        loadedPosts: state.loadedPosts.filter(
          post => post._id !== action.payload._id
        )
      };
    default:
      return state;
  }
};

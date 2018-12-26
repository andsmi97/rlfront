import {
  RENDER_NEW_PHOTO,
  RENDER_UPDATE_PHOTO,
  RENDER_DELETE_PHOTO,
  REQUEST_SECTION_IMAGES_SUCCESS,
  REQUEST_SECTION_IMAGES_PENDING,
  REQUEST_SECTION_IMAGES_FAILED,
  REORDER_SECTION,
  ADD_SECTION_IMAGE
} from "./constants.js";
const initialStateSections = {
  carousel: [],
  advertising: [],
  genPlan: [],
  gallery: [],
  path: []
};

const findImageIndex = (image, state, section) => {
  return state[section].reduce((acc, item, index) => {
    return item.content === image ? index : acc;
  }, -1);
};

const replaceImage = (section, findImage, insertImage, state) => {
  let changedArray = Array.from(state[section]);
  let index = findImageIndex(findImage, state, section);
  if (index !== -1) {
    changedArray[index].content = insertImage;
  }
  return changedArray;
};
const removeImage = (array, removeImage) => {
  return array.filter(image => image !== removeImage);
};
export const sectionImagesReducer = (
  state = initialStateSections,
  action = {}
) => {
  switch (action.type) {
    case ADD_SECTION_IMAGE:
      return {
        ...state,
        [action.payload.section]: [
          ...state[action.payload.section],
          action.payload.item
        ]
      };
    case RENDER_UPDATE_PHOTO:
      return Object.assign({}, state, {
        [action.payload.section]: state[action.payload.section].map(item => {
          if (item.content === action.payload.oldImage) {
            item.content = action.payload.newImage;
          }
          return item;
        })
      });
    case RENDER_DELETE_PHOTO:
      return {
        ...state,
        ...{
          [action.payload.section]: state[action.payload.section].filter(
            item => item.content !== action.payload.image
          )
        }
      };
    case REQUEST_SECTION_IMAGES_SUCCESS:
      return {
        ...state,
        carousel: action.payload.carousel.map((image, index) => {
          return {
            id: `${index}`,
            content: image,
            section: "carousel"
          };
        }),
        advertising: action.payload.advertising.map((image, index) => {
          return {
            id: `${index}`,
            content: image,
            section: "advertising"
          };
        }),
        genPlan: action.payload.genPlan.map((image, index) => {
          return { id: `${index}`, content: image, section: "genPlan" };
        }),
        gallery: action.payload.gallery.map((image, index) => {
          return { id: `${index}`, content: image, section: "gallery" };
        }),
        path: action.payload.path.map((image, index) => {
          return { id: `${index}`, content: image, section: "path" };
        })
      };
    case REORDER_SECTION:
      return {
        ...state,
        ...{ [action.payload.section]: action.payload.order }
      };
    default:
      return state;
  }
};

import {
  RENDER_UPDATE_PHOTO,
  RENDER_DELETE_PHOTO,
  REQUEST_SECTION_IMAGES_SUCCESS,
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
      return {
        ...state,
        [action.payload.section]: action.payload.photos.map((image, index) => {
          return {
            id: `${index}`,
            content: image,
            section: action.payload.section
          };
        })
      };
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

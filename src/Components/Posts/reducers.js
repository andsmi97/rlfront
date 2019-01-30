import {
  CHANGE_TITLE_FIELD,
  CHANGE_POST_BODY_FIELD,
  REQUEST_POSTS_SUCCESS,
  OPEN_INSERT_POST_WINDOW,
  CLOSE_INSERT_POST_WINDOW,
  OPEN_EDIT_POST_WINDOW,
  CLOSE_EDIT_POST_WINDOW,
  SELECT_EDIT_POST,
  CHANGE_EDIT_TITLE_FIELD,
  CHANGE_EDIT_POST_BODY_FIELD,
  RESET_INSERT_POST_FIELDS,
  RESET_UPDATE_POST_FIELDS,
  RENDER_NEW_POST,
  RENDER_UPDATE_POST,
  RENDER_DELETE_POST,
  SET_PREVIEW_POST_IMAGE_1,
  SET_UPLOAD_FILE_1,
  SET_DELETE_IMAGE,
  SET_DELETE_TO_FALSE
  // SELECT_LAST_POSTS_ON_LOAD
} from "./constants.js";
const initialStatePosts = {
  titleField: "",
  bodyField: "",
  isPending: false,
  loadedPosts: [],
  insertWindowOpened: false,
  editWindowOpended: false,
  editTitleField: "",
  editBodyField: "",
  editPostID: "",
  editFile1: {},
  previewEditImage1: "",
  deleteEditImage: false
};

const findPostByID = (id, state) => {
  // console.log(state.loadedPosts.filter(post => (post._id = id)));
  return state.loadedPosts.filter(post => post._id === id)[0];
};
const findPostIndexByID = (id, state) => {
  return state.loadedPosts.reduce((acc, post, index) => {
    if (post._id === id) return acc + index;
    else return acc;
  }, 0);
};

export const postsReducer = (state = initialStatePosts, action = {}) => {
  switch (action.type) {
    case CHANGE_TITLE_FIELD:
      return { ...state, titleField: action.payload };
    case CHANGE_POST_BODY_FIELD:
      return { ...state, bodyField: action.payload };
    case CHANGE_EDIT_TITLE_FIELD:
      return { ...state, editTitleField: action.payload };
    case CHANGE_EDIT_POST_BODY_FIELD:
      return { ...state, editBodyField: action.payload };
    case REQUEST_POSTS_SUCCESS:
      return {
        ...state,
        loadedPosts: action.payload,
        isPending: false
      };
    case OPEN_INSERT_POST_WINDOW:
    case CLOSE_INSERT_POST_WINDOW:
      return { ...state, insertWindowOpened: action.payload };
    case OPEN_EDIT_POST_WINDOW:
    case CLOSE_EDIT_POST_WINDOW:
      return { ...state, editWindowOpended: action.payload };
    case SELECT_EDIT_POST:
      return {
        ...state,
        editPostID: action.payload,
        editBodyField: findPostByID(action.payload, state).body,
        editTitleField: findPostByID(action.payload, state).title,
        editImage1: findPostByID(action.payload, state).image,
        editWindowOpended: true,
        insertWindowOpened: false
      };
    case SET_DELETE_IMAGE:
      return {
        ...state,
        deleteEditImage: !state.deleteEditImage
      };
    case SET_DELETE_TO_FALSE:
      return { ...state, deleteEditImage: false };
    case RESET_INSERT_POST_FIELDS:
      return {
        ...state,
        titleField: "",
        bodyField: "",
        insertWindowOpened: false
      };
    case RESET_UPDATE_POST_FIELDS:
      return {
        ...state,
        editTitleField: "",
        editBodyField: "",
        editPostID: "",
        editWindowOpended: false
      };
    case RENDER_NEW_POST:
      return { ...state, loadedPosts: [action.payload, ...state.loadedPosts] };
    case RENDER_UPDATE_POST:
      return {
        ...state,
        loadedPosts: state.loadedPosts.map((post, index) => {
          if (index === findPostIndexByID(action.payload._id, state)) {
            return action.payload;
          }
          return post;
        })
      };
    case SET_PREVIEW_POST_IMAGE_1:
      return { ...state, previewEditImage1: action.payload };
    case SET_UPLOAD_FILE_1:
      return { ...state, editFile1: action.payload };
    case RENDER_DELETE_POST:
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

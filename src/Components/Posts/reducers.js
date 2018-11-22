import {
  CHANGE_TITLE_FIELD,
  CHANGE_BODY_FIELD,
  REQUEST_POSTS_SUCCESS,
  // SELECT_LAST_POSTS_ON_LOAD
} from "./constants";
const initialStatePosts = {
  titleField: "",
  bodyField: "",
  isPending: false,
  loadedPosts: []
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
    case REQUEST_POSTS_SUCCESS:
      return Object.assign({}, state, {
        loadedPosts: action.payload,
        isPending: false
      });
    // case SELECT_LAST_POSTS_ON_LOAD:
    //   return Object.assign({}, state, {
    //     tenantsArray: action.payload,
    //     selectedTenants: action.payload,
    //     selectedTenantsObject: getTenantsObjectsFromSelected(
    //       action.payload,
    //       state.tenants
    //     )
    //   });
    default:
      return state;
  }
};

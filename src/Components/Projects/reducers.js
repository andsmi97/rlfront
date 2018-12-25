import {
  CHANGE_TITLE_FIELD,
  CHANGE_BODY_FIELD,
  REQUEST_PROJECTS_SUCCESS,
  OPEN_INSERT_PROJECT_WINDOW,
  CLOSE_INSERT_PROJECT_WINDOW,
  OPEN_EDIT_PROJECT_WINDOW,
  CLOSE_EDIT_PROJECT_WINDOW,
  SELECT_EDIT_PROJECT,
  CHANGE_EDIT_TITLE_FIELD,
  CHANGE_EDIT_BODY_FIELD,
  SWITCH_INSERTION_PROJECT_SUCCESS,
  SWITCH_INSERTION_PROJECT_SUCCESS_CLOSE,
  SWITCH_UPDATE_PROJECT_SUCCESS,
  SWITCH_UPDATE_PROJECT_SUCCESS_CLOSE,
  SWITCH_DELETE_PROJECT_SUCCESS,
  SWITCH_DELETE_PROJECT_SUCCESS_CLOSE,
  RESET_INSERT_PROJECT_FIELDS,
  RESET_UPDATE_PROJECT_FIELDS,
  RENDER_NEW_PROJECT,
  RENDER_UPDATE_PROJECT,
  RENDER_DELETE_PROJECT,
  SET_PREVIEW_IMAGE_2,
  SET_PREVIEW_IMAGE_1,
  SET_UPLOAD_FILE_2,
  SET_UPLOAD_FILE_1

  // SELECT_LAST_projects_ON_LOAD
} from "./constants.js";
const initialStateprojects = {
  titleField: "",
  bodyField: "",
  isPending: false,
  loadedProjects: [],
  insertWindowOpened: false,
  editWindowOpended: false,
  editTitleField: "",
  editBodyField: "",
  editProjectID: "",
  previewEditImage1: "",
  editImage1: "",
  previewEditImage2: "",
  editImage2: "",
  editFile1: {},
  editFile2: {},
  snackInsert: false,
  snackUpdate: false,
  snackDelete: false
};

const findProjectByID = (id, state) => {
  // console.log(state.loadedProjects.filter(project => (project._id = id)));
  return state.loadedProjects.filter(project => project._id === id)[0];
};
const findProjectIndexByID = (id, state) => {
  return state.loadedProjects.reduce((acc, project, index) => {
    if (project._id === id) return acc + index;
    else return acc;
  }, 0);
};
export const projectsReducer = (state = initialStateprojects, action = {}) => {
  switch (action.type) {
    case CHANGE_TITLE_FIELD:
      return Object.assign({}, state, { titleField: action.payload });
    case CHANGE_BODY_FIELD:
      return Object.assign({}, state, { bodyField: action.payload });
    case CHANGE_EDIT_TITLE_FIELD:
      return Object.assign({}, state, { editTitleField: action.payload });
    case CHANGE_EDIT_BODY_FIELD:
      return Object.assign({}, state, { editBodyField: action.payload });
    case REQUEST_PROJECTS_SUCCESS:
      return Object.assign({}, state, {
        loadedProjects: action.payload,
        isPending: false
      });
    case OPEN_INSERT_PROJECT_WINDOW:
    case CLOSE_INSERT_PROJECT_WINDOW:
      return Object.assign({}, state, { insertWindowOpened: action.payload });
    case OPEN_EDIT_PROJECT_WINDOW:
    case CLOSE_EDIT_PROJECT_WINDOW:
      return Object.assign({}, state, { editWindowOpended: action.payload });
    case SELECT_EDIT_PROJECT:
      return Object.assign({}, state, {
        editProjectID: action.payload,
        editBodyField: findProjectByID(action.payload, state).body,
        editTitleField: findProjectByID(action.payload, state).title,
        editImage1: findProjectByID(action.payload, state).image1,
        editImage2: findProjectByID(action.payload, state).image2,
        previewEditImage1:"",
        previewEditImage2:"",
        editWindowOpended: true,
        insertWindowOpened: false
      });
    case SWITCH_INSERTION_PROJECT_SUCCESS:
    case SWITCH_INSERTION_PROJECT_SUCCESS_CLOSE:
      return Object.assign({}, state, { snackInsert: action.payload });
    case SWITCH_UPDATE_PROJECT_SUCCESS:
    case SWITCH_UPDATE_PROJECT_SUCCESS_CLOSE:
      return Object.assign({}, state, { snackUpdate: action.payload });
    case SWITCH_DELETE_PROJECT_SUCCESS:
    case SWITCH_DELETE_PROJECT_SUCCESS_CLOSE:
      return Object.assign({}, state, { snackDelete: action.payload });
    case SET_PREVIEW_IMAGE_2:
      return Object.assign({}, state, { previewEditImage2: action.payload });
    case SET_PREVIEW_IMAGE_1:
      return Object.assign({}, state, { previewEditImage1: action.payload });
    case SET_UPLOAD_FILE_1:
      return Object.assign({}, state, { editFile1: action.payload });
    case SET_UPLOAD_FILE_2:
      return Object.assign({}, state, { editFile2: action.payload });
    case RESET_INSERT_PROJECT_FIELDS:
      return Object.assign({}, state, {
        titleField: "",
        bodyField: "",
        insertWindowOpened: false
      });
    case RESET_UPDATE_PROJECT_FIELDS:
      return Object.assign({}, state, {
        editTitleField: "",
        editBodyField: "",
        editProjectID: "",
        editImage1: "",
        editFile1:{},
        editFile2:{},
        editImage2:"",
        editWindowOpended: false
      });
    case RENDER_NEW_PROJECT:
      return {
        ...state,
        loadedProjects: [action.payload, ...state.loadedProjects]
      };
    case RENDER_UPDATE_PROJECT:
      return {
        ...state,
        loadedProjects: state.loadedProjects.map((project, index) => {
          if (index === findProjectIndexByID(action.payload._id, state)) {
            return action.payload;
          }
          return project;
        })
      };
    case RENDER_DELETE_PROJECT:
      return {
        ...state,
        loadedProjects: state.loadedProjects.filter(
          project => project._id !== action.payload._id
        )
      };
    // case SELECT_LAST_projects_ON_LOAD:
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

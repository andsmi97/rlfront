import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { sectionImagesReducer } from "../Components/SectionImages/reducers";
import tenants from "../reducers/tenants";
import auth from "../reducers/auth";
import common from "../reducers/common";
import email from "../reducers/email";
import articles from "../reducers/articles";
import settings from "../reducers/settings";
import content from "../reducers/content";

export default history =>
  combineReducers({
    settings,
    content,
    sectionImagesReducer,
    tenants,
    common,
    email,
    auth,
    articles,
    router: connectRouter(history)
  });

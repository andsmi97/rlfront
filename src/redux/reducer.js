import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import tenants from "../reducers/tenants";
import auth from "../reducers/auth";
import common from "../reducers/common";
import email from "../reducers/email";
import articles from "../reducers/articles";
import settings from "../reducers/settings";
import content from "../reducers/content";
import sensordata from "../reducers/sensordata";

export default history =>
  combineReducers({
    settings,
    content,
    tenants,
    common,
    email,
    auth,
    sensordata,
    articles,
    router: connectRouter(history)
  });

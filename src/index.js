import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import {
  changeEmailInputs,
  changeTenantsInputs,
  requestTenants,
  handleSnackbars,
  changeAdminInputs,
  changeTariffsInputs
} from "./reducers";
import { authReducer } from "./Components/Auth/reducers.js";
import { postsReducer } from "./Components/Posts/reducers.js";
import { projectsReducer } from "./Components/Projects/reducers.js";
import { postReducer } from "./Components/Posts/Post/reducers.js";
import { projectReducer } from "./Components/Projects/Project/reducers.js";
import { sectionImagesReducer } from "./Components/SectionImages/reducers.js";
const logger = createLogger();
const rootReducer = combineReducers({
  changeEmailInputs,
  changeTenantsInputs,
  requestTenants,
  handleSnackbars,
  postsReducer,
  postReducer,
  changeAdminInputs,
  changeTariffsInputs,
  authReducer,
  projectsReducer,
  projectReducer,
  sectionImagesReducer
});
let store = "";
if (process.env.NODE_ENV === "production") {
  store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
}
store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

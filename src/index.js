import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { requestTenants } from "./reducers";
import { appReducer } from "./reducers";

import { emailReducer } from "./Components/EmailSender/reducers";
import { tariffsReducer } from "./Components/Tariffs/reducers";
import { settingsReducer } from "./Components/Settings/reducers";
import { authReducer } from "./Components/Auth/reducers";
import { postsReducer } from "./Components/Posts/reducers";
import { projectsReducer } from "./Components/Projects/reducers";
import { tenantsReducer } from "./Components/Tenants/reducers";
import { postReducer } from "./Components/Posts/Post/reducers";
import { projectReducer } from "./Components/Projects/Project/reducers";
import { sectionImagesReducer } from "./Components/SectionImages/reducers";

const logger = createLogger();
const rootReducer = combineReducers({
  emailReducer,
  requestTenants,
  postsReducer,
  postReducer,
  settingsReducer,
  tariffsReducer,
  authReducer,
  projectsReducer,
  projectReducer,
  sectionImagesReducer,
  tenantsReducer,
  appReducer
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

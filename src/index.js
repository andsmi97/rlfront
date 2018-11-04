import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { Provider } from "react-redux";
import { changeEmailInputs, changeTenantsInputs, changeSelectedTenants } from "./reducers";

const logger = createLogger();
const rootReducer = combineReducers({ changeEmailInputs, changeTenantsInputs, changeSelectedTenants });
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);
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

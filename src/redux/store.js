import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { promiseMiddleware, localStorageMiddleware } from "./middleware";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import reducer from "./reducer";

export const history = createBrowserHistory();

const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(
      thunkMiddleware,
      myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware
    );
  } else {
    return applyMiddleware(
      thunkMiddleware,
      myRouterMiddleware,
      promiseMiddleware,
      localStorageMiddleware,
      createLogger()
    );
  }
};

export const store = createStore(
  reducer(history),
  composeWithDevTools(getMiddleware())
);

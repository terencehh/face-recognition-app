import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import "tachyons";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  userDefaults,
  urlField,
  faceBoxes,
  signIn,
  register
} from "./reducers";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  userDefaults,
  urlField,
  faceBoxes,
  signIn,
  register
});

const logger = createLogger();

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
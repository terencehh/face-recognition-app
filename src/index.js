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
import thunkMiddleware from "redux-thunk";

// USE LOGGER FOR DEVELOPMENT WHEN DEBUGGING
// import { createLogger } from "redux-logger";

const rootReducer = combineReducers({
  userDefaults,
  urlField,
  faceBoxes,
  signIn,
  register
});

// APPLY LOGGER WHEN IN DEVELOPMENT BUILD
// const logger = createLogger();

const store = createStore(
  rootReducer,
  // APPLY REDUX LOGGER WHEN IN DEVELOPMENT BUILD
  applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

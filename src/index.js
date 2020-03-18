import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "tachyons";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {} from "./reducers";
import { createLogger } from "redux-logger";

const rootReducer = combineReducers({});

const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

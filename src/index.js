import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { loadState } from "./saveState";

const persistedState = loadState();
const storeCreate = createStore(
  reducers,
  persistedState,
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={storeCreate}>
    <App />
  </Provider>,
  document.getElementById("root")
);

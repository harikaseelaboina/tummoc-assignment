// store.js

import { legacy_createStore as createStore } from "@reduxjs/toolkit";

import cookieReducer from "./reducer";

const store = createStore(cookieReducer);

export default store;

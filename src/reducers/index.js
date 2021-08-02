import { combineReducers } from "redux";

import paginationReducer from "./pagination";

const rootReducer = combineReducers({
  users: paginationReducer,
});

export default rootReducer;

import { combineReducers } from "redux";

import paginationReducer from "./pagination";
import { sagaReducer } from "./saga-users";

const rootReducer = combineReducers({
  users: paginationReducer,
  users2: sagaReducer,
});

export default rootReducer;

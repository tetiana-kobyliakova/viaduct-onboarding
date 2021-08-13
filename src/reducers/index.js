import { combineReducers } from "redux";

import paginationReducer from "./pagination";
import { contactsReducer } from "./user-contacts";
import { profileReducer } from "./profile";
const rootReducer = combineReducers({
  users: paginationReducer,
  userContacts: contactsReducer,
  profile: profileReducer,
});

export default rootReducer;

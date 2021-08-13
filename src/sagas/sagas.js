import { all } from "@redux-saga/core/effects";

import { saga as Contacts } from "../reducers/user-contacts";
import { saga as Profile } from "../reducers/profile";

export function* watcherSaga() {
  yield all([Contacts(), Profile()]); //;
}

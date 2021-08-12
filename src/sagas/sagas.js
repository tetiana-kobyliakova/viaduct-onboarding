import { takeLatest, call, put } from "@redux-saga/core/effects";

export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

function fetchUser() {
  return fetch("https://randomuser.me/api/?page=1&results=12&seed=abc").then(
    (res) => res.json()
  );
}

function* workerSaga() {
  try {
    const response = yield call(fetchUser);
    const users = response.results;
    yield put({ type: "API_CALL_SUCCESS", users });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE", error });
  }
}

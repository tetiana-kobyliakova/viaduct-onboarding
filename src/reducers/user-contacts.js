import { call, put, take } from "@redux-saga/core/effects";
const namespace = "userContacts";
const API_CALL_REQUEST = `${namespace}/API_CALL_REQUEST`;
const API_CALL_SUCCESS = `${namespace}/API_CALL_SUCCESS`;
const API_CALL_FAILURE = `${namespace}/API_CALL_FAILURE`;

const initialState = {
  fetching: false,
  contacts: [],
  error: null,
};

export function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, contacts: action.contacts };
    case API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        contacts: null,
        error: action.error.message,
      };
    default:
      return state;
  }
}

function fetchContacts() {
  return fetch("https://randomuser.me/api/?page=1&results=12&seed=abc").then(
    (res) => res.json()
  );
}

export function* saga() {
  yield getContacts(); //;
}

// function* workerSaga() {
//   try {
//     const response = yield call(fetchUser);
//     const users = response.results;
//     yield put({ type: API_CALL_SUCCESS, users });
//   } catch (error) {
//     yield put({ type: API_CALL_FAILURE, error });
//   }
// }

function* getContacts() {
  while (true) {
    yield take(API_CALL_REQUEST);
    try {
      const response = yield call(fetchContacts);
      const contacts = response.results;
      yield put({ type: API_CALL_SUCCESS, contacts });
    } catch (error) {
      yield put({ type: API_CALL_FAILURE, error });
    }
  }
}

export const contactsSelector = (state) => state[namespace];

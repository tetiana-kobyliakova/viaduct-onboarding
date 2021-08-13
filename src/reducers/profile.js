import { call, put, take } from "@redux-saga/core/effects";

const namespace = "profile";

const API_CALL_REQUEST = `${namespace}/API_CALL_REQUEST`;
const API_CALL_SUCCESS = `${namespace}/API_CALL_SUCCESS`;
const API_CALL_FAILURE = `${namespace}/API_CALL_FAILURE`;

const initialState = {
  fetching: false,
  profile: null,
  error: null,
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, profile: action.profile };
    case API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        profile: null,
        error: action.error.message,
      };
    default:
      return state;
  }
}

function fetchProfile() {
  return fetch("https://randomuser.me/api/?seed=abcd").then((res) =>
    res.json()
  );
}

export function* saga() {
  yield getProfile();
}

function* getProfile() {
  while (true) {
    yield take(API_CALL_REQUEST);
    try {
      const response = yield call(fetchProfile);
      const profile = response.results[0];
      yield put({ type: API_CALL_SUCCESS, profile });
    } catch (error) {
      yield put({ type: API_CALL_FAILURE, error });
    }
  }
}

export const profileSelector = (state) => state[namespace];

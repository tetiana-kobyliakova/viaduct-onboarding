const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";

const initialState = {
  fetching: false,
  users: [],
  error: null,
};

export function sagaReducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, users: action.users };
    case API_CALL_FAILURE:
      return {
        ...state,
        fetching: false,
        users: null,
        error: action.error.message,
      };
    default:
      return state;
  }
}

export const sagaSelector = (state) => state["users2"];

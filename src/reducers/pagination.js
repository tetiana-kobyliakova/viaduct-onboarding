import api from "../components/pagination/api";

const ADD_USERS = "ADD_USERS";
const SET_PAGE = "SET_PAGE";
const SET_LOAD = "SET_LOAD";

const namespace = "users";

const initialState = {
  users: [],
  page: 1,
  isLoading: false,
};

export const usersSelector = (state) => state[namespace];

export default function PaginationReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USERS:
      return { ...state, users: action.payload };

    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_LOAD:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export const setUsers = (payload) => ({
  type: ADD_USERS,
  payload,
});

export const setPage = (payload) => ({
  type: SET_PAGE,
  payload,
});

export const setLoad = (payload) => ({
  type: SET_LOAD,
  payload,
});

export const getUsers = (page) => {
  return async (dispatch) => {
    dispatch(setLoad(true));
    try {
      const response = await api.getUsers(page);
      dispatch(setUsers(response));
    } catch (error) {
    } finally {
      dispatch(setLoad(false));
    }
  };
};

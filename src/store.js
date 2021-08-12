import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/sagas";

/* eslint-disable no-underscore-dangle */
// const composeEnhancers =
//   process.env.NODE_ENV !== "production" &&
//   typeof window === "object" &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware();
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// const configureStore = (preloadedState) =>
//   createStore(
//     rootReducer,
//     preloadedState,
//     composeEnhancers(applyMiddleware(thunk), applyMiddleware(sagaMiddleware))
//   );
//   const store = configureStore({});

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware),
    reduxDevTools
  )
);

sagaMiddleware.run(watcherSaga);

export default store;

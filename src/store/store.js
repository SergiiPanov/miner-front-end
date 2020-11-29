import { createStore, applyMiddleware, compose } from "redux";
import history from "../history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducers from "./reducers";

const sagaMiddleware = createSagaMiddleware();

window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

const store = createStore(
  rootReducers(history),
  compose(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f,
  ),
);

sagaMiddleware.run(rootSaga);

export default store;

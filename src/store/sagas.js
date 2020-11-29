import { all } from "redux-saga/effects";
import { mineSweeperSaga } from "../Containers/Minesweeper/store";
import { authSaga } from "../Containers/Auth/store/";

export default function* rootSaga() {
  yield all([mineSweeperSaga(), authSaga()]);
}

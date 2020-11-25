import { call, put, takeLatest } from "redux-saga/effects";
import * as constants from "./constants";
import * as actions from "./actions";
import { Api } from "../../../entries/ApiTransport";
import { push } from "connected-react-router"
import { RoutePath } from "../../../routers/constants"


const api = Api.getInstance();

function* setStartField({ payload, callback }) {
    try {
        const {data} = yield call(() => api.post("/mineSweeper/setStartField", payload));
        yield put(push(`${RoutePath.MINESWEEPER}/${data.id}`));
    } catch (err) {
        yield put(actions.A_SendFieldSizeAndBombsFailure(err));
    } finally {
        callback & (typeof callback === "function") && callback();
    }
}

function* setSecondUser({ payload, callback }) {
    try {
        console.log(payload)
        const {data} = yield call(() => api.post("/mineSweeper/setSecondUser", payload));
        yield put(push(`${RoutePath.MINESWEEPER}/${data.id}`));
    } catch (err) {
        yield put(actions.A_SendFieldSizeAndBombsFailure(err));
    } finally {
        callback & (typeof callback === "function") && callback();
    }
}

function* getStartField({payload , callback }) {
    try {
        const {data} = yield call(() => api.post("/mineSweeper/getStartField", {id : payload}));
        yield put(actions.A_fetchFieldSizeAndBombsSuccess(data))
    } catch (err) {
        yield put(actions.A_fetchFieldSizeAndBombsFailure(err));
    } finally {
        callback & (typeof callback === "function") && callback();
    }
}

function* fetchMainField({payload , callback }) {
    try {
        const {data} = yield call(() => api.post("/mineSweeper/fetchMainField", {id : payload.id, position : payload.position}));
        console.log(payload)
        yield put(actions.A_fetchFieldChangeSuccess(data))
    } catch (err) {
        yield put(actions.A_fetchFieldChangeFailure(err));
    } finally {
        callback & (typeof callback === "function") && callback();
    }
}


export default function*() {
    yield takeLatest(constants.SEND_FIELD_SIZE_AND_BOMBS_REQUEST, setStartField);
    yield takeLatest(constants.FETCH_FIELD_SIZE_AND_BOMBS_REQUEST, getStartField);
    yield takeLatest(constants.FETCH_FIELD_CHANGE_REQUEST, fetchMainField);
    yield takeLatest(constants.SECOND_USER_CONNECT_REQUEST, setSecondUser);
}
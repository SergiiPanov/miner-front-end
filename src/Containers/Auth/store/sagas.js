import { call, put, takeLatest } from "redux-saga/effects";
import * as constants from "./constants";
import * as actions from "./actions";
import {push} from "connected-react-router"
import {RoutePath} from "../../../routers/constants"
import { Api } from "../../../entries/ApiTransport";
import * as jwt from "jsonwebtoken";

const api = Api.getInstance();

function* signUp({ payload, callback }) {
  try {

    let {password, ...rest} = payload
    password = jwt.sign(password, process.env.REACT_APP_API_SECRET_KEY)
    const {data} = yield call(() => api.post("/auth/registration", {password,...rest}));
    localStorage.setItem("jwtToken", data);
    const decodedToken = jwt.decode(data)
    yield put(actions.A_SignUpSuccess(data));
    yield put(actions.A_FetchUserSuccess(decodedToken));
    yield put(push(RoutePath.GAME_SETTER));
  } catch (err) {
    yield put(actions.A_SignUpFailure(err));
  } finally {
    callback & (typeof callback === "function") && callback();
  }
}



function* signIn({ payload, callback }) {
  try {
    let {password, ...rest} = payload
    password = jwt.sign(password, process.env.REACT_APP_API_SECRET_KEY)
    const {data} = yield call(() => api.post("/auth/login", {password,...rest}));
    localStorage.setItem("jwtToken", data);
    const decodedToken = jwt.decode(data)
    yield put(actions.A_SignUpSuccess(data));
    yield put(actions.A_FetchUserSuccess(decodedToken));
    yield put(push(RoutePath.GAME_SETTER));
  } catch (err) {
    yield put(actions.A_SignInFailure(err));
  } finally {
    callback & (typeof callback === "function") && callback();
  }
}

export default function*() {
  yield takeLatest(constants.SIGN_IN_REQUEST, signIn);
  yield takeLatest(constants.SIGN_UP_REQUEST, signUp);
  // yield takeLatest(types.ACCOUNT_ACTIVATION.REQUEST, accountActivation);
  // yield takeLatest(types.FORGOT_PASSWORD.REQUEST, forgotPassword);
  // yield takeLatest(types.RESET_PASSWORD.REQUEST, resetPassword);
  // yield takeLatest(types.FETCH_USER.REQUEST, fetchUser);
  // yield takeLatest(types.FETCH_USER_BEFORE_ACTIVATION.REQUEST, fetchUserBeforeActivation);
}
// function* AccountActivation({ payload, callback }) {
//   try {
//     console.log(payload);
//     let {password, ...rest} = payload
//     password = jwt.sign(password, process.env.REACT_APP_API_SECRET_KEY)
//     yield put(actions.A_AccountActivationSuccess({...rest}));
//     yield call(() => api.post("/auth/activation", {password,...rest}));
//   } catch (err) {
//     yield put(actions.A_SignUpFailure(err));
//   } finally {
//     callback & (typeof callback === "function") && callback();
//   }
// }
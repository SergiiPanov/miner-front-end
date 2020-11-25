import * as constants from "./constants";

export const A_SignInRequest = user => ({ type: constants.SIGN_IN_REQUEST, payload: user });
export const A_SignInSuccess = token => ({ type: constants.SIGN_IN_SUCCESS, payload: token });
export const A_SignInFailure = err => ({ type: constants.SIGN_IN_FAILURE, payload: err });
export const A_SignInClear = () => ({ type: constants.SIGN_IN_CLEAR });

export const A_SignUpRequest = user => ({ type: constants.SIGN_UP_REQUEST, payload: user });
export const A_SignUpSuccess = token => ({ type: constants.SIGN_UP_SUCCESS, payload: token});
export const A_SignUpFailure = err => ({ type: constants.SIGN_UP_FAILURE, payload: err });
export const A_SignUpClear = () => ({ type: constants.SIGN_UP_CLEAR });

export const A_FetchUserRequest = () => ({ type: constants.FETCH_USER_REQUEST });
export const A_FetchUserSuccess = user => ({ type: constants.FETCH_USER_SUCCESS, payload: user });
export const A_FetchUserFailure = err => ({ type: constants.FETCH_USER_FAILURE, payload: err });
export const A_FetchUserClear = () => ({ type: constants.FETCH_USER_CLEAR });

export const A_LogOutRequest = () => ({ type: constants.LOG_OUT_REQUEST });
export const A_LogOutSuccess = user => ({ type: constants.LOG_OUT_SUCCESS, payload: user });
export const A_LogOutFailure = err => ({ type: constants.LOG_OUT_FAILURE, payload: err });
export const A_LogOutClear = () => ({ type: constants.LOG_OUT_CLEAR });

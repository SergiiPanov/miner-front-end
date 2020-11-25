import * as constants from "./constants";

export const A_SendFieldSizeAndBombsRequest = fieldAndBombs => ({ type: constants.SEND_FIELD_SIZE_AND_BOMBS_REQUEST, payload: fieldAndBombs });
export const A_SendFieldSizeAndBombsSuccess = fieldAndBombs => ({ type: constants.SEND_FIELD_SIZE_AND_BOMBS_SUCCESS, payload: fieldAndBombs });
export const A_SendFieldSizeAndBombsFailure = err => ({ type: constants.SEND_FIELD_SIZE_AND_BOMBS_FAILURE, payload: err });
export const A_SendFieldSizeAndBombsClear = () => ({ type: constants.SEND_FIELD_SIZE_AND_BOMBS_CLEAR});

export const A_fetchFieldSizeAndBombsRequest = (id) => ({ type: constants.FETCH_FIELD_SIZE_AND_BOMBS_REQUEST, payload : id});
export const A_fetchFieldSizeAndBombsSuccess = fieldAndBombs => ({ type: constants.FETCH_FIELD_SIZE_AND_BOMBS_SUCCESS, payload: fieldAndBombs });
export const A_fetchFieldSizeAndBombsFailure = err => ({ type: constants.FETCH_FIELD_SIZE_AND_BOMBS_FAILURE, payload: err });
export const A_fetchFieldSizeAndBombsClear = () => ({ type: constants.FETCH_FIELD_SIZE_AND_BOMBS_CLEAR});

export const A_fetchFieldChangeRequest = (position) => ({ type: constants.FETCH_FIELD_CHANGE_REQUEST, payload : position});
export const A_fetchFieldChangeSuccess = (gameField) => ({ type: constants.FETCH_FIELD_CHANGE_SUCCESS, payload : gameField});
export const A_fetchFieldChangeFailure = err => ({ type: constants.FETCH_FIELD_CHANGE_FAILURE, payload: err });
export const A_fetchFieldChangeClear = () => ({ type: constants.FETCH_FIELD_CHANGE_CLEAR});

export const A_SecondUserConnectRequest = secondUser => ({ type: constants.SECOND_USER_CONNECT_REQUEST, payload: secondUser });
export const A_SecondUserConnectSuccess = secondUser => ({ type: constants.SECOND_USER_CONNECT_SUCCESS, payload: secondUser });
export const A_SecondUserConnectFailure = err => ({ type: constants.SECOND_USER_CONNECT_FAILURE, payload: err });
export const A_SecondUserConnectClear = () => ({ type: constants.SECOND_USER_CONNECT_CLEAR});
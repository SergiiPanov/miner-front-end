import * as constants from "./constants";

const initialState = {
  gameField: [],
  loading: false,
  error: null,
  token: null,
  bombsCount: null,
  fieldSize: null,
  id: null,
  isVictory: false,
  firstUser: "",
  secondUser: "",
  firstUserActive: false,
  secondUserActive: false,
  is_active: false,
  firstUserPoint: 0,
  secondUserPoint: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_FIELD_CHANGE_REQUEST:
    case constants.SEND_FIELD_SIZE_AND_BOMBS_REQUEST:
    case constants.FETCH_FIELD_SIZE_AND_BOMBS_REQUEST:
    case constants.START_ONLINE_GAME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case constants.FETCH_FIELD_SIZE_AND_BOMBS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        fieldSize: action.payload.fieldSize,
        gameField: JSON.parse(action.payload.gameField),
        isVictory: action.payload.isVictory,
        firstUser: action.payload.firstUser,
        secondUser: action.payload.secondUser,
        firstUserActive: action.payload.firstUserActive,
        secondUserActive: action.payload.secondUserActive,
        is_active: action.payload.is_active,
        firstUserPoint: action.payload.firstUserPoint,
        secondUserPoint: action.payload.secondUserPoint,
      };
    case constants.FETCH_FIELD_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        gameField: JSON.parse(action.payload.gameField),
      };
    case constants.START_OFFLINE_GAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        bombsCount: action.payload.bombsCount,
        fieldSize: action.payload.fieldSize,
      };
    case constants.SEND_FIELD_SIZE_AND_BOMBS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        id: action.payload.id,
      };
    default:
      return { ...state };
  }
};

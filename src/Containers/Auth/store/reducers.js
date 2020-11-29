import * as constants from "./constants";

const initialState = {
  loading: false,
  error: null,
  name: "",
  isLogin: false,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case constants.SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.SIGN_UP_FAILURE:
    case constants.SIGN_IN_FAILURE:
    case constants.FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case constants.FETCH_USER_SUCCESS:
      return {
        ...state,
        name: action.payload.data.name,
        loading: false,
        error: null,
      };

    case constants.SIGN_UP_SUCCESS:
    case constants.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLogin: action.payload !== null,
        token: action.payload,
        error: null,
        loading: false,
      };

    default:
      return { ...state };
  }
};

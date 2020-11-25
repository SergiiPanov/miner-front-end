import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {mineSweeperReducer} from "../Containers/Minesweeper/store";
import {authReducer} from "../Containers/Auth/store"


export default history =>
    combineReducers({
        router: connectRouter(history),
        mineSweeperReducer,
        authReducer,
    });

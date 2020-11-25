import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch} from "react-redux";
import { push } from "connected-react-router";
import {RoutePath} from "../../../../routers/constants"

export default () => {
    const dispatch = useDispatch();
    return (
        <div>
            <Button onClick={() => dispatch(push(RoutePath.CREATE_ROOM))}>Create room</Button>
            <Button onClick={() => dispatch(push(RoutePath.FIND_ROOM))}>Find room</Button>
        </div>

    );
};
import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { RoutePath } from "../../../../routers/constants";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    field: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: (props) => (props.fieldSize ? `${props.fieldSize * 30}px` : null),
        height: (props) => (props.fieldSize ? `${props.fieldSize * 30}px` : null),
    },
    square: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        lineHeight: 0,
        width: "28px",
        height: "28px",
        border: "1px black solid",
        background: "white",
        "&:hover": {
            background: "aqua",
        },
    },
    flag: {
        background: "green",
    },
    offlineFlag: {
        background: "orange",
    }
}));

export default({ gameField, onFieldLeftClickAction, onFieldRightClickAction, allFlagsPosition, fieldSize }) =>{
    const classes = useStyles({ fieldSize });
    const dispatch = useDispatch()
    return (
        gameField ?
        <div>
            <div className={classes.field}>
                {gameField.map((square, position) => {
                    let style = {};
                    if (allFlagsPosition.includes(position)) {
                        style = { background: "orange" };
                    }
                    return square === 10 ? (
                        <div
                            onContextMenu={(e) => onFieldRightClickAction(e, position)}
                            onClick={() => onFieldLeftClickAction(position)}
                            key={position}
                            style={style}
                            className={`${classes.square} ${classes.flag}`}
                        />
                    ) :
                        square === 11 ? (
                            <div
                                onContextMenu={(e) => onFieldRightClickAction(e, position)}
                                onClick={() => onFieldLeftClickAction(position)}
                                key={position}
                                style={style}
                                className={`${classes.square} ${classes.offlineFlag}`}
                            />
                        ) :square === 9 ? (
                        <div
                            onContextMenu={(e) => onFieldRightClickAction(e, position)}
                            onClick={() => onFieldLeftClickAction(position)}
                            key={position}
                            style={{ background: "red" }}
                            className={classes.square}
                        >
                            B
                        </div>
                    ) : (
                        <div
                            onContextMenu={(e) => onFieldRightClickAction(e, position)}
                            onClick={() => onFieldLeftClickAction(position)}
                            key={position}
                            className={classes.square}
                        >
                            {square !== 0 ? square : null}
                        </div>
                    );
                })}
            </div>
            <p><Button variant="contained" color="primary" onClick={() => dispatch(push(RoutePath.GAME_SETTER))}>Leave The Game</Button></p>
        </div> : null
    );
}
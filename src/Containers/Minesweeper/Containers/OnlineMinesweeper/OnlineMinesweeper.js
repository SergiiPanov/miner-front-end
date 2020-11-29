import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getSecondUserPoint,
  getFirstUserPoint,
  getIsActiveField,
  getFieldSize,
  getGameField,
  getVictoryStatus,
  getFirstUser,
  getSecondUser,
  getSecondUserActive,
  getFirstUserActive,
} from "../../store/selectors";
import * as actions from "../../store/actions";
import { getUser } from "../../../Auth/store/selectors";
import { Button } from "@material-ui/core";
import {FieldDrawers} from "../FieldDrawers"

const useStyles = makeStyles((theme) => ({
  firstUserActive: {
    background: (props) => (props.firstUserActive ? "green" : "white"),
  },
  secondUserActive: {
    background: (props) => (props.secondUserActive ? "green" : "white"),
  },
}));

export default ({ history }) => {
  const dispatch = useDispatch();
  const [allFlagsPosition, setAllFlagsPosition] = useState([]);
  const mainUser = useSelector(getUser());
  const id = history.location.pathname.split("/")[2];
  const fieldSize = useSelector(getFieldSize());
  const gameField = useSelector(getGameField());
  const victoryStatus = useSelector(getVictoryStatus());
  const firstUser = useSelector(getFirstUser());
  const secondUser = useSelector(getSecondUser());
  const firstUserActive = useSelector(getFirstUserActive());
  const secondUserActive = useSelector(getSecondUserActive());
  const isActiveField = useSelector(getIsActiveField());
  const firstUserPoint = useSelector(getFirstUserPoint());
  const secondUserPoint = useSelector(getSecondUserPoint());

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(actions.A_fetchFieldSizeAndBombsRequest(id));
      //victoryStatus && clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [dispatch, id, victoryStatus]);

  useEffect(() => {
    const storage = JSON.parse(sessionStorage.getItem("allFlagsPosition"));
    const idStorage = JSON.parse(sessionStorage.getItem("idStorage"));
    if (storage && idStorage === id) {
      setAllFlagsPosition(storage);
    }
  }, [id]);

  const onFieldLeftClickAction = (position) => {
    if (gameField[position] === 10) {
      dispatch(actions.A_fetchFieldChangeRequest({ id, position, mainUser }));
      setAllFlagsPosition((allFlagsPosition) => allFlagsPosition.filter((item) => item !== position));
    }
  };

  const onFieldRightClickAction = (e, position) => {
    e.preventDefault();
    setAllFlagsPosition((allFlagsPosition) => {
      if (gameField[position] === 10) {
        allFlagsPosition.includes(position)
          ? (allFlagsPosition = allFlagsPosition.filter((item) => item !== position))
          : (allFlagsPosition = [...allFlagsPosition, position]);
      }
      sessionStorage.setItem("allFlagsPosition", JSON.stringify(allFlagsPosition));
      sessionStorage.setItem("idStorage", JSON.stringify(id));
      return allFlagsPosition;
    });
  };
  return (
    <div>
      <GameFieldHeader
        firstUser={firstUser}
        secondUser={secondUser}
        isActiveField={isActiveField}
        id={id}
        firstUserActive={firstUserActive}
        secondUserActive={secondUserActive}
        firstUserPoint={firstUserPoint}
        secondUserPoint={secondUserPoint}
        victoryStatus={victoryStatus}
      />
      <FieldDrawers
        gameField={gameField}
        onFieldLeftClickAction={onFieldLeftClickAction}
        onFieldRightClickAction={onFieldRightClickAction}
        allFlagsPosition={allFlagsPosition}
        fieldSize={fieldSize}
      />
    </div>
  );
};
function GameFieldHeader({
  firstUser,
  secondUser,
  isActiveField,
  id,
  secondUserActive,
  firstUserActive,
  firstUserPoint,
  secondUserPoint,
  victoryStatus,
}) {
  const classes = useStyles({ secondUserActive, firstUserActive });
  const dispatch = useDispatch();
  return (
    <div>
      {victoryStatus && firstUserPoint > secondUserPoint ? (
        <p>
          {firstUser} is victory with {firstUserPoint} point{" "}
        </p>
      ) : victoryStatus && firstUserPoint < secondUserPoint ? (
        <p>
          {secondUser} is victory with {secondUserPoint} point{" "}
        </p>
      ) : null}
      {secondUser && !isActiveField ? (
        <Button variant="contained" color="primary" onClick={() => dispatch(actions.A_StartOnlineGameRequest(id))}>START</Button>
      ) : null}
      {isActiveField ? null : <p>NUMBER_ROOM: {id}</p>}
      <p className={classes.firstUserActive}>
        FIRST_USER: {firstUser} POINT: {firstUserPoint}
      </p>
      {secondUser ? <p className={classes.secondUserActive}>
        SECOND_USER: {secondUser} POINT: {secondUserPoint}
      </p> : <p>WAITING FOR SECOND USER...</p>}
    </div>
  );
}
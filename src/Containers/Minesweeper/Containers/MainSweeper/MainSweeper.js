import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getBombsCount, getSecondUserPoint, getFirstUserPoint, getIsActiveField, getFieldSize, getGameField, getVictoryStatus, getFirstUser, getSecondUser, getSecondUserActive, getFirstUserActive} from "../../store/selectors"
import {} from "../../../Auth/store/selectors"
import * as actions from "../../store/actions"
import {getUser} from "../../../Auth/store/selectors";
import {Button} from "@material-ui/core";
import {createSelector} from "reselect";

const useStyles = makeStyles(theme => ({
    field: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: props => props.fieldSize ? `${props.fieldSize * 30}px` : null,
        height: props => props.fieldSize ? `${props.fieldSize * 30}px` : null,
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
    flag : {
        background: "green",
    },
    firstUserActive : {
        background : props => props.firstUserActive ? "green" : "white"
    },
    secondUserActive : {
        background : props => props.secondUserActive ? "green" : "white"
    }
}))


export default ({history}) => {
    const dispatch = useDispatch()
    const [allFlagsPosition, setAllFlagsPosition] = useState([])
    const mainUser = useSelector(getUser())
    const id = history.location.pathname.split("/")[2]
    const fieldSize = useSelector(getFieldSize())
    const gameField = useSelector(getGameField())
    const victoryStatus = useSelector(getVictoryStatus())
    const firstUser = useSelector(getFirstUser())
    const secondUser = useSelector(getSecondUser())
    const firstUserActive = useSelector(getFirstUserActive())
    const secondUserActive = useSelector(getSecondUserActive())
    const isActiveField = useSelector(getIsActiveField())
    const firstUserPoint = useSelector(getFirstUserPoint())
    const secondUserPoint = useSelector(getSecondUserPoint())




    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(actions.A_fetchFieldSizeAndBombsRequest(id));
            victoryStatus && clearInterval(interval);
        }, 300);
        return () => clearInterval(interval);

    }, [dispatch, id, victoryStatus])


    useEffect(() => {
        const storage = JSON.parse(sessionStorage.getItem("allFlagsPosition"))
        const idStorage = JSON.parse(sessionStorage.getItem("idStorage"))
        if(storage && idStorage === id){
            setAllFlagsPosition(storage)
        }
    }, [id])

    // const bombGenerator = (bombs, position, allBombsPosition) => {
    //     const oneBombPosition = Math.floor(Math.random() * fieldSize ** 2)
    //     allBombsPosition.includes(oneBombPosition) || position === oneBombPosition ? bombGenerator(bombs, position, allBombsPosition) : allBombsPosition.push(oneBombPosition);
    //     return allBombsPosition.length < bombs ? bombGenerator(bombs, position, allBombsPosition) : allBombsPosition;
    // }
    // const countBombAround = (index) => {
    //     let counter = 0;
    //     finder(index).map(item => allBombsPosition.includes(item) ? counter++ : item)
    //     return counter
    // }
    //
    //
    // const setZero = () => {
    //     for (let i = 0; i < 20; i++) {
    //         setActiveArr(activeArr => activeArr.map((item, index) => finder(index).map(item => activeArr[item] === 0).includes(true) ? countBombAround(index) : item))
    //     }
    // }

    // useEffect(() => {
    //     if (!activeArr.filter((item, index) => !allBombsPosition.includes(index)).includes(10)) setVictory(true)
    // }, [activeArr, setActiveArr, allBombsPosition])

    const onFieldLeftClickAction = (position) => {
        if (gameField[position] === 10) {
            dispatch(actions.A_fetchFieldChangeRequest({id, position, mainUser}));
            setAllFlagsPosition(allFlagsPosition => allFlagsPosition.filter((item)=> item !== position))
        }

        //
        // if (allBombsPosition.length <= 0) {
        //     setAllBombsPosition(bombGenerator(bombsCount, position, allBombsPosition))
        // }
        // setActiveArr(activeArr => activeArr.map((item, index) => (item === 10 || item === 11) && position === index && allBombsPosition.includes(index) ? 9 :
        //     (item === 10 || item === 11) && position === index ? countBombAround(index) : item
        // ))
        // countBombAround(position) === 0 ? setZero() : countBombAround(position)
        // if (activeArr[position] === 10 || activeArr[position] === 11) {
        //     setPointCounter(pointCounter => allBombsPosition.includes(position) ? pointCounter - 9 : pointCounter + countBombAround(position))
        // }


    }

    const onFieldRightClickAction = (e, position) => {
        e.preventDefault()
        setAllFlagsPosition(allFlagsPosition => {
            if (gameField[position] === 10) {
                allFlagsPosition.includes(position) ? allFlagsPosition = allFlagsPosition.filter((item)=> item !== position) :
                allFlagsPosition = [...allFlagsPosition, position]
            }
            sessionStorage.setItem("allFlagsPosition" , JSON.stringify(allFlagsPosition))
            sessionStorage.setItem("idStorage" , JSON.stringify(id))
            return allFlagsPosition
        })

        //
        //setActiveArr(activeArr.map((item, index) => item === 10 && position === index ? 11 : item === 11 && position === index ? 10 : item))
    }
    return (
//        isVictory ? <div>victory</div> :
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
                />
                    <StaticField activeArr={gameField}
                                 onFieldLeftClickAction={onFieldLeftClickAction}
                                 onFieldRightClickAction={onFieldRightClickAction}
                                 allFlagsPosition={allFlagsPosition}
                                 fieldSize={fieldSize}/>
            </div>
    );
}
function GameFieldHeader({firstUser, secondUser,isActiveField,id,secondUserActive,firstUserActive, firstUserPoint, secondUserPoint}){
    const classes = useStyles({secondUserActive,firstUserActive});
    const dispatch = useDispatch()
    return(
        <div>
            {secondUser && !isActiveField ?  <div>
                <Button onClick={() => dispatch(actions.A_StartOnlineGameRequest(id))}>START</Button>
            </div>: null}
            {isActiveField ? null : <p>NUMBER_ROOM: {id}</p>}
            <p className={classes.firstUserActive}>FIRST_USER: {firstUser} POINT: {firstUserPoint}</p>
            <p className={classes.secondUserActive}>SECOND_USER: {secondUser} POINT: {secondUserPoint}</p>
        </div>
    )
}

function StaticField({activeArr, onFieldLeftClickAction, onFieldRightClickAction, allFlagsPosition, fieldSize}) {
    const classes = useStyles({fieldSize});
    return (
        <div className={classes.field}>
            {        activeArr.map((square, position) => {
                    let style={};
                    if(allFlagsPosition.includes(position)){
                        style = {background: "red"}
                    }
                    return square === 10 ? <div onContextMenu={e => onFieldRightClickAction(e, position)}
                                                onClick={() => onFieldLeftClickAction(position)} key={position}
                                                style={style}
                                                className={`${classes.square} ${classes.flag}`}/>:
                        <div onContextMenu={e => onFieldRightClickAction(e, position)}
                             onClick={() => onFieldLeftClickAction(position)} key={position}
                             className={classes.square}>{square !== 0 ? square : null}</div>
                }
            )}
        </div>

    )
}
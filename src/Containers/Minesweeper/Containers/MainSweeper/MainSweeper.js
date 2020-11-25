import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getBombsCount, getFieldSize, getGameField, getVictoryStatus, getFirstUser, getSecondUser} from "../../store/selectors"
import * as actions from "../../store/actions"

const useStyles = makeStyles(theme => ({
    field: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
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
    }
}))


export default ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [activeArr, setActiveArr] = useState([])
    const [allFlagsPosition, setAllFlagsPosition] = useState([])
    const [allBombsPosition, setAllBombsPosition] = useState([])
    const [isVictory, setVictory] = useState(false)
    const [pointCounter, setPointCounter] = useState(0)


    const id = history.location.pathname.split("/")[2]
    const bombsCount = useSelector(getBombsCount())
    const fieldSize = useSelector(getFieldSize())
    const gameField = useSelector(getGameField())
    const victoryStatus = useSelector(getVictoryStatus())
    const firstUser = useSelector(getFirstUser())
    const secondUser = useSelector(getSecondUser())

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(actions.A_fetchFieldSizeAndBombsRequest(id));
        }, 300);
        return () => clearInterval(interval);
    }, [dispatch, id])

    useEffect(() => {
        setActiveArr(gameField)
    }, [gameField])
    useEffect(() => {
        const storage = JSON.parse(sessionStorage.getItem("allFlagsPosition"))
        const idStorage = JSON.parse(sessionStorage.getItem("idStorage"))
        if(storage && idStorage === id){
            setAllFlagsPosition(storage)
        }
    }, [id])

    useEffect(() => {
        setVictory(victoryStatus)
    }, [victoryStatus])

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
    // const finder = (index) => {
    //     let bombAround = [index - fieldSize, index + fieldSize];
    //     Number(index + 1) % fieldSize === 0 ? bombAround = [...bombAround, index - 1, index - fieldSize - 1, index + fieldSize - 1] :
    //         index % fieldSize === 0 ? bombAround = [...bombAround, index + 1, index - fieldSize + 1, index + fieldSize + 1] :
    //             bombAround = [...bombAround, index - 1, index - fieldSize - 1, index + fieldSize - 1, index + 1, index - fieldSize + 1, index + fieldSize + 1]
    //     return bombAround
    // }
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
        if (activeArr[position] === 10) {
            dispatch(actions.A_fetchFieldChangeRequest({id, position}));
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
            if (activeArr[position] === 10) {
                allFlagsPosition.includes(position) ? allFlagsPosition = allFlagsPosition.filter((item)=> item !== position) :
                allFlagsPosition = [...allFlagsPosition, position]
            }
            sessionStorage.setItem("allFlagsPosition" , JSON.stringify(allFlagsPosition))
            sessionStorage.setItem("idStorage" , JSON.stringify(id))
            console.log(allFlagsPosition)
            return allFlagsPosition
        })

        //
        //setActiveArr(activeArr.map((item, index) => item === 10 && position === index ? 11 : item === 11 && position === index ? 10 : item))
    }
    return (
        isVictory ? <div>victory</div> :
            <div>
                <p>NUMBER_ROOM: {id}</p>
                <p>FIRST_USER: {firstUser}</p>
                <p>SECOND_USER: {secondUser}</p>
                <div style={{width: `${fieldSize * 30}px`, height: `${fieldSize * 30}px`}} className={classes.field}>
                    <StaticField activeArr={activeArr}
                                 onFieldLeftClickAction={onFieldLeftClickAction}
                                 onFieldRightClickAction={onFieldRightClickAction}
                                 allFlagsPosition={allFlagsPosition}/>

                </div>
            </div>
    );
}

function StaticField({activeArr, onFieldLeftClickAction, onFieldRightClickAction, allFlagsPosition}) {
    const classes = useStyles();

    return (

        activeArr.map((square, position) => {
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
        )
    )
}
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {getFieldSize, getBombsCount} from "../../store/selectors"
import {FieldDrawers} from "../FieldDrawers"


export default ({history}) => {

    const id = history.location.pathname.split("/")[2];
    const bombsCount = useSelector(getBombsCount())
    const fieldSize = Number(useSelector(getFieldSize()))
    const [mainField, setMainField] = useState(Array(fieldSize ** 2).fill(10))
    const [bombsPosition, setBombPosition] = useState([])
    const [pointCounter, setPointCounter] = useState(0)
    const [isVictory, setVictory] = useState(false)

    useEffect(() => {
        if (!mainField.filter((item, index) => !bombsPosition.includes(index)).includes(10)) setVictory(true)
    }, [mainField, bombsPosition])

    const finder = (position) => {
        let bombAround = [position - fieldSize, position + fieldSize];
        Number(position + 1) % fieldSize === 0
            ? (bombAround = [...bombAround, position - 1, position - fieldSize - 1, position + fieldSize - 1])
            : position % fieldSize === 0
            ? (bombAround = [...bombAround, position + 1, position - fieldSize + 1, position + fieldSize + 1])
            : (bombAround = [
                ...bombAround,
                position - 1,
                position - fieldSize - 1,
                position + fieldSize - 1,
                position + 1,
                position - fieldSize + 1,
                position + fieldSize + 1,
            ]);
        return bombAround;
    };
    const countBombAround = (position) => {
        let counter = 0;
        finder(position).map(item => (bombsPosition.includes(item) ? counter++ : item));
        return counter;
    };
    const setZero = (setFieldWithParams) => {
        const finalField = setFieldWithParams.map((square, index) => finder(index).map(item => setFieldWithParams[item] === 0).includes(true)
            ? countBombAround(index)
            : square,
        );
        return JSON.stringify(finalField) === JSON.stringify(setFieldWithParams) ? finalField : setZero(finalField);
    };

    const onFieldLeftClickAction = (position) => {
        if ((mainField[position] === 10 || mainField[position] === 11) && !isVictory) {
            const bombGenerator = (bombsCount, position, bombsPosition) => {
                const oneBombPosition = Math.floor(Math.random() * fieldSize ** 2);
                bombsPosition.includes(oneBombPosition) || position === oneBombPosition
                    ? bombGenerator(bombsCount, position, bombsPosition)
                    : bombsPosition.push(oneBombPosition);
                return bombsPosition.length < bombsCount ? bombGenerator(bombsCount, position, bombsPosition) : bombsPosition;
            };
            if (bombsPosition.length <= 0) {
                setBombPosition(bombsPosition => bombGenerator(bombsCount, position, bombsPosition))
            }
            setMainField(mainField => mainField.map((item, index) => (item === 10 || item === 11) && position === index && bombsPosition.includes(index) ? 9 :
                (item === 10 || item === 11) && position === index ? countBombAround(index) : item
            ))
            if (countBombAround(position) === 0) setMainField(mainField => setZero(mainField))

            if (mainField[position] === 10 || mainField[position] === 11) {
                setPointCounter(pointCounter => bombsPosition.includes(position) ? pointCounter - 9 : pointCounter + countBombAround(position))
            }
        }
    }

    const onFieldRightClickAction = (e, position) => {
        e.preventDefault()
        setMainField(mainField => mainField.map((item, index) => index === position && item === 10 ? 11 : index === position && item === 11 ? 10 : item));
    }



    return (

        <div>
            {isVictory ? <div>You Victory With {pointCounter} Point</div>:
            <p>POINT: {pointCounter}</p>}
            <FieldDrawers
                gameField={mainField}
                fieldSize={fieldSize}
                allFlagsPosition={[]}
                onFieldLeftClickAction={onFieldLeftClickAction}
                onFieldRightClickAction={onFieldRightClickAction}
            />
        </div>

    );
};


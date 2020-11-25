import { createSelector } from "reselect";

const selectMineSweeperState = state => state.mineSweeperReducer;

export const getBombsCount = () => createSelector(selectMineSweeperState, state => state.bombsCount);
export const getFieldSize = () => createSelector(selectMineSweeperState, state => state.fieldSize);
export const getGameField = () => createSelector(selectMineSweeperState, state => state.gameField);
export const getVictoryStatus = () => createSelector(selectMineSweeperState, state => state.isVictory);
export const getFirstUser = () => createSelector(selectMineSweeperState, state => state.firstUser);
export const getSecondUser = () => createSelector(selectMineSweeperState, state => state.secondUser);



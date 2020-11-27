import { createSelector } from "reselect";

const selectMineSweeperState = state => state.mineSweeperReducer;

export const getFieldSize = () => createSelector(selectMineSweeperState, state => state.fieldSize);
export const getGameField = () => createSelector(selectMineSweeperState, state => state.gameField);
export const getVictoryStatus = () => createSelector(selectMineSweeperState, state => state.isVictory);
export const getFirstUser = () => createSelector(selectMineSweeperState, state => state.firstUser);
export const getSecondUser = () => createSelector(selectMineSweeperState, state => state.secondUser);
export const getFirstUserActive = () => createSelector(selectMineSweeperState, state => state.firstUserActive);
export const getSecondUserActive = () => createSelector(selectMineSweeperState, state => state.secondUserActive);
export const getIsActiveField = () => createSelector(selectMineSweeperState, state => state.is_active);
export const getFirstUserPoint = () => createSelector(selectMineSweeperState, state => state.firstUserPoint);
export const getSecondUserPoint = () => createSelector(selectMineSweeperState, state => state.secondUserPoint);






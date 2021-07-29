import { createAction, createReducer } from '@reduxjs/toolkit';
import { all, put, takeEvery } from '@redux-saga/core/effects';
import { addCoinsAction } from './coffee';

const initialState = {
    1: 10,
    2: 30,
    5: 20,
    10: 15,
};

/**
 * Потратить монету пользователя
 */
export const spendCoinAction = createAction('USER/spend_coin', (coin) => ({
    payload: coin,
}));
/**
 * Вернуть монеты пользователю
 */
export const restoreCoinsAction = createAction('USER/restore_coin', (coins) => ({
    payload: coins,
}));

const reducer = createReducer(initialState, {
    [spendCoinAction]: (state, action) => ({
        ...state,
        [action.payload]: state[action.payload] - 1,
    }),
    [restoreCoinsAction]: (state, action) => {
        const { payload: coins } = action;
        const prevCoins = { ...state };
        const newCoins = {};
        Object.keys(prevCoins).forEach(
            (key) => (newCoins[key] = prevCoins[key] + coins[key]),
        );
        return newCoins;
    },
});

/**
 * При трате денег у пользователя, отправлять их в кофемашину
 */
function* sendMoneyToCoffeeSaga(action) {
    yield put(addCoinsAction(action.payload));
}

function* saga() {
    yield all([takeEvery(spendCoinAction, sendMoneyToCoffeeSaga)]);
}

export default {
    reducer,
    saga,
};

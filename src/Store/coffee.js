import { createAction, createReducer } from '@reduxjs/toolkit';
import { all, put, takeEvery, select } from '@redux-saga/core/effects';
import calculateMoneyChanges from '../Utils/calculateMoneyChanges';
import { restoreCoinsAction } from './user';

const initialState = {
    coins: {
        1: 100,
        2: 100,
        5: 100,
        10: 100,
    },
    goods: [
        {
            id: '1',
            name: 'Чай',
            price: 13,
            stock: 10,
        },
        {
            id: '2',
            name: 'Кофе',
            price: 18,
            stock: 20,
        },
        {
            id: '3',
            name: 'Кофе с молоком',
            price: 21,
            stock: 20,
        },
        {
            id: '4',
            name: 'Сок',
            price: 35,
            stock: 15,
        },
    ],
    total: 0,
    selectedItemId: '',
    message: {
        err: false,
        text: '',
    },
};

/**
 * Добавление монеты в кофемашину
 */
export const addCoinsAction = createAction('COFFEE/spend_coin', (coin) => ({
    payload: { coin },
}));
/**
 * Добавление поля 'id' выбранного товара в поле 'selectedItemId' кофемашины
 */
export const addSelectedItemAction = createAction(
    'COFFEE/add_selected_item',
    (id) => ({ payload: { id } }),
);
/**
 * Сокращение количества выбранного товара при покупке
 */
export const reduceStockAction = createAction('COFFEE/reduce_stock', (id) => ({
    payload: { id },
}));
/**
 * Добавление сообщения об ошибке / успешной сделке
 */
export const changeMessageAction = createAction('COFFEE/change_message', (msg) => ({
    payload: { err: msg.err, text: msg.text },
}));
/**
 * Изменение суммы внесенных средств
 */
export const changeTotalAction = createAction('COFFEE/increase_total', (coin) => ({
    payload: { coin },
}));
/**
 * Возвращение внесенных средств пользователю
 */
export const returnDepositAction = createAction('COFFEE/return_deposit', (sum) => ({
    payload: { sum },
}));

const reducer = createReducer(initialState, {
    [addCoinsAction]: (state, action) => ({
        ...state,
        coins: {
            ...state.coins,
            [action.payload.coin]: state.coins[action.payload.coin] + 1,
        },
    }),
    [addSelectedItemAction]: (state, action) => ({
        ...state,
        selectedItemId:
            state.goods.find((item) => item.id === action.payload.id)?.id || '',
    }),
    [reduceStockAction]: (state, action) => {
        const { id } = action.payload;
        const { goods } = state;
        const goodsCopy = JSON.parse(JSON.stringify(goods));
        const reduceIdx = goodsCopy.findIndex((item) => item.id === id);
        goodsCopy[reduceIdx].stock -= 1;
        return { ...state, goods: goodsCopy };
    },
    [changeMessageAction]: (state, action) => ({
        ...state,
        message: { err: action.payload.err, text: action.payload.text },
    }),
    [changeTotalAction]: (state, action) => ({
        ...state,
        total: state.total + Number(action.payload.coin),
    }),
    [returnDepositAction]: (state, action) => ({ ...state, total: 0 }),
});

/**
 * При уменьшении количества товара (читать покупке), изменить сумму внесенных средств
 */
function* reduceDepositSaga(action) {
    const state = yield select();
    const {
        coffee: { goods },
    } = state;
    const price = goods.find((item) => item.id === action.payload.id)?.price;
    yield put(changeTotalAction(-Math.abs(price)));
}

/**
 * При внесении монет в кофемашину, изменять сумму внесенных средств
 */
function* calculateTotalSaga(action) {
    yield put(changeTotalAction(action.payload.coin));
}

/**
 * При "обнулении" депозита, возвращать сумму пользователю
 */
function* restoreCoinsSaga(action) {
    const { sum } = action.payload;
    const coinsToDeliver = calculateMoneyChanges(undefined, sum);
    yield put(restoreCoinsAction(coinsToDeliver));
}

function* saga() {
    yield all([
        takeEvery(reduceStockAction, reduceDepositSaga),
        takeEvery(addCoinsAction, calculateTotalSaga),
        takeEvery(returnDepositAction, restoreCoinsSaga),
    ]);
}

export default {
    reducer,
    saga,
};

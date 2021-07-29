import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import coffee from './coffee';
import user from './user';
import { all } from '@redux-saga/core/effects';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([user.saga(), coffee.saga()]);
}

const reducers = combineReducers({
    user: user.reducer,
    coffee: coffee.reducer,
});

const store = compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)(createStore)(reducers);

sagaMiddleware.run(rootSaga);

export default store;

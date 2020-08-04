import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from './auth';

import { initIngredientSaga } from './burgerbuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

import * as actionTypes from '../actions/actionTypes';
import { takeEvery, all, takeLatest } from 'redux-saga/effects';

export function* watchAuth() {
    //all runs multiple tasks simultaneously
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientSaga)
}


export function* watchOrder() {
    //take latest auto cancels ongoing executions of purchase burger and only executes latest one
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}
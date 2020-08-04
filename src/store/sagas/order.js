import axios from '../../axios-orders'
import * as actionTypes from '../actions/actionTypes';
import { put } from 'redux-saga/effects';
import * as actions from '../actions';


export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)//.json for firebase !!
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actionTypes.PURCHASE_BURGER_FAIL(error));
    };
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"'
    const response = yield axios.get('/orders.json' + queryParams)
    try {
        const fetchedOrders = []
        for (let key in response.data) {
            fetchedOrders.push({ ...response.data[key], id: key });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));

    } catch (err) {
        yield put(actions.fetchOrdersFail(err));
    }
}
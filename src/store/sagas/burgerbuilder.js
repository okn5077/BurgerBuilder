import axios from '../../axios-orders';
import * as actions from '../actions';
import { put } from 'redux-saga/effects';


export function* initIngredientSaga() {
    const response = yield axios.get("https://react-my-burger-70622.firebaseio.com/ingredients.json")

    try {
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIgredient = (name) => {
    return {
        ingredientName: name,
        type: actionTypes.ADD_INGREDIENT
    };
}

export const removeIgredient = (name) => {
    return {
        ingredientName: name,
        type: actionTypes.REMOVE_INGREDIENT
    };
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-my-burger-70622.firebaseio.com/ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data));
            }).catch(error => {
                dispatch(fetchIngredientsFailed());
            })
    };
};
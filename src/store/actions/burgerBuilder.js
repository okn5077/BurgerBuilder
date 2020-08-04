import * as actionTypes from './actionTypes';

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
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
};
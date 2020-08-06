import React, { useState, useEffect, useCallback } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions/index';



const BurgerBuilder = props => {
    // constructor(props) {
    //     super(props);
    //     state = {
    //         // purchasable: false,
    //         purchasing: false,
    //         // loading: false,
    //         // error: false
    //     }
    // }

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients;
    });
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token);

    const onIngredientAdded = (ingName) => dispatch(actions.addIgredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIgredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
        // axios.get("https://react-my-burger-70622.firebaseio.com/ingredients.json")
        //     .then(response => {

        //         // for (let [key, value] of Object.entries(response.data)) {
        //         //     var ing = props.ings;
        //         //     ing[key] = 0;
        //         //     setState({ ingredients: response.data });

        //         //     for (let index = 0; index < value; index++) {
        //         //         addIngredientHandler(key);
        //         //     }
        //         // }
        //         setState({ ingredients: response.data });
        //     }).catch(error => {
        //         setState({ error: true })
        //     })
    }, [onInitIngredients])

    const updatePurchaseState = (updatedIngredients) => {
        const sum = Object.keys(updatedIngredients)
            .map(igKey => {
                return updatedIngredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...props.ings,
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     updatePurchaseState(updatedIngredients);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = props.ings[type];
    //     if (oldCount === 0)
    //         return;
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...props.ings,
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     updatePurchaseState(updatedIngredients);

    // };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkOut');

        // const queryParams = [];

        // for (let i in props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(props.ings[i]))
        // }
        // queryParams.push('price=' + props.price)

        // const queryString = queryParams.join('&')

        // props.history.push({
        //     pathname: '/checkOut',
        //     search: '?' + queryString
        // });

    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        }
        else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }


    const disabledInfo = {
        ...ings
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = error ? <p>IngredientsCannot be loaded</p> : <Spinner />

    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    price={price}
                    isAuth={isAuthenticated} />
            </Aux>
        );

        orderSummary = (<OrderSummary
            totalPrice={price}
            ingredients={ings}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />);
    }

    // if (state.loading) {
    //     orderSummary = <Spinner />
    // }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>

    );
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIgredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIgredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(BurgerBuilder), axios));
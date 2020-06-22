import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as burgerBuilderActions from '../../store/actions/index';



class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // purchasable: false,
            purchasing: false,
            // loading: false,
            // error: false
        }
    }

    componentDidMount() {
        this.props.onInitIngredients();
        // axios.get("https://react-my-burger-70622.firebaseio.com/ingredients.json")
        //     .then(response => {

        //         // for (let [key, value] of Object.entries(response.data)) {
        //         //     var ing = this.props.ings;
        //         //     ing[key] = 0;
        //         //     this.setState({ ingredients: response.data });

        //         //     for (let index = 0; index < value; index++) {
        //         //         this.addIngredientHandler(key);
        //         //     }
        //         // }
        //         this.setState({ ingredients: response.data });
        //     }).catch(error => {
        //         this.setState({ error: true })
        //     })
    }

    updatePurchaseState(updatedIngredients) {
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
    //     const oldCount = this.props.ings[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings,
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ings[type];
    //     if (oldCount === 0)
    //         return;
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ings,
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);

    // };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkOut');

        // const queryParams = [];

        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        // }
        // queryParams.push('price=' + this.props.price)

        // const queryString = queryParams.join('&')

        // this.props.history.push({
        //     pathname: '/checkOut',
        //     search: '?' + queryString
        // });

    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }



    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>IngredientsCannot be loaded</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );

            orderSummary = (<OrderSummary
                totalPrice={this.props.price}
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />);
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIgredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIgredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(BurgerBuilder), axios));
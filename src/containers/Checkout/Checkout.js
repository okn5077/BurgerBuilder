import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, withRouter, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }


    componentWillMount() {
        this.props.onInitPurchase();

        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {};
        // let price = 0;
        // for (let param of query.entries()) {
        //     if (param[0] === 'price') {
        //         price = param[1];
        //     } else {
        //         ingredients[param[0]] = +param[1];
        //     }
        // }

        // this.setState({ ingredients: ingredients, totalPrice: price })
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {

        let summary = <Redirect to="/" />

        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null

            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued} />
                    <Route path={this.props.match.path + '/contact-data'} >
                        <ContactData {...this.props} />
                    </Route>
                </div>
            )
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));
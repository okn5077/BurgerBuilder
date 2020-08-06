import React, { } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, withRouter, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions/index';

const Checkout = props => {

    // state = {
    //     ingredients: null,
    //     price: 0
    // }


    // componentWillMount() {
    // props.onInitPurchase();

    // const query = new URLSearchParams(props.location.search);
    // const ingredients = {};
    // let price = 0;
    // for (let param of query.entries()) {
    //     if (param[0] === 'price') {
    //         price = param[1];
    //     } else {
    //         ingredients[param[0]] = +param[1];
    //     }
    // }

    // setState({ ingredients: ingredients, totalPrice: price })
    // }

    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        props.history.replace('/checkout/contact-data');
    }



    let summary = <Redirect to="/" />

    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null

        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={props.ings}
                    checkoutCancelled={checkoutCancelled}
                    checkoutContinued={checkoutContinued} />
                <Route path={props.match.path + '/contact-data'} >
                    <ContactData {...props} />
                </Route>
            </div>
        )
    }

    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     }
// }



export default connect(mapStateToProps)(withRouter(Checkout));
import React, { useState } from "react";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from "react-redux";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';


const ContactData = props => {

    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Zip code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            validation: {
            },
            value: 'fastest',
            valid: true,
        }
        // loading: false
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        // this.setState({ loading: true });

        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }

        props.onOrderBurger(order, props.token);

        // axios.post('/orders.json', order)//.json for firebase !!
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false });
        //         props.history.push('/');
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false });
        //     });

    }


    const inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        })

        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
        // this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }


    const formElementsArray = [];

    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        })
    }

    let form = (<form onSubmit={orderHandler}>

        {formElementsArray.map(input => (
            <Input
                key={input.id}
                elementType={input.config.elementType}
                elementConfig={input.config.elementConfig}
                value={input.config.value}
                invalid={!input.config.valid}
                shouldValidate={input.config.validation}
                touched={input.config.touched}
                changed={(event) => inputChangedHandler(event, input.id)} />

        ))}

        <Button btnType="Success" disabled={!formIsValid} > ORDER </Button>
    </form>);
    if (props.loading)
        form = <Spinner />

    return (
        <div className={classes.ContactData}>
            <h4>Enter your data</h4>
            {form}

        </div>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => { dispatch(actions.purchaseBurger(orderData, token)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
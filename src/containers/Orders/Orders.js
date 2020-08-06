import React, { useEffect } from "react";
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index';
import { connect } from "react-redux";
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = props => {
    const { token, userId, onFetchOrders } = props
    useEffect(() => {

        onFetchOrders(token, userId);
        // axios.get('orders.json').then(res => {
        //     const fetchedOrders = []
        //     for (let key in res.data) {
        //         fetchedOrders.push({ ...res.data[key], id: key });
        //     }
        //     this.setState({ loading: false, orders: fetchedOrders })

        // }).catch(err => {
        //     this.setState({ loading: false })
        // })
    }, [token, userId, onFetchOrders])

    let orders = <Spinner />

    if (!props.loading) {
        orders = (
            props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />

            ))
        )
    }
    return (
        <div>
            {orders}
        </div>

    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
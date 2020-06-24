import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (

      <div >
        <Layout>
          <Switch>
            <Route path="/checkOut" >
              <Checkout />
            </Route>

            <Route path='/orders'>
              <Orders />
            </Route>

            <Route path='/auth'>
              <Auth />
            </Route>

            <Route path='/logout'>
              <Logout />
            </Route>


            <Route path="/" exact>
              <BurgerBuilder />
            </Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(null, mapDispatchToProps)(App));

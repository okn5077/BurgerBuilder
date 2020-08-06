import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

// const asyncCheckout = asyncComponent(() => {
//   return import('./containers/Checkout/Checkout');
// });

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});


const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {

  const { onTryAutoSignUp } = props;
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path='/auth' render={() => <Auth  {...props} />}>
      </Route>

      <Route path="/" exact>
        <BurgerBuilder />
      </Route>

      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkOut" render={() => <Checkout {...props} />} >
        </Route>

        <Route path='/orders' render={() => <Orders {...props} />}>
        </Route>

        <Route path='/logout'>
          <Logout />
        </Route>

        <Route path='/auth' render={() => <Auth {...props} />}>
        </Route>

        <Route path="/" exact>
          <BurgerBuilder />
        </Route>

        <Redirect to="/" />

      </Switch>
    )
  }

  return (

    <div >
      <Layout>
        <Suspense fallback={<p>Loading</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

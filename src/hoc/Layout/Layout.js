import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {
    const [sideDrawerIsvisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }

    // menuClickedHandler = () => {
    //     this.setState({ showSideDrawer: !this.state.showSideDrawer });
    // }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsvisible);
    }

    return (
        <Aux>
            <Toolbar
                isAuth={props.isAuthenticated}
                /*menuClicked={this.menuClickedHandler}*/ drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer isAuth={props.isAuthenticated} closed={sideDrawerClosedHandler} open={sideDrawerIsvisible} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
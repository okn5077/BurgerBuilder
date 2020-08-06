import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux'

const Logout = props => {

    const { onLogout } = props;
    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Redirect to="/" />;
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
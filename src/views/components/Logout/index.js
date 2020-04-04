import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {authActions} from '../../../common/redux/actions/auth.actions';
import {Link} from "react-router-dom";



class Logout extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(authActions.logout());
    }

    render() {
        return (
            <div>
                <h2> Logout successfully </h2>
                <Link to="/login">Return to Home Page</Link>
            </div>

        );
    }
}

const authSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    authSelector,
    (authentication) => ({
        authentication
    })
);

export default connect(mapStateToProps)(Logout);

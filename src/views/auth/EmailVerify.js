import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import {authActions} from "../../common/redux/actions";
import { DocumentTitle } from '../../helpers/DocumentTitle';
import { globalService as gs } from '../../common/services';


class EmailVerify extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token');
        const {dispatch} = this.props;
        dispatch(authActions.emailVerification(token));
    }

    render() {

        if (gs.identity) {
            return (<Redirect to='/'/>)
        }

        return (<main className="login-wrap">
            <DocumentTitle title={`Email Verify`}/>
        </main>);
    }
}

const userSelector = createSelector(
    state => state.user,
    user => user
);

const processSelector = createSelector(
    state => state.process,
    process => process
);


const mapStateToProps = createSelector(
    userSelector,
    processSelector,
    (user, process) => ({
        user, process
    })
);

export default connect(mapStateToProps)(EmailVerify);

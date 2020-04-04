import React, {Component} from 'react';
import {Main} from '../../layout';
import ServiceForm from './partials/ServiceForm';
import StripeConnection from '../common/StripeConnection';
import {createSelector} from "reselect";
import {connect} from "react-redux";


class ServiceCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillUnmount() {

    }

    componentDidMount() {

    }

    render() {
        const { authentication } = this.props;
        const { userProfile } = authentication.authentication.user;
        const isStripeConnect = ((userProfile.strip_account_number === null) || (userProfile.strip_account_number === '') || (userProfile.strip_account_number === '0'));


        return (
            <Main>
                <div className="create-service bg-body">
                    <div className="container">
                        { /* isStripeConnect ? <StripeConnection /> : <ServiceForm /> */}
                        <ServiceForm />
                    </div>
                </div>

            </Main>);
    }
}

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const uploadSelector = createSelector(
    state => state.upload,
    upload => upload
);

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    authenticationSelector,
    processSelector,
    uploadSelector,

    (authentication, process, upload) => ({
        authentication, process, upload
    })
);

export default connect(mapStateToProps)(ServiceCreate);


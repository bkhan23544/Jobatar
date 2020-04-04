import React, { Component } from 'react';
import { Main } from '../../layout';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import JobForm from './partials/JobForm';
import StripeConnection from '../common/StripeConnection';


class JobCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { authentication } = this.props;
        const { userProfile } = authentication.authentication.user;
        const isStripeConnect = ((userProfile.strip_account_number === null) || (userProfile.strip_account_number === '') || (userProfile.strip_account_number === '0'));

        return (<Main>
            <div className="create-service bg-body">
                <div className="container">
                    {/* isStripeConnect ? <StripeConnection /> : <JobForm /> */}
                    <JobForm />
                </div>
            </div>
        </Main>);
    }
}

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const questionsSelector = createSelector(
    state => state.questions,
    questions => questions
);

const countriesSelector = createSelector(
    state => state.countries,
    countries => countries
);

const skillsSelector = createSelector(
    state => state.skills,
    skills => skills
);

const categoriesSelector = createSelector(
    state => state.categories,
    categories => categories
);

const mapStateToProps = createSelector(
    authenticationSelector,
    categoriesSelector,
    skillsSelector,
    countriesSelector,
    questionsSelector,
    (authentication, categories, skills, countries, questions) => ({
        authentication, categories, skills, countries, questions
    })
);

export default connect(mapStateToProps)(JobCreate);


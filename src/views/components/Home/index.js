import React, { Component } from 'react';
import { Main } from '../../layout';
import Banner from "./Banner";
import { Redirect, Link } from 'react-router-dom';

import ExploreCategories from './ExploreCategories';
import JoinOurCommunity from './JoinOurCommunity';
import LimitlessExperience from './LimitlessExperience';
import GrowWithJobarter from './GrowWithJobarter';
import Testimonials from './Testimonials'
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { alertSelectors } from '../../../common/redux/selectors';
import { globalService as gs } from '../../../common/services';




class Home extends Component {

    constructor(props) {
        super(props);
        this.loggedIn = this.props.authentication.loggedIn;
    }

    componentWillMount(){
        const { dispatch, authentication, type } = this.props;
        const auth = authentication.authentication;
        (type === 'welcome') && auth && dispatch(alertSelectors.success(auth.message));
        
    }

    render() {
        const { process } = this.props;
        if (gs.identity) {
            return (<Redirect to='/job-search' />)
        }
        return (<Main>
            <DocumentTitle title={`Home`} />
            <Banner loggedIn={this.loggedIn}/>
            <ExploreCategories />
            <JoinOurCommunity />
            <LimitlessExperience />
            <Testimonials/>
            <GrowWithJobarter />
        </Main>);
    }
}


const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    authenticationSelector,
    (authentication) => ({
        authentication
    })
);

export default connect(mapStateToProps)(Home);
import React, { Component } from 'react';
import PublicLayout from './PublicLayout';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { userActions } from '../../../../common/redux/actions';
import RatingReview from "../../Service/partials/RatingReview";
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import { ModuleHelper } from '../../../../helpers/module.helper';

class PublicRating extends Component {

    componentWillMount() {
        const { dispatch, user } = this.props;
        let id = this.props.match.params.id;
        user === null && dispatch(userActions.publicProfile("GET", null, { item_id: id }));
    }

    render() {
        const { user } = this.props;
        return (<PublicLayout userId={this.props.match.params}>
            <DocumentTitle title="Rating & Review" />
            {user && <RatingReview item={user} isShowDropdown={true} isShowAvgRating={true}/>}
        </PublicLayout>);
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const userSelector = createSelector(
    state => state.user,
    user => user
);

const mapStateToProps = createSelector(
    processSelector,
    userSelector,
    (process, user) => ({
        process, user
    })
);

export default connect(mapStateToProps)(PublicRating);

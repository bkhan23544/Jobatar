import React, { Component, Fragment } from 'react';
import FavoriteLayout from './FavoriteLayout';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { Box, IconButton } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Pagination from '../../../../helpers/Pagination';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import { favoriteActions } from '../../../../common/redux/actions';
import { SearchLoader } from '../../../../common/loaders';
import { itemService } from '../../../../common/services';
import { alertSelectors } from '../../../../common/redux/selectors';

class FavoriteCoFounder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
                moduleId: "UserProfile",
                is_co_founder: 1,
                page: 1,
                user_id: this.props.authentication.authentication.user.id
            },
        };
    }

    componentWillMount() {
        //const { dispatch } = this.props;
        //dispatch(favoriteActions.favorites("GET", null, this.state.formField, 'co-founder'));
    }

    componentWillUnmount() {
        //const { dispatch } = this.props;
        //dispatch(favoriteActions.clear());
    }

    onChangePage = (page) => {
        const { dispatch } = this.props;
        const formField = { ...this.state.formField };
        formField["page"] = page;
        dispatch(favoriteActions.favorites("GET", null, formField, 'co-founder'));
    };

    markAsFavorite = (item) => {
        const { dispatch } = this.props;
        confirmAlert({
            title: 'Please confirm to remove',
            message: 'Are you sure you want to remove this co-founder from your favorites list?',
            buttons: [
              {
                label: 'No',
                onClick: () => console.log('Click No')
              },
              {
                label: 'Yes',
                onClick: () =>
                    itemService.favorite('DELETE', null, {item_id: item.id})
                        .then(response => {
                            dispatch(alertSelectors.success("You have successfully removed a favorite."));
                            dispatch(favoriteActions.remove(item.id, 'co-founder'));
                        })
                        .catch(exception => {
                            console.log(exception);
                        })
              }
            ]
        });
    };

    render() {
        const { favorite, process } = this.props;
        let results = (favorite && favorite.freelancers) ? favorite.freelancers.items : null;
        return (<FavoriteLayout>
            <DocumentTitle title="My Favorites Freelancer" />
            <div className="row">
                <div className="col-12">
                    {process.loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={2} width={700} /> : <Fragment>
                        {results && results.map((freelancer) =>
                            <div className="freLncrBox card mb-4" key={`item-${freelancer.id}`}>
                                <div className="card-body d-flex flex-wrap">
                                    <div className="profile">
                                        <img alt="images" className="img-fluid rounded-circle" width="145" height="145" src={(freelancer.item && freelancer.item.avatar && freelancer.item.avatar !== null) ? freelancer.item.avatar : '/images/freelancer-list-pic.jpg'} />
                                    </div>
                                    <div className="caption">
                                        <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(freelancer)}>
                                            <i className="fas fa-heart text-info"></i>
                                        </IconButton>
                                        <h3><NavLink to={`/user/public/co-founder/${freelancer.item && freelancer.item.id}`}>{freelancer.item && freelancer.item.name}</NavLink></h3>
                                        <div className="position">
                                            <span>{freelancer.item.userProfile && freelancer.item.userProfile.title}</span>
                                        </div>
                                        <div className="address d-flex align-items-center">
                                            {/* <div className="col pl-0">
                                                <i className="fas fa-map-marker-alt"></i>
                                                {freelancer.item.userProfile && commonHelper.address(freelancer.item.userProfile)}
                                            </div> */}
                                            <div className="ratings d-flex align-items-center">
                                                <small>({freelancer.item.userProfile.avg_service_rating ?freelancer.item.userProfile.avg_service_rating:0})</small>
                                                <Box component="fieldset" mx={1} borderColor="transparent">
                                                    <Rating value={freelancer.item.userProfile.avg_service_rating ?freelancer.item.userProfile.avg_service_rating:0} readOnly size="small" />
                                                </Box>
                                                <small className="count">{freelancer.item.userProfile.countServiceRating ? freelancer.item.userProfile.countServiceRating : 0}</small>
                                            </div>
                                        </div>
                                        <div className="text">{freelancer.item.userProfile && freelancer.item.userProfile.about}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {(results && results.length === 0) && 
                            <div className="card service-box">
                                <div className="card-body text-center">
                                    <div className="common-not-found d-flex align-items-center justify-content-center">
                                        <div className="inner">
                                            <figure>
                                                <img src="/images/not-found/Co-founder.png" alt="Not found" width="100" />
                                            </figure>
                                            <h5>You don’t have any favorite co-founders</h5>
                                            <p className="title">This is where you’ll see all your favorite co-founders</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </Fragment>}
                </div>

                <div className="col-12">
                    <Pagination className="justify-content-end"
                        pageSize={20}
                        totalCount={(favorite && favorite.data && favorite.data.pagination.totalCount) ? favorite.data.pagination.totalCount : 10}
                        onChangePage={this.onChangePage} />
                </div>
            </div>
        </FavoriteLayout>);
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const favoriteSelector = createSelector(
    state => state.favorite,
    favorite => favorite
);

const authSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    processSelector,
    favoriteSelector,
    authSelector,
    (process, favorite, authentication) => ({
        process, favorite, authentication
    })
);

export default connect(mapStateToProps)(FavoriteCoFounder);

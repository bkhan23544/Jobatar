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

class FavoriteFreelancer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
                moduleId: "UserProfile",
                page: 1,
                user_id: this.props.authentication.authentication.user.id
            },
        };
    }

    componentWillMount() {
        //const { dispatch } = this.props;
        //dispatch(favoriteActions.favorites("GET", null, this.state.formField, 'freelancer'));
    }

    componentWillUnmount() {
        //const { dispatch } = this.props;
        //dispatch(favoriteActions.clear());
    }

    onChangePage = (page) => {
        const { dispatch } = this.props;
        const formField = { ...this.state.formField };
        formField["page"] = page;
        dispatch(favoriteActions.favorites("GET", null, formField, 'freelancer'));
    };

    markAsFavorite = (item) => {
        const { dispatch } = this.props;
        confirmAlert({
            title: 'Please confirm to remove',
            message: 'Are you sure you want to remove this freelancer from your favorites list?',
            buttons: [
                {
                    label: 'No',
                    onClick: () => console.log('Click No')
                },
                {
                    label: 'Yes',
                    onClick: () =>
                        itemService.favorite('DELETE', null, { item_id: item.id })
                            .then(response => {
                                dispatch(alertSelectors.success("You have successfully removed a favorite."));
                                dispatch(favoriteActions.remove(item.id, 'freelancer'));
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
        console.log(results)
        return (<FavoriteLayout>
            <DocumentTitle title="My Favorites Freelancer" />
            <div className="row">
                {/* <div className="col-12"> */}
                {process.loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={2} width={700} /> : <Fragment>
                    {results && results.map((freelancer) =>
                        // <div className="freLncrBox card mb-4" key={`item-${freelancer.id}`}>
                        //     <div className="card-body d-flex flex-wrap">
                        //         <div className="profile">
                        //             <img alt="images" className="img-fluid rounded-circle" width="145" height="145" src={(freelancer.item && freelancer.item.avatar && freelancer.item.avatar !== null) ? freelancer.item.avatar : '/images/freelancer-list-pic.jpg'} />
                        //         </div>
                        //         <div className="caption">
                        //             <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(freelancer)}>
                        //                 <i className="fas fa-heart text-info"></i>
                        //             </IconButton>
                        //             <h3><NavLink to={`/user/public/about/${freelancer.item && freelancer.item.id}`}>{freelancer.item && freelancer.item.name}</NavLink></h3>
                        //             <div className="position">
                        //                 <span>{freelancer.item.userProfile && freelancer.item.userProfile.title}</span>
                        //             </div>
                        //             <div className="address d-flex align-items-center">
                        //                 {/* <div className="col pl-0">
                        //                     <i className="fas fa-map-marker-alt"></i>
                        //                     {freelancer.item.userProfile && commonHelper.address(freelancer.item.userProfile)}
                        //                 </div> */}
                        //                 <div className="ratings d-flex align-items-center">
                        //                     <small>({freelancer.item.userProfile.avg_service_rating ?freelancer.item.userProfile.avg_service_rating:0})</small>
                        //                     <Box component="fieldset" mx={1} borderColor="transparent">
                        //                         <Rating value={freelancer.item.userProfile.avg_service_rating ?freelancer.item.userProfile.avg_service_rating:0} readOnly size="small" />
                        //                     </Box>
                        //                     <small className="count">{freelancer.item.userProfile.countServiceRating ? freelancer.item.userProfile.countServiceRating : 0}</small>
                        //                 </div>
                        //             </div>
                        //             <div className="text">{freelancer.item.userProfile && freelancer.item.userProfile.about}</div>
                        //         </div>
                        //     </div>
                        // </div>

                        <div class="col-md-3">
                            <div class="card-box text-center">
                                <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(freelancer)}>
                                    <i className="fas fa-heart text-info"></i>
                                </IconButton>
                                {freelancer.item.feautured &&
                                    <div class="most-popular">
                                        <span>Feautured</span>
                                    </div>
                                }
                                <div class="clearfix"></div>
                                <div class="member-card">
                                    <div class="member-thumb">
                                        <NavLink to={`/user/public/about/${freelancer.item.id}`}><img src={freelancer.item.avatar} class="img-circle img-thumbnail" alt="profile-image" /></NavLink>
                                        {freelancer.item.feautured && <i class="fa fa-star member-star text-success" title="verified user"></i>}
                                    </div>

                                    <div class="small-line-height">
                                        <NavLink to={`/user/public/about/${freelancer.item.id}`}><h4><a href="company.html">{freelancer.item.name}</a></h4></NavLink>
                                        <p class="text-muted p-location"><i class="fas fa-map-marker-alt icon-color"></i> {freelancer.item && freelancer.item.countryCode && freelancer.item.countryCode.name}</p>
                                        <p class="p-star">
                                            {freelancer.item.avg_job_rating === "5.00" ?
                                                <>
                                                    <i class="fa fa-star rating-star"></i>
                                                    <i class="fa fa-star rating-star"></i>
                                                    <i class="fa fa-star rating-star"></i>
                                                    <i class="fa fa-star rating-star"></i>
                                                    <i class="fa fa-star rating-star"></i>
                                                </>
                                                :
                                                freelancer.item.avg_job_rating === "4.00" ?
                                                    <>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="far fa-star"></i>
                                                    </>
                                                    :
                                                    freelancer.item.avg_job_rating === "3.00" ?
                                                        <>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="far fa-star"></i>
                                                            <i class="far fa-star"></i>
                                                        </>
                                                        :
                                                        freelancer.item.avg_job_rating === "2.00" ?
                                                            <>
                                                                <i class="fa fa-star rating-star"></i>
                                                                <i class="fa fa-star rating-star"></i>
                                                                <i class="far fa-star"></i>
                                                                <i class="far fa-star"></i>
                                                                <i class="far fa-star"></i>
                                                            </>
                                                            :
                                                            freelancer.item.avg_job_rating === "1.00" ?
                                                                <>
                                                                    <i class="fa fa-star rating-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                </>
                                                                :
                                                                freelancer.item.avg_job_rating === "0.00" ?
                                                                    <>
                                                                        <i class="far fa-star"></i>
                                                                        <i class="far fa-star"></i>
                                                                        <i class="far fa-star"></i>
                                                                        <i class="far fa-star"></i>
                                                                        <i class="far fa-star"></i>
                                                                    </>
                                                                    : null
                                            }
                                            {/* 99% (222) */}
                                        </p>
                                    </div>

                                    <h5 style={!freelancer.item.userProfile.skills.length ? { opacity: 0 } : { opacity: 1 }} >{freelancer.item.userProfile.skills.length ? freelancer.item.userProfile.skills.map((a) => `${a.title}, `) : "aaaaaaaaaa aaaaaaaaaaaa aaaaaaaa aaaaa"}</h5>
                                    <div className="text">{freelancer.item.about && freelancer.item.about.substr(0, 180)}{freelancer.item.about && freelancer.item.about.length > 180 ? "..." : null}</div>
                                    {/* <h6>{is_co_founder ? "Co-founder" : "Individual"}</h6> */}
                                    {/* <p class="text-muted font-16">
                                        {item.about}
		   </p> */}

                                </div>
                                {/* <div class="row">
                                    <div class="col-sm-4">
                                        <h6>1</h6>
                                        <p class="bottom">Jobs Done</p>
                                    </div>
                                    <div class="col-sm-4">
                                        <h6>4,345</h6>
                                        <p class="bottom">Hours Worked</p>
                                    </div>
                                    <div class="col-sm-4">
                                        <h6>$15.00/hr</h6>
                                        <p class="bottom">Hourly Rate</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                    )}
                    {(results && results.length === 0) &&
                        <div className="card service-box">
                            <div className="card-body text-center">
                                <div className="common-not-found d-flex align-items-center justify-content-center">
                                    <div className="inner">
                                        <figure>
                                            <img src="/images/not-found/freelancer-favorite.png" alt="Not found" width="100" />
                                        </figure>
                                        <h5>You don’t have any favorite freelancers</h5>
                                        <p className="title">This is where you’ll see all your favorite freelancers</p>
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
            {/* </div> */}
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

export default connect(mapStateToProps)(FavoriteFreelancer);

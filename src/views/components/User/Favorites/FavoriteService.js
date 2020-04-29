import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import { IconButton, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { confirmAlert } from 'react-confirm-alert';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import FavoriteLayout from './FavoriteLayout';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import Pagination from '../../../../helpers/Pagination';
import { favoriteActions } from '../../../../common/redux/actions';
import { alertSelectors } from '../../../../common/redux/selectors';
import { PublicServiceLoader } from '../../../../common/loaders';
import { itemService } from '../../../../common/services';
import ContentLoader from "react-content-loader";

class FavoriteService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
                moduleId: "UserService",
                page: 1,
                user_id: this.props.authentication.authentication.user.id
            },
            favorite: null,
        };
    }
    async componentWillMount() {
        //const { dispatch } = this.props;
        //dispatch(favoriteActions.favorites("GET", null, this.state.formField, 'services'));
    }

    componentWillUnmount() {

    }

    onChangePage = (page) => {
        const { dispatch } = this.props;
        const formField = { ...this.state.formField };
        formField["page"] = page;
        dispatch(favoriteActions.favorites("GET", null, formField, 'services'));
    };

    markAsFavorite = (item) => {
        const { dispatch } = this.props;
        confirmAlert({
            title: 'Please confirm to remove',
            message: `Are you sure you want to remove this service from your favorites list?`,
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () =>
                        itemService.favorite("DELETE", null, { item_id: item.id })
                            .then(response => {
                                dispatch(alertSelectors.success("You have successfully removed a favorite."));
                                dispatch(favoriteActions.remove(item.id, 'services'));
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
        let results = (favorite && favorite.services) ? favorite.services.items : null;
        return (<FavoriteLayout>
            <DocumentTitle title="My Favorites Services" />
            <div className="row">
                {process.loading ? <Fragment>
                    {[1, 2, 3, 4].map((item) =>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={Math.random() * (+30 - +1)}>
                            <div className="p-2 bg-white">
                                <ContentLoader
                                    height={500}
                                    width={500}
                                    speed={10}
                                    primaryColor={'#ddd'}
                                    secondaryColor={'#ddd'}
                                >
                                    <rect x="0" y="0" rx="3" ry="3" width={500} height="280" />
                                    <rect x="25" y="300" rx="3" ry="3" width={450} height="20" />
                                    <rect x="25" y="350" rx="3" ry="3" width={450} height="20" />
                                    <rect x="25" y="400" rx="3" ry="3" width={450} height="20" />
                                </ContentLoader>
                            </div>
                        </div>
                    )}
                </Fragment> : <Fragment>
                        {results && results.map((item) =>
                            // <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={Math.floor(Math.random() * (+30 - +1)) + +1}>
                            //     <div className="svcsLBox mb-4">
                            //         <div className="image max-height">
                            //             <LazyLoadImage alt="image" className="img-fluid w-100" src={item.item && item.item.cover} effect="blur" />
                            //             <IconButton className="favorite" onClick={() => this.markAsFavorite(item)}>
                            //                 {(item.is_favorite !== false) ? <i className="fas fa-heart text-info"></i> :
                            //                     <i className="far fa-heart"></i>}
                            //             </IconButton>
                            //         </div>
                            //         <div className="caption">
                            //             <h3><Link to={`/user/public/service/view/${item.item.id}`}>{item.item.title}</Link></h3>
                            //             <div className="service">{item.item.proposal_count ? item.item.proposal_count : 'Not'} Service Sold</div>
                            //             <div className="ratings d-flex align-items-center">
                            //                 <small>({item.item.avg_rating})</small>
                            //                 <Box component="fieldset" mx={1} borderColor="transparent">
                            //                     <Rating value={parseFloat(item.item.avg_rating)} readOnly />
                            //                 </Box>
                            //                 <small className="count">{item.item.proposal_count}</small>
                            //             </div>
                            //         </div>
                            //     </div>
                            // </div>

                            <div className="col-md-6 col-lg-4" key={item.item.id}>
                                <div className="svcsLBox w-100 float-left">
                                    <div className="image">
                                        <Link to={`/user/public/service/view/${item.item.id}`} className="bg-image">
                                            <LazyLoadImage alt="image" className="img-fluid" src={item.item.cover} effect="blur" />
                                        </Link>
                                        <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                            <i className="fas fa-heart text-info"></i>
                                        </IconButton>
                                    </div>
                                    <div className="caption w-100 float-left">
                                        <h3 className="text-truncate" title={item.item.title}><Link to={`/user/public/service/view/${item.item.id}`}>{item.item.title}</Link></h3>
                                        {item.item.sold_count ? <div className="service">{item.item.sold_count} Service Sold</div> : ''}
                                        <div className="ratings d-flex align-items-center">
                                            <small>({item.item.avg_rating})</small>
                                            <Box component="fieldset" mx={1} borderColor="transparent">
                                                <Rating value={Math.floor(item.item.avg_rating)} readOnly />
                                            </Box>
                                            {(item && item.item.count_rating !== 0) && <small className="count">{item.item.count_rating}</small>}
                                        </div>
                                        {/* <div className="profile d-flex align-items-center">
                                        <div className="img pr-2">
                                            <NavLink to={`/user/public/about/${item.item.user.id}`}><img src={item.item.user.avatar} className="img-fluid rounded-circle" width="32" height="32" alt="" /></NavLink>
                                        </div>
                                        <div className="caption">
                                            <h6 className="mb-0"> <NavLink to={`/user/public/about/${item.item.user.id}`}>{item.item.user.name}</NavLink></h6>
                                            <p className="mb-0"><small>
                                                {item.item.user && item.item.user.countryCode && item.item.user.countryCode.name}
                                            </small></p>
                                        </div>
                                    </div> */}

                                        <div class="col-lg-12 abc">
                                            <div class="pull-left">
                                                <NavLink to="#">
                                                    {item.item.user.avatar ?
                                                        <img class="img-responsive" src={item.item.user.avatar} alt="Image" />
                                                        : ""}
                                                </NavLink>
                                            </div>
                                            <h5> {item.item.user.name} </h5>
                                            <p><i className="fas fa-map-marker-alt icon-color"></i> {item.item.user.countryCode && item.item.user.countryCode.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                        {(results && results.length === 0) && <div className="col-12">
                            <div className="card service-box">
                                <div className="card-body text-center">
                                    <div className="common-not-found d-flex align-items-center justify-content-center">
                                        <div className="inner">
                                            <figure>
                                                <img src="/images/not-found/My-Services.png" alt="Not found" width="100" />
                                            </figure>
                                            <h5>You don’t have any favorite services</h5>
                                            <p className="title">This is where you’ll see all your favorite services</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </Fragment>}
                <div className="col-12">
                    <Pagination className="justify-content-end"
                        pageSize={20}
                        totalCount={(favorite && favorite.services && favorite.services.pagination.totalCount) ? favorite.services.pagination.totalCount : 10}
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

export default connect(mapStateToProps)(FavoriteService);

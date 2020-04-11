import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { IconButton, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { confirmAlert } from 'react-confirm-alert';
import { alertSelectors } from '../../../../common/redux/selectors';
import { itemService } from '../../../../common/services';
import { PublicServiceLoader } from '../../../../common/loaders';
import ContentLoader from "react-content-loader";


class ServiceListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: {},
        }
    }

    markAsFavorite = (item) => {
        const { dispatch } = this.props;
        const params = {
            "userFavorite": {
                favorite_id: item.id,
                moduleId: "UserService"
            }
        };

        let method = (item.is_favorite) ? "DELETE" : "POST";
        let param = (item.is_favorite) ? { item_id: item.is_favorite } : null;
        let action = (item.is_favorite) ? "remove" : "add";

        confirmAlert({
            title: `Please confirm to ${action}`,
            message: `Are you sure you want to ${action} this service to your favorites list?`,
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () =>
                        itemService.favorite(method, params, param)
                            .then(response => {
                                if (method === "POST") dispatch(alertSelectors.success("You have successfully selected a favorite."));
                                if (method === "DELETE") dispatch(alertSelectors.success("You have successfully removed a favorite."));
                                item.is_favorite = (method === "POST") ? response.model.id : false;
                                this.setState({ favorite: item });
                            })
                            .catch(exception => {
                                console.log(exception);
                            })
                }
            ]
        });
    };

    render() {
        const { process, results } = this.props;

        return (<div className="row" style={{ justifyContent: "space-evenly" }}>
            {process.loading ? <Fragment>
                {[1, 2, 3, 4, 5, 6].map((number) =>
                    <div className="col-md-4" key={Math.random() * (+1 - +1) + number}>
                        <div className="p-0 bg-white">
                            <ContentLoader
                                height={550}
                                width={500}
                                speed={10}
                                primaryColor={'#ddd'}
                                secondaryColor={'#ddd'}
                            >
                                <rect x="0" y="0" rx="3" ry="3" width={500} height="280" />
                                <rect x="25" y="300" rx="3" ry="3" width={450} height="20" />
                                <rect x="25" y="350" rx="3" ry="3" width={450} height="20" />
                                <rect x="25" y="400" rx="3" ry="3" width={450} height="20" />
                                <rect x="25" y="450" rx="3" ry="3" width={450} height="20" />
                            </ContentLoader>
                        </div>
                    </div>
                )}
            </Fragment> :
                <Fragment>
                    {results && results.map((item) =>
                        <div className="col-md-4" key={item.id}>
                            <div className="svcsLBox w-100 float-left">
                                <div className="image">
                                    <Link to={`/user/public/service/view/${item.id}`} className="bg-image">
                                        <LazyLoadImage alt="image" className="img-fluid" src={item.cover} effect="blur" />
                                    </Link>
                                    <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                        {(item.is_favorite) ? <i className="fas fa-heart text-info"></i> :
                                            <i className="far fa-heart"></i>}
                                    </IconButton>
                                </div>
                                <div className="caption w-100 float-left">
                                    <h3 className="text-truncate" title={item.title}><Link to={`/user/public/service/view/${item.id}`}>{item.title}</Link></h3>
                                    {item.sold_count ? <div className="service">{item.sold_count} Service Sold</div> : ''}
                                    <div className="ratings d-flex align-items-center">
                                        <small>({item.avg_rating})</small>
                                        <Box component="fieldset" mx={1} borderColor="transparent">
                                            <Rating value={Math.floor(item.avg_rating)} readOnly />
                                        </Box>
                                        {(item && item.count_rating !== 0) && <small className="count">{item.count_rating}</small>}
                                    </div>
                                    {/* <div className="profile d-flex align-items-center">
                                        <div className="img pr-2">
                                            <NavLink to={`/user/public/about/${item.user.id}`}><img src={item.user.avatar} className="img-fluid rounded-circle" width="32" height="32" alt="" /></NavLink>
                                        </div>
                                        <div className="caption">
                                            <h6 className="mb-0"> <NavLink to={`/user/public/about/${item.user.id}`}>{item.user.name}</NavLink></h6>
                                            <p className="mb-0"><small>
                                                {item.user && item.user.countryCode && item.user.countryCode.name}
                                            </small></p>
                                        </div>
                                    </div> */}

                                    <div class="col-lg-12 abc">
                                        <div class="pull-left">
                                            <NavLink to="#">
                                                {item.user.avatar ?
                                                    <img class="img-responsive" src={item.user.avatar} alt="Image" />
                                                    : ""}
                                            </NavLink>
                                        </div>
                                        <h5> {item.user.name} </h5>
                                        <p><i className="fas fa-map-marker-alt icon-color"></i> {item.user.countryCode && item.user.countryCode.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Fragment>
            }
        </div>);
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    (process) => ({
        process
    })
);

export default connect(mapStateToProps)(ServiceListing);
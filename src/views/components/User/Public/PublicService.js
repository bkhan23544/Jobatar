import React, { Component, Fragment } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { IconButton, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PublicLayout from './PublicLayout';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { userActions, serviceActions } from '../../../../common/redux/actions';
import {PublicServiceLoader, SearchLoader} from '../../../../common/loaders';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import Pagination from "../../../../helpers/Pagination";
import { confirmAlert } from 'react-confirm-alert';
import { itemService } from '../../../../common/services';
import { alertSelectors } from '../../../../common/redux/selectors';
import ContentLoader from "react-content-loader";

class PublicService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            services: null,
            favorite: {},
        }
    }

    componentWillMount() {
        const { dispatch, user, services, match } = this.props;
        let id = match.params.id;
        (( user === null ) || (user.user.id !== id)) && dispatch(userActions.publicProfile("GET", null, {item_id: id}));
        let service_user_id = this.findUserIdByServies(services);
        ((Object.getOwnPropertyNames(services).length === 0 ) || (service_user_id !== id)) && dispatch(serviceActions.index("GET", null, {user_id: id}));
    }

    componentDidUpdate(prevProps) {
        const {match, dispatch} = this.props;
        if (this.props.match.params.id !== prevProps.match.params.id) {
            const id = match.params.id;
            dispatch(userActions.publicProfile("GET", null, {item_id: id}));
            this.setState({id: id ? id : null});
        }
    }

    findUserIdByServies = (services) => {
        return (services && services.data) ? services.data.user_id : null;
    };

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(serviceActions.clear());
    }

    componentDidMount() {

    }

    onChangePage = (page) => {
        if(page !== 1) {
            const { dispatch, match } = this.props;
            let id = match.params.id;
            dispatch(serviceActions.index("GET", null, {user_id: id, page: page}));
        }
    };

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
        const {services, process} = this.props;
        let serviceArr = services.data ? services.data.items : [];

        return (<PublicLayout>
            <DocumentTitle title="Services"/>
            <div className="services w-100">
                <div className="row">
                    {process.loading ? <Fragment>
                            {[1,2,3].map((numbe) =>
                                <div className="col-lg-4 col-sm-6 col-12" key={Math.random() * (+1 - +1) + numbe}>
                                    <div className="p-3 bg-white">
                                        <ContentLoader
                                            height={450}
                                            width={500}
                                            speed={10}
                                            primaryColor={'#ddd'}
                                            secondaryColor={'#ddd'}
                                        >
                                            <rect x="0" y="0" rx="3" ry="3" width={500} height="280" />
                                            <rect x="25" y="300" rx="3" ry="3" width={ 450} height="20" />
                                            <rect x="25" y="350" rx="3" ry="3" width={ 450} height="20" />
                                            <rect x="25" y="400" rx="3" ry="3" width={450} height="20" />
                                        </ContentLoader>
                                    </div>
                                </div>
                            )}
                        </Fragment> :
                        <Fragment>
                            {serviceArr && serviceArr.length === 0 && <div className="col-12">
                                <div className="card service-box">
                                    <div className="card-body text-center">
                                        <div className="common-not-found d-flex align-items-center justify-content-center">
                                            <div className="inner text-center">
                                                <figure>
                                                    <img src="/images/not-found/My-Services.png" alt="My Services" width="100" />
                                                </figure>
                                                <h5>No Services are listed yet</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                            {serviceArr && serviceArr.map((item) =>
                                <div className="col-lg-4 col-sm-6 col-12" key={item.id}>
                                    <div className="svcsLBox mb-4">
                                        <div className="image">
                                            <LazyLoadImage alt="image" className="img-fluid w-100" src={item.cover && item.cover} effect="blur" />
                                            <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                                {(item.is_favorite !== false) ? <i className="fas fa-heart text-info"></i> :
                                                    <i className="far fa-heart"></i>}
                                            </IconButton>
                                        </div>
                                        <div className="caption">
                                            <h3><Link to={`/user/public/service/view/${item.id}`}>{item.title}</Link></h3>
                                            <div className="service">{item.proposal_count ? item.proposal_count : 'Not'} Service Sold</div>
                                            <div className="ratings d-flex align-items-center">
                                                <small>({item.avg_rating})</small>
                                                <Box component="fieldset" mx={1} borderColor="transparent">
                                                    <Rating value={parseFloat(item.avg_rating)} readOnly />
                                                </Box>
                                                <small className="count">{item.proposal_count}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    }

                    <div className="col-12">
                        <Pagination className="justify-content-center" pageSize={20}
                            totalCount={(services && services.data && services.data.pagination.totalCount) ? services.data.pagination.totalCount : 10}
                            onChangePage={this.onChangePage}/>
                    </div>
                </div>
            </div>
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

const serviceSelector = createSelector(
    state => state.services,
    services => services
);

const mapStateToProps = createSelector(
    processSelector,
    userSelector,
    serviceSelector,
    (process, user, services) => ({
        process, user, services
    })
);

export default connect(mapStateToProps)(PublicService);

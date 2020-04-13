import React, { Component, Fragment } from 'react';
import { Main } from "../../layout";
import { Link, NavLink } from 'react-router-dom';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { serviceActions, userActions } from "../../../common/redux/actions";
import { Box, IconButton } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { DocumentTitle } from "../../../helpers/DocumentTitle";
import { globalService as gs } from '../../../common/services';
import { confirmAlert } from 'react-confirm-alert';
import { alertSelectors } from '../../../common/redux/selectors';
import { Dropdown } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

//const deactive = 0;

class ServiceListing extends Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(serviceActions.index("GET", null, { user_id: gs.identity.user.id }));
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(serviceActions.clear());
    }

    deactiveService = (item, action) => {
        const { dispatch } = this.props;
        confirmAlert({
            //title: `Please confirm to ${action} `,
            message: `${action}`,
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(userActions.service("POST", { userService: { status: (item.status === 1) ? 0 : 1 } }, { item_id: item.id }));
                        dispatch(serviceActions.index("GET", null, { user_id: gs.identity.user.id }));
                    }
                }
            ]
        });

    };

    render() {
        const { services, process } = this.props;
        let results = services.data ? services.data : [];

        return (<Main>
            <DocumentTitle title={'My Services'} />
            <div className="my-services bg-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <h1 className="d-flex heading">
                                <span className="col pl-0">My Services</span>
                                <Link to="/service/create" className="btn btn-info headingButton">Post a Service</Link>
                            </h1>
                        </div>
                        <div className="col-12">
                            {process.loading ? <div className="card service-box"><div className="card-body"><div className="d-flex justify-content-center"><div className="spinner-border text-info"><span className="sr-only">Loading...</span></div></div></div></div> :
                                <Fragment>
                                    {results.items && results.items.map((item) =>
                                        // <div className="card service-box" key={item.id}>
                                        //     <div className="card-body">
                                        //         <h5 className="card-title">
                                        //              <Link to={`/service/view/${item.id}`}>{item.title}</Link>
                                        //         </h5>
                                        //         <div className="d-flex align-items-center flex-wrap">
                                        //             <div className="col pl-0 d-flex align-items-center">
                                        //                 <div className="category text-truncate">
                                        //                     <span>{item.skills && item.skills.map((skill) => skill.title).join(", ")}</span>
                                        //                 </div>
                                        //                 <div className="sold text-nowrap">{(item.proposal_count === 0) ? 'Not Booked' : `${item.proposal_count} Times Booked`} </div>
                                        //                 <div className="price text-nowrap">{(item.budget === null) ? <small>Not Set</small> : `$${item.budget}`}</div>
                                        //                 <div className="ratings d-flex align-items-center">
                                        //                     {(parseFloat(item.avg_rating) !== 0) && <small>({parseFloat(item.avg_rating)})</small>}
                                        //                     <Box component="fieldset" mx={1} borderColor="transparent">
                                        //                         <Rating value={ parseFloat(item.avg_rating) } readOnly />
                                        //                     </Box>
                                        //                     {(item.proposal_count !== 0) && <small className="count">{item.proposal_count}</small>}
                                        //                 </div>

                                        //                 <div className={`status badge badge-${(item.status === 0) ? 'info' : `primary`} ml-3`}>{(item.status === 0) ? 'Deactivated' : `Activated`} </div>
                                        //             </div>
                                        //             {gs.isOwner(item.user_id) && <div className="auction d-flex align-items-center">
                                        //                 {item.received_offers ? <div className="offer ">
                                        //                     <Link className="btn btn-sm btn-outline-primary" to={`/service/view/${item.id}`}>Offers Received ({item.received_offers})</Link>
                                        //                 </div> : '' }
                                        //                 <Dropdown className="button">
                                        //                     <Dropdown.Toggle as="button" className="btn btn-link">
                                        //                         <i className="fas fa-ellipsis-v"></i>
                                        //                     </Dropdown.Toggle>
                                        //                     <Dropdown.Menu>
                                        //                         <Link className="dropdown-item" to={`/service/update/${item.id}`}>Update</Link>
                                        //                         { (item.status === 1) && <button className="dropdown-item" onClick={() => this.deactiveService(item, 'Are you sure you want to temporarily deactivate this servicer?')}>Deactivate</button> }
                                        //                         { (item.status === 0) && <button className="dropdown-item" onClick={() => this.deactiveService(item, 'Are you sure you want to reactivate this service?')}>Activate</button> }
                                        //                     </Dropdown.Menu>
                                        //                 </Dropdown>
                                        //             </div>
                                        //             }
                                        //         </div>
                                        //     </div>
                                        // </div>

                                        <div className="col-md-3" key={item.id}>
                                            <div className="svcsLBox w-100 float-left">
                                                <div className="image">
                                                    <div className="serviceOverlayer">

                                                    </div>
                                                    <Link to={`/service/view/${item.id}`} className="bg-image">
                                                        <LazyLoadImage alt="image" className="img-fluid" src={item.cover} effect="blur" />
                                                    </Link>
                                                    <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                                        {(item.is_favorite) ? <i className="fas fa-heart text-info"></i> :
                                                            <i className="far fa-heart"></i>}
                                                    </IconButton>
                                                    <Dropdown className="button DropDownDots">
                                                        <Dropdown.Toggle as="button" className="btn btn-link">
                                                            <IconButton style={{ width: "100%" }}>
                                                                <i class="fas fa-ellipsis-v"></i>
                                                            </IconButton>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Link className="dropdown-item" to={`/service/update/${item.id}`}>Update</Link>
                                                            {(item.status === 1) && <button className="dropdown-item" onClick={() => this.deactiveService(item, 'Are you sure you want to temporarily deactivate this servicer?')}>Deactivate</button>}
                                                            {(item.status === 0) && <button className="dropdown-item" onClick={() => this.deactiveService(item, 'Are you sure you want to reactivate this service?')}>Activate</button>}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <div className="caption w-100 float-left">
                                                    <h3 className="text-truncate" title={item.title}><Link to={`/service/view/${item.id}`}>{item.title}</Link>
                                                        <p className={`status badge badge-${(item.status === 0) ? 'info' : `primary`} ml-3`}>{(item.status === 0) ? 'Deactivated' : `Activated`} </p>
                                                    </h3>
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
                                                        {item.received_offers ?
                                                            <Link className="offer" to={`/service/view/${item.id}`}>Offers ({item.received_offers})</Link>
                                                            : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )}
                                    {(results.items && results.items.length === 0) &&
                                        <div className="card service-box">
                                            <div className="card-body text-center">
                                                <div className="common-not-found d-flex align-items-center justify-content-center">
                                                    <div className="inner">
                                                        <figure>
                                                            <img src="/images/not-found/My-Services.png" alt="Not found" width="100" />
                                                        </figure>
                                                        <h5>You have not created any services yet</h5>
                                                        <p className="title">This is where you’ll be able to track all the services you created</p>
                                                        <p className="mb-1"><Link className="btn btn-link text-uppercase" to="/service-search">Find Services</Link></p>
                                                        <p className="mb-2"><b>OR</b></p>
                                                        <p><Link className="btn btn-primary" to="/service/create">Post First Service</Link></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </Fragment>
                            }
                        </div>


                        <div className="col-12">

                            {/* <div className="card button">
                                <div className=" d-flex align-items-center">
                                    <div className="col pl-0">Update all the letest changes made by you, by just cliking on "Save Changes" button.</div>
                                    <button type="submit" className="btn btn-info">Save Changes</button>
                                </div>
                            </div> */}

                        </div>

                    </div>
                </div>
            </div>
        </Main>);
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const serviceSelector = createSelector(
    state => state.services,
    services => services
);

const mapStateToProps = createSelector(
    processSelector,
    serviceSelector,
    (process, services) => ({
        process,
        services
    })
);

export default connect(mapStateToProps)(ServiceListing);

import React, { Fragment } from 'react';
import { IconButton, Box } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Rating from '@material-ui/lab/Rating';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { NavLink, Link } from 'react-router-dom';
import { commonHelper } from '../../../../../helpers/common.helper';

const OtherServices = (props) => {

    const { services, item, service_id } = props;
    let items = services.data ? services.data.items : [];
    items = items.filter(item => (parseInt(item.id) !== parseInt(service_id)));

    return (
        <div className="col-12 same-person">
            <h4>Other Services {item ? `by ${item.user.name}` : ''}</h4>
            {items && items.length < 1 ? 'No data yet' : ''}
            <div className="row">
                {items && <Fragment>
                    {items && items.slice(0, 4).map((item) =>
                        <Fragment key={item.id}>
                            <div className={`col-xl-3 col-md-6 col-sm-6 col-12 d-block`}>
                                <div className="svcsLBox w-100 float-left">
                                    <div className="image">
                                        <Link to={`/user/public/service/view/${item.id}`} className="bg-image">
                                            <LazyLoadImage alt="image" className="img-fluid" src={item.cover ? item.cover : "/images/service-list-1.jpg"} effect="blur" />
                                        </Link>
                                        <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                            {(item && item.is_favorite !== false) ? <i className="fas fa-heart text-info"></i> :
                                                <i className="far fa-heart"></i>}
                                        </IconButton>
                                    </div>
                                    <div className="caption w-100 float-left">
                                        <h3 className="text-truncate" title={item.title}><NavLink to={`/user/public/service/view/${item.id}`}>{item.title}</NavLink></h3>
                                        <div className="service">{item.proposal_count} Service Sold</div>
                                        <div className="ratings d-flex align-items-center">
                                            <small>({Math.round(parseFloat(item.avg_rating))})</small>
                                            <Box component="fieldset" mx={1} borderColor="transparent">
                                                <Rating value={Math.round(parseFloat(item.avg_rating))} readOnly />
                                            </Box>
                                            <small className="count">{item.proposal_count}</small>
                                        </div>
                                        <div className="profile d-flex align-items-center">
                                            <div className="img pr-2">
                                                <NavLink to={`/user/public/about/${item.user_id}`}>
                                                    <img src={item.user.avatar} className="rounded-circle w-auto" width="60"
                                                        height="60" alt="" /></NavLink>
                                            </div>
                                            <div className="caption">
                                                <h6 className="mb-0">
                                                    <NavLink to={`/user/public/about/${item.user_id}`}>{item.user.name}</NavLink>
                                                </h6>
                                                <p className="mb-0"><small>{item.user && item.user.countryCode && item.user.countryCode.name}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </Fragment>}
            </div>
        </div>
    )
};



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

export default connect(mapStateToProps)(OtherServices);

import React from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { NavLink } from "react-router-dom";
import {globalService as gs} from "../../../../common/services";
import ReadMoreReact from "read-more-react";

const BuyerView = (props) => {


    const { item, title } = props;

    return (
          <div className="card mb-4 buyerInfo">
            <div className="card-body text-center">
                <h5 className="card-title text-primary text-left">{title}</h5>
                <div className="image">
                    <NavLink to={`/user/public/about/${item.id}`}> <img className="rounded-circle" src={item.avatar} alt="Images" width="100" height="100" /></NavLink>
                </div>
                <div className="text">
                    <h4><NavLink to={`/user/public/about/${item.id}`}>{item.name}</NavLink></h4>
                    <div className="sold">{item.sold_count ? item.sold_count : 0} Services Sold</div>
                    <div className="rating d-flex align-items-center justify-content-center">
                        <small>({parseFloat(item.avg_rating)})</small>
                        <Box component="fieldset" mx={1} borderColor="transparent">
                            <Rating value={parseFloat(item.avg_rating)} readOnly size="small" />
                        </Box>
                        <small className="count">({item.count_rating})</small>
                    </div>
                    {(item && item.countryCode && item.countryCode.name) &&
                        <div className="location">
                            <i className="fas fa-map-marker-alt text-primary"></i> {item && item.countryCode && item.countryCode.name}
                        </div>}
                    <ReadMoreReact className="custom-description" text={gs.html2text(item.about)} min={120} ideal={150} max={200} readMoreText={'Read More'} />
                </div>
            </div>
        </div>
    )
};

const userSelector = createSelector(
    state => state.user,
    user => user
);

const mapStateToProps = createSelector(
    userSelector,
    (user) => ({
        user
    })
);

export default connect(mapStateToProps)(BuyerView);

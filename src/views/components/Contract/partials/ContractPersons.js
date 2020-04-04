import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { IconButton } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { history } from '../../../../helpers/history';

class ContractPersons extends Component {

    constructor(props) {
        super(props);
    }

    toRedirect = (item) => {
        const path = `/` + this.findPath(item.status).toLowerCase() + `/view/${item.id}`;
        history.push(path);
    };

    findPath = (statusId) => {
        const { module } = this.props;
        let status = '';
        switch (statusId) {
            case 0:
                status = "Submitted";
                break;
            case 3:
                status = (module === "common\\models\\UserItem") ? "Active" : "Offers";
                break;
            case 2:
                status = "Declined";
                break;
            case 5:
                status = "Completed";
                break;
            case 1:
            case 4:
                status = "Contracts";
                break;
            default:
                status = "Submitted";
        }
        return status;
    };

    render() {
        const { results, status } = this.props;

        return (<Fragment>
            {results && results.length === 0 ? 'Proposals not found' : ''}
            {results && results.map((item) =>
                <div className="freLncrBox card mb-4" key={`freelancer-${item.provider.user_id}`}>
                    {console.log(item)}
                    <div className="card-body d-flex flex-wrap">
                        <div className="profile">
                            <LazyLoadImage alt="image" className="img-fluid rounded-circle" width="145" height="145"
                                src={item.provider.avatar} effect="blur" />
                        </div>
                        <div className="caption">
                            <h3><NavLink to={`/user/public/about/${item.provider.user_id}`}>{item.provider.name}</NavLink></h3>
                            <div className="position">
                                {item.provider.skills && item.provider.skills.map((skill) => <span key={skill.id}>{skill.title} </span>)}
                            </div>
                            <div className="price">{(item.budget === null) ? <small>Not Set</small> : `$${item.budget}`}</div>
                            <div className="ratings d-flex align-items-center">
                                {(parseFloat(item.avg_rating) !== 0) && <small>({parseFloat(item.avg_rating)})</small>}
                                <Box component="fieldset" mx={1} borderColor="transparent">
                                    <Rating value={parseFloat(item.avg_rating)} readOnly />
                                </Box>
                                {(item.proposal_count !== 0) && <small className="count">{item.proposal_count}</small>}
                            </div>
                            <div className="address"><i className="fas fa-map-marker-alt"></i>
                                {item.provider && commonHelper.address(item.provider)}
                            </div>
                            <div className="text">{item.provider.about && item.provider.about.substr(0, 180)}</div>
                        </div>
                    </div>
                    <div className="auction d-flex align-items-center">
                        {item && <div className="button d-flex">
                            <button className="btn btn-primary" onClick={() => this.toRedirect(item)}>Bidding Price {(item.budget === null) ? <small>Not Set</small> : `$${item.budget}`}</button>
                            <button className="btn btn-info" onClick={() => this.toRedirect(item)}>View Offer</button>
                        </div>}
                    </div>
                </div>
            )}
            {(results.items && results.items.length === 0) &&
                <div className="card service-box">
                    <div className="card-body text-center">Contracts not found</div>
                </div>
            }
        </Fragment>)
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    (process) => ({
        process,
    })
);

export default connect(mapStateToProps)(ContractPersons);
import React, { Component, Fragment } from 'react';
import Rating from '@material-ui/lab/Rating';
import { Element } from 'react-scroll';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { Box } from '@material-ui/core';
import "react-alice-carousel/lib/alice-carousel.css";
import { NavLink, Link } from "react-router-dom";
import { history } from '../../../../helpers/history';
import { commonHelper } from '../../../../helpers/common.helper';

class ProposalReceived extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuOpen: null,
        };
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
            case 11:
                status = "Bids";
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

        const { results } = this.props;
        return (
            // <Element className="card" name="offers_received">
            //     {(results && results.length > 0) ? <div className="card-text px-3">
            //         {results.map(item =>
            //             (<div className="my-offers mb-0" key={`contract-${item.id}`}>

            //                 <div className="row align-items-center">
            //                     <div className="col-12 col-md-6 profile">
            //                         <div className="pic">
            //                             <NavLink to={`/user/public/about/${item.provider_id}`}><img src={item.provider.avatar} className="img-fluid rounded-circle" width="50" height="50" aria-hidden alt="Images Katharine" /></NavLink>
            //                         </div>
            //                         <div className="caption">
            //                             <h4><NavLink to={`/user/public/about/${item.provider_id}`}>{item.provider.name}</NavLink></h4>
            //                             <div className="position">
            //                                 {item.provider.skills && item.provider.skills.map((skill) => skill.title).join(", ")}
            //                             </div>
            //                             <p>{item.comment}</p>
            //                         </div>
            //                     </div>
            //                     <div className="col col-md-4 rating">
            //                         <div className="w-100 align-items-center" style={{lineHeight: '15px'}}>
            //                             <small>({item.provider.avg_rating})</small>
            //                             <Box component="fieldset" mx={1} borderColor="transparent">
            //                                 <Rating value={item.provider.avg_rating} readOnly />
            //                             </Box>
            //                             <small className="count">({item.provider.count_rating})</small>
            //                         </div>
            //                         <div className="location"><i className="fas fa-map-marker-alt text-primary"></i> {item.provider && commonHelper.address(item.provider)}
            //                        </div>
            //                     </div>

            //                     {item && <div className="col col-md-2 action">
            //                         <Link to={`/` + this.findPath(item.status).toLowerCase() + `/view/${item.id}`} className="btn btn-outline-info">View Details</Link>
            //                     </div>}

            //                     {/*  proposal && proposal.status === 3 &&  <div className="col col-md-2 action text-right">
            //                             <button className="btn btn-info btn-accept" onClick={ this.proposalAction('accepted')} >Accepted</button>
            //             </div> */ }

            //                     {/* <div className="col col-md-2 action text-right">
            //                             <IconButton onClick={this.handleClick} >
            //                                 <MoreVertIcon />
            //                             </IconButton>
            //                             <Menu
            //                                 anchorEl={menuOpen}
            //                                 keepMounted
            //                                 open={open}
            //                                 onClose={this.handleClose}
            //                             >
            //                                 <MenuItem onClick={this.accept}>Accept</MenuItem>
            //                                 <MenuItem onClick={this.decline}>Decline</MenuItem>
            //                                 <MenuItem onClick={this.message}>Message</MenuItem>
            //                                 <MenuItem onClick={this.counterOffer}>Submit Counter Offer</MenuItem>
            //                             </Menu>
            //             </div> */}
            //                 </div>
            //                 {item.settlement === 'cash' && item.budget && <div className="offers">
            //                     <span className="pr-2">Final Offer</span> <big className="price text-primary">${item.budget}</big>
            //                 </div>}
            //                 {item.settlement === 'exchange' && <div className="offers">
            //                     <span className="pr-2">Final Offer</span> <big className="price text-primary">{item.userItemProposalServices && item.userItemProposalServices.map((service) => service.title).join(", ")}</big>
            //                 </div>}

            //             </div>)
            //         )}
            //     </div> : (<div className="card-body text-center">None</div>)}
            // </Element>
            <Fragment>
                {results && results.length ?
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">Proposals from Freelancers</h3>
                        </div>
                        <div className="box-body">
                            <div className="table-responsive">
                                <table id="example1" className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Freelancer</th>
                                            {/* <th>Comment</th> */}
                                            <th>Final Offer</th>
                                            <th>Ratings</th>
                                            <th>Location</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results && results.map((item) =>
                                            //    <div className="card service-box" key={`e#${item.id}`}>

                                            //             <div className="card-body">
                                            //                 <h5 className="card-title">
                                            //                     <Link to={`/${status.toLowerCase()}/view/${item.id}`}>{item.item && item.item.title}</Link>
                                            //                 </h5>
                                            //                 <div className="d-flex align-items-center">
                                            //                     <div className="col pl-0 d-flex align-items-center">
                                            //                         <div className="category text-truncate w-20 pr-2">
                                            //                             <span> {item.proposalRecipient && item.proposalRecipient.name }</span>
                                            //                         </div>
                                            //                         <div className="date pr-3 w-25">
                                            //                             { moment(item.updated_at * 1000).format('LLL') }
                                            //                         </div>
                                            //                         <div className="ratings d-flex align-items-center w-50">
                                            //                             {settlement === 'cash' &&
                                            //                                 <div className="price d-flex align-items-center"> {(item.budget === null) ? <small>Not Set</small> : `$${item.budget}`} {((item.status !== status_pending) && (item.status !== status_declined) && (item.status !== status_payment_confirm) && (item.status !== status_completed) && (item.status !== status_accepted_and_closed)) && < small className="text-info pt-2 pl-2" title="Active Service"></small>}</div>
                                            //                             }
                                            //                             {settlement === 'exchange' && <Fragment>
                                            //                                 <div className="title pr-2">Service Exchange</div>
                                            //                                 {item.item && item.item.skills && item.item.skills.slice(0, 4).map((skill) => <div key={`${skill.id}`} className="badge badge-pill badge-secondary px-3">{skill.title}</div>) }
                                            //                             </Fragment>}
                                            //                         </div>

                                            //                         <div className="status w-15 text-left">
                                            //                             {item.isDispute && <span className={`badge mr-2 badge-info`}>Disputed</span> }
                                            //                             <span className={`badge badge-${this.proposalStatus(item).cls}`}>{this.proposalStatus(item).title}</span>
                                            //                         </div>
                                            //                     </div>
                                            //                     {<div className="auction d-flex align-items-center">
                                            //                         <div className="button d-flex">
                                            //                             <Link className="btn btn-sm" to={`/${status.toLowerCase()}/view/${item.id}`}><i className="fas fa-eye"></i></Link>
                                            //                         </div>
                                            //                     </div>}
                                            //                 </div>
                                            //                     {(status_declined === item.status) && <div><b>Decline Reason: </b> {item.comment}</div>}
                                            //             </div>
                                            //         </div>
                                            <tr>
                                                <td className="first">
                                                    <div className="insideFirst">
                                                    <img src={item.actionBy.avatar} className="img-responsive img-circle pull-left" width="40" height="40" alt="Image" />
                                                    <NavLink to={`/user/public/about/${item.provider_id}`}>{item.provider.name}</NavLink>
                                                    </div>
                                                </td>
                                                {/* <td>
                                                    {item.comment}
                                                </td> */}
                                                <td>
                                                    ${item.budget}
                                                </td>
                                                <td>
                                                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                                        <small>({item.provider.avg_rating})</small>
                                                        <Box component="fieldset" mx={1} borderColor="transparent">
                                                            <Rating value={item.provider.avg_rating} readOnly />
                                                        </Box>
                                                        <small className="count">({item.provider.count_rating})</small>
                                                    </div>
                                                </td>
                                                <td>
                                                <i className="fas fa-map-marker-alt text-primary"></i> {item.provider && commonHelper.address(item.provider)}
                                                </td>
                                                <td>
                                                    <Link to={`/` + this.findPath(item.status).toLowerCase() + `/view/${item.id}`} className="btn btn-outline-info">View Details</Link>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
            </Fragment>
        );
    }
}


const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    (process, ) => ({
        process,
    })
);

export default connect(mapStateToProps)(ProposalReceived);

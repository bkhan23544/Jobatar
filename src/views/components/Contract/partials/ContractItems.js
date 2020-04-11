import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';
import { globalService as gs } from '../../../../common/services';

const status_pending = 0;
const status_accepted = 1;
const status_declined = 2;
const status_offers = 3;
const status_payment_confirm = 4;
const status_mark_as_completed = 5;
const status_not_completed = 6;
const status_completed = 7;
const status_accepted_and_closed = 8;
const status_counter_offers = 9;

class ContractItems extends Component {

    proposalStatus = (item) => {
        let statusTitle = '';
        //const isOwner = gs.isOwner(item.provider_id);
        let cls = '';
        const isActionBy = gs.isOwner(item.action_by);
        switch (item.status) {
            case status_offers:
                statusTitle = isActionBy ? "Waiting Approval" : "New Offer";
                cls = 'primary';
                break;
            case status_counter_offers:
                statusTitle = isActionBy ? "Waiting Approval" : "Offer Countered";
                cls = 'primary';
                break;
            case status_accepted:
                statusTitle = "Accepted";
                cls = 'primary';
                break;
            case status_accepted_and_closed:
                statusTitle = "Accepted and Closed";
                cls = 'success';
                break;
            case status_declined:
                statusTitle = "Declined";
                cls = 'danger';
                break;
            case status_mark_as_completed:
                statusTitle = isActionBy ? "Mark As Completed" : "Waiting Approval";
                cls = 'primary';
                break;
            case status_not_completed:
                statusTitle = "Not Completed";
                cls = 'warning';
                break;
            case status_completed:
                statusTitle = "Completed";
                cls = 'success';
                break;
            case status_payment_confirm:
                statusTitle = "Payment Sent";
                cls = 'primary';
                break;
            default:
                statusTitle = "Accepted";
                cls = 'primary';
        }
        return { title: statusTitle, cls: cls };
    };

    _getName = (item) => {
        return;
    }

    render() {
        const { results, status, settlement, pagination } = this.props;
        console.log(results)
        return (<Fragment>
            {results && results.length ?
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">Proposals from Freelancers</h3>
                    </div>
                    <div class="box-body">
                        <div class="table-responsive">
                            <table id="example1" class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Freelancer</th>
                                        <th>Job Title</th>
                                        <th>Assigned</th>
                                        <th>Proposal</th>
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
                                        //                                 <div className="price d-flex align-items-center"> {(item.budget === null) ? <small>Not Set</small> : `$${item.budget}`} {((item.status !== status_pending) && (item.status !== status_declined) && (item.status !== status_payment_confirm) && (item.status !== status_completed) && (item.status !== status_accepted_and_closed)) && < small className="text-info pt-2 pl-2" title="Active Service"><i className="fas fa-snowboarding"></i></small>}</div>
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
                                                <img src={item.actionBy.avatar} class="img-responsive img-circle pull-left" width="50" height="50" alt="Image" />
                                                <a href="#"> {item.proposalRecipient && item.proposalRecipient.name}</a>
                                            </td>
                                            <td>
                                                <Link to={`/${status.toLowerCase()}/view/${item.id}`}>{item.item && item.item.title}</Link>
                                            </td>
                                            <td>
                                                {(item.budget === null) ? <small>Not Set</small> : `$${item.budget}`} {((item.status !== status_pending) && (item.status !== status_declined) && (item.status !== status_payment_confirm) && (item.status !== status_completed) && (item.status !== status_accepted_and_closed)) && < small className="text-info pt-2 pl-2" title="Active Service"><i className="fas fa-snowboarding"></i></small>}
                                            </td>
                                            <td>
                                                {item.isDispute && <span className={`badge mr-2 badge-info`}>Disputed</span>}
                                                <span className={`badge badge-${this.proposalStatus(item).cls}`}>{this.proposalStatus(item).title}</span>
                                            </td>
                                            <td>
                                                <Link className="kafe-btn kafe-btn-mint-small" to={`/${status.toLowerCase()}/view/${item.id}`}> View Proposal</Link>
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
            {(results && results.length === 0) &&
                <div className="card service-box">
                    <div className="card-body text-center">
                        <div className="common-not-found d-flex align-items-center justify-content-center">
                            <div className="inner">
                                {(settlement === 'cash' && status === 'Received') && <Fragment>
                                    <figure>
                                        <img src="/images/not-found/Received-Offers-Cash.png" alt="Not found" width="70" />
                                    </figure>
                                    <h5>You have not received any cash offers yet</h5>
                                    <p className="title">This is where you’ll be able to track all the cash services that you received</p>
                                </Fragment>}
                                {(settlement === 'exchange' && status === 'Received') && <Fragment>
                                    <figure>
                                        <img src="/images/not-found/Received-Offers-Exchange.png" alt="Not found" width="100" />
                                    </figure>
                                    <h5>You have not received any exchange offers yet</h5>
                                    <p className="title">This is where you’ll be able to track all the exchange services that you received</p>
                                </Fragment>}

                                {(settlement === 'cash' && status === 'Sent') && <Fragment>
                                    <figure>
                                        <img src="/images/not-found/Send-Offers-Cash.png" alt="Not found" width="100" />
                                    </figure>
                                    <h5>You have not sent any cash offers yet</h5>
                                    <p className="title">This is where you’ll be able to track all the cash services that you sent</p>
                                </Fragment>}
                                {(settlement === 'exchange' && status === 'Sent') && <Fragment>
                                    <figure>
                                        <img src="/images/not-found/Send-Offers-Exchange.png" alt="Not found" width="120" />
                                    </figure>
                                    <h5>You have not sent any exchange offers yet</h5>
                                    <p className="title">This is where you’ll be able to track all the exchange services that you sent</p>
                                </Fragment>}

                                {(settlement === 'cash' && status === 'Contracts') && <Fragment>
                                    <figure>
                                        <img src="/images/not-found/Send-Offers-Cash.png" alt="Not found" width="100" />
                                    </figure>
                                    <h5>You have not accepted any cash offers yet</h5>
                                    <p className="title">This is where you’ll be able to track all of your cash accepted offers</p>
                                </Fragment>}

                                {(settlement === 'exchange' && status === 'Contracts') && <Fragment>
                                    <figure>
                                        <img src="/images/not-found/Received-Offers-Exchange.png" alt="Not found" width="100" />
                                    </figure>
                                    <h5>You have not accepted any exchange offers yet</h5>
                                    <p className="title">This is where you’ll be able to track all of your exchange contracts</p>
                                </Fragment>}

                                {(settlement === 'cash' && status === 'Completed') && <Fragment>
                                    <figure>
                                        <img src="/images/not-found/Send-Offers-Cash.png" alt="Not found" width="100" />
                                    </figure>
                                    <h5>You have not completed any cash offers yet</h5>
                                    <p className="title">This is where you’ll be able to track all of your cash accepted offers</p>
                                </Fragment>}

                                {(settlement === 'exchange' && status === 'Completed') && <Fragment>
                                    <figure>
                                        <img src="/images/not-found/Received-Offers-Exchange.png" alt="Not found" width="100" />
                                    </figure>
                                    <h5>You have not completed any exchange offers yet</h5>
                                    <p className="title">This is where you’ll be able to track all of your exchange contracts</p>
                                </Fragment>}

                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps)(ContractItems);

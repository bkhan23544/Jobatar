import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { globalService as gs } from '../../../../common/services';
import { proposalActions } from '../../../../common/redux/actions';
import { alertSelectors } from '../../../../common/redux/selectors';
import { confirmAlert } from 'react-confirm-alert';


const status_new = 0;
const status_submission = 1;
const status_approved = 2;
const status_not_approved = 3;
const status_payment = 4;
const status_bid = 11;


class BidProposal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            proposal: null,
        };
    }

    componentDidMount() {

    }

    itemAction = (action = 'status_new', comment = null) => {
        const { dispatch } = this.props;
        const { token, item, type } = this.state;
        let capitalizeType = gs.capitalize(type);
        if (action === "status_delete") {
            dispatch(proposalActions.milestone("DELETE", {}, { item_id: item.id, proposal_id: item.proposal_id }));
            return;
        }

        const param = {};
        if (comment !== null) {
            param.comment = comment;
        }
        param.userMessage = null;
        let alert_message = null;



        switch (action) {
            /** Milestone status */
            case 'status_new':
                param.status = status_new;
                param.userMessage = this.message(`New ${type} create.`);
                alert_message = `You have create a new ${type}.`;
                break;
            case 'status_submission':
                param.status = status_submission;
                param.userMessage = this.message(`${capitalizeType} submitted.`);
                alert_message = `You have submitted a ${type}.`;
                break;
            case 'status_approved':
                param.status = status_approved;
                param.userMessage = this.message(`${capitalizeType} Approved.`);
                alert_message = `You have approved a ${type}.`;
                break;
            case 'status_not_approved':
                param.status = status_not_approved;
                param.userMessage = this.message(`${capitalizeType} Not Approved.`);
                alert_message = `You have declined a ${type}.`;
                break;
            case 'status_payment':
                param.status = status_payment;
                param.userMessage = this.message(`Payment of ${type} ${item.title} is success`);
                param.token = token;
                param.is_paid = 1;
                param.is_active = 2;
                alert_message = `Payment of ${type} ${item.title} is success`;
                break;
            default:
                param.status = status_new;
                alert_message = `You have create a new ${type}.`;
        }
        param.action_by = gs.identity.user.id;
        dispatch(proposalActions.milestone("POST", { userMilestone: param }, { item_id: item.id, proposal_id: item.proposal_id }));
        dispatch(alertSelectors.success(alert_message));
    };




    offerOpen = () => {
        this.props.offerOpen();
    };

    proposalDeclined = () => {
        this.props.proposalDeclined();
    };

    messageOpen = () => {
        this.props.messageOpen();
    };



    isVisibleActions = () => {
        const { proposal, item, isVisibleMessage } = this.props;
        const isOwner = gs.isOwner(item.user_id);
        return (isOwner &&
            <div className="visible-action">
                <div className="mb-4">
                    <button className="btn btn-primary" onClick={this.offerOpen}><i className="fas fa-redo-alt"></i>Submit Offer</button>
                    <button className="btn btn-info" onClick={this.proposalDeclined}><i className="fas fa-times"></i> Declined</button>
                    {isVisibleMessage && <button className="btn btn-primary" onClick={this.messageOpen}><i className="far fa-comments"></i> Message</button>}
                </div>
            </div>);
    };

    render() {
        const { item, proposal } = this.props;
        return (<Fragment>
            <div className="card mb-4 milestones">
                <div className="card-body">
                    <div className="offer">
                        <h2>{`Cover Letter`}</h2>
                    </div>
                    {
                        <div className={"milestones-box "} key={item.id}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {item.title}
                                </h5>
                                <div className="card-text" dangerouslySetInnerHTML={{ __html: item.description }}></div>

                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div className="price">Budget: {(item.budget === null) ? <small>Not Set</small> :
                                        <big className="text-primary">$ {item.budget}</big>}</div>
                                </div>
                                {this.isVisibleActions(item)}
                            </div>
                        </div>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps)(BidProposal);

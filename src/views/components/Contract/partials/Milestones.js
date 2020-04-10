import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { globalService as gs } from '../../../../common/services';
import { proposalActions } from '../../../../common/redux/actions';
import { alertSelectors } from '../../../../common/redux/selectors';
import { confirmAlert } from 'react-confirm-alert';
import {MilestoneForm} from "./index";
import {ModuleHelper as mh} from "../../../../helpers";

const status_new = 0;
const status_submission = 1;
const status_approved = 2;
const status_not_approved = 3;
const status_payment = 4;

const submittionStatuses = [
    status_new,
    status_not_approved,
];


//const is_active = 0;
const not_active = 1;
const active_off = 2;
const is_paid = 1;
//const is_unpaid = 0;

class Milestones extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            item: null,
            stripeKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
            setMilestone: false,
            field: {},
            milestone_id: null
        };
    }

    componentDidMount() {
        const { type } = this.props;
        this.setState({ type });
    }


    message = (text, title) => {
        this.props.message(text, title);
    };

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

    onPayment = (item, token) => {
        this.setState({ token: token, item: item });
        this.itemAction('status_payment');
    };

    isConfirmDialog = (action, message = null) => {
        const { dispatch } = this.props;
        const { type } = this.state;

        confirmAlert({
            //title: `Confirm Request`,
            message: (message === null ? `Are you sure you want to accept this ${type}?` : message),
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () => this.itemAction(action)
                }
            ]
        });
    };

    onSubmit = (item) => {
        this.setState({ item });
        const { type } = this.state;
        this.isConfirmDialog('status_submission', ` Once payment is made under ${type} details please add transaction #`);
    };

    onApproved = (item) => {
        this.setState({ item });
        const { type } = this.state;
        this.isConfirmDialog('status_approved', `Are you sure you want to approve this ${type} and send the payment?`);
    };

    onDeclined = (item) => {
        this.setState({ item });
        const { type } = this.state;
        this.isConfirmDialog('status_not_approved', `Are you sure you want to declined submittion of this ${type}?`);
    };

    isVisiblePayment = (item) => {
        const { proposal } = this.props;
        let itemPayment = parseInt(item.budget) * 100;
        const isRequest = (!gs.isOwner(proposal.provider_id) && item.is_active === 1 && item.status === status_approved);
        return (isRequest && <div className="visible-action">
            <div className="btn btn-primary">
                <StripeCheckout token={this.onPayment.bind(this, item)} stripeKey={this.state.stripeKey} amount={itemPayment} image={`${gs.rootUrl}/images/stripe_logo.png`} ComponentClass="div" label="Pay Now" panelLabel="Pay Now">Pay Now</StripeCheckout>
            </div>
        </div>);
    };

    isVisibleSubmit = (item) => {
        const { proposal } = this.props;
        const { type } = this.state;
        const isRequest = ((gs.isOwner(proposal.provider_id) && item.is_active === 1) && submittionStatuses.includes(item.status));
        return (isRequest &&
            <div className="visible-action">
            <h5 className="card-text mb-1" style={{fontSize: '14px'}}>Would you like to mark this {`${type}`} as completed?</h5>
                <div className="mb-3">
                    <button className="btn btn-success" type="button" onClick={this.onSubmit.bind(this, item)}><i className="fas fa-check"></i> Mark as Complete </button>
                </div>
            </div>)
    };


    isVisibleActions = (item) => {
        const { proposal } = this.props;
        const { type } = this.state;
        const isRequest = (!gs.isOwner(proposal.provider_id) && item.is_active === 1 && item.status === status_submission);
        return (isRequest &&
            <div className="visible-action">
            <h5 className="card-text mb-1" style={{fontSize: '14px'}}>{`${gs.capitalize(type)}`} has been marked as complete would you like to submit the payment now?</h5>
                <div className="mb-3">
                    <button className="btn btn-success" type="button" onClick={this.onApproved.bind(this, item)}><i className="fas fa-check"></i> Accept </button>
                    <button className="btn btn-info" type="button" onClick={this.onDeclined.bind(this, item)}><i className="fas fa-times"></i> Decline</button>
                </div>
            </div>);
    };

    isDisabled = (item) => {
        return (item.is_active === not_active || item.is_active === active_off) ? 'text-muted' : '';
    };

    milestoneOpen = (item) => {
        let { field } = this.state;
        field['proposal_id'] = item.proposal_id;
        field['action_by'] = item.action_by;
        field['title'] = item.title;
        field['description'] = item.description;
        field['duration'] = item.duration ? item.duration : '';
        field['budget'] = item.budget;
        field['dated'] = new Date(item.dated * 1000);
        //this.props.onEdit(item)
        this.setState({
            field,
            milestone_id: item.id,
            setMilestone: true
        });

    };

    milestoneDelete = (item) => {
        const { dispatch } = this.props;
        confirmAlert({
            //title: `Confirm Request`,
            message: 'Are you sure you want to accept the completion request?',
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () => dispatch(proposalActions.milestone("DELETE", null, {proposal_id: item.proposal_id, item_id: item.id}))
                }
            ]
        });
    }

    milestoneClose = () => {
        this.setState({
            setMilestone: false
        });
    };

    render() {
        const { proposal, status } = this.props;
        const items = proposal.userItemProposalMilestones;
        const { type, setMilestone, field, milestone_id } = this.state;
        const proposalItem = proposal.item;
        const isJobProposal = (proposal.moduleId === mh.UserItem);
        const itemType = proposalItem && proposalItem.type;
        const proposalTypeTitle = (isJobProposal === true) ? ((itemType === 'fixed') ? 'Milestone' : 'Timesheet') : '';
        let capitalizeType = gs.capitalize(type);

        return (<Fragment>
            {setMilestone && <MilestoneForm open={setMilestone} proposal_id={proposal.id} budget={proposal.budget} milestoneClose={this.milestoneClose} message={this.message} type={proposalTypeTitle} field={field} milestone_id={milestone_id} />}
            <div className="card mb-4 milestones">
                <div className="card-body">
                    <div className="offer">
                        <h5 style={{fontSize: '17px'}}>{capitalizeType}</h5>
                    </div>
                    {items && items.map((item) =>
                        <div className={"milestones-box " + this.isDisabled(item)} key={item.id}>
                            <div className="card-body">
                                <h5 className="card-text mb-1 d-flex justify-content-between">
                                    <div className="">{item.title}</div>
                                    {(item.is_paid !== is_paid) &&
                                    <div className="action">
                                        <button className="btn btn-info btn-sm" onClick={() => this.milestoneOpen(item)}><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-danger btn-sm ml-1" onClick={() => this.milestoneDelete(item)}><i className="fas fa-trash"></i> </button>
                                    </div>}
                                </h5>
                                <div className="card-text12" style={{fontWeight: 400, fontSize: '14px'}}>{item.description}</div>
                                <div className="d-flex align-items-center justify-content-between mb-3" style={{fontWeight: 500, fontSize: '14px'}}>
                                    <div className="paid">Paid On: <big className="text-primary">{(item.is_paid === is_paid) ? 'Yes' : 'No'}</big></div>
                                    <div className="price">Budget: {(item.budget === null) ? <small>Not Set</small> :
                                        <big className="text-primary">$ {item.budget}</big>}</div>
                                </div>
                                {this.isVisibleSubmit(item)}
                                {this.isVisibleActions(item)}
                                {this.isVisiblePayment(item)}
                                <div className="auction d-flex align-items-center">
                                    <div className="button d-flex">
                                        {status}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                    {(items && items.length === 0) &&
                        <div className="card-body text-center">
                            {`${capitalizeType}`} not found
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

export default connect(mapStateToProps)(Milestones);

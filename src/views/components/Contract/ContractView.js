import React, {Component, Fragment} from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { Main } from '../../layout';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import { BuyerView, ItemView, CounterOffer, RatingReviewForm, ContractDeclined, MessageForm, MilestoneForm, Milestones, DisputeForm, BidProposal } from './partials';
import { globalService as gs } from '../../../common/services';
import { ModuleHelper as mh, commonHelper as common } from '../../../helpers';
import { confirmAlert } from 'react-confirm-alert';
import { alertSelectors } from '../../../common/redux/selectors';
import { proposalActions } from '../../../common/redux/actions';
import { messageActions } from '../../../common/redux/actions/message.actions';
import { SearchLoader } from '../../../common/loaders';
import moment from 'moment';
import RatingReview from "../../components/Service/partials/RatingReview";
import CoverLatter from "./partials/CoverLatter";
import { history } from '../../../helpers/history';

const status_pending = 0;
const status_declined = 2;
const status_accepted = 1;
const status_offers = 3;
const status_counter_offers = 9;
const status_payment_confirm = 4;
const status_mark_as_completed = 5;
const status_not_completed = 6;
const status_completed = 7;
const status_accepted_and_closed = 8;
const status_refund = 10;
const status_bid = 11;

/* Milestone status */
const status_milestone_new = 0;
const status_milestone_submission = 1;
const status_milestone_approved = 2;
const status_milestone_not_approved = 3;
const status_milestone_payment = 4;

const confirmedStatuses = [
    status_accepted,
    status_accepted_and_closed,
    status_payment_confirm,
    status_mark_as_completed,
    status_not_completed,
    status_completed
];

const paymentConfirmedStatuses = [status_payment_confirm, status_mark_as_completed, status_not_completed];
const offersStatuses = [status_bid, status_offers, status_counter_offers, status_pending];
const forWaitingStatuses = [status_offers, status_pending, status_mark_as_completed, status_counter_offers];
const deletedStatuses = [status_offers, status_pending];
const acceptedStatuses = [status_accepted, status_accepted_and_closed];

class ContractView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                comment: '',
                status: '',
            },
            messageKey: null,
            setOffer: false,
            setReview: false,
            setDispute: false,
            setMessage: false,
            setAccepted: false,
            setDeclined: false,
            setMilestone: false,
            proposal: null,
            proposalItem: null,
            settlement: null,
            proposalServices: null,
            proposalHistories: null,
            buyer: null,
            isProvider: false,
            id: null,
            attachment: null,
            stripeKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
            proposalInitialOffer: null,
            proposalCounterOffer: null,
            proposalDeclinedOffer: null,
            viewCoverLatter: false,
        };
        this.messageKey = null;
        this.isHideMesageButton = false;
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(proposalActions.clear());
    }

    componentWillMount = async () => {
        const { dispatch, match } = this.props;
        const id = match.params.id ? match.params.id : null;
        dispatch(proposalActions.proposal("GET", null, { proposal_id: id }));

    };

    componentDidMount() {
        const { match } = this.props;
        const id = match.params.id ? match.params.id : null;
        this.setState({ id: id });
    }

    componentWillUpdate = (props) => {
        if (props.proposals && props.proposals.item && this.state.messageKey === null) {
            this.messageKey = props.proposals.item.model.message_id;
        }
        return false;
    };

    proposalDeclined = () => {
        this.setState({
            setDeclined: true
        });
    };

    declinedClose = () => {
        this.setState({
            setDeclined: false
        });
    };

    offerOpen = () => {
        this.setState({
            setOffer: true
        })
    };

    offerClose = () => {
        this.setState({
            setOffer: false
        });
    };

    milestoneOpen = () => {
        this.setState({
            setMilestone: true
        })
    };

    milestoneClose = () => {
        this.setState({
            setMilestone: false
        });
    };

    messageOpen = () => {
        this.messageKey ?
            gs.navigation('message', true, {'key':this.messageKey}) :
            this.setState({
                setMessage: true
            });
    };

    messageClose = () => {
        this.setState({
            setMessage: false
        });
    };

    reviewOpen = () => {
        this.setState({
            setReview: true
        });
    };

    reviewClose = () => {
        const { dispatch, match } = this.props;
        const id = match.params.id ? match.params.id : null;
        this.setState({
            setReview: false
        });
        dispatch(proposalActions.proposal("GET", null, { proposal_id: id }));
    };

    disputeOpen = () => {
        this.setState({
            setDispute: true
        });
    };

    disputeClose = () => {
        const { dispatch, match } = this.props;
        const id = match.params.id ? match.params.id : null;
        this.setState({
            setDispute: false
        });
        dispatch(proposalActions.proposal("GET", null, { proposal_id: id }));
    };



    message = (text, subject = null) => {
        const { dispatch, proposals } = this.props;
        const { attachment } = this.state;
        const proposal = proposals.item.model;
        const messageKey = proposals.item.model.message_id;
        let params = common.messenger(text, subject, proposal, attachment);
        dispatch(messageActions.sendMessageToFirebase(params, messageKey));
        this.isHideMesageButton = false;
        return true;
    };

    onPayment = (token) => {
        const { dispatch } = this.props;
        const { id } = this.state;
        const param = {};
        param.action_by = gs.identity.user.id;
        param.token = token;
        param.userMessage = (param.status === 4) ? this.message('Payment successfully done.') : null;
        dispatch(proposalActions.proposal("POST", { userProposal: param }, { proposal_id: id }));
    };

    proposalAccepted = (e) => {
        e.preventDefault();
        this.isConfirmDialog('status_accepted', 'Are you sure you want to accept this offer?');
    };

    markAsCompleted = (e) => {
        e.preventDefault();
        const { proposals } = this.props;
        const proposal = proposals.item.model;
        let module = (proposal.moduleId === mh.UserService) ? 'service' : 'job';
        this.isConfirmDialog('status_mark_as_completed', `Are you sure you want to mark this ${module} contract as completed?`);
    };

    contractAccepted = (e) => {
        e.preventDefault();
        this.isConfirmDialog('status_completed');
    };

    contractDeclined = (e) => {
        e.preventDefault();
        this.isConfirmDialog('status_not_completed', 'Are you sure you want to decline the completion request?');
    };

    proposalAcceptAndClosed = (e) => {
        e.preventDefault();
        this.isConfirmDialog('status_accepted_and_closed', 'Are you sure you want to accept this offer?');
    };

    proposalRemoved = (e) => {
        e.preventDefault();
        this.isConfirmDialog('status_delete_proposal', 'Are you sure, you want to delete the Offer?');
    };

    viewCoverLatter = () => {
        const { viewCoverLatter } = this.state;
        this.setState((currentState) => ({
            viewCoverLatter: !viewCoverLatter,
        }));
        //console.log(this.state.viewCoverLatter)
    }

    proposalAction = (action = 'offer', comment = null) => {
        const { dispatch, type, proposals } = this.props;
        const proposal = proposals.item.model;
        let module = (proposal.moduleId === mh.UserService) ? 'services' : 'jobs';

        let menuTitle = gs.capitalize(module);
        let menuItem = (proposal.moduleId === mh.UserService) ? 'Offers' : 'Proposal';
        const { id } = this.state;
        if (action === "status_delete_proposal") {
            let link = `offers-${type.toLowerCase()}-${module}-${proposal.settlement}`;
            console.log("message_id:", proposal.message_id)
            gs.deleteFirebaseMessage(proposal.message_id);
            dispatch(proposalActions.proposal("DELETE", null, { proposal_id: id }, link));
            return;
        }

        const param = {};
        if (comment !== null) {
            param.comment = comment;
        }
        param.userMessage = null;
        let alert_message = null;

        switch (action) {
            case 'status_accepted':
                param.status = status_accepted;
                param.userMessage = this.message(`Offer is accepted, You can now access it under ${menuTitle} > Accepted ${menuItem}`);
                alert_message = `You have accepted the offer.`;
                this.tip = `Offer is accepted, You can now access it under ${menuTitle} > Accepted ${menuItem}`;
                break;
            case 'status_accepted_and_closed':
                param.status = status_accepted_and_closed;
                param.userMessage = this.message(`Offer accepted and closed, You can now access it under ${menuTitle} > Accepted ${menuItem}`);
                alert_message = `You have accepted and closed the job offer.`;
                break;
            case 'status_declined':
                param.status = status_declined;
                alert_message = `You have declined the offer.`;
                break;
            case 'status_mark_as_completed':
                param.status = status_mark_as_completed;
                param.userMessage = this.message(`Your ${menuItem} contract has been marked as complete, please go to ${menuItem} details to approve it.`);
                alert_message = `You have mark as completed the work.`;
                break;
            case 'status_not_completed':
                param.status = status_not_completed;
                param.userMessage = this.message('It is not completed, please continue.');
                alert_message = `You have mark as not completed the work.`;
                break;
            case 'status_completed':
                param.status = status_completed;
                param.userMessage = this.message('It is completed.');
                alert_message = `You have completed the work.`;
                break;
            case 'status_payment_confirm':
                param.status = status_payment_confirm;
                param.userMessage = this.message(`Congratulations! $${proposal.budget} has been funded for this contract.`);
                alert_message = `You completed the Payment.`;
                break;
            case 'status_counter_offers':
                param.status = status_counter_offers;
                param.userMessage = this.message('You have submit the counter offer.');
                alert_message = `You have submit the counter offer.`;
                break;

            default:
                param.status = status_offers;
                alert_message = `You submit the offer.`;
        }
        param.action_by = gs.identity.user.id;
        dispatch(proposalActions.proposal("POST", { userProposal: param }, { proposal_id: id }));
        dispatch(alertSelectors.success(alert_message));
    };



    isConfirmDialog = (action, message = null) => {
        const { dispatch } = this.props;
        confirmAlert({
            //title: `Confirm Request`,
            message: (message === null ? `Are you sure you want to accept the completion request?` : message),
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () => this.proposalAction(action)
                }
            ]
        });
    };

    stripeConnect = () => {
        history.push('/setting/stripe-connect');
        //const { dispatch, } = this.props;
        //dispatch(userActions.stripeConnect("POST", {}, { type: "custom" }));
    };

    proposalOffers = (proposalHistories) => {
        const offers = {};
        if (proposalHistories) {
            proposalHistories.map((item) => {
                switch (true) {
                    case (parseInt(item.status) === parseInt(status_offers)):
                        offers.initialize = item;
                        break;
                    case (parseInt(item.status) === parseInt(status_counter_offers)):
                        offers.counter = item;
                        break;
                    case (parseInt(item.status) === parseInt(status_declined)):
                        offers.declined = item;
                        break;
                    default:
                }
            });
        }
        return offers;
    };

    showTip = (proposal, isJob = false) => {
        let tip = null;
        switch (true) {
            case (paymentConfirmedStatuses.includes(proposal.status) && (proposal.settlement === "cash") && !isJob):
                tip = `Congratulations! $${proposal.budget} has been funded for this contract. <br/ >`;
                tip += `Please note: Payment will be transferred once the contract is completed.`;
                break;
            case ((proposal.status === status_completed) && (proposal.settlement === "cash") && !isJob):
                tip = `Congratulations! $${proposal.budget} has been transferred to your account.`;
                break;
        }
        this.tip = tip;
    };

    render() {
        const { proposals, authentication } = this.props;
        const strip_account_number = authentication.authentication.user.userProfile.strip_account_number;

        if (proposals && proposals.item) {
            const { setReview, setDispute, setDeclined, setOffer, setMessage, setMilestone, viewCoverLatter } = this.state;
            const proposal = proposals.item.model;
            const proposalItem = proposal.item;
            const proposalMilestones = proposal.userItemProposalMilestones;
            const settlement = proposal.settlement;
            const proposalServices = proposal.userItemProposalServices;
            const proposalHistories = this.proposalOffers(proposal.userItemProposalHistories);

            const isJobProposal = (proposal.moduleId === mh.UserItem);
            const itemModule = isJobProposal ? mh.UserItem : mh.UserService;
            const itemProvider = proposal.provider;
            const itemOwner = proposalItem && proposalItem.user;
            const itemType = proposalItem && proposalItem.type;
            const isProvider = gs.isOwner(proposal.provider_id);
            const isActionBy = gs.isOwner(proposal.action_by);
            const proposalFromProvider = proposal.proposalFromProvider;
            const proposalFromOwner = proposal.proposalFromOwner;
            const isDispute = (proposal.isDispute === true);

            const messageKey = proposal.message_id;
            const proposalMarkCompleted = (proposal.status === status_mark_as_completed);
            const proposalMarkNotCompleted = (proposal.status === status_not_completed);
            const proposalCompleted = (proposal.status === status_completed);
            const isVisibleConformation = !isActionBy && offersStatuses.includes(proposal.status);
            const proposalApproved = confirmedStatuses.includes(proposal.status);
            const isFinalOffer = (proposal.status === status_counter_offers);
            const isRefunded = (proposal.status === status_refund);

            const isStripeConnect = !((strip_account_number === null) || (strip_account_number === '') || (strip_account_number === '0') || (strip_account_number === undefined));

            const isVisibleOffer = ((proposal.status === status_offers) || (proposal.status === status_bid)) && !isActionBy && !isFinalOffer && offersStatuses.includes(proposal.status) && isStripeConnect;
            const isBid = (proposal.status === status_bid);

            const isVisibleWaitingApproval = isActionBy && forWaitingStatuses.includes(proposal.status);
            const isVisibleDelete = isProvider && deletedStatuses.includes(proposal.status);

            const isVisibleMilestone = (acceptedStatuses.includes(proposal.status) && (isJobProposal === true) && (proposal.settlement === "cash"));

            const isVisiblePayment = ((isProvider && isJobProposal === false) && acceptedStatuses.includes(proposal.status) && (proposal.transcation_id === null) && (proposal.settlement === "cash"));

            const isVisibleMessage = (messageKey || ((isJobProposal === true && !isProvider) || (isProvider && isJobProposal === false))) && (proposal.status !== status_declined) && (this.isHideMesageButton === false);

           // console.log("isVisibleMessage:", isVisibleMessage, this.isHideMesageButton , messageKey)

            const proposalPaymentConfirm = ((proposal.settlement === "exchange" && acceptedStatuses.includes(proposal.status)) || (proposal.settlement === "cash" && proposal.status === status_payment_confirm)) || (isJobProposal === true && acceptedStatuses.includes(proposal.status)) ;

            const isVisibleReview = (proposal.isReview === false) && proposalCompleted && !isDispute;
            const isVisibleRatingReview = (proposal.isReview === true);

            const isVisibleEndContract = (proposalPaymentConfirm || (proposalMarkNotCompleted && !isActionBy)) && !isVisibleReview;
            const isVisibleConfirmEndContract = proposalMarkCompleted && !isActionBy && !isVisibleReview;

            const isVisibleDispute = proposalApproved && !isDispute && !proposal.isReview && (proposal.settlement !== "exchange");

            const proposalAmount = (proposal.settlement === "cash") ? ((parseInt(proposal.budget) + parseInt(proposal.budget) * 3 / 100) * 100) : null;
            const moduleTitle = (isJobProposal === true) ? 'Job' : 'Service';
            const proposalTitle = `${moduleTitle} Proposal`;
            const providerTitle = (isJobProposal === true) ? 'Bidder' : 'Buyer';
            const proposalTypeTitle = (isJobProposal === true) ? ((itemType === 'fixed') ? 'Milestone' : 'Timesheet') : '';
            const contractCompletedTitle = (proposal.settlement === "cash") ? "If the service is fulfilled" : "If both the services have been fulfilled";
            this.showTip(proposal, isJobProposal);
            const offerTitle = (proposal.settlement === "cash") ? `Submit ${isBid === true ? '' : 'Counter'} Offer` : "Request a different Service to exchange";

            return (<Main>
                <DocumentTitle title={`${proposalTitle}`} />
                {proposal && proposalItem && <div className="service-proposal bg-body">

                    {isVisibleReview && setReview && <RatingReviewForm open={setReview} item={proposal} buyer={isProvider ? itemOwner : itemProvider} reviewClose={this.reviewClose} moduleTitle={moduleTitle} />}

                    {isVisibleDispute && setDispute && <DisputeForm open={setDispute} item={proposal} disputeClose={this.disputeClose} moduleTitle={moduleTitle} />}

                    {setOffer && <CounterOffer open={setOffer} item={proposal} offerClose={this.offerClose} moduleTitle={offerTitle} status={proposal.status} message={this.message}/>}

                    {setMessage && <MessageForm open={setMessage} item={proposal} messageKey={messageKey} module={mh.UserItemProposal} messageClose={this.messageClose} message={this.message} moduleTitle={moduleTitle} />}

                   {setDeclined && <ContractDeclined open={setDeclined} item={proposal} declinedClose={this.declinedClose} moduleTitle={moduleTitle} />}

                   {setMilestone && <MilestoneForm open={setMilestone} proposal_id={proposal.id} budget={proposal.budget} milestoneClose={this.milestoneClose} message={this.message} type={proposalTypeTitle} />}

                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="pb-2">{`${proposalTitle}`} <small style={{fontSize: '13px', paddingLeft: '15px'}}>{moment(proposal.updated_at * 1000).format('LLL')}</small></h1>
                                {/*<div className="date pr-3 w-25">*/}
                                    {/*{moment(proposal.updated_at * 1000).format('LLL')}*/}
                                {/*</div>*/}
                            </div>
                            <div className="col-md-4 col-12">
                                <ItemView item={proposalItem} settlement={settlement} itemType={itemType} moduleTitle={moduleTitle} />
                                {(!isBid || gs.isOwner(proposalItem.user_id)) && <BuyerView item={isProvider ? itemOwner : itemProvider} settlement={settlement} title={isProvider ? 'Owner Info' : `${providerTitle} Info`} moduleTitle={moduleTitle} />}
                            </div>
                            {proposal && <div className="col-md-8 col-12">
                                {!isBid && <div className="card mb-4 offerInfo">
                                    <div className="card-body p-3">
                                        <div className="bg-body p-3">
                                            {this.tip && <div className="alert alert-success mb-3" dangerouslySetInnerHTML={{ __html: this.tip }}></div>}

                                            {/* Service cass offer start */}
                                            <div className="row">
                                                <div className="offer col-12">
                                                    <h5>Offer Type</h5>
                                                    <div className="mb-1 d-flex justify-content-between">
                                                        <div className="fixed badge badge-primary">{settlement}</div>
                                                        <div>
                                                            {(mh.UserItem === itemModule) && <button className="btn btn-outline-primary scroll" onClick={this.viewCoverLatter}>View Job Proposal </button>}
                                                        </div>
                                                    </div>
                                                </div>

                                                {proposalHistories && proposalHistories.initialize && <div className="offer col-12">
                                                    {settlement === "cash" && <div className="mb-0">
                                                        <h5 className="mb-1">Initial Offer Price - <big className="font-weight-bold text-primary">${proposalHistories.initialize.budget}</big></h5>
                                                        <small style={{fontSize: '85%'}}>{proposalHistories.initialize.comment}</small>
                                                    </div>}
                                                </div>}
                                                {proposalHistories && proposalHistories.counter && <div className="offer col-12">
                                                    {settlement === "cash" && <div className="mb-0">
                                                        <h5 className="mb-1">Counter Offer Price - <big className="font-weight-bold text-primary">${proposalHistories.counter.budget}</big></h5>
                                                        <small style={{fontSize: '85%'}}>{proposalHistories.counter.comment}</small>
                                                    </div>}
                                                </div>}
                                            </div>
                                            {/* Service cass offer end */}

                                            {/* Service cass exchange start */}
                                            {settlement === 'exchange' && <div className="W-100">
                                                {proposalHistories && proposalHistories.initialize && <div className="initial-offer">
                                                    <h5>Initial Offer</h5>
                                                    <div className="chip-group">
                                                        {proposalServices.map(item => {
                                                            return ((item.action_by === proposal.provider_id) && (<div className="badge badge-secondary" key={`proposal-service-${item.service_id}-${item.action_by}`}>{item.title.toUpperCase()}</div>))
                                                        })}
                                                        <div className="text">{proposalHistories && proposalHistories.initialize.comment}</div>
                                                    </div>
                                                </div>}

                                                {(proposalHistories && proposalHistories.counter) && <div className="initial-offer">
                                                    <h5>Request a different service to exchange</h5>
                                                    <div className="chip-group">
                                                        {proposalServices.map(item => {
                                                            return ((item.action_by === proposalItem.user_id) && (<div className="badge badge-secondary" key={`proposal-service-${item.service_id}`}>{item.title.toUpperCase()}</div>))
                                                        })}
                                                        <div className="text"> {proposalHistories.counter.comment}</div>
                                                    </div>
                                                </div>}
                                            </div>}
                                            {/* Service cass exchange end */}

                                            {isDispute && <h5 className="text-center text-info font-weight-bold">Waiting for dispute to be resolved</h5>}
                                            {isRefunded && <h5 className="text-center text-info font-weight-bold">Refund & Closed</h5>}

                                            {(proposal.status === status_declined) && (proposalHistories && proposalHistories.declined) &&
                                                <div className="offer-declined"><div className="action">
                                                    <span className="badge badge-danger">Declined</span>
                                                </div>
                                                    <div className="chip-group">
                                                        <div className="text"><b>Reason:</b> {proposalHistories.declined.comment}</div>
                                                    </div>
                                                </div>}


                                            {(!isDispute || !isRefunded) && <div className="action">

                                                {isVisibleConformation && !isBid && <h5>Would you like to accept the offer request?</h5>}
                                                <div className="mb-3">
                                                    {isVisibleMessage && <button className="btn btn-primary" onClick={this.messageOpen}><i className="far fa-comments"></i> Message</button>}

                                                    {isVisibleConformation && !isBid && <Fragment>

                                                        {(isStripeConnect === true) && <button className="btn btn-outline-primary" onClick={this.proposalAccepted}><i className="fas fa-check"></i> Accept </button>}

                                                        {(isStripeConnect === false) && <button className="btn btn-outline-primary" onClick={this.stripeConnect}><i className="fas fa-check"></i> Add Payment Method </button>}

                                                        {isJobProposal && gs.isOwner(proposalItem.user_id) && <button className="btn btn-outline-primary" onClick={this.proposalAcceptAndClosed}><i className="fas fa-check"></i> Accept and Close job for bid </button>}

                                                        <button className="btn btn-outline-info" onClick={this.proposalDeclined}><i className="fas fa-times"></i> Decline</button>

                                                    </Fragment>}
                                                    {isVisibleOffer && <button className={`btn btn-outline-primary ${(moduleTitle === 'Job') ? 'ml-0' : ''}`} onClick={this.offerOpen}><i className="fas fa-redo-alt"></i> {(settlement === "cash") ? `Submit Counter Offer` : 'Request a different Service to exchange'} </button>}

                                                    {isVisibleWaitingApproval && <button className="btn btn-outline-info" style={{ pointerEvents: "none" }}><i className="fas fa-check"></i> WAITING FOR APPROVAL</button>}

                                                    {isVisibleDelete && <button className="btn btn-outline-danger" onClick={this.proposalRemoved}><i className="fas fa-remove"></i> Delete</button>}

                                                    {!isDispute && isVisiblePayment && <div className="btn btn-info"><StripeCheckout token={this.onPayment} stripeKey={this.state.stripeKey} amount={proposalAmount} image={`${gs.rootUrl}/images/stripe_logo.png`} ComponentClass="div" label="Pay Now" panelLabel="Pay Now">
                                                        Payment
                                                    </StripeCheckout></div>}

                                                    {isVisibleDispute && <button className="btn btn-outline-primary" onClick={this.disputeOpen}><i className="fas fa-redo-alt"></i> Dispute</button>}

                                                    {isVisibleReview && <button className="btn btn-outline-primary" onClick={this.reviewOpen}><i className="fas fa-redo-alt"></i> Rating & Review</button>}

                                                    {!isDispute && isVisibleMilestone && <button className="btn btn-outline-info" onClick={this.milestoneOpen}><i className="fas fa-redo-alt"></i> {`${proposalTypeTitle} and Payment`}</button>}

                                                </div>

                                                {isVisibleEndContract && <div className="mt-3">
                                                    <h5>{`${contractCompletedTitle}, would you like to mark this service contract as completed?`}</h5>
                                                    <div className="mb-3">
                                                        <button className="btn btn-outline-info" onClick={this.markAsCompleted}> Contract Completed</button>
                                                    </div>
                                                </div>}

                                                {isVisibleConfirmEndContract && <div className="mt-3">
                                                    <h5>Do you agree to end the contract? </h5>
                                                    <div className="mb-3">
                                                        <button className="btn btn-outline-success" onClick={this.contractAccepted}><i className="fas fa-check"></i> Accept </button>
                                                        <button className="btn btn-outline-info" onClick={this.contractDeclined}><i className="fas fa-times"></i> Decline</button>
                                                    </div>
                                                </div>}

                                            </div>}
                                        </div>
                                    </div>
                                </div>}
                                {isBid && <BidProposal item={proposalItem} proposal={proposal} offerOpen={this.offerOpen} messageOpen={this.messageOpen} proposalDeclined={this.proposalDeclined} isVisibleMessage={isVisibleMessage}/>}
                                {(proposalMilestones.length > 0) && <Milestones items={proposalMilestones} proposal={proposal} message={this.message} type={proposalTypeTitle} />}
                                {viewCoverLatter && <CoverLatter proposal={proposal} /> }
                                {isVisibleRatingReview && <RatingReview item={proposalItem} moduleId={itemModule} isShowDropdown={false} isShowAvgRating={false} proposal={proposal} />}

                            </div>}
                        </div>
                    </div>
                </div>}
            </Main>);
        }
        return (<Main>
            <DocumentTitle title="Proposals" />
            <div className="service-proposal bg-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Proposals</h1>
                        </div>
                        <div className="col-md-4 col-12">
                            <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={1} width={150} />
                        </div>
                        <div className="col-md-8 col-12">
                            <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={2} width={500} />
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

const proposalSelector = createSelector(
    state => state.proposals,
    proposals => proposals
);

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    processSelector,
    proposalSelector,
    authenticationSelector,
    (process, proposals, authentication) => ({
        process,
        proposals,
        authentication
    })
);

export default connect(mapStateToProps)(ContractView);

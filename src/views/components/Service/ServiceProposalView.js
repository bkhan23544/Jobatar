import React, { Component } from 'react';
import { Main } from '../../layout';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import CounterOffer from './partials/CounterOffer';
import { globalService as gs, itemService } from '../../../common/services';


class ServiceProposalView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            setOpen: false,
            proposal: null,
            service: null,
            settlement: null,
            proposalServices: null,
            proposalHistories: null,
            buyer: null,
        };
    }

    componentWillMount() {
        const { match } = this.props;
        const id = match.params.id;
        this.setState({ id: id ? id : null });
        itemService.proposal("GET", null, { proposal_id: id }).then(res => {
            const item = res.model;
            if (item && item.user && !gs.isOwner(item.user.id)) {
                this.setState({ is_redirected: true });
            }
            this.setState({ proposal: item, service: item.item, settlement: item.settlement, proposalServices: item.userItemProposalServices, buyer: item.provider, proposalHistories: item.userItemProposalHistories });
        });
    }

    popUpOpen = () => {
        this.setState({
            setOpen: true
        })
    };

    popUpClose = () => {
        this.setState({
            setOpen: false
        })
    };

    render() {
        const { proposal, service, buyer, settlement, proposalServices, proposalHistories, setOpen } = this.state;




        return (<Main>
            <DocumentTitle title="Service Proposal" />
            <CounterOffer open={setOpen} item={proposal} popUpClose={this.popUpClose} />
            {proposal && service && <div className="service-proposal bg-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Service Proposal</h1>
                        </div>
                        <div className="col-md-4 col-12">
                            <div className="card mb-4 serviceInfo">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Service Info</h5>
                                    <div className="image">
                                        <img className="img-fluid" src={service.cover} alt="Images" />
                                        <div className="fixed badge badge-primary">{settlement}</div>
                                    </div>
                                    <div className="text">
                                        <p>{service.description}</p>
                                        <div className="sold">{service.proposal_count} Service Sold</div>
                                        <div className="rating d-flex align-items-center">
                                            <small>({service.avg_rating})</small>
                                            <Box component="fieldset" mx={1.0} borderColor="transparent">
                                                <Rating value={parseInt(service.avg_rating)} readOnly size="small" />
                                            </Box>
                                            <small className="count">({service.proposal_count})</small>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {buyer && <div className="card mb-4 buyerInfo">
                                <div className="card-body text-center">
                                    <h5 className="card-title text-primary text-left">Buyers Details</h5>
                                    <div className="image">
                                        <img className="rounded-circle" src={buyer.avatar} alt="Images" width="100" height="100" />
                                    </div>
                                    <div className="text">
                                        <h4>{buyer.name}</h4>
                                        { /* <div className="sold">35 Service Sold</div> */}
                                        <div className="rating d-flex align-items-center justify-content-center">
                                            <small>({buyer.avg_rating})</small>
                                            <Box component="fieldset" mx={1} borderColor="transparent">
                                                <Rating value={buyer.avg_rating} readOnly size="small" />
                                            </Box>
                                            <small className="count">({buyer.count_rating})</small>
                                        </div>
                                        <h6>{buyer.about}</h6>
                                        {/* <h6>Marketing Agent and SEO Expert <br /> Cape town, Paris</h6> */}
                                    </div>
                                </div>
                            </div>}

                        </div>

                        {proposal && <div className="col-md-8 col-12">
                            <div className="card mb-4 offerInfo">
                                <div className="card-body p-3">
                                    <div className="bg-body p-3">
                                        <div className="offer">
                                            <h5>Offer Type</h5>
                                            <div className="fixed badge badge-primary">{settlement}</div>
                                        </div>
                                        <div className="initial-offer">
                                            <h5>Initial Offer</h5>
                                            {settlement === 'exchange' &&
                                                <div className="chip-group">
                                                    {proposalServices.map(item => {
                                                        return ((item.action_by === proposal.provider_id) && (<div className="badge badge-secondary" key={`proposal-service-${item.service_id}-${item.action_by}`}>{item.title.toUpperCase()}</div>))
                                                    })}
                                                </div>}
                                            {settlement === 'cash' &&
                                                <div className="chip-group">
                                                    <div className="badge badge-secondary">{proposal.budget}</div>
                                                </div>}

                                            <div className="chip-group">
                                                {proposalHistories.map(item => {
                                                    return ((item.action_by === proposal.provider_id) && (<div className="badge badge-secondary" key={`proposal-history-${item.id}`}>{item.comment}</div>))
                                                })}
                                            </div>
                                        </div>

                                        <div className="initial-offer">
                                            <h5>Counter Offer</h5>
                                            {settlement === 'exchange' &&
                                                <div className="chip-group">
                                                    {proposalServices.map(item => {
                                                        return ((item.action_by === service.user_id) && (<div className="badge badge-secondary" key={`proposal-service-${item.service_id}`}>{item.title.toUpperCase()}</div>))
                                                    })}
                                                </div>}
                                            {settlement === 'cash' &&
                                                <div className="chip-group">
                                                    <div className="badge badge-secondary">{proposal.budget}</div>
                                                </div>}
                                            <div className="chip-group">
                                                {proposalHistories.map(item => {
                                                    return ((item.action_by === service.user_id) && (<div className="badge badge-secondary" key={`proposal-history-${item.id}`}>{item.comment}</div>))
                                                })}
                                            </div>
                                        </div>
                                        <div className="action">
                                            {(proposal.action_by !== gs.identity.user.id) &&
                                                <div>
                                                    <h5>Would you like to accept the offer request ?</h5>
                                                    <div className="mb-3">
                                                        <button className="btn btn-success"><i className="fas fa-times"></i> Accept</button>
                                                        <button className="btn btn-info"><i className="fas fa-check"></i> Decline</button>
                                                    </div>
                                                </div>}
                                            <button className="btn btn-primary" onClick={this.popUpOpen}><i className="fas fa-redo-alt"></i> Request a Different to Exchange</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                    </div>
                </div>
            </div>}
        </Main>);
    }
}

export default ServiceProposalView;
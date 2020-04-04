import React, { Component } from 'react';
import { Main } from "../../layout";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { proposalActions } from "../../../common/redux/actions";
import { DocumentTitle } from "../../../helpers/DocumentTitle";
import { globalService as gs } from '../../../common/services';
import ContractItems from './partials/ContractItems';

class OffersListing extends Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(proposalActions.index("GET", null, { recipient_id: gs.identity.user.id, type: "Offers" }));
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(proposalActions.clear());
    }

    deleteProposal = () => {

    };

    render() {
        const { proposals, process } = this.props;
        let results = proposals.items ? proposals.items : [];

        return (<Main>
            <DocumentTitle title="Offers" />
            <div className="my-services bg-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <h1 className="d-flex align-items-center">
                                <span className="col pl-0">My Offers</span>
                            </h1>
                        </div>
                        <div className="col-12">
                            {process.loading ? <div className="card service-box"><div className="card-body"><div className="d-flex justify-content-center"><div className="spinner-border text-info"><span className="sr-only">Loading...</span></div></div></div></div> : <ContractItems results={results} />}
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

const mapStateToProps = createSelector(
    processSelector,
    proposalSelector,
    (process, proposals) => ({
        process,
        proposals
    })
);

export default connect(mapStateToProps)(OffersListing);

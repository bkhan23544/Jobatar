import React, { Component } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { globalService as gs, itemService } from '../../../common/services';
import { ContractItems } from './partials';
import ContractLayout from './ContractLayout';
import Pagination from "../../../helpers/Pagination";

class ContractListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            status: null,
            module: null,
            settlement: null,
            itemLink: null,
            q: '',
            loading: false,
            page: 1
        };
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.path !== nextProps.path) {
            this.props = nextProps;
            //this.setState({ ...this.state, q:'' });
            const { title, status, module, settlement, itemLink} = this.props;
            this.loadProposal(status, module, settlement, 1);
            this.setState({ title, status, module, settlement, itemLink});
        }
    }

    componentWillMount() {
        const  { title, status, module, settlement, itemLink} = this.props;
        //this.loadProposal(status, module, settlement);
        this.setState( { title, status, module, settlement, itemLink});
    }

    loadProposal = (status, module, settlement, page, q = null) => {
        this.setState({ loading: true });
        const user_id = gs.identity && gs.identity.user && gs.identity.user.id;
        if(user_id){
            itemService.proposal("GET", null, { recipient_id: user_id, status: status, module: module, settlement: settlement, page: page, q: q }).then(response => {
                this.setState({ proposals: response, loading: false });
            });
        }
    };

    onChangePage = (page) => {
        this.setState({ page });
        const { status, module, settlement} = this.props;
        this.loadProposal(status, module, settlement, page, this.state.q);
    };

    handleChange = (e) => {
        let formField = { ...this.state };
        formField[e.target.name] = e.target.value;
        this.setState( formField );
    };

    submitSerch = () => {
        const { status, module, settlement} = this.props;
        this.loadProposal(status, module, settlement, 1, this.state.q);
    };


    render() {
        const { settlement } = this.props;
        const { title, status, proposals, itemLink, loading , q} = this.state;
        let results = proposals && proposals.items ? proposals.items : [];
        let pagination = proposals && proposals.pagination ? proposals.pagination : [];
        console.log(this.props)
        return (<ContractLayout title={title} status={status} itemLink={itemLink}>
            <div className="card service-box">
                <div className="card-body p-3">
                    <div className="input-group mb-0">
                        <input type="text" className="form-control" name="q" value={q} placeholder="Search..." onChange={this.handleChange} style={{height: '40px'}} />
                            <div className="input-group-append">
                                <button className="btn btn-info" type="button" style={{borderRadius:"5px"}} onClick={this.submitSerch}>Search</button>
                            </div>
                    </div>
                </div>
            </div>
            {loading ? <div className="card service-box">
                <div className="card-body">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-info">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div> : results && 
            <ContractItems results={results} pagination={pagination} status={status} settlement={settlement} title={title}  />}
            <div>
                <Pagination className="justify-content-end"
                            pageSize={pagination && pagination.pageSize}
                            totalCount={(pagination && pagination.totalCount) ? pagination.totalCount : 1}
                            onChangePage={this.onChangePage} />
            </div>
        </ContractLayout>);
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

export default connect(mapStateToProps)(ContractListing);
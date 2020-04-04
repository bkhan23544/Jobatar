import React, { Component, Fragment } from 'react';
import { Main } from '../../layout';
import { Redirect } from 'react-router-dom';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import { SearchLoader } from '../../../common/loaders';
import {globalService as gs, itemService} from '../../../common/services';
import { ProposalReceived } from '../Contract/partials';
import { ModuleHelper } from '../../../helpers/module.helper';
import ReadMoreReact from "read-more-react";

class JobView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            id: null,
        };
    }

    componentWillMount() {
        const { match } = this.props;
        const id = match.params.id;
        this.setState({ id: id ? id : null });
        this.jobs(id);
    }

    jobs = (id) => {
        id && itemService.job("GET", null, { item_id: id }).then(res => {
            this.setState({ item: res.model });
        });
    };

    render() {
        const { process } = this.props;
        let item = this.state.item;

        return (<Main>
            <DocumentTitle title={item && item.title} />
            <div className="job-individual bg-body">
                <div className="container">
                    <div className="row">
                        {process.loading ? <div className="col-12"><SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={3} width={700} /></div> : <Fragment>
                            {(item && item.length === 0) ? <Redirect to={{ pathname: '/not-found' }} /> : <Fragment>
                                <div className="col-12">
                                    {/*<h1>Received Offers/Bids({item && item.userItemProposals.length})</h1>*/}
                                    <div className="jobBox card mb-4">
                                        <div className="card-body">
                                            <div className="caption">
                                                <h3 className="d-flex align-items-center pr-0">
                                                    <div className="col pl-0">
                                                        {item && item.title}
                                                        {/*<small> {item && item.category && item.category.parent ? item.category.parent.title + ',' : null} {item && item.category.title}</small>*/}
                                                    </div>
                                                </h3>
                                            </div>
                                            <div className="prices d-flex align-items-center">
                                                {item && item.settlement && item && item.settlement === 'cash' && <div className="price">${item && item.budget}</div>}
                                                {/*<div className="fixed badge badge-secondary text-capitalize">{item && item.settlement}</div>*/}
                                                <div className="fixed badge badge-secondary text-capitalize">{(item && item.settlement === 'both') ? 'Cash & Exchange' : item && item.settlement}</div>
                                                {item && item.settlement && item && item.settlement === 'cash' &&
                                                    <div className="cash badge badge-success text-capitalize">{item && item.type}</div>}
                                            </div>
                                            {item && item.skills &&
                                            <div className="chips">
                                                <h6 className="h6 mb-0">Skills</h6>
                                                {item && item.skills.map((skill) =>
                                                    <div className="badge badge-secondary" key={skill.id}>{skill.title}</div>
                                                )}
                                            </div>}
                                            {/*<div className="d-flex align-items-center proposals mb-0">*/}
                                                {/*<div className="deadline">*/}
                                                    {/*{<h6>Project Deadline</h6>} {item && item.duration && `${item.duration - 4} - ${item.duration} Weeks`}*/}
                                                {/*</div>*/}
                                                {/*<div className="deadline">*/}
                                                    {/*<h6>Visiblity</h6> {item && item.visibility}*/}
                                                {/*</div>*/}
                                                {/*<div className="deadline">*/}
                                                    {/*<h6>Published on</h6> {(new Date(item && item.created_at * 1000)).toLocaleDateString('en-GB', {*/}
                                                        {/*year: 'numeric',*/}
                                                        {/*month: 'short',*/}
                                                        {/*day: '2-digit'*/}
                                                    {/*})}*/}
                                                {/*</div>*/}
                                                {/*<div className="deadline">*/}
                                                    {/*<h6>Proposals</h6> {item && item.proposal_count}*/}
                                                {/*</div>*/}
                                            {/*</div>*/}
                                            {/*<ReadMoreReact className="text" text={gs.html2text(item && item.description)} min={120} ideal={150} max={200} readMoreText={'Read More'} />*/}
                                            {/*<div className="text" dangerouslySetInnerHTML={{ __html: item && item.description }}></div>*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 sorting d-flex align-items-center">
                                    { /* <div className="sort">
                                        <Select
                                            className="multiple-select"
                                            classNamePrefix="multi"
                                            placeholder="Sort By"
                                            name="sort"
                                            onChange={this.handleAll}
                                            options={[{ value: "id", label: "Ascending" }, { value: "-id", label: "Descending" }]} />
                                                </div> */}
                                </div>
                                <div className="col-12">
                                    {item && item.userItemProposals && <div className="card-body px-0 pt-0">
                                        <h5 className="card-title" style={{fontSize: '18px'}}>Received Proposals ({item && item.userItemProposals.length})</h5>
                                        <hr style={{margin: '10px 0px'}} />
                                        { <ProposalReceived results={item.userItemProposals} module={ModuleHelper.UserItem} />}
                                    </div>}

                                </div>
                            </Fragment>}
                        </Fragment>}
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

const jobSelector = createSelector(
    state => state.jobs,
    jobs => jobs
);

const mapStateToProps = createSelector(
    processSelector,
    jobSelector,
    (process, jobs) => ({
        process, jobs
    })
);

export default connect(mapStateToProps)(JobView);
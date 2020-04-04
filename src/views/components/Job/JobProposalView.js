import React, { Component } from 'react';
import { Main } from '../../layout';
import { DocumentTitle } from '../../../helpers/DocumentTitle';

class JobProposalView extends Component {
    render() {
        return (<Main>
            <DocumentTitle title="Job Proposal Details" />
            <div className="service-proposal bg-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Job Proposal Details</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Main>);
    }
}

export default JobProposalView;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Main } from '../../layout';
import { JobsNavbar } from './partials/JobsNavbar';
import { DocumentTitle } from '../../../helpers/DocumentTitle';

class JobLayout extends Component {
    render() {
        const {children} = this.props;
        return (
        // <Main>
        <>
            <DocumentTitle title={'My Jobs'} />
            <div className="col-lg-9 col-sm-12 bg-body allJobsPage PostedJobs">
                <div className="">
                    <div className="row">
                        <div className="col-12 MarginTop47">
                            <h1 className="d-flex align-items-center">
                                <span className="col pl-0">My Jobs</span>
                                <Link to="/job/create" className="btn btn-info">Post a Job</Link>
                            </h1>
                            <JobsNavbar />
                        </div>
                        <div className="col-12">
                            { children }
                        </div>
                    </div>
                </div>
            </div>
            </>
        // </Main>
        );
    }
}

export default JobLayout;
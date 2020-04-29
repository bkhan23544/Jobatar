import React, { Component } from 'react';
import { Main } from '../../layout';
import ContractNavbar from './partials/ContractNavbar';
import { DocumentTitle } from "../../../helpers/DocumentTitle";

class ContractLayout extends Component {

    componentWillUnmount() {

    }

    render() {
        const { children, title, status, itemLink } = this.props;
        console.log(title)
        return (
            // <Main>
            <>
                <DocumentTitle title={title} />
                <div className={`my-services bg-body RecievedProposals col-xl-9 col-sm-12`}>
                    <div className="col-12 MarginTop47">
                        <div className="row">
                            <div className="col-12 mb-1" style={{padding: 0}}>
                                <h1 className="d-flex align-items-center">
                                    <span className="col pl-0">{title}</span>
                                </h1>
                            </div>
                            <div className="col-12" style={{padding: 0}}>
                                <ContractNavbar itemLink={itemLink} title={title} status={status} />
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </>
            // </Main> 
        );
    }
}

export default ContractLayout;

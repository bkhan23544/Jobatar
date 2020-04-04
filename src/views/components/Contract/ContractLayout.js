import React, { Component } from 'react';
import { Main } from '../../layout';
import ContractNavbar from './partials/ContractNavbar';
import { DocumentTitle } from "../../../helpers/DocumentTitle";

class ContractLayout extends Component {

    componentWillUnmount() {

    }

    render() {
        const { children, title, status, itemLink } = this.props;
        return (<Main>
            <DocumentTitle title={ title } />
            <div className="my-services bg-body">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-1">
                            <h1 className="d-flex align-items-center">
                                <span className="col pl-0">{title}</span>
                            </h1>
                        </div>
                        <div className="col-12">
                            <ContractNavbar itemLink={itemLink} title={title} status={status} />
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Main>);
    }
}

export default ContractLayout;

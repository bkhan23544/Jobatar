import React, { Component } from 'react';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import {Card, Row, Col} from 'react-bootstrap';
import { Main } from '../../../layout';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import NavBar from './partials/NavBar';

class ManageMembership extends Component {
    render() {
        return (<Main>
            <DocumentTitle title={`Manage Membership`}/>

            <div className="update-profile bg-body">
                <div className="container">
                    <Card className="mb-4 mb-lg-5">
                        <Card.Header>Manage Membership</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs="12" md="3" xl="4">
                                    <NavBar />
                                </Col>
                                <Col xs="12" md="9" xl="8" className="add-stripe-account">
                                    Coming Soon
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        </Main>);
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    (process) => ({
        process
    })
);

export default connect(mapStateToProps)(ManageMembership);
import React, { Component } from 'react';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import {Card, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Main } from '../../../layout';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import NavBar from './partials/NavBar';

class UserDetails extends Component {
    render() {
        const { authentication } = this.props;
        let user = authentication.authentication.user;
        return (<Main>
            <DocumentTitle title={`Account Info`}/>

            <div className="update-profile bg-body">
                <div className="container">
                    <Card className="mb-4 mb-lg-5">
                        <Card.Header>My Account Settings</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs="12" md="4" xl="3">
                                    <NavBar />
                                </Col>
                                <Col xs="12" md="8" xl="9" className="add-stripe-account">
                                    <Card.Title>
                                        <span>My Account </span>
                                        <small><Link to={`/user/update`} className="float-right">Edit Profile</Link></small>
                                    </Card.Title>
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <b className="w-20 float-left">Name:</b>
                                            <span>{user.userProfile.name}</span>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <b className="w-20 float-left">Email:</b>
                                            <span>{authentication.authentication.user.email}</span>
                                        </div>
                                        <div className="col mb-3">
                                            <b className="w-20 float-left">Mobile:</b>
                                            <span>{user.userProfile.mobile}</span>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        {/* <div className="col">
                                            <b className="w-40 float-left">Home Town:</b>
                                            <span>{user.userProfile.hometown}</span>
                                        </div> */}
                                    </div>
                                    {/* <div className="row">
                                        <div className="col-12 mb-3">
                                            <b className="w-100 float-left">Title:</b>
                                            <span>{user.userProfile.title}</span>
                                        </div>
                                        <div className="col-12 mb-3">
                                            <b className="w-100 float-left">About:</b>
                                            <span>{user.userProfile.about}</span>
                                        </div>
                                    </div> */}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        </Main>);
    }
}

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    authenticationSelector,
    (process, authentication) => ({
        process, authentication
    })
);

export default connect(mapStateToProps)(UserDetails);
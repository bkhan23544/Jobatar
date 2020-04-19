import React, { Component } from 'react';
import { Main } from '../../../layout';
import { Card, Row, Col } from 'react-bootstrap';
import FormValidator from "../../../../helpers/FormValidator";
import { userActions } from "../../../../common/redux/actions";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import LaddaButton, { EXPAND_RIGHT } from 'react-ladda';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import NavBar from './partials/NavBar';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            },
            submitted: false,
            validation: this.validator().valid(),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validator = () => {
        return new FormValidator([
            { field: 'oldPassword', method: 'isEmpty', validWhen: false, message: 'Old Password is required.' },
            { field: 'newPassword', method: 'isEmpty', validWhen: false, message: 'New Password is required.' },
            { field: 'confirmNewPassword', method: 'isEmpty', validWhen: false, message: 'Confirm Password is required.' },
            { field: 'confirmNewPassword', method: this.handleConfirmPassword, validWhen: true, message: 'Confirm Password is not match.' },
        ]);
    };

    handleConfirmPassword = (newPassword) => {
        return (newPassword === this.state.formField.confirmNewPassword);
    };

    handleChange(e) {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const validation = this.validator().validate(this.state.formField);
        this.setState({ validation, submitted: true });

        if (validation.isValid) {
            const { dispatch } = this.props;
            dispatch(userActions.changePassword(this.state.formField));
        }

    };

    render() {

        const { formField, submitted, validation } = this.state;
        let isValid = submitted ? this.validator().validate(formField) : validation;
        const { process } = this.props;
        return (
            // <Main>
            <>
                <DocumentTitle title={`Change Password`} />

                <div className="update-profile bg-body col-9">
                    <div className="">
                        <Card className="mb-4 mb-lg-5">
                            <Card.Header>Change Password</Card.Header>
                            <Card.Body>
                                <Row>
                                    {/* <Col xs="12" md="3" xl="4">
                                        <NavBar />
                                    </Col> */}
                                    <Col xs="12" md="12" xl="12" className="add-stripe-account">
                                        <form name="service" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                                            <Row>
                                                <Col xs md="6" className="mx-auto1">
                                                    <div className="form-group">
                                                        <label>Current Password</label>
                                                        <input type="password" placeholder="Old password"
                                                            name="oldPassword" value={formField.oldPassword}
                                                            onChange={this.handleChange} autoComplete="off"
                                                            className={'form-control ' + (submitted && isValid.oldPassword.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.oldPassword.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.oldPassword.message} </div>
                                                        }

                                                    </div>
                                                    <div className="form-group">
                                                        <label>New Password</label>
                                                        <input type="password" placeholder="New password"
                                                            name="newPassword" value={formField.newPassword}
                                                            onChange={this.handleChange} autoComplete="off"
                                                            className={'form-control ' + (submitted && isValid.newPassword.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.newPassword.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.newPassword.message} </div>
                                                        }


                                                    </div>
                                                    <div className="form-group">
                                                        <label>Confirm Password</label>
                                                        <input type="password" placeholder="Confirm new password"
                                                            name="confirmNewPassword" value={formField.confirmNewPassword}
                                                            onChange={this.handleChange} autoComplete="off"
                                                            className={'form-control ' + (submitted && isValid.confirmNewPassword.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.confirmNewPassword.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.confirmNewPassword.message} </div>
                                                        }
                                                    </div>
                                                    <div className="form-group">
                                                        <LaddaButton type="submit" className="btn btn-info btn-lg" loading={process.loading ? true : false} data-style={EXPAND_RIGHT}>Save</LaddaButton>

                                                    </div>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </>
            // </Main>
        );
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

export default connect(mapStateToProps)(ChangePassword);


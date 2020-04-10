import React, { Component } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { Container, Row, Col } from 'react-bootstrap';
import { Main } from '../../layout';
import FormValidator from '../../../helpers/FormValidator';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import { defaultActions } from '../../../common/redux/actions';

class ContactUs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formField: {
                first_name: '',
                last_name: '',
                email: '',
                subject: '',
                body: ''
            },
            submitted: false,
            validation: this.validator().valid(),
        };
        this.initializeState = this.state;
    }

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };



    validator() {
        return new FormValidator([
            { field: 'email', method: 'isEmpty', validWhen: false, message: 'email address is required.' },
            { field: 'email', method: 'isEmail', validWhen: true, message: 'Invalid email address.' },
            { field: 'subject', method: 'isEmpty', validWhen: false, message: 'Subject is required.' },
            { field: 'first_name', method: 'isEmpty', validWhen: false, message: 'First Name is required.' },
            { field: 'last_name', method: 'isEmpty', validWhen: false, message: 'Last Name is required.'},
            { field: 'body', method: 'isEmpty', validWhen: false, message: 'Message is required.'},
        ]);
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const { formField } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });

        if (validation.isValid) {
            const { dispatch } = this.props;
            dispatch(defaultActions.contact({ contactForm: formField }));
            this.setState(this.initializeState);
        }
    };



    render() {
        const { formField, submitted, validation} = this.state;
        const isValid = submitted ? this.validator().validate(formField) : validation;
        const { location } = this.props;
        let search = new URLSearchParams(location.search);
        return (<Main onlycontent={search.get("onlycontent")}>
            <DocumentTitle title={`Contact Us`} />
            <div className="contact-page">
                <Container>
                    <Row>
                        <Col xl="7" sm={12}>
                            <h1>Contact Us</h1>
                            <h3> Do you need help? Please send us a message and we will respond as soon as possible.</h3>
                        </Col>
                        <Col xl="5" sm={12} className="ml-auto">
                            <form onSubmit={this.handleSubmit} >
                                <div className="box-right"></div>
                                <div className="inner-box">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" name="first_name" value={formField.first_name} onChange={this.handleChange} className={'form-control ' + (submitted && isValid.first_name.isInvalid ? 'is-invalid' : '')} />
                                        {submitted && isValid.first_name.isInvalid &&
                                            <div className="invalid-feedback"> {isValid.first_name.message} </div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" name="last_name" value={formField.last_name} onChange={this.handleChange} className={'form-control ' + (submitted && isValid.last_name.isInvalid ? 'is-invalid' : '')} />
                                        {submitted && isValid.last_name.isInvalid &&
                                            <div className="invalid-feedback"> {isValid.last_name.message} </div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={formField.email} onChange={this.handleChange} className={'form-control ' + (submitted && isValid.email.isInvalid ? 'is-invalid' : '')} />
                                        {submitted && isValid.email.isInvalid &&
                                            <div className="invalid-feedback"> {isValid.email.message} </div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Subject</label>
                                        <input type="text" name="subject" value={formField.subject} onChange={this.handleChange} className={'form-control ' + (submitted && isValid.subject.isInvalid ? 'is-invalid' : '')} />

                                        {submitted && isValid.subject.isInvalid &&
                                            <div className="invalid-feedback"> {isValid.subject.message} </div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea id="body" name="body" onChange={this.handleChange}
                                            value={formField.body} className={'form-control ' + (submitted && isValid.body.isInvalid ? 'is-invalid' : '')}></textarea>
                                        {submitted && isValid.body.isInvalid &&
                                            <div className="invalid-feedback"> {isValid.body.message} </div>
                                        }
                                    </div>
                                    <div className="button">
                                        <button type="submit" className="btn btn-info btn-lg btn-block">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
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

export default connect(mapStateToProps)(ContactUs);
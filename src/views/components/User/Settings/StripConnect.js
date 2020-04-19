import React, { Component, Fragment } from 'react';
import { Main } from '../../../layout';
import { Card, Row, Col } from 'react-bootstrap';
import NavBar from './partials/NavBar';
import Select from 'react-select';
import { userActions, defaultActions } from "../../../../common/redux/actions";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import InputMask from 'react-input-mask';
import FormValidator from '../../../../helpers/FormValidator';
import mccList from '../../../../common/utils/mcc.json';
import Form from "react-bootstrap/esm/Form";
import DetailsPreview from "./partials/DetailsPreview";

class StripConnect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                mcc: '',
                bank_name: '',
                id_number: '',
                routing_number: '',
                account_number: '',
                ssn_last_4: '',
                date_of_birth: '',
                address: '',
                state: '',
                city: '',
                postal_code: '',
                phone: '',
                currency: '',
            },
            submitted: false,
            validation: this.validator().valid(),
            loading: false,
            viewDetails: false,
        };
    }

    validator() {
        return new FormValidator([
            { field: 'mcc', method: 'isEmpty', validWhen: false, message: 'Industry is required.' },
            { field: 'routing_number', method: 'isEmpty', validWhen: false, message: 'Routing number is required.' },
            { field: 'account_number', method: 'isEmpty', validWhen: false, message: 'Routing Number is required.' },
            { field: 'date_of_birth', method: 'isEmpty', validWhen: false, message: 'Date of birth is required.' },
            { field: 'currency', method: 'isEmpty', validWhen: false, message: 'Currency is required.' },
            { field: 'phone', method: 'isEmpty', validWhen: false, message: 'Phone is required.' },
            { field: 'address', method: 'isEmpty', validWhen: false, message: 'Address is required.' },
            { field: 'state', method: 'isEmpty', validWhen: false, message: 'State is required.' },
            { field: 'city', method: 'isEmpty', validWhen: false, message: 'City is required.' },
            { field: 'postal_code', method: 'isEmpty', validWhen: false, message: 'Postal code is required.' },
        ]);
    };

    componentWillMount() {
        const { dispatch, countries } = this.props;
        const query = new URLSearchParams(this.props.location.search);
        const code = query.get('code');
        code && dispatch(userActions.stripeConnect("POST", { code: code }));
        Object.getOwnPropertyNames(countries).length === 0 && dispatch(defaultActions.countries());
    }

    stripeDisconnect() {
        const { dispatch } = this.props;
        dispatch(userActions.stripeDisconnect());
    }

    stripeConnect = () => {
        const { dispatch, } = this.props;
        dispatch(userActions.stripeConnect("POST", {}, { type: "custom" }));
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    stripeRetrieve = () => {
        const { dispatch } = this.props;
        dispatch(userActions.stripeRetrieve("GET"));
    };

    stripeViewDetails = () => {
        this.setState({ viewDetails: true })
    }

    stripeHideDetails = () => {
        this.setState({ viewDetails: false })
    }

    handleSelect = (item, { action, name }) => {
        let formField = { ...this.state.formField };
        formField[name] = item.value;
        this.setState({ formField });
    };

    handleConnect = (e) => {
        e.preventDefault();
        const { formField } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true, loading: true });
        if (validation.isValid) {
            const { dispatch } = this.props;
            dispatch(userActions.stripeConnect("POST", { userProfile: formField }, { type: "custom" }));
            this.setState({ loading: false });
        }
    };

    render() {
        //const STRIPE_CLIENT_ID = process.env.REACT_APP_STRIPE_CLIENT_ID;
        //const STRIPE_REDIRECT_URI = process.env.REACT_APP_STRIPE_REDIRECT_URI;
        const { countries, authentication } = this.props;
        const { userProfile } = authentication.authentication.user;
        //const STRIPE_STATE_VALUE = 'authorization_code';
        const isStripeConnect = ((userProfile.strip_account_number === null) || (userProfile.strip_account_number === '') || (userProfile.strip_account_number === '0'));

        const { formField, submitted, validation, viewDetails } = this.state;
        let isValid = submitted ? this.validator().validate(formField) : validation;
        let countriesList = countries.data ? countries.data : [];

        return (
            // <Main>
            <>
                <DocumentTitle title={`Bank Information`} />
                <div className="update-profile bg-body col-lg-9 col-sm-12" style={{padding: 0}}>
                    <div className="">
                        <Card className="mb-4 mb-lg-5">
                            {isStripeConnect && <Card.Header>Add Bank Information to Receive Cash Payments <br /> <small style={{ fontSize: '14px', marginTop: '6px', float: 'left' }}>Please enter the bank account information where you would like to receive cash payments made to you.</small></Card.Header>}
                            {!isStripeConnect && <Card.Header>Bank Details <br /> <small style={{ fontSize: '14px', marginTop: '6px', float: 'left' }}><b>Disclaimer:</b> The information is confidential and payment are powered by Stripe.</small></Card.Header>}
                            <Card.Body>
                                <Row>
                                    {/* <Col xs="12" md="3" xl="4">
                                        <NavBar instruction="bank-details" />
                                    </Col> */}
                                    <Col xs="12" md="12" xl="12" className="add-stripe-account">
                                        <div className="py-3 w-100 float-left border-bottom mb-3">
                                            <Card.Title className="mb-0">Bank Information</Card.Title>
                                            {!isStripeConnect && <Card.Text className="mt-3" style={{ fontWeight: 400 }}>Bank Connect allows you to accept credit card payments within the platform for the services that you offer.</Card.Text>}
                                        </div>
                                        <Card className="button pl-0" style={{ boxShadow: 'none', backgroundImage: 'none' }}>
                                            {/*isStripeConnect && <div className=" d-flex align-items-center">
                                            <a target="_blank" rel="noopener noreferrer" className="btn btn-info connect-button"
                                               href={`https://connect.stripe.com/express/oauth/authorize?redirect_uri=${STRIPE_REDIRECT_URI}&client_id=${STRIPE_CLIENT_ID}&state=${STRIPE_STATE_VALUE}`}
                                               ><span>Connect to Stripe</span></a></div>*/}

                                            {isStripeConnect && <form onSubmit={this.handleConnect}>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Account Currency <br />(Only 3 char code)</label>
                                                    <div className="col-sm-8">
                                                        <Select
                                                            classNamePrefix="multi"
                                                            isSearchable
                                                            defaultValue={formField.currency}
                                                            name="currency"
                                                            onChange={this.handleSelect}
                                                            options={countriesList.map(item => ({ value: item.currency_code, label: `${item.currency_name} (${item.currency_code})` }))} className={'multiple-select mb-2   ' + (submitted && isValid.currency.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.currency.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.currency.message} </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-0">
                                                    <label className="col-sm-3 col-form-label">Routing Number</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" value={formField.routing_number} name="routing_number"
                                                            onChange={this.handleChange}
                                                            className={'form-control ' + (submitted && isValid.routing_number.isInvalid ? 'is-invalid' : '')} />
                                                        <small className="form-text text-muted">This is mandatory</small>
                                                        {submitted && isValid.routing_number.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.routing_number.message} </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="py-3 w-100 float-left border-bottom mb-3">
                                                    <Card.Title className="mb-0">Account Holder Information</Card.Title>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Id Number (SSN)</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control" value={formField.id_number} name="id_number" onChange={this.handleChange} />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Routing Number</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" value={formField.account_number} name="account_number"
                                                            onChange={this.handleChange}
                                                            className={'form-control ' + (submitted && isValid.account_number.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.account_number.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.account_number.message} </div>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Name on Account</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control" value={formField.bank_name} name="bank_name" onChange={this.handleChange} />
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Address</label>
                                                    <div className="col-sm-8">
                                                        <input value={formField.address} name="address" onChange={this.handleChange} className={'form-control ' + (submitted && isValid.address.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.address.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.address.message} </div>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">City</label>
                                                    <div className="col-sm-8">
                                                        <input value={formField.city} name="city" onChange={this.handleChange} className={'form-control ' + (submitted && isValid.city.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.city.isInvalid && <div className="invalid-feedback"> {isValid.city.message} </div>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">State </label>  {/*(Only 2 Char Code)*/}
                                                    <div className="col-sm-8">
                                                        <input value={formField.state} name="state" onChange={this.handleChange} className={'form-control ' + (submitted && isValid.state.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.state.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.state.message} </div>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Postal Code</label>
                                                    <div className="col-sm-8">
                                                        <input value={formField.postal_code} name="postal_code" onChange={this.handleChange} className={'form-control ' + (submitted && isValid.city.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.postal_code.isInvalid && <div className="invalid-feedback"> {isValid.postal_code.message} </div>}
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Phone Number</label>
                                                    <div className="col-sm-8">
                                                        <input value={formField.phone} name="phone" onChange={this.handleChange} className={'form-control ' + (submitted && isValid.phone.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.phone.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.phone.message} </div>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Date Of Birth (MM/DD/YYYY)</label>
                                                    <div className="col-sm-8">
                                                        <InputMask value={formField.date_of_birth} name="date_of_birth" mask="99/99/9999" onChange={this.handleChange} className={'form-control ' + (submitted && isValid.date_of_birth.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.date_of_birth.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.date_of_birth.message} </div>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label">Industry</label>
                                                    <div className="col-sm-8">
                                                        <Select
                                                            classNamePrefix="multi"
                                                            isSearchable
                                                            defaultValue={formField.mcc}
                                                            name="mcc"
                                                            onChange={this.handleSelect}
                                                            options={mccList.map(item => ({ value: item.code, label: item.name }))} className={'multiple-select mb-2   ' + (submitted && isValid.mcc.isInvalid ? 'is-invalid' : '')} />
                                                        {submitted && isValid.mcc.isInvalid &&
                                                            <div className="invalid-feedback"> {isValid.mcc.message} </div>
                                                        }
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label"></label>
                                                    <div className="col-sm-8">
                                                        <div className="form-group">
                                                            <Form.Check
                                                                labelStyle={{ fontWeight: 400, fontSize: '12px' }}
                                                                className="payment-label-check"
                                                                custom
                                                                inline
                                                                //name="is_co_founder"
                                                                label="I certify that I am the owner and have full authorization to this bank account"
                                                                //checked={formField.is_co_founder}
                                                                type={"checkbox"}
                                                                id={`custom-inline-1`}
                                                            //onChange={this.handleCheckboxChange}
                                                            />
                                                        </div>
                                                        <div className="form-group text-info">
                                                            <h5>Please Double-check your account info!</h5>
                                                            <p>Incorrect or mismatched account name and number can result in withdrawal delays and fees.</p>
                                                        </div>
                                                        <div className="form-group">
                                                            <button className="btn btn-info mr-3" type="submit"><i className="fas fa-check"></i> <span>Add Payment Method</span> </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </form>}


                                            {/*isStripeConnect && <Row>
                                            <Col xs={12} md={6}>
                                                <div className="form-group">
                                                    <label>Social Security Number(Last 4 digit)</label>
                                                    <input type="text" className="form-control" value={formField.ssn_last_4} name="ssn_last_4"
                                                        onChange={this.handleChange} />
                                                </div>
                                            </Col>
                                        </Row>*/}
                                            {/* onClick={this.stripeConnect} */}

                                            {/*{(viewDetails === true) && <div className="payment-details-view">*/}
                                            {/*<DetailsPreview />*/}
                                            {/*<div className="d-flex">*/}
                                            {/*<button type="button" onClick={() => this.stripeHideDetails()} className="btn btn-dark"> Back </button>*/}
                                            {/*</div>*/}
                                            {/*</div>}*/}

                                            <div className=" d-flex align-items-center">
                                                {!isStripeConnect && <button type="button" onClick={() => this.stripeDisconnect()} className="btn btn-info mr-3"> Disconnect Account </button>}
                                                {!isStripeConnect && <button type="button" onClick={() => this.stripeRetrieve()} className="btn btn-primary mr-3"> Check Account Status </button>}
                                                {/*!isStripeConnect && <button type="button" onClick={() => this.stripeViewDetails()} className="btn btn-dark"> Details Preview </button>*/}
                                            </div>

                                        </Card>
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </>
        // </Main >
        );
    }
}


const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);
const countriesSelector = createSelector(
    state => state.countries,
    countries => countries
);

const mapStateToProps = createSelector(
    authenticationSelector, countriesSelector,
    (authentication, countries) => ({
        authentication, countries
    })
);

export default connect(mapStateToProps)(StripConnect);

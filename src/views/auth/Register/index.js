import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Redirect, Link } from 'react-router-dom';
import FormValidator from "../../../helpers/FormValidator";
import LaddaButton, { EXPAND_RIGHT } from 'react-ladda';
import { authActions } from "../../../common/redux/actions";
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import { globalService as gs } from '../../../common/services';
import { Animated } from "react-animated-css";


class Register extends React.Component {

    constructor(props) {
        super(props);
        // reset login status
        //this.props.dispatch(authActions.logout());

        this.state = {
            formField: {
                email: '',
                first_name: '',
                last_name: '',
                password: '',
                confirm_password: '',
                terms: 1,
            },
            submitted: false,
            validation: this.validator().valid(),
            loading: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    validator = () => {
        return new FormValidator([
            { field: 'email', method: 'isEmpty', validWhen: false, message: 'Email is required.' },
            { field: 'email', method: 'isEmail', validWhen: true, message: 'Email is not valid.' },
            { field: 'first_name', method: 'isEmpty', validWhen: false, message: 'First Name is required.' },
            { field: 'last_name', method: 'isEmpty', validWhen: false, message: 'Last Name is required.' },
            { field: 'password', method: 'isEmpty', validWhen: false, message: 'Password is required.' },
            { field: 'confirm_password', method: 'isEmpty', validWhen: false, message: 'Confirm Password is required.' },
            { field: 'confirm_password', method: this.handleConfirmPassword, validWhen: true, message: 'Confirm Password is not match.' },
            { field: 'terms', method: 'isEmpty', validWhen: false, message: 'Terms & condition should be checked.' },
        ]);
    };

    handleConfirmPassword = (password) => {
        return (password === this.state.formField.password);
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const validation = this.validator().validate(this.state.formField);
        this.setState({ validation, submitted: true });

        if (validation.isValid) {
            // handle actual form submission here
            const { dispatch } = this.props;
            dispatch(authActions.register(this.state.formField));
        }
    };

    render() {
        const { process } = this.props;
        if (gs.identity) {
            return (<Redirect to='/job-search' />)
        }

        /*
        user:{
            "username": "mganesh",
            "email":"mganesh.alkurn@gmail.com",
            "first_name": "Mganesh",
            "last_name": "Mankar",
            "password":"alkurn@123#.",
            "confirm_password":"alkurn@123#.",
            "terms":1
        },
        media:{{},{},{}},
        skill:{{},{},{}},

        *
        *
        * */

        // otherwise just use what's in state

        //const {loggingIn} = this.props;
        let validation = this.submitted ?                         // if the form has been submitted at least once
            this.validator().validate(this.state.formField) :    // then check validity every time we render
            this.state.validation;
        const { email, first_name, last_name, password, confirm_password } = this.state.formField;
        const submitted = this.state.submitted;

        return (
            <main className="login-wrap">
                <DocumentTitle title={`Register`} />
                <div className="login-container d-flex flex-wrap justify-content-center">
                    <div className="login-form col-lg-7 col-md-7 order-md-2 d-flex flex-wrap align-items-center">
                    <Animated animationInDuration={2000} animationIn="slideInDown" >

                        <div className="login-box mx-auto">
                            <form name="form" onSubmit={this.handleSubmit} noValidate>
                                <div className="logo">
                                    <Link to="/">
                                        <img src="images/logo.svg" alt="" className="img-fluid" />
                                    </Link>
                                </div>
                                <h2>Create Your Free Account</h2>
                                {/* <h5>Already have an account? <Link to="/login">Sign In</Link></h5> */}
                                <div className="row">
                                    <div className="col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="first_name">First Name</label>
                                            <input type="text" name="first_name" value={first_name} onChange={this.handleChange}
                                                className={'form-control ' + (submitted && validation.first_name.isInvalid ? ' is-invalid' : '')} />
                                            {submitted && validation.first_name.isInvalid &&
                                                <div className="invalid-feedback">{validation.first_name.message}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input type="text" name="last_name" value={last_name} onChange={this.handleChange}
                                                className={'form-control ' + (submitted && validation.last_name.isInvalid ? 'is-invalid' : '')} />
                                            {submitted && validation.last_name.isInvalid &&
                                                <div className="invalid-feedback">{validation.last_name.message}</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" name="email" value={email} onChange={this.handleChange}
                                                className={'form-control ' + (submitted && validation.email.isInvalid ? 'is-invalid' : '')} />
                                            {submitted && validation.email.isInvalid &&
                                                <div className="invalid-feedback">{validation.email.message}</div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" value={password} onChange={this.handleChange}
                                                className={'form-control ' + (submitted && validation.password.isInvalid ? 'is-invalid' : '')} />
                                            {submitted && validation.password.isInvalid &&
                                                <div className="invalid-feedback">{validation.password.message}</div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirm_password">Confirm Password</label>
                                            <input type="password" name="confirm_password" value={confirm_password} onChange={this.handleChange}
                                                className={'form-control ' + (submitted && validation.confirm_password.isInvalid ? 'is-invalid' : '')} />
                                            {submitted && validation.confirm_password.isInvalid &&
                                                <div className="invalid-feedback">{validation.confirm_password.message}</div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <LaddaButton className="btn btn-info btn-block" loading={process.loading} data-style={EXPAND_RIGHT}>Create
                                                Account</LaddaButton>
                                        </div>
                                        {/* <div className="form-group or text-light text-center">
                                            or signup with
                                        </div> */}
                                    </div>
                                    <div className="col-12">
                                        {/* <ul className="social-login nav nav-pills nav-justified">
                                            <li className="nav-item"><Link to="#" className="nav-link"><img src="/images/facebook.png"
                                                                                                            alt=""/> Facebook</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link"><img src="/images/google.svg"
                                                                                                            alt=""/> Google</Link></li>
                                            <li className="nav-item"><Link to="#" className="nav-link"><img src="/images/linkedin.svg"
                                                                                                            alt=""/> Linkedin</Link></li>
                                        </ul> */}
                                        <h5>Already have an account? <Link to="/login">Sign In</Link></h5>
                                        <div className="privacy">
                                            <span className="text-light">By clicking “Create an account”</span> I <Link to="/privacy-policy">agree to
                                            JoBarter’s</Link> Terms of Service <span className="text-light">and</span> Privacy Policy.
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        </Animated>
                    </div>
                    {/* <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}></Animated> */}
                    <div className="login-bg col-lg-5 col-md-5 order-md-1 d-flex flex-wrap align-items-end"
                        style={{ backgroundImage: `url('/images/freelancer-working.jpeg')` }}>
                        <div className="caption">
                        <Animated animationInDuration={1500} animationIn="slideInUp">

                            <div className="text">As a millennial who values flexible and meaningful work purpose, JoBarter gives me the freedom to work at home and anywhere I want on my own terms.
                            </div>
                            <h4>Paul McConnell</h4>
                            <h6>Cleveland, Ohio</h6>
                            </Animated>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const authSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    authSelector,
    processSelector,
    (authentication, process) => ({
        authentication, process
    })
);

export default connect(mapStateToProps)(Register);



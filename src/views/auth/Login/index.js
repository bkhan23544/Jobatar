import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import LaddaButton, { EXPAND_RIGHT } from 'react-ladda';
import { authActions } from "../../../common/redux/actions";
import FormValidator from '../../../helpers/FormValidator';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import {globalService as gs} from "../../../common/services";
import { Button } from '@material-ui/core';

//import GoogleLogin from 'react-google-login';
//import LinkedIn from "linkedin-login-for-react";
//import FacebookLogin from 'react-facebook-login';
//import auth from '../../../common/utils/social-auth.json';



class Login extends React.Component {

    constructor(props) {

        super(props);
        // reset login status
        this.state = {
            formField: {
                username: '',
                password: '',
            },
            isSignedIn: false,
            submitted: false,
            validation: this.validator().valid(),
        };
    }

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    };

    componentDidMount = () => {
        const { dispatch } = this.props;
        //globalService.firebaseLogout();
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user });
            if (user !== null) {
                dispatch(authActions.loginByAuth(user.providerData, { authclient: 'google' }));
            } else {
                console.log("user not login", user);
            }
        });

    };

    validator = () => {
        return new FormValidator([
            { field: 'username', method: 'isEmpty', validWhen: false, message: 'Email is required.' },
            { field: 'username', method: 'isEmail', validWhen: true, message: 'Email is not valid.' },
            { field: 'password', method: 'isEmpty', validWhen: false, message: 'Password is required.' },
        ]);
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { formField } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });
        if (validation.isValid) {
            // handle actual form submission here
            const { dispatch } = this.props;
            dispatch(authActions.login(formField));
        }
    };

    resendVerification = () => {
        const { dispatch, alert } = this.props;
        dispatch(authActions.resendVerification({user_id: alert.user_id}, {user_id: alert.user_id}));
    }

    accessToken = (token) => {
        return (new Blob([JSON.stringify({ access_token: token }, null, 2)], { type: 'application/json' }));
    };



    render() {

        const { formField, validation, submitted } = this.state;
        const { alert } = this.props;
        const { username, password } = formField;
        let isValid = this.submitted ?
            this.validator().validate(formField) :
            validation;
        if(alert && alert.user_id) gs.firebaseLogout();

        return (
            <main className="login-wrap">
                <DocumentTitle title={`Login`} />
                <div className="login-container container d-flex flex-wrap justify-content-center">
                    <div className="login-form order-md-2 d-flex flex-wrap align-items-center">
                        <div className="login-box mx-auto col">
                            <form name="form" onSubmit={this.handleSubmit} noValidate>
                                <div className="logo">
                                    <Link to="/">
                                        <img src="/images/logo.svg" alt="" className="img-fluid" />
                                    </Link>
                                </div>
                                <h2>Sign In</h2>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="username">Email</label>
                                            <input type="text" name="username" value={username} onChange={this.handleChange}
                                                autoFocus
                                                className={'form-control ' + (submitted && isValid.username.isInvalid ? 'is-invalid' : '')} />
                                            {submitted && validation.username.isInvalid &&
                                                <div className="invalid-feedback"> {isValid.username.message} </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" value={password}
                                                onChange={this.handleChange}
                                                className={'form-control ' + (submitted && isValid.password.isInvalid ? 'is-invalid' : '')} />
                                            {submitted && validation.password.isInvalid &&
                                                <div className="invalid-feedback"> {isValid.password.message} </div>
                                            }
                                            <small className="form-text text-right">
                                                <Link to="/forgot-password" style={{ fontWeight: 'bold' }}>Forgot Password ?</Link>
                                            </small>
                                        </div>
                                        <div className="form-group">
                                            <LaddaButton className="btn btn-info btn-block" loading={this.props.process.loading} data-style={EXPAND_RIGHT}>Sign In</LaddaButton>
                                        </div>
                                        {(alert && alert.user_id) && <div className="form-group or text-light text-center" style={{fontSize: '12px', marginBottom: '0px'}}>
                                            Your Email is not verified yet. If you did not received a verification email then please click
                                            <button className="btn btn-link" type="button" onClick={this.resendVerification}>Resend</button>
                                        </div>}
                                        <div className="form-group or text-light text-center">
                                            or login with
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        {!this.state.isSignedIn &&
                                            <StyledFirebaseAuth className={'fireLogin'}
                                                uiConfig={this.uiConfig}
                                                firebaseAuth={firebase.auth()}
                                            />}
                                        {this.state.isSignedIn &&
                                            <Button type="button" className="btn btn-primary" onClick={() => gs.firebaseLogout() }>Logout</Button>
                                        }

                                        {/*
                                            <StyledFirebaseAuth className={'fireLogin'}
                                                uiConfig={this.uiConfig}
                                                firebaseAuth={firebase.auth()}
                                            />
                                        */}

                                        <div className="login">
                                            Not a member yet? <Link to={'/register'}>Join now</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="login-bg order-md-1 d-flex flex-wrap align-items-end"
                        style={{ backgroundImage: `url('/images/signup-bg@2x.png')` }}>
                        <div className="caption">
                            <div className="text">As a freelancer for the past four years, JoBarter is exactly what I need to take my business to the next level.
                            </div>
                            <h4>Hilda Schwartz</h4>
                            <h6>Manhattan, New York</h6>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const authSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const processSelector = createSelector(
    state => state.process,
    process => process
);

const alertSelector = createSelector(
    state => state.alert,
    alert => alert
);

const mapStateToProps = createSelector(
    authSelector,
    processSelector,
    alertSelector,
    (authentication, process, alert) => ({
        authentication, process, alert
    })
);

export default connect(mapStateToProps)(Login);

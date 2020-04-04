import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import LaddaButton, {EXPAND_RIGHT} from 'react-ladda';
import FormValidator from '../../helpers/FormValidator';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import {authActions} from "../../common/redux/actions";
import { DocumentTitle } from '../../helpers/DocumentTitle';
import { globalService as gs } from '../../common/services';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
                email: '',
            },
            submitted: false,
            validation: this.validator().valid(),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validator() {
        return new FormValidator([
            {field: 'email', method: 'isEmpty', validWhen: false, message: 'Email is required.'},
            {field: 'email', method: 'isEmail', validWhen: true, message: 'Email is not valid.'},
        ]);
    };

    handleChange(e) {
        let formField = {...this.state.formField};
        formField[e.target.name] = e.target.value;
        this.setState({formField});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {formField, } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({validation, submitted: true});
        if (validation.isValid) {
            // handle actual form submission here
            const {dispatch} = this.props;
            dispatch(authActions.forgotPassword(formField));
        }
    }

    render() {

        if (gs.identity) {
            return (<Redirect to='/'/>)
        }
        const {formField, submitted, validation} = this.state;
        let isValid = submitted ? this.validator().validate(formField) : validation;
        const {email} = formField;

        return (<main className="login-wrap">
            <DocumentTitle title={`Forgot Password`}/>
            <div className="login-container container d-flex flex-wrap justify-content-center">
                <div className="login-form order-md-2 d-flex flex-wrap align-items-center">
                    <div className="login-box mx-auto">
                        <form style={{width: '420px'}} name="forgot" onSubmit={this.handleSubmit} noValidate>
                            <div className="logo text-center">
                                <Link to="/">
                                    <img src="images/logo.svg" alt="" className="img-fluid"/>
                                </Link>
                            </div>
                            <h2 className="text-center">Forgot password?</h2>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" value={email} onChange={this.handleChange}
                                               className={'form-control ' + (submitted && isValid.email.isInvalid ? 'is-invalid' : '')}/>
                                        {submitted && isValid.email.isInvalid &&
                                        <div className="invalid-feedback"> {isValid.email.message} </div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <LaddaButton className="btn btn-info btn-block" loading={this.props.process.loading}
                                                     data-style={EXPAND_RIGHT}>Submit</LaddaButton>
                                    </div>
                                    <div className="form-group or text-light text-center">
                                        Back to <Link to="/login">Login</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>);
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


const mapStateToProps = createSelector(
    authSelector,
    processSelector,
    (authentication, process) => ({
        authentication, process
    })
);

export default connect(mapStateToProps)(ForgotPassword);

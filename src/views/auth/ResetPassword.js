import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import LaddaButton, {EXPAND_RIGHT} from 'react-ladda';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import {authActions} from "../../common/redux/actions";
import { DocumentTitle } from '../../helpers/DocumentTitle';
import { globalService as gs } from '../../common/services';
import SimpleReactValidator from 'simple-react-validator';


class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                password: '',
                password_repeat: '',
            },
            submitted: false,
            //validation: this.validator().valid(),
        };
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            className: 'text-danger',
            messages: {
                password_repeat: 'Confirm Password is required.'
            }
        });
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        this.token = query.get('token');
    }

    /*validator() {
        return new FormValidator([
            {field: 'password', method: 'isEmpty', validWhen: false, message: 'Password is required.'},
            {field: 'password_repeat', method: 'isEmpty', validWhen: false, message: 'Confirm Password is required.'},
            {field: 'password_repeat', method: this.handleConfirmPassword, validWhen: true, message: 'Confirm Password is not match.'}
        ]);
    };*/

    handleConfirmPassword = (password) => {
        return (password === this.state.formField.password);
    };

    handleChange = (e) => {
        let formField = {...this.state.formField};
        formField[e.target.name] = e.target.value;
        this.setState({formField});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if( this.validator.allValid() ){
            const {dispatch} = this.props;
            dispatch(authActions.resetPassword(this.state.formField, { 'token': this.token}));
        } else {
            this.validator.showMessages();
        }
        /*return false;
        const validation = this.validator().validate(this.state.formField);
        this.setState({validation, submitted: true});
        if (validation.isValid) {
            // handle actual form submission here
        }*/
    }

    render() {
        if (gs.identity) {
            return (<Redirect to='/' />)
        }

        //const {password, password_repeat} = this.state.formField;
        //let validation = this.submitted ? this.validator().validate(this.state.formField) : this.state.validation;
        //const submitted = this.state.submitted;
        const { formField } = this.state;
        return (<main className="login-wrap">
            <DocumentTitle title={`Reset Password`}/>
            <div className="login-container container d-flex flex-wrap justify-content-center">
                <div className="login-form order-md-2 d-flex flex-wrap align-items-center">
                    <div className="login-box mx-auto">
                        <form style={{width: '420px'}} name="forgot" onSubmit={this.handleSubmit} noValidate>
                            <div className="logo text-center">
                                <Link to="/">
                                    <img src="images/logo.svg" alt="" className="img-fluid"/>
                                </Link>
                            </div>
                            <h2 className="text-center">Reset password?</h2>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" onChange={this.handleChange} className={'form-control '} />
                                        {this.validator.message('password', formField.password, 'required|min:6')}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password_repeat">Confirm Password</label>
                                        <input type="password" name="password_repeat" onChange={this.handleChange} className={'form-control '} />
                                        {/*this.validator.message('password_repeat', formField.password, `required|in:${formField.password}`)*/}
                                        {this.validator.message('password_repeat', formField.password_repeat, `required|in:${formField.password}`, {messages: {in: 'Passwords need to match!', required: 'Confirm Password is required.'}})}
                                    </div>
                                    <div className="form-group">
                                        <LaddaButton className="btn btn-info btn-block" loading={this.props.process.loading} data-style={EXPAND_RIGHT}>Submit</LaddaButton>
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

const userSelector = createSelector(
    state => state.user,
    user => user
);

const processSelector = createSelector(
    state => state.process,
    process => process
);


const mapStateToProps = createSelector(
    userSelector,
    processSelector,
    (user, process) => ({
        user, process
    })
);

export default connect(mapStateToProps)(ResetPassword);

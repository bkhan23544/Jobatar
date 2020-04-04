import React, { Component } from "react";
import FormValidator from "../../../../helpers/FormValidator";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { defaultActions } from "../../../../common/redux/actions";

class NewsletterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                email: '',
            },
            loading: false,
            submitted: false,
            validation: this.validator().valid(),
        };
        this.initializeState = this.state;
    }

    validator() {
        return new FormValidator([
            { field: 'email', method: 'isEmpty', validWhen: false, message: 'Valid email address is required.' },
        ]);
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    submitForm = (e) => {
        e.preventDefault();
        const { formField } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });
        if (validation.isValid) {
            const { dispatch } = this.props;
            dispatch(defaultActions.newsletter({ newsletter: formField }));
            this.setState(this.initializeState);
        }
    };

    render() {

        const { formField, submitted, validation } = this.state;
        let isValid = submitted ? this.validator().validate(formField) : validation;

        return (
            <div className="col-lg-4 col-12">
                <h4 className="pb-1">Get the latest updates from jobarter</h4>

                <form name="newsletter" onSubmit={this.submitForm}>
                    <div className="input-group mb-3">
                        {submitted && isValid.email.isInvalid &&
                            <div className="invalid-feedback"> {isValid.email.message} </div>}
                            <input type="email" name="email" placeholder="Your email here" onChange={this.handleChange}
                                value={formField.email} className={'form-control ' + (submitted && isValid.email.isInvalid ? 'is-invalid' : '')} />

                        <div className="input-group-append">
                            <button className="btn btn-info text-white" type="submit" id="button-addon2">Subscribe</button>
                        </div>
                    </div>
                </form>
            </div>
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
    }),
);

export default connect(mapStateToProps)(NewsletterForm);
import React, { Component, Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import FormValidator from "../../../../../helpers/FormValidator";
import { userActions } from "../../../../../common/redux/actions";
import LaddaButton from "react-ladda";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

class ExperienceForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                title: "",
                industry_name: "",
                from: (new Date()),
                to: (new Date()),
                description: "",
                is_present: 0,
            },
            id: null,
            minDate: "",
            submitted: false,
            validation: this.validator().valid(),
            loading: false,
        };
    }

    componentWillReceiveProps(prop) {
        if (prop.formField) {
            this.setState({ formField: prop.formField, id: prop.formField.id })
        } else {
            this.setState({
                formField: {
                    title: "",
                    industry_name: "",
                    from: (new Date()),
                    to: (new Date()),
                    description: "",
                    is_present: 0,
                }, id: null
            })
        }
    }

    componentWillMount() {
        let today = new Date();
        const date = today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate());
        this.setState({ minDate: date })
    }

    validator = () => {
        return new FormValidator([
            { field: 'title', method: 'isEmpty', validWhen: false, message: 'First name is required.' },
            { field: 'industry_name', method: 'isEmpty', validWhen: false, message: 'Industry Name is required.' },
            { field: 'from', method: 'isEmpty', validWhen: false, message: 'Duration From date is required.' },
        ]);
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handlePresentChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = (e.target.checked ? 1 : 0);
        this.setState({ formField });
    };

    handleFromDate = (dated) => {
        let formField = { ...this.state.formField };
        formField['from'] = (new Date(dated));
        this.setState({ formField });
    };

    handleToDate = (dated) => {
        let formField = { ...this.state.formField };
        formField['to'] = (new Date(dated));
        this.setState({ formField });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { formField, id } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });

        //const decoratedOnClick = useAccordionToggle(eventKey, onClick);

        if (validation.isValid) {
            const { dispatch } = this.props;
            dispatch(userActions.experience("POST", { userExperience: formField }, { item_id: id }));
            this.setState({
                formField: {
                    title: "",
                    industry_name: "",
                    from: (new Date()),
                    to: (new Date()),
                    description: "",
                    is_present: 0,
                },
                submitted: false,
                validation: this.validator().valid(),
                loading: false,
            });
            setTimeout(() => {
                this.props.hideToggle('experience_toggle');
            }, 800);
        }
    };

    cancelForm = () => this.props.hideToggle('experience_toggle');


    render() {
        const { formField, submitted, validation, id } = this.state;
        let isValid = submitted ? this.validator().validate(formField) : validation;

        return (<Fragment>
            <form name="experience" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                <Row>
                    <Col xs={12} md={6}>
                        <div className="form-group">
                            <label>Title / Designation</label>
                            <input type="text" name="title" placeholder="UI/UX Designer"
                                onChange={this.handleChange}
                                value={formField.title} className={'form-control ' + (submitted && isValid.title.isInvalid ? 'is-invalid' : '')} />
                            {submitted && isValid.title.isInvalid &&
                                <div className="invalid-feedback"> {isValid.title.message} </div>
                            }
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="form-group">
                            <label>Company</label>
                            <input type="text" name="industry_name" placeholder="Company"
                                onChange={this.handleChange}
                                value={formField.industry_name}
                                className={'form-control ' + (submitted && isValid.industry_name.isInvalid ? 'is-invalid' : '')} />
                            {submitted && isValid.industry_name.isInvalid &&
                                <div className="invalid-feedback"> {isValid.industry_name.message} </div>
                            }
                        </div>
                    </Col>
                </Row>

                <Row>

                    <Col>
                        <div className="form-group">
                            <label>Start Date</label>
                            <div className="form-calender is-invalid">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        margin="normal"
                                        id="date-picker-from-dialog"
                                        format="MM/dd/yyyy"
                                        placeholder="Start Date"
                                        value={formField.from}
                                        onChange={this.handleFromDate}
                                        maxDate={new Date()}
                                        className={'form-control'}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                {submitted && isValid.from.isInvalid &&
                                    <div className="invalid-feedback d-block"> {isValid.from.message} </div>
                                }
                            </div>

                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label>End Date</label>
                            <div className="form-calender is-invalid">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-to-dialog"
                                        format="MM/dd/yyyy"
                                        placeholder="End Date"
                                        value={formField.to}
                                        onChange={this.handleToDate}
                                        maxDate={new Date()}
                                        minDate={formField.from}
                                        disabled={(formField.is_present === 1) ? true : false}
                                        className={'form-control'}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                <small className="form-text text-muted">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" name="is_present" id="customCheck1" checked={formField.is_present === 1 ? true : false} onChange={this.handlePresentChange} />
                                        <label className="custom-control-label" htmlFor="customCheck1">Present</label>
                                    </div>
                                </small>
                            </div>

                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12}>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" rows="3" name="description"
                                placeholder="About text here"
                                value={formField.description}
                                onChange={this.handleChange}></textarea>
                        </div>
                        <div className="form-group button text-right px-0" style={{ boxShadow: 'none', backgroundImage: 'none' }}>
                            <button type="button" onClick={() => this.cancelForm()} className="btn btn-link btn-sm btn-cancel"> Cancel Form </button>
                            <LaddaButton className={id ? 'btn btn-success' : 'btn btn-info ladda-btn'}> {id ? 'Update Experience' : 'Add Experience'} </LaddaButton>
                        </div>
                    </Col>
                </Row>
            </form>
        </Fragment>);
    }
}


const experiencesSelector = createSelector(
    state => state.experiences,
    experiences => experiences
);

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    experiencesSelector,
    processSelector,
    (experiences, process) => ({
        experiences, process
    })
);

export default connect(mapStateToProps)(ExperienceForm);



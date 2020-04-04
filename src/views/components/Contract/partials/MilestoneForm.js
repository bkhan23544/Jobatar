import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab } from '@material-ui/core';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import FormValidator from '../../../../helpers/FormValidator'
import { proposalActions } from '../../../../common/redux/actions/index';
import { globalService as gs } from '../../../../common/services';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';

const isValidDuration = false;
const isValidDated = false;
const fromType = null;
const dateFieldTitle = null;

class MilestoneForm extends Component {

    constructor(props) {
        super(props);
        this.fromType = props.type;
        this.state = {
            formField: {
                proposal_id: '',
                action_by: '',
                title: '',
                description: '',
                duration: '',
                budget: '',
                dated: (new Date()),
            },
            validation: this.validator().valid(),
            open: false,
            proposal_id: null,
            submitted: false,
            type: null,
        };
        this.dateFieldTitle = (props.type === 'Timesheet') ? 'Start date' : 'Due Date';
        this.initializeState = this.state;
    }

    componentWillMount(){
        this._mount();
    }

    componentWillReceiveProps = () => {
        this._mount();
    };

    _mount = () => {
        const { open, proposal_id, type, field } = this.props;
        console.log('this.props', this.props);
        if(field) {
            let { formField } = this.state;
            this.setState({ proposal_id, open, type, dateFieldTitle, formField: field });
        } else {
            let { formField } = this.state;
            formField['proposal_id'] = proposal_id;
            this.setState({ proposal_id, open, formField, type, dateFieldTitle });
        }

    };

    validator = () => {
        return new FormValidator([
            { field: 'title', method: 'isEmpty', validWhen: false, message: 'Title is required.' },
            { field: 'dated', method: 'isEmpty', validWhen: false, message: `${this.dateFieldTitle} is required.` },
            { field: 'budget', method: 'isEmpty', validWhen: (this.fromType === 'Timesheet'), message: 'Budget is required.' },
            { field: 'duration', method: 'isEmpty', validWhen: (this.fromType === 'Milestone'), message: 'Duration is required.' },
            { field: 'description', method: 'isEmpty', validWhen: false, message: 'Description is required.' },
        ]);
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
        if (e.target.name === 'duration') {
            if(parseInt(e.target.value) === 0) {
                formField[e.target.name] = 1;
            }
            if (e.target.value < 0) {
                formField[e.target.name] = -e.target.value;
            }
            formField = this.handleBudget(formField);
        }

    };

    handleBudget = (formField) => {
        const {budget} = this.props
        this.budgetForTimesheet = formField.duration * budget;
    };

    handleClose = () => {
        this.props.milestoneClose();
    };

    handleDateChange = (dated) => {
        let formField = { ...this.state.formField };
        formField['dated'] = (new Date(dated));
        this.setState({ formField });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { formField, proposal_id, type } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });
        if (validation.isValid) {
            const { dispatch, milestone_id } = this.props;
            const params = {};
            const param = proposal_id === null ? null : { proposal_id: proposal_id, item_id: milestone_id };
            params.proposal_id = formField.proposal_id;
            params.action_by = gs.identity.user.id;
            params.title = formField.title;
            params.description = formField.description;
            params.duration = formField.duration;
            params.budget = (this.fromType === 'Timesheet') ? this.budgetForTimesheet : formField.budget;
            params.dated = parseInt(new Date(formField.dated).getTime() / 1000);
            param.userMessage = this.props.message(`New ${type} create.`);
            dispatch(proposalActions.milestone("POST", { userMilestone: params }, param));
            this.setState(this.initializeState);
            this.handleClose();
        }
    };

    render() {

        const { open } = this.props;
        const { formField, submitted, validation, type, dateFieldTitle } = this.state;
        let isValid = submitted ? this.validator().validate(formField) : validation;
        let typeTitle = gs.capitalize(type);
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                fullWidth={true}
                maxWidth={'sm'}
                className="offer-dialog">
                <DialogTitle><span className="text-primary">{`${typeTitle}`}</span>
                    <Fab color="inherit" onClick={this.handleClose}>
                        <i className="fas fa-times"></i>
                    </Fab>
                </DialogTitle>
                <DialogContent>
                    <form name="proposal" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                        <div className="form-group">
                            <label>Title</label>
                            <div className="input-group">
                                <input type="text" value={formField.title} name="title" placeholder="Title ..." onChange={this.handleChange} className={'form-control ' + (submitted && isValid.title.isInvalid ? 'is-invalid' : '')} />
                                {submitted && isValid.title.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.title.message} </div>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className={'form-control ' + (submitted && isValid.description.isInvalid ? 'is-invalid' : '')} placeholder="Message ..." onChange={this.handleChange}
                                name="description" rows={3} value={formField.description} />
                            {submitted && isValid.description.isInvalid &&
                                <div className="invalid-feedback"> {isValid.description.message} </div>
                            }
                        </div>
                        <div className="form-group">
                            <label>{`${this.dateFieldTitle}`}</label>
                            <div className="form-calender">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        format="MM/dd/yyyy"
                                        placeholder="Dated ..."
                                        value={formField.dated}
                                        onChange={this.handleDateChange}
                                        className={'form-control'}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>

                        {type === 'Timesheet' && <div className="form-group">
                            <label>Number of Hours</label>
                            <div className="input-group">
                                <input type="number" value={formField.duration} name="duration" placeholder="Duration ..." onChange={this.handleChange} className={'form-control ' + (submitted && isValid.duration.isInvalid ? 'is-invalid' : '')} min="0" step="1" pattern="\d+"/>
                                {submitted && isValid.duration.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.duration.message} </div>}
                            </div>
                        </div>}

                        <div className="form-group">
                            <label>Budget</label>
                            <div className="input-group">
                                <input type="text" value={(type === 'Timesheet' ? this.budgetForTimesheet : formField.budget)} name="budget" placeholder="Budget ..." onChange={this.handleChange} className={'form-control ' + (submitted && isValid.budget.isInvalid ? 'is-invalid' : '')}
                                    readOnly={(type === 'Timesheet')} />
                                {submitted && isValid.budget.isInvalid && <div className="invalid-feedback"> {isValid.budget.message} </div>}
                            </div>
                        </div>

                    </form>
                </DialogContent>
                <DialogActions className="pb-3">
                    <button className="btn btn-info" onClick={this.handleSubmit} autoFocus>Submit</button>
                </DialogActions>
            </Dialog>)
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    (process) => ({
        process,
    })
);

export default connect(mapStateToProps)(MilestoneForm);
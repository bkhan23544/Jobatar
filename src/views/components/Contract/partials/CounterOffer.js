import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab } from '@material-ui/core';
import Select from 'react-select';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { proposalActions } from '../../../../common/redux/actions';
import { globalService as gs, itemService } from '../../../../common/services';
import FormValidator from '../../../../helpers/FormValidator';
import { ModuleHelper } from '../../../../helpers/module.helper';

var validService = true;
var validBudget = true;

class CounterOffer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                settlement: '',
                services: [],
                budget: '',
                comment: '',
                recipients: [],
                status: ''
            },
            submitted: false,
            validation: this.validator().valid(),
            open: false,
            servicesList: null,
            item: null,
            item_id: null
        };
    }

    componentDidMount() {
        this._mount();
    }

    componentWillReceiveProps() {
        this._mount();
    }

    _mount = () => {
        const { open, item } = this.props;
        const { servicesList } = this.state;
        let formField = { ...this.state.formField };
        if (item) {
            formField['settlement'] = item.settlement;
            this.setState({ open, item, formField });
            item && (servicesList === null) && itemService.service("GET", null, { user_id: item.provider_id })
                .then(response => (response.items && this.setState({ servicesList: response.items })))
                .catch(exception => {
                    console.log(exception);
                });
        }
    }

    validator = () => {
        return new FormValidator([
            { field: 'settlement', method: 'isEmpty', validWhen: false, message: 'Service Settlement is required.' },
            { field: 'comment', method: 'isEmpty', validWhen: false, message: 'Message is required.' },
            { field: 'budget', method: 'isEmpty', validWhen: validBudget, message: 'Budget is required.' },
            { field: 'services', method: 'isEmpty', validWhen: validService, message: 'Services is required.' },
        ]);
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = (e.target.selectedOptions && e.target.name === 'settlement') ?
            Array.from(e.target.selectedOptions, (item) => item.value) :
            e.target.value;
        this.setState({ formField });
    };

    handleSelect = (item, { action, name }) => {
        let formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField });
    };

    handleClose = () => {
        this.props.offerClose();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { formField } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });
        if (validation.isValid) {
            const { dispatch, item, status} = this.props;
            const params = {};
            const param = { proposal_id: item.id };
            params.budget = formField.budget;
            params.action_by   = gs.identity.user.id;
            params.comment = formField.comment;
            params.status = (status === ModuleHelper.statuses().status_bid) ? ModuleHelper.statuses().status_offers : ModuleHelper.statuses().status_counter_offers;
            params.services = formField.services && formField.services.map(item => item.value);
            param.userMessage = this.props.message(formField.comment);
            dispatch(proposalActions.proposal("POST", { userProposal: params }, param));
            this.setState(this.initializeState);
            this.handleClose();
        }
    };

    render() {

        const { open, moduleTitle, item } = this.props;
        const { formField, servicesList, submitted, validation, } = this.state;
        let isValid = submitted ? this.validator().validate(formField) : validation;

        if (formField.settlement === 'exchange') validService = false;
        if (formField.settlement === 'cash') validBudget = false;

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                fullWidth={true}
                maxWidth={'sm'}
                className="offer-dialog">
    <DialogTitle><span className="text-primary">{`${moduleTitle}`}</span>
                    <Fab color="inherit" onClick={this.handleClose}>
                        <i className="fas fa-times"></i>
                    </Fab>
                </DialogTitle>
                <DialogContent>
                    <form name="proposal" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                        {item && item.settlement === 'both' && <div className="form-group">
                            <div className="custom-control custom-radio mb-2">
                                <input type="radio"
                                    name="settlement"
                                    checked={(formField.settlement === 'cash')}
                                    id="settlement-cash" value={'cash'}
                                    onChange={this.handleChange}
                                    className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="settlement-cash">Cash</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio"
                                    name="settlement"
                                    checked={(formField.settlement === 'exchange')}
                                    id="settlement-exchange" value={'exchange'}
                                    onChange={this.handleChange}
                                    className="custom-control-input" />
                                <label className="custom-control-label" htmlFor="settlement-exchange">Exchange</label>
                            </div>
                        </div> }

                        {(formField.settlement === 'cash') && <div className="form-group">
                            <label>Enter Amount</label>
                            <div className="input-group">
                                <input type="number" className={'form-control ' + (submitted && isValid.comment.isInvalid ? 'is-invalid' : '')} name="budget" placeholder="Amount" onChange={this.handleChange} />
                                <div className="input-group-append">
                                    <span className="input-group-text">$</span>
                                </div>
                            </div>
                            {submitted && isValid.budget.isInvalid &&
                            <div className={'invalid-feedback ' + (submitted && isValid.budget.isInvalid ? 'd-block' : '')}> {isValid.budget.message} </div>
                            }
                        </div>}

                        {servicesList && (formField.settlement === 'exchange') && <div className="form-group">
                            <label>Select Services</label>
                            <Select
                                className={"multiple-select mb-2 "  + (submitted && isValid.services.isInvalid ? 'is-invalid' : '')}
                                classNamePrefix="multi"
                                isSearchable isMulti
                                defaultValue={formField.services}
                                name="services"
                                onChange={this.handleSelect}
                                options={servicesList.map(item => ({ value: item.id, label: item.title }))} />
                            {submitted && isValid.services.isInvalid &&
                            <div className={'invalid-feedback ' + (submitted && isValid.services.isInvalid ? 'd-block' : '')}> {isValid.services.message} </div>
                            }
                        </div>}

                        <div className="form-group">
                            <label>Message</label>
                            <textarea className={'form-control ' + (submitted && isValid.comment.isInvalid ? 'is-invalid' : '')} placeholder="Message ..." onChange={this.handleChange}
                             name="comment" rows={3} />
                            {submitted && isValid.comment.isInvalid &&
                            <div className="invalid-feedback"> {isValid.comment.message} </div>
                            }
                        </div>
                    </form>
                </DialogContent>
                <DialogActions className="pb-3">
                    <button className="btn btn-info" onClick={this.handleSubmit} autoFocus>Send Offer</button>
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

export default connect(mapStateToProps)(CounterOffer);
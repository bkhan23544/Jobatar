import React, { Component, Fragment } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab } from '@material-ui/core';
import Select from 'react-select';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import FormValidator from '../../../../helpers/FormValidator';
import { proposalActions } from '../../../../common/redux/actions';
import { globalService as gs } from '../../../../common/services';
import { ModuleHelper as mh } from '../../../../helpers/module.helper';
import FileUploader from "../../common/FileUploader";
import { fileManupulate } from "../../../../helpers/file.helper";
var validSettlement = true;
var validService = true;
var validBudget = true;

class PlaceOffer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                settlement: null,
                services: [],
                budget: '',
                comment: '',
                recipients: [],
                answers: [],
                status: '',
                any_questions: '',
                files: []
            },
            modelTitle: null,
            open: false,
            servicesList: null,
            item: null,
            item_id: null,
            validForm: true,
            validation: this.validator().valid(),
        };
        this.initializeState = this.state;
    }

    componentWillReceiveProps() {
        this._mount();
    }

    componentWillMount() {
        this._mount();
    }

    _mount = () => {
        const { open, item_id, moduleId, item, title} = this.props;
        let servicesList = (moduleId === mh.UserService) ? this.props.servicesList : item.userServices;
        let { formField } = this.state;
        if (item) {
            formField['settlement'] = (formField.settlement === null) ? item.settlement : formField.settlement;
            formField['moduleId'] = moduleId;
            formField['item_id'] = item_id;
            const isOwner = gs.isOwner(item.user_id);
            const isLogged = gs.isOwner(gs.identity.user.id);
            const provider_id = isLogged && !isOwner ? gs.identity.user.id : null;
            this.setState({ open, item_id, moduleId, item, servicesList, modelTitle: title, formField, provider_id });
        }
    }



    validator = () => {
        return new FormValidator([
            { field: 'settlement', method: 'isEmpty', validWhen: false, message: 'Service Settlement is required.' },
            { field: 'comment', method: 'isEmpty', validWhen: false, message: 'proposal description is required.' },
            { field: 'budget', method: 'isEmpty', validWhen: validBudget, message: 'Budget is required.' },
            { field: 'services', method: 'isEmpty', validWhen: validService, message: 'Services is required.' },
        ]);
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleAnswer = (e) => {
        let { formField } = this.state;
        let index = formField.answers && formField.answers.length > 0 && formField.answers.findIndex(item => (item.question_id === e.target.name));
        if (index !== -1 && index !== false && index !== undefined && index >= 0) {
            formField.answers[index].answer = e.target.value;
        } else {
            formField.answers.push({ question_id: e.target.name, answer: e.target.value });
        }
        this.setState({ formField });
    };

    handleSelect = (item, { action, name }) => {
        let formField = { ...this.state.formField };
        let id = [];
        item && item.forEach(el => {
            const index = item.findIndex(f => f.value === el.value);
            if (index !== -1) {
                id[index] = el.value;
            } else {
                id.push(el.value);
            }
        });
        formField[name] = id;
        this.setState({ formField });
    };

    handleClose = (event = null, type) => {
        this.props.offerClose(event, type);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { formField, item } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });

        if (validation.isValid) {
            const { dispatch, upload } = this.props;
            let filesArr = upload.files ? upload.files : [];
            const params = {};
            params.files = fileManupulate(filesArr, this.state.formField.files);
            params.settlement = formField.settlement;
            params.budget = formField.budget;
            params.services = formField.services;
            params.comment = formField.comment;
            params.provider_id = gs.identity.user.id;
            params.action_by = gs.identity.user.id;
            params.item_id = formField.item_id;
            params.moduleId = formField.moduleId;
            params.recipients = [gs.identity.user.id, item.user_id];
            params.answers = formField.answers;
            params.any_questions = formField.any_questions;
            params.status = mh.statuses().status_offers;
            dispatch(proposalActions.proposal("POST", { userProposal: params }));
            this.setState(this.initializeState);
            this.handleClose(null, { proposalStatus: true });
        }
    };

    render() {
        const { open, upload, moduleId, buttonTitle, isJob } = this.props;
        const { formField, item, servicesList, submitted, validation, modelTitle } = this.state;
        let isValid = submitted ? this.validator().validate(formField) : validation;

        switch (formField.settlement) {
            case 'exchange':
                validService = false;
                validBudget = true;
                break;
            case 'cash':
                validService = true;
                validBudget = false;
                break;
        }

        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                fullWidth={true}
                maxWidth={'sm'}
                className="offer-dialog">
                <DialogTitle><span className="text-primary">{modelTitle}</span>
                    <Fab color="inherit" onClick={this.handleClose}>
                        <i className="fas fa-times"></i>
                    </Fab>
                </DialogTitle>
                <DialogContent>
                    <form name="proposal" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate style={{ minHeight: "360px", overflow: 'hidden' }}>
                        {item && item.settlement === 'both' && <div className="form-group">
                            <label>{(mh.UserService === moduleId) ? 'How would you like to pay for this service ? ' : 'How would you like to get paid for this job ?'}</label>
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
                        </div>}

                        {(formField.settlement === 'cash') && <div className="form-group">
                            <label>How much would you like to {(mh.UserItem === moduleId) ? 'get paid' : 'pay'} for this {(mh.UserService === moduleId) ? 'service' : 'job'}? </label>
                            <div className="input-group">
                                <input type="number" className={'form-control ' + (submitted && isValid.comment.isInvalid ? 'is-invalid' : '')} name="budget" placeholder={`${item.budget ? item.budget : 0} ${(item.type === 'fixed') ? ' /Fixed' : ' / Hourly rate'}`} onChange={this.handleChange} />
                                <div className="input-group-append ml-0">
                                    <span className="input-group-text mr-1">$</span>
                                </div>
                            </div>
                            {submitted && isValid.budget.isInvalid &&
                                <div className={'invalid-feedback ' + (submitted && isValid.budget.isInvalid ? 'd-block' : '')}> {isValid.budget.message} </div>
                            }
                        </div>}

                        {((servicesList) && (formField.settlement === 'exchange')) && <div className="form-group">
                            <label>Select a service as a payment in exchange for this service</label>
                            <Select
                                className={"multiple-select mb-2 " + (submitted && isValid.services.isInvalid ? 'is-invalid' : '')}
                                classNamePrefix="multi"
                                isMulti
                                defaultValue={formField.services}
                                name="services"
                                onChange={this.handleSelect}
                                options={servicesList.map(item => ({ value: item.id, label: item.title }))} />
                            {submitted && isValid.services.isInvalid &&
                                <div className={'invalid-feedback ' + (submitted && isValid.services.isInvalid ? 'd-block' : '')}> {isValid.services.message} </div>
                            }
                        </div>}

                        <div className="form-group">
                            <label>{(mh.UserService === moduleId) ? 'Message' : 'Job proposal description'} </label>
                            <textarea className={'form-control ' + (submitted && isValid.comment.isInvalid ? 'is-invalid' : '')} placeholder="Message ..." onChange={this.handleChange}
                                name="comment" rows={3} />
                            {submitted && isValid.comment.isInvalid &&
                                <div className="invalid-feedback"> {isValid.comment.message} </div>
                            }
                        </div>
                        {isJob && <>
                            <div className="form-group">
                                <label>What questions do you have for this {(mh.UserService === moduleId) ? 'service' : 'job'}?</label>
                                <textarea className={'form-control'} placeholder="Any questions ..." onChange={this.handleChange} name="any_questions" rows={3} />
                            </div>

                            <div className="form-group">
                                <FileUploader upload={upload} coverImage={false} title="Attachment" accept={'.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf, video/*'} />
                            </div>
                        </>}

                        {item && item.userItemQuestions && item.userItemQuestions.length > 0 && <Fragment>
                            <h5>Questions by Job Provider</h5>
                            {item.userItemQuestions.map((question, index) =>
                                <div className="form-group" key={`answers-${question.id}`}>
                                    <div className="border-bottom">
                                        {/*<h5>Question {index + 1}</h5>*/}
                                        <label>{question.question}</label>
                                        <input type="text" className="form-control" name={question.id} placeholder="Answer ..." onBlur={this.handleAnswer} />
                                    </div>
                                </div>)}
                        </Fragment>}

                    </form>
                </DialogContent>
                <DialogActions className="pb-3">
                    <button className="btn btn-outline-info" onClick={this.handleClose}>Cancel</button>
                    <button className="btn btn-info" onClick={this.handleSubmit} autoFocus>{buttonTitle}</button>
                </DialogActions>
            </Dialog>)
    }
}

const uploadSelector = createSelector(
    state => state.upload,
    upload => upload
);

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    uploadSelector,
    (process, upload) => ({
        process, upload,
    })
);

export default connect(mapStateToProps)(PlaceOffer);

import React, { Component, Fragment } from 'react';
import { Element, Link, animateScroll as scroll } from 'react-scroll';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import Select from 'react-select';
import { Switch } from "@material-ui/core";

import { defaultActions, serviceActions, userActions } from "../../../../common/redux/actions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FormValidator from "../../../../helpers/FormValidator";
import { fileManupulate } from "../../../../helpers/file.helper";
import { ConnectionsDialog, QuestionDialog } from "../dialog";
import { history } from "../../../../helpers/history";
import FileUploader from '../../common/FileUploader';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { globalService as gs, itemService } from '../../../../common/services';
import { alertSelectors, processSelectors } from "../../../../common/redux/selectors";

const deadlineList = [
    { id: 1, value: 'Up to 3 days' },
    { id: 2, value: 'Up to 1 week' },
    { id: 3, value: 'Up to 1 month' },
    { id: 4, value: 'Up to 3 months' },
    { id: 5, value: 'Up to 6 months' },
    { id: 6, value: 'Up to 1 year' },
];

var validService = true;
var validBudget = true;
var validConnections = true;

class JobForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formField: {
                title: '',
                description: '',
                category_id: '',
                subcategory_id: '',
                settlement: 'exchange',
                //type: 'none',
                type: 'hourly',
                budget: '',
                deadline: 0,
                duration: '',
                locations: [],
                visibility: 'public',
                is_nda: 0,
                is_publish: 'publish', // 'draft, || 'publish'
                is_closed: 0,
                status: 1,
                skills: [],
                connections: [],
                questions: [],
                customquestions: [],
                services: [],
                files: [],
            },
            connectionDialogOpen: false,
            questionDialogOpen: false,
            loading: false,
            id: null,
            categories: null,
            subCategories: null,
            skills: null,
            submitted: false,
            validation: this.validator().valid(),
        };
        this.initializeState = this.state;
    }

    validator() {
        return new FormValidator([
            { field: 'category_id', method: 'isEmpty', validWhen: false, message: 'category is required.' },
            { field: 'title', method: 'isEmpty', validWhen: false, message: 'Title is required.' },
            { field: 'description', method: 'isEmpty', validWhen: false, message: 'Description is required.' },
            { field: 'skills', method: 'isEmpty', validWhen: false, message: 'Skills is required.' },
            { field: 'services', method: 'isEmpty', validWhen: validService, message: 'Services is required.' },
            { field: 'budget', method: 'isEmpty', validWhen: validBudget, message: 'Budget is required.' },
            { field: 'connections', method: 'isEmpty', validWhen: validConnections, message: 'Connections is required.' },
        ]);
    };

    componentDidMount() {

    }

    componentWillMount() {
        const { dispatch, id, categories, skills, formField, countries, questions, services } = this.props;
        Object.getOwnPropertyNames(categories).length === 0 && dispatch(defaultActions.categories());
        Object.getOwnPropertyNames(skills).length === 0 && dispatch(defaultActions.skills());
        Object.getOwnPropertyNames(countries).length === 0 && dispatch(defaultActions.countries());
        Object.getOwnPropertyNames(questions).length === 0 && dispatch(defaultActions.questions());
        Object.getOwnPropertyNames(services).length === 0 && dispatch(serviceActions.index("GET", null, { user_id: gs.identity.user.id }));
        this.setState({ id: (id ? id : null) });

        if (id) {
            //this.setState({ formField: formField });
            const html = formField.description;
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                formField: {
                    title: formField.title,
                    description: editorState,
                    category_id: formField.category_id,
                    subcategory_id: formField.subcategory_id,
                    settlement: formField.settlement,
                    type: formField.type,
                    budget: (formField.budget === null) ? '' : formField.budget,
                    deadline: formField.deadline,
                    duration: formField.duration,
                    locations: formField.locations,
                    visibility: formField.visibility,
                    is_nda: formField.is_nda,
                    is_publish: formField.is_publish,
                    is_closed: formField.is_closed,
                    status: formField.status,
                    skills: formField.skills,
                    connections: formField.connections,
                    questions: formField.questions,
                    customquestions: formField.customquestions,
                    services: formField.services,
                    files: formField.files,
                }
            });
        }
    }

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleChangeNda = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = (e.target.checked === true) ? 1 : 0;
        this.setState({ formField });
    };

    handleSelect = (item, { action, name }) => {
        let formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField });
    };

    connectionOpen = () => {
        this.setState({
            connectionDialogOpen: true
        })
    };

    questionOpen = () => {
        this.setState({
            questionDialogOpen: true
        })
    };

    handleConnection = (connections) => {
        let formField = { ...this.state.formField };
        formField['connections'] = connections ? Array.from(connections) : [];
        this.setState({
            formField,
            connectionDialogOpen: false,
        });
    };

    handleQuestion = (customquestions) => {
        let formField = { ...this.state.formField };
        formField['customquestions'] = customquestions;
        this.setState({
            formField,
            questionDialogOpen: false,
        });
    };

    onEditorStateChange = (description) => {
        let formField = { ...this.state.formField };
        formField['description'] = description;
        this.setState({ formField });
    };

    handleSubmit = (e, action) => {
        //e.preventDefault();
        if (e !== null) e.preventDefault();
        const { formField } = this.state;
        const validation = this.validator().validate(formField);

        this.setState({ validation, submitted: true });
        if (validation.isValid) {
            const { dispatch, upload } = this.props;
            let filesArr = upload.files ? upload.files : [];
            const params = {};
            params.files = fileManupulate(filesArr, this.state.formField.files, this.state.id);
            params.category_id = (formField.subcategory_id && formField.subcategory_id.value) ?
                formField.subcategory_id.value :
                formField.category_id.value;

            params.title = formField.title;
            params.description = draftToHtml(convertToRaw(formField.description.getCurrentContent()));
            params.settlement = formField.settlement ? formField.settlement : 'both';
            params.type = formField.type;
            params.budget = formField.budget;
            params.visibility = formField.visibility ? formField.visibility : 'public';
            params.is_nda = formField.is_nda;
            params.status = formField.status;
            params.is_publish = action ? action : 'publish';
            params.is_closed = formField.is_closed && formField.is_closed.value;
            params.duration = formField.duration;
            params.deadline = formField.deadline && formField.deadline.value;
            params.locations = formField.locations && formField.locations.map(item => item.value);
            params.skills = formField.skills && formField.skills.map(item => item.value);
            params.services = formField.services && formField.services.map(item => item.value);
            const questions = formField.questions && formField.questions.map(item => ({ 'id': item.value, "question": item.label }));
            const customquestions = formField.customquestions && formField.customquestions.map(item => ({ 'id': null, "question": item }));
            params.questions = [...questions, ...customquestions];
            params.connections = formField.connections;

            const param = (this.state.id === null) ? null : { item_id: this.state.id };
            //dispatch(userActions.job("POST", { userItem: params }, param));
            const method = "POST";
            dispatch(processSelectors.start());
            itemService.job(method, { userItem: params }, param)
                .then(response => {
                    console.log('response', response)
                    if (response.success === true) {
                        if (params.is_publish === 'draft') {
                            dispatch(alertSelectors.success('You have successfully saved the job as draft. Please go to "My Jobs", and then select "Drafts" to complete and submit the job posting.'));
                        } else {
                            let action = (method === "POST" && param !== null) ? 'update' : 'add';
                            dispatch(alertSelectors.success(`You did successfully ${action} the job post.`));
                            gs.isNotified(response.recipients);
                        }
                    } else {
                        let action = (method === "POST" && param !== null) ? 'update' : 'add';
                        dispatch(alertSelectors.success(`You did not ${action} the job post.`));
                    }
                    this.setState(this.initializeState);
                    history.push('/job/success');
                    dispatch(processSelectors.stop());
                })
                .catch(exception => {
                    gs.showErrors(dispatch, exception, alertSelectors);
                    dispatch(processSelectors.stop());
                });

        }
        scroll.scrollToTop();
    };

    saveDraft = () => {
        this.handleSubmit(null, 'draft');
    };

    takingData = (data) => {
        this.setState({
            connectionToShow: data
        })
    }


    render() {
        const { id, formField, submitted, validation, connectionDialogOpen, questionDialogOpen } = this.state;
        const { categories, skills, upload, countries, questions, services } = this.props;
        let categoriesList = categories.data ? categories.data.filter(item => (item.parent_id === null || item.parent_id === '')) : [];
        let subCategoriesList = categories.data && formField.category_id.value && categories.data.filter(el => (el.parent_id === formField.category_id.value));
        let skillsList = skills.data ? skills.data : [];
        let countriesList = countries.data ? countries.data : [];
        let questionsList = questions.data ? questions.data : [];
        let servicesList = services.data ? services.data.items : [];
        let isValid = submitted ? this.validator().validate(formField) : validation;
        let connections = formField.connections;

        switch (formField.settlement) {
            case 'both':
                validService = validBudget = false;
                break;
            case 'exchange':
                validService = false;
                validBudget = true;
                break;
            case 'cash':
                validService = true;
                validBudget = false;
                break;
            default:
                validService = true;
                validBudget = true;
                validConnections = true;

        }

        validConnections = (formField.visibility === 'private') ? false : true;

        return (
            <div className="col-md-12 col-12">
                <div className="heading mb-xl-3 mb-2">
                    <h1 className="text-center font-weight-bold">Post a Job</h1>
                </div>
                <div className="wizard">
                    <div className="wizard-inner">
                        <ul className="nav nav-tabs d-flex justify-content-around">
                            <li className="nav-item" style={{ width: '20%' }}>
                                <Link className="nav-link" to="job_description" smooth={true} duration={1000}>
                                    <span className="round-tab">1</span>
                                    <span className="text">Job Description</span>
                                </Link>
                            </li>
                            <li className="nav-item" style={{ width: '20%' }}>
                                <Link className="nav-link" to="expertise_skills" smooth={true} duration={1000}>
                                    <span className="round-tab">2</span>
                                    <span className="text">Expertise & Skills</span>
                                </Link>
                            </li>
                            <li className="nav-item" style={{ width: '20%' }}>
                                <Link className="nav-link" to="payment_settlement" smooth={true} duration={1000}>
                                    <span className="round-tab">3</span>
                                    <span className="text">Payment Settlement</span>
                                </Link>
                            </li>
                            <li className="nav-item" style={{ width: '20%' }}>
                                <Link className="nav-link" to="visiblity" smooth={true} duration={1000}>
                                    <span className="round-tab">4</span>
                                    <span className="text">Visiblity</span>
                                </Link>
                            </li>
                            <li className="nav-item" style={{ width: '20%' }}>
                                <Link className="nav-link" to="interview_details" smooth={true} duration={1000}>
                                    <span className="round-tab">5</span>
                                    <span className="text">Interview Questions</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit}>
                            <Element className="card custom-card" name="job_description">
                                <div className="card-body">
                                    <h3 className="pb-0 pb-lg-4">1. Job Description</h3>
                                    <div className="form-group">
                                        <label>Job Title
                                            {/*<OverlayTrigger placement={'top'} overlay={<Tooltip>Job Title</Tooltip>}>*/}
                                            {/*<span className="question text-light ml-2"><i className="far fa-question-circle"></i></span>*/}
                                            {/*</OverlayTrigger>*/}
                                        </label>
                                        <input type="text" name="title" value={formField.title} onChange={this.handleChange} className={'form-control ' + (submitted && isValid.title.isInvalid ? 'is-invalid' : '')} />

                                        {submitted && isValid.title.isInvalid &&
                                            <div className="invalid-feedback"> {isValid.title.message} </div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Job Description
                                            <OverlayTrigger placement={'top'} overlay={<Tooltip>Some information here</Tooltip>}>
                                                <span className="question text-light ml-2"><i className="far fa-question-circle"></i></span>
                                            </OverlayTrigger>
                                        </label>
                                        <Editor
                                            editorState={formField.description}
                                            wrapperClassName={'srcEtrStyle ' + (submitted && isValid.description.isInvalid ? 'is-invalid' : '')}
                                            editorClassName="services-editor"
                                            toolbarOnFocus
                                            toolbar={{
                                                options: ['inline', 'blockType', 'list', 'textAlign'],
                                                inline: {
                                                    inDropdown: false,
                                                    className: undefined,
                                                    component: undefined,
                                                    dropdownClassName: undefined,
                                                    subscript: undefined
                                                },
                                            }}
                                            onEditorStateChange={this.onEditorStateChange}
                                        />
                                        {submitted && isValid.description.isInvalid &&
                                            <div className="invalid-feedback"> {isValid.description.message} </div>}
                                    </div>

                                    <div className="form-group">
                                        <label>Preferred Freelancer Location
                                            <OverlayTrigger placement={'top'} overlay={<Tooltip>Default selected all countries</Tooltip>}>
                                                <span className="question text-light ml-2"><i className="far fa-question-circle"></i></span>
                                            </OverlayTrigger>
                                        </label>
                                        {((((formField.locations !== null && (formField.locations.length > 0 || formField.locations.length === 0))) && id) || (id === null)) &&
                                            <Select
                                                className="multiple-select mb-2"
                                                classNamePrefix="multi"
                                                isSearchable isMulti
                                                defaultValue={formField.locations}
                                                placeholder="Any Location"
                                                name="locations"
                                                onChange={this.handleSelect}
                                                options={countriesList.map(item => ({ value: item.code, label: item.name }))} />}
                                    </div>

                                    <div className="form-group">
                                        <FileUploader upload={upload} coverImage={false} accept={'.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf, video/*'} />
                                    </div>

                                    <div className="form-group">
                                        <label>Job Deadline</label>
                                        <Select
                                            className="multiple-select"
                                            isSearchable
                                            name="deadline"
                                            classNamePrefix="multi"
                                            onChange={this.handleSelect}
                                            defaultValue={formField.deadline}
                                            options={deadlineList.map(item => ({ value: item.id, label: item.value }))} />

                                    </div>
                                    {(id) &&
                                        <div className="form-group">
                                            <label>Job status</label>
                                            <Select
                                                className="multiple-select"
                                                isSearchable
                                                name="is_closed"
                                                classNamePrefix="multi"
                                                onChange={this.handleSelect}
                                                defaultValue={formField.is_closed}
                                                options={[{ id: 0, value: 'Open' }, {
                                                    id: 1,
                                                    value: 'Closed'
                                                }].map(item => ({ value: item.id, label: item.value }))} />

                                        </div>
                                    }

                                    <div className="form-group">
                                        <div className="d-flex align-items-center">
                                            <div className="labels col pl-0">
                                                <label className="mb-0">Does your job require an NDA? <small className="pl-3">(If yes, please upload your signed NDA contract.)</small></label><br />
                                                {/*<small className="font-weight-bold">If Job requireds NDA, you need to go with NDA Pro plan</small>*/}
                                            </div>
                                            <div className="">
                                                <Switch
                                                    name="is_nda"
                                                    defaultChecked={(formField.is_nda === 1)}
                                                    onChange={this.handleChangeNda}
                                                    color="primary"
                                                    value={(formField.is_nda ? 1 : 0)}
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </Element>

                            <Element className="card custom-card" name="expertise_skills">
                                <div className="card-body">
                                    <h3 className="pb-0 pb-lg-4">2. Expertise & Skills</h3>
                                    {categoriesList && <div className="form-group">
                                        <label>Select Category</label>

                                        {((formField.category_id && id) || (id === null)) && <Select
                                            className={"multiple-select mb-2 " + (submitted && isValid.category_id.isInvalid ? 'is-invalid' : '')}
                                            classNamePrefix="multi"
                                            isSearchable
                                            defaultValue={formField.category_id}
                                            name="category_id"
                                            onChange={this.handleSelect}
                                            options={categoriesList.map(item => ({ value: item.id, label: item.name })
                                            )} />}
                                        {submitted && isValid.category_id.isInvalid &&
                                            <div className="invalid-feedback d-block"> {isValid.category_id.message} </div>
                                        }
                                    </div>}

                                    {subCategoriesList && <div className="form-group">
                                        <label>Select Sub-Category</label>
                                        {<Select
                                            className="multiple-select mb-2"
                                            classNamePrefix="multi"
                                            isSearchable
                                            defaultValue={formField.subcategory_id}
                                            name="subcategory_id"
                                            onChange={this.handleSelect}
                                            options={subCategoriesList.map(item => ({ value: item.id, label: item.name }))} />}
                                        {submitted && isValid.category_id.isInvalid &&
                                            <div className="invalid-feedback"> {isValid.category_id.message} </div>
                                        }
                                    </div>}
                                    <div className="form-group">
                                        <label>Skills</label>
                                        {((((formField.skills !== null && (formField.skills.length > 0 || formField.skills.length === 0))) && id) || (id === null)) &&
                                            <Select
                                                className={'multiple-select mb-2 ' + (submitted && isValid.skills.isInvalid ? 'is-invalid' : '')}
                                                classNamePrefix="multi"
                                                isSearchable isMulti
                                                defaultValue={formField.skills}
                                                name="skills"
                                                onChange={this.handleSelect}
                                                options={skillsList.map(item => ({ value: item.id, label: item.name }))} />}
                                        {submitted && isValid.skills.isInvalid &&
                                            <div className="invalid-feedback d-block"> {isValid.skills.message} </div>
                                        }
                                    </div>
                                </div>
                            </Element>

                            <Element className="card custom-card" name="payment_settlement">
                                <div className="card-body">
                                    <h3 className="pb-0 pb-lg-4">3. Payment Settlement</h3>

                                    <div className="form-group">
                                        <label>Pay by</label>
                                        <div className="radio-switch d-flex">
                                            <div className="quality">
                                                <input type="radio" name="settlement" defaultChecked={(formField.settlement === 'exchange')} value="exchange" id="exchange" onChange={this.handleChange} />
                                                <label htmlFor='exchange'>Exchange</label>
                                            </div>
                                            <div className="quality">
                                                <input type="radio" name="settlement" defaultChecked={(formField.settlement === 'cash')} value="cash" id="cash" onChange={this.handleChange} />
                                                <label htmlFor='cash'>Cash Pay Only</label>
                                            </div>
                                            <div className="quality">
                                                <input type="radio" name="settlement" value="both" defaultChecked={(formField.settlement === 'both')} id="both" onChange={this.handleChange} />
                                                <label htmlFor='both'>Open For Both</label>
                                            </div>
                                        </div>
                                    </div>

                                    {(formField.settlement === 'both' || formField.settlement === 'exchange') &&
                                        <Fragment>
                                            {servicesList && <div className="form-group">
                                                <label>Services</label>
                                                {((formField.services && id) || (id === null)) && <Select
                                                    isSearchable isMulti
                                                    className={"multiple-select mb-2 " + (submitted && isValid.services.isInvalid ? 'is-invalid' : '')}
                                                    classNamePrefix="multi"
                                                    placeholder="Select Services"
                                                    defaultValue={formField.services}
                                                    name="services"
                                                    onChange={this.handleSelect}
                                                    options={servicesList.map(item => ({ value: item.id, label: item.title })
                                                    )} />}
                                            </div>}
                                            {submitted && isValid.services.isInvalid &&
                                                <div className="invalid-feedback d-block"> {isValid.services.message} </div>
                                            }
                                        </Fragment>}

                                    {(formField.settlement === 'both' || formField.settlement === 'cash') &&
                                        <Fragment>
                                            <div className="form-group">
                                                <label>Payment Preference</label>
                                                <div className="radio-switch">
                                                    <div className="quality">
                                                        <input type="radio" name="type" value="hourly" id="fix_hourly" onChange={this.handleChange}
                                                            checked={(formField.type === 'hourly')} />
                                                        <label htmlFor='fix_hourly'>Hourly Price</label>
                                                    </div>
                                                    <div className="quality">
                                                        <input type="radio" name="type" value="fixed" id="fixed_budget" onChange={this.handleChange}
                                                            checked={(formField.type === 'fixed')} />
                                                        <label htmlFor='fixed_budget'>Fixed Price</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label> {(formField.type === 'fixed') ? 'Enter your fixed price' : 'Enter your hourly price'} </label>
                                                <input type="text" name="budget" value={formField.budget} placeholder={(formField.type === 'fixed') ? '$35.00' : '$35/ per hour'} className={'form-control ' + (submitted && isValid.budget.isInvalid ? 'is-invalid' : '')} onChange={this.handleChange} />
                                                {submitted && isValid.budget.isInvalid &&
                                                    <div className="invalid-feedback"> {isValid.budget.message} </div>
                                                }
                                            </div>
                                        </Fragment>
                                    }


                                </div>
                            </Element>

                            <Element className="card custom-card" name="visiblity">
                                <div className="card-body">
                                    <h3 className="pb-0 pb-lg-4">4. Visiblity</h3>
                                    <div className="form-group">
                                        <label>Choose one</label>
                                        <div className="radio-switch">
                                            <div className="quality">
                                                <input type="radio" name="visibility" defaultChecked={(formField.visibility === 'public')} value="public" id="public" onChange={this.handleChange} />
                                                <label htmlFor='public'>Public</label>
                                            </div>
                                            <div className="quality">
                                                <input type="radio" name="visibility" defaultChecked={(formField.visibility === 'private')} value="private" id="private" onChange={this.handleChange} />
                                                <label htmlFor='private'>Private</label>
                                            </div>
                                        </div>
                                        <small className="form-text text-muted">{(formField.visibility === 'public') ? 'If you select “Public”, everyone on the platform can see your job post and bid on it' : 'If you select “Private”, you can only invite members from your “Connection” to apply to this job post'} </small>
                                    </div>
                                    {formField.visibility === 'private' &&
                                        <Fragment>
                                            <div className="form-group">
                                                {/*<h6 className="font-weight-bold">As you have choose visibility in private. Kindly select people from your*/}
                                                {/*network</h6>*/}
                                                <button type="button" className="btn btn-outline-info btn-md px-4" onClick={this.connectionOpen}>Invite Members</button>
                                                {submitted && isValid.connections.isInvalid &&
                                                    <div className="invalid-feedback d-block"> {isValid.connections.message} </div>
                                                }
                                            </div>
                                            {connections.length ?
                                                <div className="connectionToShow">
                                                    <h1>Connections</h1>
                                                    <div className="connectionFlex">
                                                        {connections.map((a) => {
                                                            let obj = this.state.connectionToShow.find((b) => b.id === a)
                                                            return (
                                                                <div className="Connection">
                                                                    <img src={obj.avatar} />
                                                                    <p>{obj.name}</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                : null}

                                            <ConnectionsDialog takingData={this.takingData} selectedValue={'connectionValue'} open={connectionDialogOpen} onClose={this.handleConnection} selected={connections} />
                                            { /* <div className="connections">
                                                <div className="list">
                                                    <h6>Questions 01</h6>
                                                    <p>What will be your process when you normally design any project ?</p>
                                                </div>
                                                <div className="list">
                                                    <h6>Questions 01</h6>
                                                    <p>What will be your process when you normally design any project ?</p>
                                                </div>
                                            </div>
                                            <p>(eg. Workflow and pipeline if anything like that you follow.)</p>
                                            */ }
                                        </Fragment>
                                    }

                                </div>
                            </Element>
                            <Element className="card custom-card" name="interview_details">
                                <div className="card-body">
                                    <h3 className="pb-0 pb-lg-4">5. Interview Questions</h3>
                                    <div className="form-group">
                                        <h6 className="font-weight-bold"><small>Add relevant questions for freelancers</small></h6>
                                    </div>
                                    <div className="form-group">
                                        {questionsList && <div className="form-group">
                                            <label>Questions</label>
                                            {((formField.questions && id) || (id === null)) && <Select
                                                isSearchable isMulti
                                                className="multiple-select mb-2"
                                                classNamePrefix="multi"
                                                placeholder="Select Questions"
                                                defaultValue={formField.questions}
                                                name="questions"
                                                onChange={this.handleSelect}
                                                options={questionsList.map(item => ({ value: item.id, label: item.question })
                                                )} />}
                                        </div>}
                                        <div className="text-right">
                                            <button type="button" className="btn btn-outline-info btn-md px-4" onClick={this.questionOpen}>Add New Question</button>
                                        </div>
                                        {<QuestionDialog selectedValue={'questionValue'} open={questionDialogOpen} onClose={this.handleQuestion} questions={formField.customquestions} />}
                                    </div>
                                    {formField.customquestions && <div className="questions">
                                        {formField.customquestions.map((item, idx) => (<div className="list" key={idx}>
                                            <h6>Questions {(idx + 1)}</h6>
                                            <p>{item}</p>
                                        </div>))
                                        }
                                        {/*<p>(eg. Workflow and pipeline if anything like that you follow.)</p>*/}
                                    </div>}

                                </div>
                            </Element>
                            <div className="action text-right">
                                <div className="row">
                                    <div className="col-12">
                                        <button type="button" className="btn btn-outline-info btn-lg ml-3" onClick={this.saveDraft}>Save as Draft</button>
                                        <button type="submit" className="btn btn-info btn-lg ml-3">Submit</button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-instruction services">
                            <div className="card-body">
                                <h5 className="card-title">Instruction</h5>
                                <h6 className="sub-title">1. What is “Job”?</h6>
                                <p className="card-text">A job is a project you need to get done where freelancers can apply. After receiving multiple offers, you can hire the best candidate to complete the job.</p>
                                <hr />
                                <h6 className="sub-title">2. Fill out the “Job” questionnaire</h6>
                                <p className="card-text">Describe the job in detail and be very clear about your requirements. It can help you receive better offers from freelancers. Include additional information such as, video, pictures and related documents explaining the job.</p>
                                <hr />
                                <h6 className="sub-title">3. Multiple price “Job” options</h6>
                                <p className="card-text">Set your price whether your job is a fixed or hourly price. You also have the option to select "exchange services" if you want to barter your service.</p>
                                <hr />
                                <h6 className="sub-title">4. Benefits for “Job” posting</h6>
                                <p className="card-text">The ability to post a job gives you the flexibility to hire any freelancer on the platform based on your specific needs.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
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

const categoriesSelector = createSelector(
    state => state.categories,
    categories => categories
);

const skillsSelector = createSelector(
    state => state.skills,
    skills => skills
);

const countriesSelector = createSelector(
    state => state.countries,
    countries => countries
);

const questionsSelector = createSelector(
    state => state.questions,
    questions => questions
);

const serviceSelector = createSelector(
    state => state.services,
    services => services
);


const mapStateToProps = createSelector(
    processSelector,
    uploadSelector,
    categoriesSelector,
    skillsSelector,
    countriesSelector,
    questionsSelector,
    serviceSelector,
    (process, upload, categories, skills, countries, questions, services) => ({
        process, upload, categories, skills, countries, questions, services
    })
);

export default connect(mapStateToProps)(JobForm);

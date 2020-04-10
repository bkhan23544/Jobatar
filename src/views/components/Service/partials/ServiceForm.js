import React, { Component } from 'react';
import { Element, Link } from 'react-scroll';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { defaultActions, userActions } from "../../../../common/redux/actions";
import FormControl from '@material-ui/core/FormControl';
import { history } from "../../../../helpers/history";
import Select from 'react-select';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FormValidator from "../../../../helpers/FormValidator";
import { Form } from 'react-bootstrap';
import { fileManupulate } from "../../../../helpers/file.helper";
import FileUploader from '../../common/FileUploader';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {confirmAlert} from "react-confirm-alert";

var budgetValid = false;

class ServiceForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formField: {
                category_id: '',
                subcategory_id: '',
                title: '',
                description: '',
                virtual: 0,
                settlement: 'cash',
                budget: '',
                skills: [],
                files: [],
                cover_id: null,
            },
            id: null,
            categories: null,
            subCategories: null,
            skills: null,
            submitted: false,
            validation: this.validator().valid(),
        };
    }

    validator() {
        return new FormValidator([
            { field: 'category_id', method: 'isEmpty', validWhen: false, message: 'category is required.' },
            { field: 'title', method: 'isEmpty', validWhen: false, message: 'Title is required.' },
            { field: 'description', method: 'isEmpty', validWhen: false, message: 'Description is required.' },
            { field: 'budget', method: 'isEmpty', validWhen: budgetValid, message: 'Budget is required.' },
            { field: 'skills', method: 'isEmpty', validWhen: false, message: 'Skills is required.' },
        ]);
    };

    componentWillMount() {
        const { dispatch, id, categories, skills, formField, } = this.props;
        Object.getOwnPropertyNames(categories).length === 0 && dispatch(defaultActions.categories());
        Object.getOwnPropertyNames(skills).length === 0 && dispatch(defaultActions.skills());
        this.setState({ id: (id ? id : null) });
        if(id) {
            const html = formField.description;
            const contentBlock = htmlToDraft(html);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({ formField: {
                category_id: formField.category_id,
                subcategory_id: formField.subcategory_id,
                title: formField.title,
                description: editorState,
                virtual: formField.virtual,
                settlement: formField.settlement,
                budget: formField.budget,
                skills: formField.skills,
                files: formField.files,
                cover_id: formField.cover_id,
            } });
        }
    }

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = (e.target.selectedOptions && e.target.name === 'skills') ?
            Array.from(e.target.selectedOptions, (item) => item.value) :
            e.target.value;
        this.setState({ formField });
    };

    handleChangeVirtual = (e) => {
        let formField = { ...this.state.formField };
        if(parseInt(e.target.value) === parseInt(0)) {
            console.log(e.target.value);
            confirmAlert({
                title: null,
                message: `You can only post a service that you can perform virtually. Thank you.`,
                buttons: [
                    {
                        label: 'Yes',
                    }
                ]
            });
        }
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    }

    handleSelect = (item, { action, name }) => {
        let formField = { ...this.state.formField };
        //formField[name] = (name === 'skills') ? item.map(el => el.value) : item.value;
        formField[name] = item;
        this.setState({ formField });
    };

    handleSelectSkills = (item, { action, name }) => {
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

    onCover = (id) => {
        let formField = { ...this.state.formField };
        formField['cover_id'] = id;
        this.setState({ formField });
    };

    onEditorStateChange = (description) => {
        let formField = { ...this.state.formField };
        formField['description'] = description;
        this.setState({ formField });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { formField } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true });

        if (validation.isValid) {
            const { dispatch, upload } = this.props;
            let filesArr = upload.files ? upload.files : [];
            formField.files = fileManupulate(filesArr, this.state.formField.files, this.state.id);
            formField.category_id = (formField.subcategory_id && formField.subcategory_id.value) ? formField.subcategory_id.value : formField.category_id.value;
            //formField.skills = formField.skills;
            formField.cover_id = (formField.cover_id !== null) ? formField.cover_id : (formField.files.length > 0) ? formField.files[0] : null;
            formField.description = draftToHtml(convertToRaw(formField.description.getCurrentContent()));
            const params = (this.state.id === null) ? null : { item_id: this.state.id };
            //console.log("formField", formField);
            dispatch(userActions.service("POST", { userService: formField }, params));
            history.push('/service/success');
        }
    };

    render() {
        const { categories, skills, upload } = this.props;
        const { id, formField, submitted, validation } = this.state;
        let categoriesArr = categories.data ? categories.data.filter(item => (item.parent_id === null || item.parent_id === '')) : [];
        let skillsArr = skills.data ? skills.data : [];
        let isValid = submitted ? this.validator().validate(formField) : validation;
        let subCategories = categories.data && formField.category_id.value && categories.data.filter(el => (el.parent_id === formField.category_id.value));
        // if (formField && formField.settlement === 'exchange') {
        //     budgetValid = true;
        // }
        return (<div className="row">

            <div className="col-12">
                <div className="heading mb-xl-3 mb-2">
                    <h1 className="text-center font-weight-bold">Post a Service</h1>
                </div>
                <div className="wizard">
                    <div className="wizard-inner">
                        <ul className="nav nav-tabs d-flex justify-content-around">
                            <li className="nav-item" style={{ width: '50%' }}>
                                <Link className="nav-link" to="service_overview" smooth={true} duration={1000}>
                                    <span className="round-tab">1</span>
                                    <span className="text">Service Overview</span>
                                </Link>
                            </li>
                            <li className="nav-item" style={{ width: '50%' }}>
                                <Link className="nav-link" to="upload_portfolio" smooth={true} duration={1000}>
                                    <span className="round-tab">2</span>
                                    <span className="text">Upload Portfolio</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <form name="service" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                        <Element className="card custom-card" name="service_overview">
                            <div className="card-body">
                                <h3 className="pb-0 pb-lg-4">1. Service Overview</h3>
                                <div className="form-group">
                                    <label>Service Title
                                        <OverlayTrigger placement={'top'} overlay={<Tooltip>Service Title</Tooltip>}>
                                            <span className="question text-light ml-2"><i className="far fa-question-circle"></i></span>
                                        </OverlayTrigger>
                                    </label>
                                    <input type="text" name="title" value={formField.title}
                                        onChange={this.handleChange}
                                        className={'form-control ' + (submitted && isValid.title.isInvalid ? 'is-invalid' : '')} />
                                    {submitted && isValid.title.isInvalid &&
                                        <div className="invalid-feedback"> {isValid.title.message} </div>
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Service Description
                                        <OverlayTrigger placement={'top'} overlay={<Tooltip>Service Description</Tooltip>}>
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
                                    {submitted && isValid.description.isInvalid && <div className="invalid-feedback"> {isValid.description.message}</div>}

                                </div>
                                {categoriesArr && <div className="form-group">
                                    <label>Select Category</label>
                                    {((formField.category_id && id) || (id === null)) && <Select
                                        className={"multiple-select mb-2 " + (submitted && isValid.category_id.isInvalid ? 'is-invalid' : '')}
                                        classNamePrefix="multi"
                                        isSearchable
                                        defaultValue={formField.category_id}
                                        name="category_id"
                                        onChange={this.handleSelect}
                                        options={categoriesArr.map(item => ({ value: item.id, label: item.name })
                                        )} />}
                                    {submitted && isValid.category_id.isInvalid &&
                                        <div className="invalid-feedback"> {isValid.category_id.message} </div>
                                    }
                                </div>}

                                {subCategories && <div className="form-group">
                                    <label>Select Sub-Category</label>
                                    {<Select
                                        className="multiple-select mb-2"
                                        classNamePrefix="multi"
                                        isSearchable
                                        defaultValue={formField.subcategory_id}
                                        name="subcategory_id"
                                        onChange={this.handleSelect}
                                        options={subCategories.map(item => ({ value: item.id, label: item.name }))} />}
                                    {submitted && isValid.category_id.isInvalid &&
                                        <div className="invalid-feedback"> {isValid.category_id.message} </div>}
                                </div>}

                                <div className="form-group">
                                    <label>Will you be able to perform this service virtually?</label>
                                    <div className="w-100">
                                        <Form.Check custom inline label="Yes" type="radio"
                                            name="virtual"
                                            defaultChecked={(formField.virtual === 1)}
                                            id="service-virtual-1" value={1}
                                            onChange={this.handleChangeVirtual} />
                                        <Form.Check custom inline label="No" type="radio"
                                            name="virtual"
                                            defaultChecked={(formField.virtual === 0)}
                                            id="service-virtual-0" value={0}
                                            onChange={this.handleChangeVirtual} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Payment preference</label>
                                    <div className="w-100">
                                        <Form.Check custom inline label="Both" type="radio"
                                            name="settlement"
                                            defaultChecked={(formField.settlement === 'both')}
                                            id="service-settlement-both" value={'both'}
                                            onChange={this.handleChange} />

                                        <Form.Check custom inline label="Cash" type="radio"
                                            name="settlement"
                                            defaultChecked={(formField.settlement === 'cash')}
                                            id="service-settlement-cash" value={'cash'}
                                            onChange={this.handleChange} />
                                        <Form.Check custom inline label="Exchange" type="radio"
                                            name="settlement"
                                            defaultChecked={(formField.settlement === 'exchange')}
                                            id="service-settlement-exchange" value={'exchange'}
                                            onChange={this.handleChange} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Service Price
                                        <OverlayTrigger placement={'top'} overlay={<Tooltip>Service Price</Tooltip>}>
                                            <span className="question text-light ml-2"><i className="far fa-question-circle"></i></span>
                                        </OverlayTrigger>
                                    </label>
                                    <input type="text" name="budget" value={formField.budget} placeholder="0.00"
                                        onChange={this.handleChange}
                                        className={'form-control ' + (submitted && isValid.budget.isInvalid ? 'is-invalid' : '')} />
                                    {submitted && isValid.budget.isInvalid &&
                                        <div className="invalid-feedback"> {isValid.budget.message} </div>
                                    }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="select-multiple-chip">Skills
                                        <OverlayTrigger placement={'top'} overlay={<Tooltip>Service Skills</Tooltip>}>
                                            <span className="question text-light ml-2">
                                                <i className="far fa-question-circle"></i>
                                            </span>
                                        </OverlayTrigger>
                                    </label>
                                    <FormControl className="w-100">
                                        {((((formField.skills !== null && (formField.skills.length > 0 || formField.skills.length === 0))) && id) || (id === null)) &&
                                            <Select
                                                className={'multiple-select mb-2 ' + (submitted && isValid.skills.isInvalid ? 'is-invalid' : '')}
                                                classNamePrefix="multi"
                                                isSearchable isMulti
                                                defaultValue={formField.skills}
                                                name="skills"
                                                onChange={this.handleSelectSkills}
                                                options={skillsArr.map(item => ({ value: item.id, label: item.name }))} />}
                                        {submitted && isValid.skills.isInvalid &&
                                            <div className="invalid-feedback d-block"> {isValid.skills.message} </div>
                                        }
                                    </FormControl>
                                </div>
                            </div>
                        </Element>

                        <Element className="card custom-card" name="upload_portfolio">
                            <div className="card-body">
                                <h3 className="pb-0 pb-lg-4">2. Upload Portfolio</h3>
                                <div className="info">
                                    Upload your portfolio, including pictures, videos, and supporting documents to provide more information about the service that you offer.
                                </div>
                                {/* <ul className="ul-inline">
                                    <li>Upload images JPGs, PNGs or GIF and Max size is XYZ MB (TBD)</li>
                                    <li>Max you can upload upto 15 photos</li>
                                    <li>Upload images mp4, Mov, Avi and Max size of each video (TBD)</li>
                                    <li>Max you can upload upto 5 video</li>
                                    <li>For the best view of images, upload minimum image size of 1000X1000 px</li>
                                </ul> */}
                                <FileUploader upload={upload} coverImage={(formField.cover_id ? formField.cover_id : true)} coverPhoto={this.onCover} accept={'.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf, video/*'} />
                            </div>
                        </Element>
                        <div className="action text-right">
                            {this.props.id ? <button type="submit" className="btn btn-success px-lg-5">Update Service</button> : <button type="submit" className="btn btn-info px-lg-5">Save Service</button>}

                        </div>
                    </form>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-instruction services">
                            <div className="card-body">
                                <h5 className="card-title">Instruction</h5>
                                <h6 className="sub-title">1. What is “Service”?</h6>
                                <p className="card-text">Your service is what you as a freelancer offer to sell or exchange at JoBarter.</p>
                                <hr/>
                                <h6 className="sub-title">2. Fill out the “Service” questionnaire</h6>
                                <p className="card-text">Explain thoroughly and concretely about the specific service you provide and how you intend to meet your clients’ needs. Upload additional information such as, video, pictures and related documents to better explain your expertise in this area.</p>
                                <hr/>
                                <h6 className="sub-title">3. Post Multiple “Services”</h6>
                                <p className="card-text">You also have the option to post multiple services to give people options to either hire you or exchange services with them.</p>
                                <hr/>
                                <h6 className="sub-title">4. Benefits for “Exchange Service”</h6>
                                <p className="card-text">Exchanging your services can help you receive more reviews, have a higher rate of getting hired, and save money.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>);
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

const mapStateToProps = createSelector(
    processSelector,
    uploadSelector,
    categoriesSelector,
    skillsSelector,
    (process, upload, categories, skills) => ({
        process, upload, categories, skills
    })
);

export default connect(mapStateToProps)(ServiceForm);

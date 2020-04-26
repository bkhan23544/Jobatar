import React, { Component, Fragment } from 'react';
import { Main } from '../../../layout';
import { Card, Row, Col, Form } from 'react-bootstrap';
import Select from 'react-select';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { NavBar } from './partials';
import FormValidator from '../../../../helpers/FormValidator';
import { defaultActions, userActions } from '../../../../common/redux/actions';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import LaddaButton, { EXPAND_RIGHT } from 'react-ladda';
import { commonHelper as cf } from '../../../../helpers/common.helper';
import { confirmAlert } from "react-confirm-alert";
import { alertSelectors } from "../../../../common/redux/selectors";

const timeCommitment = [
    { id: 1, value: '5 hours/week' },
    { id: 2, value: '10 hours/week' },
    { id: 3, value: '15 hours/week' },
    { id: 4, value: '20 hours/week' },
    { id: 5, value: '25 hours/week' },
    { id: 6, value: '30 hours/week' },
    { id: 7, value: '35 hours/week' },
    { id: 8, value: '40 hours/week' },
    { id: 9, value: '50 hours/week' },
    { id: 10, value: '60 hours/week' },
];

class CoFounder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
                exp_title: "",
                exp_description: "",
                exp_years_experience: "",
                exp_working_hour: "",
                exp_startup_experience: "",
                exp_status: "",
                ideal_title: "",
                skills: null,
                ideal_description: "",
                ideal_locations: null,
                ideal_years_experience: "",
                ideal_working_hour: "",
                ideal_startup_experience: "",
            },
            submitted: false,
            validation: this.validator().valid(),
            loading: false,
            removeCoFounder: true,

        };
    }

    componentWillMount() {

        const { dispatch, skills, countries, authentication } = this.props;
        Object.getOwnPropertyNames(skills).length === 0 && dispatch(defaultActions.skills());
        Object.getOwnPropertyNames(countries).length === 0 && dispatch(defaultActions.countries());
        const { userCoFounderExperience, userCoFounderIdeal } = authentication.authentication.user;
        const coFounderSkills = userCoFounderIdeal && userCoFounderIdeal.skills.map(item => ({ value: item.id, label: item.title }));
        const coFounderCountries = userCoFounderIdeal && userCoFounderIdeal.countries.map(item => ({ value: item.id, label: item.name }));

        (userCoFounderExperience && userCoFounderIdeal) && this.setState({
            formField: {
                exp_title: userCoFounderExperience.title || '',
                exp_description: userCoFounderExperience.description || '',
                exp_years_experience: userCoFounderExperience.years_experience || '',
                exp_working_hour: userCoFounderExperience.working_hour || '',
                exp_startup_experience: userCoFounderExperience.startup_experience || '',
                exp_status: userCoFounderExperience.status || '',
                ideal_title: userCoFounderIdeal.title || '',
                skills: coFounderSkills,
                ideal_locations: coFounderCountries,
                ideal_description: userCoFounderIdeal.description || '',
                ideal_years_experience: userCoFounderIdeal.years_experience || '',
                ideal_working_hour: userCoFounderIdeal.working_hour || '',
                ideal_startup_experience: userCoFounderIdeal.startup_experience || '',
            },
        });

    }

    componentDidMount() {

    }

    validator = () => {
        return new FormValidator([
            { field: 'exp_title', method: 'isEmpty', validWhen: false, message: 'Relevant Industry is required.' },
            { field: 'ideal_title', method: 'isEmpty', validWhen: false, message: 'Relevant Industry is required.' },
        ]);
    };

    handleSelect = (item, { action, name }) => {
        let formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField });
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
        this.setState({ validation, submitted: true, loading: true });
        let coFounderField = {};

        if (validation.isValid) {
            const { dispatch } = this.props;
            coFounderField.userCoFounderExperience = {
                title: formField.exp_title,
                description: formField.exp_description,
                years_experience: formField.exp_years_experience,
                working_hour: formField.exp_working_hour,
                startup_experience: formField.exp_startup_experience,
                status: formField.exp_status,
            };
            coFounderField.userCoFounderIdeal = {
                title: formField.ideal_title,
                description: formField.ideal_description,
                years_experience: formField.ideal_years_experience,
                working_hour: formField.ideal_working_hour,
                startup_experience: formField.ideal_startup_experience,
                skills: formField.skills && formField.skills.map(item => item.value),
                locations: formField.ideal_locations && formField.ideal_locations.map(item => item.value),
            };
            dispatch(userActions.profile("POST", { userProfile: coFounderField }, 'co-founder'));
        }
        setTimeout(() => {
            this.setState({ loading: false });
        }, 800);
    };

    coFounderDeactivate = () => {
        const { dispatch } = this.props;
        confirmAlert({
            //title: `Confirm Request`,
            message: 'Are you sure you want to deactivate the co-founder?',
            buttons: [
                {
                    label: 'No',
                    //onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(userActions.profile("POST", { userProfile: { is_co_founder: 0 } }, 'co-founder'))
                    }
                }
            ]
        });
    }


    removeCoFounder = () => {
        this.setState({ removeCoFounder: false })
    }

    addCoFounder = () => {
        const { dispatch } = this.props;
        dispatch(userActions.profile("POST", { userProfile: { is_co_founder: 1 } }, 'co-founder'));
    }


    render() {
        const { skills, countries, authentication } = this.props;
        const { formField, submitted, validation, removeCoFounder } = this.state;
        let skillsList = skills.data ? skills.data : [];
        let countriesList = countries.data ? countries.data : [];
        let isValid = submitted ? this.validator().validate(formField) : validation;
        const { userProfile } = authentication.authentication.user;

        return (
            // <Main>
            <>
                <DocumentTitle title={`Co-Founder`} />
                <div className="update-profile bg-body col-lg-9 col-sm-12 paddingTop0">
                    {removeCoFounder &&
                        ((parseInt(userProfile.is_co_founder) === 0) || (userProfile.is_co_founder === null)) &&
                        <div className="fadedDiv">
                            <div className='custom-ui bg-white border coFounder mt-3 AlertCofounder'>
                                <h5>Are you interested in finding a co-founder for your business
                                                idea? </h5>
                                <button type="button" className="btn btn-info" style={{
                                    width: '50px',
                                    padding: '7px'
                                }}>No
                                                </button>
                                <button type="button" className="btn btn-primary ml-2"
                                    style={{ width: '50px', padding: '7px' }} onClick={this.addCoFounder}>Yes
                                                </button>
                            </div>
                        </div>
                    }
                    <div className="">
                        <form name="co-founder" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                            <Card className="mb-4 mb-lg-5">
                                {/* <p className="card-titles ml-2 mt-4"> My Profile</p> */}
                                <Card.Body>
                                    <Row>
                                        {/* <Col xs="12" md="3" xl="4">
                                        <NavBar instruction="co-founder" />
                                    </Col> */}

                                        <Col xs="12" md="12" xl="12">
                                            <div className="py-3 w-100 float-left">
                                                <Card.Title><span className="section-titles">Co-founder Experience</span></Card.Title>
                                                <Row>
                                                    <Col xs={12}>
                                                        <div className="form-group">
                                                            <textarea className="form-control" rows="4" name="exp_description"
                                                                onChange={this.handleChange} value={formField.exp_description}
                                                                placeholder="About here"></textarea>
                                                        </div>
                                                    </Col>

                                                    <Col xs={12}>
                                                        <hr />
                                                        <Card.Title><span className="section-titles">Additional Information</span></Card.Title>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Years Of Experience</span>
                                                            <select className="form-control" name="exp_years_experience"
                                                                onChange={this.handleChange} value={formField.exp_years_experience}>
                                                                <option>Select</option>
                                                                {cf.range(1, 50).map(item => {
                                                                    return (<option value={item} key={item}>{item}</option>)
                                                                })}
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Relevant Industry</span>
                                                            <Form.Control type="text"
                                                                placeholder="Co-founder join my startup"
                                                                name="exp_title"
                                                                value={formField.exp_title}
                                                                onChange={this.handleChange}
                                                                className={'form-control ' + (submitted && isValid.exp_title.isInvalid ? 'is-invalid' : '')} />
                                                            {submitted && isValid.exp_title.isInvalid &&
                                                                <div className="invalid-feedback"> {isValid.exp_title.message} </div>
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Time Commitment</span>
                                                            <select className="form-control" name="exp_working_hour"
                                                                value={formField.exp_working_hour}
                                                                onChange={this.handleChange}>
                                                                {/*<option>10 hrs per week</option>*/}
                                                                {timeCommitment.map(item => {
                                                                    return (<option value={item.id} key={`time1-${item.id}`}>{item.value}</option>)
                                                                })}
                                                            </select>


                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Previous Startup Experience</span>
                                                            <div className="w-100">
                                                                <Form.Check custom inline label="Yes" type="radio"
                                                                    name="exp_startup_experience"
                                                                    defaultChecked={(formField.exp_startup_experience === 1)}
                                                                    id="custom-inline-1" value={1}
                                                                    onChange={this.handleChange} />
                                                                <Form.Check custom inline label="No" type="radio"
                                                                    name="exp_startup_experience"
                                                                    defaultChecked={(formField.exp_startup_experience === 0)}
                                                                    id="custom-inline-2" value={0}
                                                                    onChange={this.handleChange} />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className="form-group">
                                                            <span className="form-label">Business Stage</span>
                                                            <div className="w-100 mt-2">
                                                                <Form.Check custom inline label="Concept" type="radio"
                                                                    name="exp_status"
                                                                    value={1}
                                                                    defaultChecked={(formField.exp_status === 1)}
                                                                    id="business_1"
                                                                    onChange={this.handleChange} />
                                                                <Form.Check custom inline label="Design" type="radio"

                                                                    name="exp_status"
                                                                    value={2}
                                                                    defaultChecked={(formField.exp_status === 2)}
                                                                    id="business_2" onChange={this.handleChange} />
                                                                <Form.Check custom inline label="Development" type="radio"
                                                                    name="exp_status"
                                                                    value={3}
                                                                    defaultChecked={(formField.exp_status === 3)}
                                                                    id="business_3" onChange={this.handleChange} />
                                                                <Form.Check custom inline label="Launch" type="radio"
                                                                    name="exp_status"
                                                                    value={4}
                                                                    defaultChecked={(formField.exp_status === 4)}
                                                                    id="business_4" onChange={this.handleChange} />
                                                                <Form.Check custom inline label="Growth" type="radio"
                                                                    name="exp_status"
                                                                    value={5}
                                                                    defaultChecked={(formField.exp_status === 5)}
                                                                    id="business_5" onChange={this.handleChange} />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <Row>
                                                    <Col xs={12}>
                                                        <Card.Title><span className="section-titles">My Ideal Co-founder</span></Card.Title>
                                                        <div className="form-group">
                                                            <span className="form-label">What I am looking for</span>
                                                            <textarea className="form-control" rows="4"
                                                                value={formField.ideal_description}
                                                                name="ideal_description"
                                                                onChange={this.handleChange}
                                                                placeholder="About here"></textarea>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <Row>
                                                    <Col xs={12}>
                                                        <Card.Title><span className="section-titles">Skill</span></Card.Title>
                                                        <div className="form-group">
                                                            <Select
                                                                className="multiple-select mb-2"
                                                                classNamePrefix="multi"
                                                                isSearchable isMulti
                                                                defaultValue={formField.skills}
                                                                name="skills"
                                                                onChange={this.handleSelect}
                                                                options={skillsList.map(item => ({ value: item.id, label: item.name }))} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <Row>
                                                    <Col xs={12}>
                                                        <Card.Title><span className="section-titles">My Wishlist</span></Card.Title>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Years of Experience</span>
                                                            <select className="form-control" name="ideal_years_experience"
                                                                value={formField.ideal_years_experience}
                                                                onChange={this.handleChange}>
                                                                <option>Select</option>
                                                                {cf.range(1, 50).map(item => {
                                                                    return (<option value={item} key={item}>{item}</option>)
                                                                })}
                                                            </select>


                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Preferred Location</span>
                                                            <Select
                                                                className="multiple-select mt-2"
                                                                classNamePrefix="multi"
                                                                isSearchable isMulti
                                                                defaultValue={formField.ideal_locations}
                                                                name="ideal_locations"
                                                                onChange={this.handleSelect}
                                                                options={countriesList.map(item => ({ value: item.id, label: item.name }))} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Time Commitment</span>
                                                            <select className="form-control"
                                                                name="ideal_working_hour"
                                                                value={formField.ideal_working_hour}
                                                                onChange={this.handleChange}>
                                                                <option>Select</option>
                                                                {timeCommitment.map(item => {
                                                                    return (<option value={item.id} key={`time1-${item.id}`}>{item.value}</option>)
                                                                })}
                                                            </select>


                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Previous Startup experience</span>
                                                            <div className="w-100 mt-2">
                                                                <Form.Check custom inline label="Yes" type="radio"
                                                                    name="ideal_startup_experience"
                                                                    defaultChecked={(formField.ideal_startup_experience === 1)}
                                                                    id="custom-experience-1" value={1} onChange={this.handleChange} />
                                                                <Form.Check custom inline label="No" type="radio" name="ideal_startup_experience"
                                                                    id="custom-experience-2" value={0}
                                                                    defaultChecked={(formField.ideal_startup_experience === 0)}
                                                                    onChange={this.handleChange} />
                                                            </div>

                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Relevant Industry</span>
                                                            <input type="text"
                                                                name="ideal_title"
                                                                placeholder="Enter"
                                                                onChange={this.handleChange}
                                                                value={formField.ideal_title}
                                                                className={'form-control ' + (submitted && isValid.ideal_title.isInvalid ? 'is-invalid' : '')} />
                                                            {submitted && isValid.ideal_title.isInvalid &&
                                                                <div className="invalid-feedback"> {isValid.ideal_title.message} </div>
                                                            }
                                                        </div>
                                                    </Col>
                                                </Row>

                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <Card className="button bg-white">
                                <div className=" d-flex align-items-center">
                                    <div className="col pl-0">Update all your latest changes by clicking on “Save Changes”</div>
                                    <div className="center-align">
                                        {(parseInt(userProfile.is_co_founder) === 1) && <button type="button" className="btn btn-outline-primary mr-4" onClick={this.coFounderDeactivate}>Deactivate Co-Founder</button>}
                                        <LaddaButton className="btn ladda-btn" loading={this.state.loading} data-style={EXPAND_RIGHT}>Save Changes</LaddaButton>
                                    </div>
                                </div>
                            </Card>
                        </form>
                    </div>
                </div>
            </>
            // </Main>
        );
    }
}



const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const processSelector = createSelector(
    state => state.process,
    process => process
);


const countriesSelector = createSelector(
    state => state.countries,
    countries => countries
);

const skillsSelector = createSelector(
    state => state.skills,
    skills => skills
);

const mapStateToProps = createSelector(
    authenticationSelector,
    processSelector,
    skillsSelector,
    countriesSelector,
    (authentication, process, skills, countries) => ({
        authentication, process, skills, countries
    })
);


export default connect(mapStateToProps)(CoFounder);

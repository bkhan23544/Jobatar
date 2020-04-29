import React, { Component, Fragment } from 'react';
import { Main } from '../../../layout';
import { Card, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import { defaultActions, userActions } from '../../../../common/redux/actions';
import { NavBar } from './partials';
import { uploadSelectors } from "../../../../common/redux/selectors";
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import FileUploader from '../../common/FileUploader';
import LaddaButton, { EXPAND_RIGHT } from 'react-ladda';
import { defaultService } from '../../../../common/services';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Autocomplete from 'react-google-autocomplete';
import { confirmAlert } from 'react-confirm-alert';


class ProfileUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
                first_name: null,
                last_name: null,
                email: null,
                title: null,
                hometown: null,
                country_code: null,
                //is_co_founder: 0,
                date_of_birth: null,
                mobile: null,
                about: null,
                website: null,
                timezone: null,
                skills: null,
                platforms: null
            },
            FieldModel: {
                languages: null
            },
            submitted: false,
            //validation: this.validator().valid(),
            loading: false,
            loadingProfile: false,
            removeCoFounder: true,
            languageList: null,
            address: ''
        };

        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            className: 'invalid-feedback d-block',
            messages: {
                //password_repeat: 'Confirm Password is required.'
            }
        });

    }

    updatedState = () => {
        const { dispatch, authentication, skills, countries, platforms, process } = this.props;
        Object.getOwnPropertyNames(skills).length === 0 && dispatch(defaultActions.skills());
        Object.getOwnPropertyNames(countries).length === 0 && dispatch(defaultActions.countries());
        Object.getOwnPropertyNames(platforms).length === 0 && dispatch(defaultActions.platforms());
        const { userProfile, email, media } = authentication.authentication.user;
        const profileSkills = userProfile.skills.map(item => ({ value: item.id, label: item.title }));
        const country_code = userProfile.countryCode ? { value: userProfile.countryCode.code, label: userProfile.countryCode.name } : null;
        const languages = authentication.authentication.user.languages;

        const lans = (typeof languages === 'string') ? [languages] : languages;
        const lang2 = ((lans === null) || (lans === undefined)) ? ["English"] : lans; //undefined
        const profileLanguage = lang2.map((item, index) => ({ value: item, label: item }));

        const userProfilePlatforms = {};
        userProfile.userProfilePlatforms && userProfile.userProfilePlatforms.map(item => {
            userProfilePlatforms[item.slug] = item.link;
        });
        this.setState({
            formField: {
                title: userProfile.title || "",
                first_name: userProfile.first_name || "",
                last_name: userProfile.last_name || "",
                email: email,
                hometown: userProfile.hometown || "",
                country_code: country_code || null,
                mobile: userProfile.mobile || "",
                about: userProfile.about || "",
                website: userProfile.website || "",
                //is_co_founder: userProfile.is_co_founder,
                strip_account_number: userProfile.strip_account_number || "",
                timezone: userProfile.timezone || "",
                skills: profileSkills || null,
                platforms: userProfilePlatforms || null,
                avatar_id: userProfile.avatar_id,
                files: media && (media.image && media.image.map(file => file.id)
                    .concat(media.video && media.video.map(file => file.id))
                    .concat(media.docs && media.docs.map(file => file.id))),
            },
            FieldModel: {
                languages: profileLanguage || null
            },
        });
    };

    componentWillMount() {
        const { dispatch, authentication } = this.props;
        this.updatedState();
        const { media } = authentication.authentication.user;
        dispatch(uploadSelectors.respond(media));
        defaultService.coreField({ field: 'languages' }).then((res) => {
            this.setState({
                languageList: res
            })
        });
    }


    componentWillReceiveProps(nextProps) {
        this.updatedState();
    }

    addCoFounder = () => {
        const { dispatch } = this.props;
        dispatch(userActions.profile("POST", { userProfile: { is_co_founder: 1 } }, 'co-founder'));
    }

    removeCoFounder = () => {
        this.setState({ removeCoFounder: false })
    }

    handleSelect = (item, { action, name }) => {
        let formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField });
    };

    languagesSelect = (item, { action, name }) => {
        this.setState({ FieldModel: { languages: item } });
    };

    handleChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleCheckboxChange = (e) => {
        let formField = { ...this.state.formField };
        formField[e.target.name] = (e.target.checked ? 1 : 0);
        this.setState({ formField });
    };

    handlePlatform = (e) => {
        let { formField } = this.state;
        formField.platforms[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleChangeAddress = address => {
        console.log(address);
        this.setState({ address });
    };

    handleSelectAddress = address => {
        geocodeByAddress(address)
            .then(results => {
                console.log(getLatLng(results[0]));
            })
            .then(latLng => {
                console.log('Success', latLng)
            })
            .catch(error => console.error('Error', error));
    };


    handleUpload = (e) => {
        const { dispatch } = this.props;
        this.setState({ loadingProfile: true });
        defaultService.uploadWithoutProgress(e.target.files).then((res) => {
            let fileId = res.files[0].id;
            dispatch(userActions.profile("POST", { userProfile: { avatar_id: fileId } }, 'avatar'));
            this.setState({ loadingProfile: false });
        });
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const { formField, FieldModel } = this.state;
        //const validation = this.validator().validate(formField);
        this.setState({ submitted: true, loading: true });
        if (this.validator.allValid()) {
            const { dispatch, upload, authentication } = this.props;
            let { userProfile } = authentication.authentication.user;
            //let identity = authentication.authentication.user.id;
            let filesArr = upload.files ? upload.files : [];
            let files = [];
            filesArr && filesArr.docs && filesArr.docs.map(file => files.push(file.id));
            filesArr && filesArr.image && filesArr.image.map(file => files.push(file.id));
            filesArr && filesArr.video && filesArr.video.map(file => files.push(file.id));
            //console.log('filesArr', files);
            formField.files = files;
            formField.avatar_id = userProfile.avatar_id;
            formField.skills = formField.skills && formField.skills.map(item => item.value);
            formField.country_code = formField.country_code ? formField.country_code.value : null;
            FieldModel.languages = FieldModel.languages && FieldModel.languages.map(item => item.label);
            dispatch(userActions.profile("POST", { userProfile: formField, FieldModel }));
            this.updatedState();
        } else {
            this.validator.showMessages();
        }
        setTimeout(() => {
            this.setState({ loading: false });
        }, 800);
    };

    render() {
        const { skills, upload, countries, platforms, authentication, process } = this.props;
        const { formField, FieldModel, languageList, loadingProfile, loading, removeCoFounder } = this.state;
        let skillsList = skills.data ? skills.data : [];
        let countriesList = countries.data ? countries.data : [];
        let platformsList = platforms.data ? platforms.data : [];
        let isValid = this.validator.fields;
        const { userProfile } = authentication.authentication.user;
        //console.log(this.validator, this.validator.helpers);
        return (
            // <Main>
            <>
                <DocumentTitle title={`Update Profile`} />

                <div className="update-profile bg-body col-xl-9 col-sm-12 paddingTop0">
                    <div className="">
                        <form name="profile" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
                            <Card className="mb-4 mb-lg-5">

                                {/* <p className="card-titles ml-2 mt-4"> My Profile</p> */}

                                <Card.Body>
                                    <div>
                                        {/* <Col xs="12" md="3" xl="4">
                                        <NavBar instruction="profile" />
                                        {removeCoFounder &&<Fragment>
                                            {((parseInt(userProfile.is_co_founder) === 0) || (userProfile.is_co_founder === null)) &&
                                                <div className='custom-ui bg-white border coFounder mt-3'>
                                                <h5>Are you interested in finding to co-founder for your business
                                                idea? </h5>
                                                <button type="button" onClick={this.removeCoFounder} className="btn btn-info" style={{
                                                width: '50px',
                                                padding: '7px'
                                            }}>No
                                                </button>
                                                <button type="button" className="btn btn-primary ml-2"
                                                style={{width: '50px', padding: '7px'}} onClick={this.addCoFounder}>Yes
                                                </button>
                                                </div>
                                            }
                                        </Fragment>}
                                    </Col> */}
                                        <Col xs="12" md="12" xl="12">
                                            <div className="py-3 w-100 float-left">

                                            <Card.Title> <span className="section-titles">Update Profile</span></Card.Title>


                                                <Row>
                                                    <Col className="card-profile border-0 mb-3 col-md-3 col-12 order-md-2 text-center" style={{ boxShadow: 'none' }}>
                                                        <label><Link to={`/user/public/about/${userProfile && userProfile.user_id}`} className="float-right">View Profile</Link></label>
                                                        <figure className="d-flex align-items-center profile-upload justify-content-center">
                                                            <div className="pic rounded-circle">
                                                                <img className="img-fluid rounded-circle border" alt="profile" width="145" height="145" src={(userProfile && (userProfile.avatar !== null)) ? userProfile.avatar.thumb : '/images/dummy-profile.png'} />
                                                                <label className="btn btn-info btn-upload text-white">
                                                                    <i className="fas fa-camera-retro"></i>
                                                                    <input type="file" accept="image/*" onChange={this.handleUpload} />
                                                                </label>
                                                                {loadingProfile && <div className="loader rounded-circle"><span></span> <span></span></div>}
                                                            </div>
                                                        </figure>
                                                    </Col>
                                                    <Col className="col-md-9 col-12 order-md-1">
                                                        <div className="form-group d-none">
                                                            <Autocomplete
                                                                className={'form-control'}
                                                                onPlaceSelected={(place) => {
                                                                    console.log(place);
                                                                }}
                                                                types={['(regions)']}
                                                                componentRestrictions={{ country: "ru" }}
                                                            />
                                                            <PlacesAutocomplete
                                                                value={this.state.address}
                                                                onChange={this.handleChangeAddress}
                                                                onSelect={this.handleSelectAddress}
                                                                shouldFetchSuggestions={this.state.address.length > 2}
                                                            >
                                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                    <div >
                                                                        <input
                                                                            {...getInputProps({
                                                                                placeholder: 'Search Places ...',
                                                                                className: 'location-search-input',
                                                                            })}
                                                                            className={'form-control'}
                                                                        />
                                                                        <div className="autocomplete-dropdown-container">
                                                                            {loading && <div>Loading...</div>}
                                                                            {/* {console.log("suggestions", suggestions)} */}
                                                                            {suggestions.map(suggestion => {
                                                                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                                                                // inline style for demonstration purpose
                                                                                const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                                                return (
                                                                                    <div
                                                                                        {...getSuggestionItemProps(suggestion, {
                                                                                            className,
                                                                                            style,
                                                                                        })}
                                                                                    >
                                                                                        <span>{suggestion.description}</span>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </PlacesAutocomplete>
                                                        </div>
                                                        <div className="form-group">
                                                            <span className="form-label">Title</span>
                                                            <input type="text" value={formField.title} name="title"
                                                                onChange={this.handleChange}
                                                                onBlur={() => this.validator.showMessageFor('title')}
                                                                className={'form-control ' + (this.validator.errorMessages.title !== null ? 'is-invalid' : '')} />
                                                            {this.validator.message('title', formField.title, 'required')}
                                                        </div>
                                                        <div className="form-group">
                                                            <span className="form-label">Languages</span>
                                                            <Select
                                                                className="multiple-select mb-2"
                                                                classNamePrefix="multi"
                                                                isSearchable
                                                                isMulti
                                                                defaultValue={FieldModel.languages}
                                                                name="languages"
                                                                onChange={this.languagesSelect}
                                                                options={languageList && languageList.map(item => ({ value: item.option_code, label: item.option_value }))} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">First Name</span>
                                                            <input type="text" value={formField.first_name} name="first_name"
                                                                onChange={this.handleChange}
                                                                onBlur={() => this.validator.showMessageFor('first_name')}
                                                                className={'form-control ' + (this.validator.errorMessages.first_name !== null ? 'is-invalid' : '')} />
                                                            {this.validator.message('first_name', formField.first_name, 'required')}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Last Name</span>
                                                            <input type="text" value={formField.last_name} name="last_name"
                                                                onChange={this.handleChange}
                                                                onBlur={() => this.validator.showMessageFor('last_name')}
                                                                className={'form-control ' + (this.validator.errorMessages.last_name !== null ? 'is-invalid' : '')} />
                                                            {this.validator.message('last_name', formField.last_name, 'required')}
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Email Address</span>
                                                            <input type="text" className="form-control" value={formField.email} name="email" readOnly
                                                                onChange={this.handleChange} />
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Address</span>
                                                            <input type="text" value={formField.hometown} name="hometown"
                                                                onChange={this.handleChange}
                                                                onBlur={() => this.validator.showMessageFor('hometown')}
                                                                className={'form-control ' + (this.validator.errorMessages.hometown !== null ? 'is-invalid' : '')} />
                                                            {this.validator.message('hometown', formField.hometown, 'required')}
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Select Country </span>
                                                            {countriesList && <Select
                                                                className={'multiple-select mb-2 ' + (this.validator.errorMessages.country_code !== null ? 'is-invalid' : '')}
                                                                classNamePrefix="multi"
                                                                isSearchable
                                                                defaultValue={formField.country_code}
                                                                name="country_code"
                                                                onChange={this.handleSelect}
                                                                options={countriesList.map(item => ({ value: item.code, label: item.name }))} />}
                                                            {this.validator.message('country_code', formField.country_code, 'required')}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        {/*<div className="form-group">*/}
                                                        {/*<div className="custom-control custom-checkbox mt-4 pt-2">*/}
                                                        {/*<input type="checkbox" className="custom-control-input" id="customCheck1"*/}
                                                        {/*name="is_co_founder"*/}
                                                        {/*value={''}*/}
                                                        {/*defaultChecked={(formField.is_co_founder === 1)}*/}
                                                        {/*onChange={this.handleCheckboxChange} />*/}
                                                        {/*<label className="custom-control-label" htmlFor="customCheck1">Co-founder</label>*/}
                                                        {/*</div>*/}
                                                        {/*</div>*/}
                                                        {/* <div className="form-group">
                                                        <label>Phone Number</label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text" id="basic-addon1">@</span>
                                                                {countriesList && <Select
                                                                    className={'multiple-select mb-0 country-code '}
                                                                    classNamePrefix="multi"
                                                                    isSearchable
                                                                    placeholder="Code"
                                                                    onChange={this.handleSelect}
                                                                    options={countriesList.map(item => ({ value: item.code, label: `${item.phone_code} (${item.code})` }))} />}
                                                            </div>
                                                            <input type="text" className="form-control"
                                                                   placeholder="Phone Number" />
                                                        </div>
                                                    </div> */}
                                                        <div className="form-group">
                                                            <span className="form-label">Phone Number </span>
                                                            <input type="text"
                                                                className={'form-control ' + (this.validator.errorMessages.mobile !== null ? 'is-invalid' : '')}
                                                                value={formField.mobile}
                                                                name="mobile"
                                                                onBlur={() => this.validator.showMessageFor('mobile')}
                                                                onChange={this.handleChange} />
                                                            {this.validator.message('mobile', formField.mobile, 'phone')}
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">About Me </span>
                                                            <textarea className="form-control" rows="3" value={formField.about} name="about"
                                                                onChange={this.handleChange}></textarea>
                                                        </div>
                                                    </Col>
                                                    <Col xs={12} md={6}>
                                                        <div className="form-group">
                                                            <span className="form-label">Website </span>
                                                            <input type="text" className={'form-control ' + (this.validator.errorMessages.website !== null ? 'is-invalid' : '')} value={formField.website} name="website"
                                                                onChange={this.handleChange} />
                                                            {this.validator.message('website', formField.website, 'url')}
                                                        </div>
                                                    </Col>
                                                    <Col xs={12}>
                                                        <hr />
                                                       <Card.Title> <span className="section-titles">Skills</span></Card.Title>

                                                        <div className="form-group">
                                                            {/* <label>Skills</label> */}
                                                            {(formField.skills || !formField.skills) &&
                                                                <Select
                                                                    className={'multiple-select mb-2 ' + (this.validator.errorMessages.skills !== null ? 'is-invalid' : '')}
                                                                    classNamePrefix="multi"
                                                                    isSearchable isMulti
                                                                    defaultValue={formField.skills}
                                                                    name="skills"
                                                                    onChange={this.handleSelect}
                                                                    options={skillsList.map(item => ({ value: item.id, label: item.name }))} />}
                                                            {this.validator.message('skills', formField.skills, 'required')}
                                                        </div>

                                                        <hr />
                                                        <Card.Title> <span className="section-titles">Social Media Accounts</span></Card.Title>

                                                        <h6>Please provide your social media links for our internal verification.</h6>
                                                        <div className="row">
                                                            {platformsList && <Fragment>
                                                                {platformsList.map((platform, index) =>
                                                                    <div className="col-md-6 col-12" key={`platform-${platform.slug}`}>
                                                                        <div className="form-group">
                                                                            <div className="border-bottom">
                                                                                <span className="form-label">{platform.title}</span>
                                                                                <input type="text"
                                                                                    className="form-control"
                                                                                    name={platform.slug}
                                                                                    placeholder="Link ..."
                                                                                    onChange={this.handlePlatform}
                                                                                    value={(formField.platforms[platform.slug] ? formField.platforms[platform.slug] : "")} />
                                                                                {this.validator.message(platform.slug, formField.platforms[platform.slug], 'url')}
                                                                            </div>
                                                                        </div>
                                                                    </div>)}
                                                            </Fragment>}
                                                        </div>
                                                        <hr />
                                                        <Card.Title><span className="section-titles">Additional Document</span></Card.Title>

                                                        <div className="form-group">
                                                            <div className="form-group">
                                                                <FileUploader upload={upload} coverImage={formField.cover_id} accept={'.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf, video/*'} />
                                                            </div>
                                                        </div>

                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    </div>



                                </Card.Body>
                            </Card>
                            <Card className="button bg-white padding20">
                                <div className=" d-flex align-items-center flexDirectionColumn">
                                    <div className="pl-0 col-sm-12 col-md-9 col-lg-9">Update all your latest changes by clicking on “Save Changes ”</div>
                                    <LaddaButton className="btn ladda-btn" loading={loading} data-style={EXPAND_RIGHT}>Save Changes</LaddaButton>
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

const processSelector = createSelector(
    state => state.process,
    process => process
);

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const countriesSelector = createSelector(
    state => state.countries,
    countries => countries
);

const skillsSelector = createSelector(
    state => state.skills,
    skills => skills
);

const platformsSelector = createSelector(
    state => state.platforms,
    platforms => platforms
);


const uploadSelector = createSelector(
    state => state.upload,
    upload => upload
);
const mapStateToProps = createSelector(
    processSelector,
    skillsSelector,
    authenticationSelector,
    uploadSelector,
    countriesSelector,
    platformsSelector,
    (process, skills, authentication, upload, countries, platforms) => ({
        process, skills, authentication, upload, countries, platforms
    })
);

export default connect(mapStateToProps)(ProfileUpdate);

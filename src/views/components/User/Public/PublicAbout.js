import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import PublicLayout from './PublicLayout';
import { userActions } from '../../../../common/redux/actions';
import { ContetLIneLoader } from '../../../../common/loaders';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import moment from "moment";

class PublicAbout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
        };
    }

    async componentWillMount() {
        const { dispatch, match } = this.props;
        let id = match.params.id;
        dispatch(userActions.publicProfile("GET", null, {item_id: id}));
        dispatch(userActions.experience("GET", null, {user_id: id}));
        dispatch(userActions.education("GET", null, {user_id: id}));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            const { dispatch } = this.props;
            let id = this.props.match.params.id;
            dispatch(userActions.publicProfile("GET", null, {item_id: id}));
            dispatch(userActions.experience("GET", null, {user_id: id}));
            dispatch(userActions.education("GET", null, {user_id: id}));
        }
    }

    getYear = (date) => {
        let nedDate = [];
        //return new Date(date).getFullYear();
        nedDate.push(new Date(date).getMonth());
        nedDate.push(new Date(date).getFullYear());
        return nedDate.join("/ ")
    };

    render() {
        const { user, process, experiences, educations } = this.props;
        let about = user ? user.user.userProfile : {};
        const experienceItems = experiences.data ? experiences.data.items : [];
        const educationsItems = educations.data ? educations.data.items : [];

        return (<PublicLayout>
            <DocumentTitle title="About"/>
            <div className="card public-about mb-3">
                <div className="card-body px-0 pb-0">
                    <h1 className="mb-3 pb-0 px-3">About</h1>
                    <div className="about-text px-3">
                        {process.loading ? <ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} /> : (about && about.about) ? <div dangerouslySetInnerHTML={{ __html: about && about.about }}></div> : 'No data yet'}
                    </div>
                    <hr />
                    <h3 className="mb-3 px-3">Skills</h3>
                    <div className="skill mb-lg-4 mb-3 px-3">
                        <span>{about.skills && about.skills.map((skill) => skill.title).join(', ')}
                        {about.skills && about.skills.length === 0 && 'No data yet'}
                        </span>
                    </div>
                    <hr />
                    <h3 className="mb-3 px-3">Experience</h3>
                    {process.loading ? <ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} px={3} /> :
                        <Fragment>
                            <div className="education mb-lg-4 mb-3 px-3">
                                {(experienceItems && experienceItems.length > 0) &&
                                <div className="d-flex mb-3 row">
                                    <div className="col-6"><b>Company</b></div>
                                    <div className="degree col"><b>Title</b></div>
                                    <div className="right col" style={{paddingLeft: '20px'}}><b>Year</b></div>
                                    </div>}
                                {experienceItems && experienceItems.map((education) =>
                                    <div className="d-flex mb-3 row" key={education.id}>
                                        <div className="col-6">{education.industry_name}</div>
                                        <div className="degree col"><b>{education.title}</b></div>
                                        <div className="right col" style={{paddingLeft: '20px'}}><span>{moment(education.from).format('MM/YYYY')} - {education.is_present === 1 ? 'Present' : moment(education.to).format('MM/YYYY')}</span></div>
                                    </div>
                                )}
                                {experienceItems && experienceItems.length === 0 && 'No data yet'}
                            </div>
                        </Fragment>
                    }
                    <hr />
                    <h3 className="mb-3 px-3">Education</h3>
                    <div className="education mb-lg-4 mb-3 px-3">
                        {(educationsItems && educationsItems.length > 0) ?
                        <div className="d-flex mb-3 row">
                            <div className="col-6"><b>School</b></div>
                            <div className="degree col"><b>Degree</b></div>
                            <div className="right col" style={{paddingLeft: '20px'}}><b>Year</b></div>
                        </div>:'No data yet' }
                        {educationsItems && educationsItems.map((experience) =>
                            <div className="d-flex mb-3 row" key={experience.id}>
                                <div className="col-6">{experience.institute}</div>
                                <div className="degree col"><b>{experience.title}</b></div>
                                <div className="right col" style={{paddingLeft: '20px'}}><span>{moment(experience.from).format('MM/YYYY')} - {experience.is_present === 1 ? 'Present' : moment(experience.to).format('MM/YYYY')}</span></div>
                            </div>
                        )}
                        {/* <div className="d-flex mb-3">
                            <div className="w-70">BDSK Center Point High School & Junior College</div>
                            <div className="degree w-20"><b>HSSC</b></div>
                            <div className="right w-10"><small>2009 - 2012</small></div>
                        </div> */}
                    </div>

                </div>
            </div>
        </PublicLayout>);
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const userSelector = createSelector(
    state => state.user,
    user => user
);

const experienceSelector = createSelector(
    state => state.experiences,
    experiences => experiences
);

const educationSelector = createSelector(
    state => state.educations,
    educations => educations
);

const mapStateToProps = createSelector(
    processSelector,
    userSelector,
    experienceSelector,
    educationSelector,
    (process, user, experiences, educations) => ({
        process, user, experiences, educations
    })
);

export default connect(mapStateToProps)(PublicAbout);
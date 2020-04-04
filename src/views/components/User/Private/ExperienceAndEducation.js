import React, {Component} from 'react';
import {Main} from '../../../layout';
import {Card, Row, Col, Accordion } from 'react-bootstrap';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import {NavBar, ExperienceForm, ExperienceList, EducationForm, EducationList} from './partials';
import {userActions} from "../../../../common/redux/actions";
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import { globalService as gs } from '../../../../common/services';


class ExperienceAndEducation extends Component {


    constructor(props) {
        super(props);
        this.state = {
            itemType: null,
            editItem: null,
            experienceItem: null,
            educationItem: null,
            showDeleteConfirmation: false,
            deleteConfirmationProps: null,
            toggleExperience: false,
            toggleEducation: false,
        };
    }

    componentWillMount() {
        const {dispatch, experiences, educations} = this.props;
        let userId = gs.parseItem('authentication');
        Object.getOwnPropertyNames(experiences).length === 0 && dispatch(userActions.experience("GET", null, {user_id: userId.user.id}));
        Object.getOwnPropertyNames(educations).length === 0 && dispatch(userActions.education("GET", null, {user_id: userId.user.id}));
    }

    componentDidMount() {

    }

    onSelectItem = (type, item, toggle) => {
        if(type === 'experience') {
            this.setState({itemType: type, experienceItem: item});
            this.setState({ toggleExperience: toggle });
        } else {
            this.setState({itemType: type, educationItem: item});
            this.setState({ toggleEducation: toggle });
        }
    };

    onDeleteItem = (type, itemId) => {
        const {dispatch} = this.props;
        if (itemId !== '' || itemId !== null) {
            type === 'experience' ?
                dispatch(userActions.experience('DELETE', {},  {item_id: itemId})) :
                dispatch(userActions.education('DELETE', {}, {item_id: itemId}));
            type === 'experience' ?
                dispatch(userActions.experience()) :
                dispatch(userActions.education());
        }
    };

    onSubmitData = (type) => {
        type === 'experience_toggle' ? this.setState({ toggleExperience: false }) : this.setState({ toggleEducation: false })
        //this.setState({ toggleExperience: type });
    };

    addNew = (type) => {
        if(type === 'experience') {
            this.setState({ toggleExperience: true, experienceItem:null});
        } else {
            this.setState({ toggleEducation: true, educationItem:null});
        }
    };

    render() {
        const {experiences, educations} = this.props;
        const experienceItems = experiences.data ? experiences.data : [];
        const educationsItems = educations.data ? educations.data : [];
        const {experienceItem, educationItem } = this.state;

        return (<Main>
            <DocumentTitle title={`Experience and Education`}/>
            <div className="update-profile bg-body">
                <div className="container">
                    <Card className="mb-4 mb-lg-5">
                        <Card.Header>My Profile</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs="12" md="3" xl="4">
                                    <NavBar instruction="experience" />
                                </Col>
                                <Col xs="12" md="9" xl="8">
                                    <div className="py-3 w-100 float-left mb-3">
                                        <Card.Title>Experience
                                            <button onClick={this.addNew.bind(this, 'experience')} className="btn btn-outline-info float-right btn-sm">Add New</button>
                                        </Card.Title>
                                        <Accordion.Collapse in={this.state.toggleExperience} className="w-100">
                                            <ExperienceForm formField={experienceItem} hideToggle={this.onSubmitData}/>
                                        </Accordion.Collapse>

                                        {experienceItems &&
                                        <ExperienceList items={experienceItems.items} onEdit={this.onSelectItem} onDelete={this.onDeleteItem}/>}
                                    </div>

                                    <div className="py-3 w-100 float-left">
                                        <Card.Title>Education
                                            <button onClick={this.addNew.bind(this, 'education')} className="btn btn-outline-info float-right btn-sm">Add New</button>
                                        </Card.Title>

                                        <Accordion.Collapse in={this.state.toggleEducation} className="w-100">
                                            <EducationForm formField={educationItem} hideToggle={this.onSubmitData} />
                                        </Accordion.Collapse>
                                        {educationsItems &&
                                        <EducationList items={educationsItems.items} onEdit={this.onSelectItem} onDelete={this.onDeleteItem}/>}
                                    </div>

                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Main>);
    }
}

const experiencesSelector = createSelector(
    state => state.experiences,
    experiences => experiences
);

const educationsSelector = createSelector(
    state => state.educations,
    educations => educations
);

const mapStateToProps = createSelector(
    experiencesSelector,
    educationsSelector,
    (experiences, educations) => ({
        experiences, educations
    })
);

export default connect(mapStateToProps)(ExperienceAndEducation);

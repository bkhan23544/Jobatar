import React, { Component } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import PublicLayout from './PublicLayout';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { userActions } from '../../../../common/redux/actions';
import { ContetLIneLoader } from '../../../../common/loaders';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import { itemService } from '../../../../common/services';
import { alertSelectors } from '../../../../common/redux/selectors';
import { confirmAlert } from 'react-confirm-alert';


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

class PublicCoFounder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            about: {},
        }
    }

    async componentWillMount() {
        const { dispatch, user, match } = this.props;
        let id = match.params.id;
        dispatch(userActions.publicProfile("GET", null, {item_id: id}));
    }

    addConnection = (item) => {
        const { dispatch, authentication } = this.props;
        let user_id = authentication.authentication.user.id;
        let connection_id = item.id;
        const params = {
            "userConnection": {
                user_id: user_id,
                connection_id: connection_id,
                status: 0
            }
        };
        confirmAlert({
            title: `Please confirm to add`,
            message: `Are you sure you want to add this co-founder to your connection?`,
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () =>
                        itemService.connection("POST", params)
                            .then(response => {
                                dispatch(alertSelectors.success("You have successfully sent a connection request."));
                                item.is_connection = 0 ;
                                this.setState({ about: item });
                            })
                            .catch(exception => {
                                console.log(exception);
                            })
                }
            ]
        });
    };

    connected = (about) => {
        const { dispatch } = this.props;
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className='custom-ui'>
                    <div style={{height: '90px'}}> {about.name} already connected.</div>
                    <button className="btn btn-info" onClick={onClose}>Close</button>
                  </div>
                );
            },
            closeOnEscape: false,
            closeOnClickOutside: false,
        });
    };
    getTimeCommitment = (item) => {
        let data = timeCommitment.find(o => (o.id === item));
        return data && data.value;
    }

    render() {
        const { user, process } = this.props;
        let about = user ? user.user : {};
        const {userCoFounderIdeal, userCoFounderExperience} = about;

        return (<PublicLayout>
            <DocumentTitle title="Co-founder"/>
            <div className="card public-cofounder">
                <div className="card-body px-0">
                    <div className="d-flex align-items-center mb-3 px-3">
                        <h1 className="mb-0 col pl-0">Co-founder Experience</h1>
                        <div className="connection d-flex flex-nowrap align-items-center">
                            {((about && about.is_connection === false) || (about && about.is_connection === 2)) && <button onClick={() => this.addConnection(about)} className="btn btn-info"><i className="fas fa-plus"></i> Connection</button> }
                            {(about && about.is_connection === 0) && <button className="btn btn-primary" style={{pointerEvents: 'none'}}>Request Pending</button> }

                            {(about && about.is_connection === 1) && <button className="btn btn-success" onClick={() => this.connected(about)}><i className="fas fa-check"></i> Connected</button> }

                            <span className="count pl-3">{about && about.num_of_connections} Connections</span>
                        </div>
                    </div>
                    <hr />
                    <div className="about-text px-3">
                        {process.loading ? <ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} /> : <div>
                            {(about && about.userCoFounderExperience === null) ? '' : userCoFounderExperience && userCoFounderExperience.description}
                        </div>}
                    </div>
                    <hr />
                    <h3 className="mb-3 px-3">Additional Information</h3>
                    <hr />
                    {userCoFounderExperience && <div className="px-3 mb-3">
                        <div className="d-flex mb-2">
                            <div className="w-50"><b>Year of Experience</b></div>
                            <div className="w-50">{userCoFounderExperience.years_experience} years</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50"><b>Relevant Industry</b></div>
                            <div className="w-50">{userCoFounderExperience.title}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50"><b>Time Commitment</b></div>
                            <div className="w-50">{this.getTimeCommitment(userCoFounderExperience.working_hour)}</div>
                        </div>
                        <div className="d-flex mb-2">
                            <div className="w-50"><b>Previous Startup Experience</b></div>
                            <div className="w-50">{(userCoFounderExperience.startup_experience === 1) ? 'Yes' : 'No'}</div>
                        </div>
                    </div>}

                    <hr />
                    <h3 className="mb-3 px-3">Business Stage</h3>
                    <hr />
                    {process.loading ? <div className="px-3"><ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} /></div> : <div>
                        <Tab.Container id="left-tabs-example" defaultActiveKey={`business_${(userCoFounderExperience && userCoFounderExperience.status !== null) ? userCoFounderExperience.status : 0}`}>
                            <div className="wizard px-3 mb-3">
                                <div className="wizard-inner">
                                    <Nav as="ul" variant="tab" className="nav-tabs d-flex justify-content-around">
                                        <Nav.Item as="li" style={{width: '20%'}}>
                                            <Nav.Link eventKey={`business_1`}>
                                                <span className="round-tab">1</span>
                                                <span className="text">Concept</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" style={{width: '20%'}}>
                                            <Nav.Link eventKey={`business_2`}>
                                                <span className="round-tab">2</span>
                                                <span className="text">Design</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" style={{width: '20%'}}>
                                            <Nav.Link eventKey={`business_3`}>
                                                <span className="round-tab">3</span>
                                                <span className="text">Development</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" style={{width: '20%'}}>
                                            <Nav.Link eventKey={`business_4`}>
                                                <span className="round-tab">4</span>
                                                <span className="text">Launch</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" style={{width: '20%'}}>
                                            <Nav.Link eventKey={`business_5`}>
                                                <span className="round-tab">5</span>
                                                <span className="text">Growth</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                        </Tab.Container>
                    </div>}
                    <hr />
                    <div className="w-100">
                        <h3 className="mb-4 px-3">My Ideal Co-founder</h3>
                        <div className="px-3">
                            {process.loading ? <ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} /> : <div>
                                <h5>{userCoFounderIdeal && userCoFounderIdeal.title}</h5>
                                <div className="about-text">
                                    {userCoFounderIdeal && userCoFounderIdeal.description}
                                </div>
                            </div>}
                        </div>
                        <h5 className="px-3">Skills</h5>
                        <hr />
                        <div className="about-text skill px-3">
                            {about.userProfile && about.userProfile.skills.map((skill) => <span key={skill.id}>{skill.title }</span>)}
                        </div>
                        <hr />
                        <h5 className="px-3">My Wishlist</h5>
                        <hr />
                        { userCoFounderIdeal && <div className="about-text px-3 mb-0">
                            <div className="d-flex mb-2">
                                <div className="w-50"><b>Year of Experience</b></div>
                                <div className="w-50">{userCoFounderIdeal.years_experience} years</div>
                            </div>
                            <div className="d-flex mb-2">
                                <div className="w-50"><b>Relevant Industry</b></div>
                                <div className="w-50">{userCoFounderIdeal.title }</div>
                            </div>
                            <div className="d-flex mb-2">
                                <div className="w-50"><b>Time Commitment</b></div>
                                <div className="w-50">{this.getTimeCommitment(userCoFounderIdeal.working_hour)}</div>
                            </div>
                            <div className="d-flex mb-2">
                                <div className="w-50"><b>Previous Startup Experience</b></div>
                                <div className="w-50">{(userCoFounderIdeal.startup_experience === 1) ? 'Yes' : 'No'}</div>
                            </div>
                            <div className="d-flex mb-2">
                                <div className="w-50"><b>Preferred Location</b></div>
                                <div className="w-50">{userCoFounderIdeal && userCoFounderIdeal.countries.map(count => count.name).join(', ')}</div>
                            </div>
                        </div> }


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

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    processSelector,
    userSelector,
    authenticationSelector,
    (process, user, authentication) => ({
        process, user, authentication
    })
);

export default connect(mapStateToProps)(PublicCoFounder);

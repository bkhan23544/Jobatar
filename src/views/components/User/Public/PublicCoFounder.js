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

console.log(userCoFounderExperience)
        return (<PublicLayout>
         

                    <div class="card-box-profile-details">

<div className="description-profile">

 <ul className="tr-list resume-info">			

  <li>
   <div className="icon">
    <p className="tr-title"><i className="fa fa-briefcase" aria-hidden="true"></i> Cofounder Experience</p>
   </div>  
   <div className="media-body">
   {process.loading ? <ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} /> : <div>
    {(about && about.userCoFounderExperience === null) ? 'No data yet' : userCoFounderExperience && userCoFounderExperience.description}
    </div>}
   </div>
   <hr/>
  </li>	

    <li>
   <div className="icon">
    <p className="tr-title"><i className="fa fa-info" aria-hidden="true"></i>Additional Information</p>
   </div>  
   <div className="media-body">
   {process.loading ? <ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} />:<div>    
   {userCoFounderExperience ? <div className="px-3 mb-3">
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
                    </div> : <div className="px-3">No data yet</div>}
                    </div>}
   </div>
   <hr/>
  </li>	

    <li>
   <div className="icon">
    <p className="tr-title"><i className="fa fa-bars" aria-hidden="true"></i> Business Stage</p>
   </div>  
   <div className="media-body">
   {process.loading ? <div className="px-3"><ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} /></div> : <div>
                        <Tab.Container id="left-tabs-example" defaultActiveKey={`business_${(userCoFounderExperience && userCoFounderExperience.status !== null) ? userCoFounderExperience.status : 0}`}>
                            <div className="wizard px-3 mb-3">
                                <div className="wizard-inner">
                                    <Nav as="ul" variant="tab" className="nav-tabs d-flex justify-content-around">
                                        <Nav.Item as="li" style={{width: '20%'}}>
                                            <Nav.Link eventKey={`business_1`}>
                                                <span className="round-tab" style={{backgroundColor:userCoFounderExperience && userCoFounderExperience.status ==1 ? "#345581": "none"}}>1</span>
                                                <span className="text">Concept</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" style={{width: '20%'}}>
                                            <Nav.Link eventKey={`business_2`}>
                                                <span className="round-tab" style={{backgroundColor:userCoFounderExperience && userCoFounderExperience.status==2 ? "#345581": "none"}}>2</span>
                                                <span className="text" style={{color:"black"}}>Design</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" style={{width: '20%'}}>
                                            <Nav.Link eventKey={`business_3`}>
                                                <span className="round-tab" style={{backgroundColor:userCoFounderExperience && userCoFounderExperience.status==3 ? "#345581": "none"}}>3</span>
                                                <span className="text">Development</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" style={{width: '20%'}}>
                                            <Nav.Link eventKey={`business_4`}>
                                                <span className="round-tab" style={{backgroundColor:userCoFounderExperience && userCoFounderExperience.status==4 ? "#345581": "none"}}>4</span>
                                                <span className="text">Launch</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item as="li" style={{width: '20%'}}>
                                            <Nav.Link eventKey={`business_5`}>
                                                <span className="round-tab" style={{backgroundColor:userCoFounderExperience && userCoFounderExperience.status==5 ? "#345581": "none"}}>5</span>
                                                <span className="text">Growth</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                        </Tab.Container>
                    </div>}
   </div>
   <hr/>
  </li>	

  <li>
   <div className="icon">
    <p className="tr-title"><i className="fa fa-lightbulb-o" aria-hidden="true"></i> My Ideal Cofounder</p>
   </div>  
   <div className="media-body">
   {process.loading ? <ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} /> : <div>
                                <h5><b className="icon-color">{userCoFounderIdeal && userCoFounderIdeal.title}</b></h5>
                                <div className="about-text">
                                    {userCoFounderIdeal && userCoFounderIdeal.description}
                                </div>
                            </div>}
   </div>
   <hr/>
  </li>	

  <li>
   <div className="icon">
    <p className="tr-title"><i className="fa fa-cogs" aria-hidden="true"></i> Skills</p>
   </div>  
   <div className="media-body">
{about.userProfile && about.userProfile.skills.map((skill)=>{
    return(
        <span className="label label-success">{skill.title}{about.skills && about.userProfile.skills.length === 0 && 'No data yet'}</span>
    )
})}

   </div>
   <hr/>
  </li>

  <li>
   <div className="icon">
    <p className="tr-title"><i className="fa fa-heart" aria-hidden="true"></i> My Wishlist</p>
   </div>  
   <div className="media-body">
   { userCoFounderIdeal ? <div className="about-text px-3 mb-0">
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
                        </div> : <div className="px-3">No data yet</div> }
   </div>
   <hr/>
  </li>	


  

  
  </ul>
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

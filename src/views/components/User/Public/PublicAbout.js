import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import PublicLayout from './PublicLayout';
import { userActions } from '../../../../common/redux/actions';
import { ContetLIneLoader } from '../../../../common/loaders';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";

const styles = theme => ({
    table: {
      minWidth: 50,
    },
  });

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
        const { classes } = this.props;

        return (<PublicLayout>
     
                    <div class="card-box-profile-details">

<div className="description-profile">

 <ul className="tr-list resume-info">			

  <li>
   <div className="icon">
    <p className="tr-title"><i className="fa fa-info-circle" aria-hidden="true"></i> About</p>
   </div>  
   <div className="media-body">
   {process.loading ? <ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} /> : (about && about.about) ? <div className="AboutDiv" dangerouslySetInnerHTML={{ __html: about && about.about }}></div> : 'No data yet'}
   </div>
   <hr/>
  </li>		

  <li>
   <div className="icon">
    <p className="tr-title"><i className="fa fa-cogs" aria-hidden="true"></i> Skills</p>
   </div>  
   <div className="media-body">
   {about.skills && about.skills.map((skill) => <span className="label label-success" style={{display:"inline-block"}} key={skill.id}>{skill.title }</span>)}
   {about.skills && about.skills.length === 0 && 'No data yet'}
   </div>
   <hr/>
  </li>

  <li>
  <div className="icon">
    <p className="tr-title"><i className="fa fa-briefcase" aria-hidden="true"></i> Experience</p>
   </div>  
                    {process.loading ? <ContetLIneLoader primaryBg={'#ddd'} secondaryBg={'#eee'} width={900} px={3} /> :
                        <Fragment>
                            <div className="education mb-lg-4 mb-3 px-3">
                                {(experienceItems && experienceItems.length > 0) &&
                                    <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                      <TableRow>
                                        <TableCell align="left" className="table-text">Company</TableCell>
                                        <TableCell align="left" className="table-text">Title</TableCell>
                                        <TableCell align="left" className="table-text">Year</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {experienceItems && experienceItems.map((education,i) =>
                                        <TableRow key={i}>
                                          <TableCell align="left" className="table-content">{education.industry_name}</TableCell>
                                          <TableCell align="left" className="table-content">{education.title}</TableCell>
                                          <TableCell align="left" className="table-content">{moment(education.from).format('MM/YYYY')} - {education.is_present === 1 ? 'Present' : moment(education.to).format('MM/YYYY')}</TableCell>
                                        </TableRow>
                                      )}
                                    </TableBody>
                                  </Table>
        }
                                 {experienceItems && experienceItems.length === 0 && 'No data yet'}
                            </div>
                        </Fragment>
                    }
                     <hr/>
  </li>

  <li>
  <div className="icon">
    <p className="tr-title"><i className="fa fa-graduation-cap" aria-hidden="true"></i> Education</p>
   </div>  
                    <div className="education mb-lg-4 mb-3 px-3">
                          {(educationsItems && educationsItems.length > 0) ?
               
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" className="table-text">School</TableCell>
            <TableCell align="left" className="table-text">Degree</TableCell>
            <TableCell align="left" className="table-text">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {educationsItems && educationsItems.map((experience,i) =>
            <TableRow key={i}>
              <TableCell align="left" className="table-content">{experience.institute}</TableCell>
              <TableCell align="left" className="table-content">{experience.title}</TableCell>
              <TableCell align="left" className="table-content">{moment(experience.from).format('MM/YYYY')} - {experience.is_present === 1 ? 'Present' : moment(experience.to).format('MM/YYYY')}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

    :"No data yet"}

                    </div>
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

export default withStyles(styles)(connect(mapStateToProps)(PublicAbout));
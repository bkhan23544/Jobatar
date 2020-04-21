import React from 'react';
import {connect} from 'react-redux';
import {Main} from "../../layout";
import {createSelector} from "reselect";
import {authActions} from "../../../common/redux/actions";
import { userActions } from '../../../common/redux/actions';
import {Switch,Route, Link ,NavLink,withRouter} from "react-router-dom";

// import { JobCreate, JobUpdate, JobView, JobSuccess, JobListing } from '../Job';
// import Service from '../Service';




class DashBoard extends React.Component {

    constructor(props) {

        super(props);
        // reset login status
		this.onLogout = this.onLogout.bind(this);
		
		this.state={
			routeTo : false,
			notification:false
		}
    }

    onLogout(){
        const {dispatch} = this.props;
        dispatch(authActions.logout());
	}
	
	toggleActive=(index,id)=>{
		// console.log(index,id)
		
		for(let i = 0; i < 13; i++){
			if(i+1 === index){
				document.getElementById(id+index).classList.add("active")
			}else{
				console.log(id+(i+1))
				document.getElementById(id+(i+1)).classList.remove("active")
			}
		}
		if(id+index === "active2"){
			document.getElementById("active2").nextElementSibling.classList.add("showNested")
			document.getElementById("active3").nextElementSibling.classList.remove("showNested")
			document.getElementById("active2Icon").classList.add("rotateDown")
			document.getElementById("active3Icon").classList.remove("rotateDown")
			this.toggleActiveNested(1,"activei")

			


		}else if( id+index === "active3" ){
			document.getElementById("active3").nextElementSibling.classList.add("showNested")
			document.getElementById("active2").nextElementSibling.classList.remove("showNested")
			document.getElementById("active3Icon").classList.add("rotateDown")
			document.getElementById("active2Icon").classList.remove("rotateDown")
			this.toggleActiveNested(6,"activei")

		}
		else{
			// console.log(id)
			document.getElementById("active3").nextElementSibling.classList.remove("showNested")
			document.getElementById("active2").nextElementSibling.classList.remove("showNested")
			document.getElementById("active3Icon").classList.remove("rotateDown")
			document.getElementById("active2Icon").classList.remove("rotateDown")

		}
	}
	toggleActiveNested=(index,id)=>{
		// console.log(index)
		for(let i = 0; i < 10; i++){
			if(i+1 === index){
				document.getElementById(id+index).classList.add("activei")
			}else{
				console.log(id+(i+1))
				document.getElementById(id+(i+1)).classList.remove("activei")
			}
		}
	}
	componentWillMount(){
		if(this.props.history.location.pathname === "/dashBoard"){
			console.log("don not roujth")
			this.setState({
				routeTo: false,
				notification :  false
			})
		}else if(this.props.history.location.pathname === "/dashBoard/setting/notifications"){
			this.setState({
				// routeTo: false,
				notification :  true
			})
		}
		else{
			console.log("roujth")
			this.setState({
				routeTo: true
			})
			

		}
	}
	componentDidMount(){

		
		if(this.state.routeTo){
		
			this.props.history.push("/dashBoard")
		}else if(this.state.notification){
			this.props.history.push("/dashBoard/setting/notifications")
			this.toggleActive(9,"active")
		}
	}
	
    render() {
		
		const { children } = this.props;
		// console.log(this.props.location.path)
		// const { JobListing } = this.props
		
        return (
        <Main>

<section className="dashboard section-padding">
{/* <div>
        <h1>Hey welcome home!</h1>
        <div className="links">
		<NavLink className="nav-link" to={`${path}/jobs`}>Posted Jobs</NavLink>

          <Link to={`${path}`} className="link">Profile</Link>
          <Link to={`${path}/comments`} className="link">Comments</Link>
          <Link to={`${path}/contact`} className="link">Contact</Link>
          <Link to={`${path}/jobs`} className="link">JobListing</Link>
        </div>
        <div className="tabs">
          <Switch>
            <Route path={`${path}`} exact component={Profile} />
            <Route path={`${path}/comments`} component={Comments} />
            <Route path={`${path}/contact`} component={Contact} />
            <Route path={`${path}/jobs`} component={JobListing} />
          </Switch>
        </div>
      </div> */}
	  <div className="container">
	   <div id="deleteDiv" className="row">
	   
	    <div className="col-sm-4 col-md-3 dashboardMenu">
		
		  <ul className="sidebar-menu" data-widget="tree">
			<li className="active">
		  <Link to={`/dashBoard`} className="link active" id="active1" onClick={()=>this.toggleActive(1,"active")}>
		  
			
				<i className="fa fa-life-ring" style={{color:"#345581",marginRight:5}}></i><span>Dashboard</span>
		
		  </Link>
			</li>
			
			<li className="treeview">
			
			  <Link id="active2" onClick={()=>this.toggleActive(2,"active")} to={`/dashBoard/jobs`} className="link"><i className="fa fa-files-o" style={{color:"#345581",marginRight:5}}></i> 
			  <span>Jobs</span>
			  <span className="pull-right-container">
				  <i id="active2Icon" className="fa fa-angle-left pull-right "></i> 
				</span>
			  </Link>
			  <ul className="treeview-menu">
				<li><Link id="activei1" onClick={()=>this.toggleActiveNested(1,"activei")} to={`/dashBoard/jobs`} className="Nestedlink"><i className="far fa-circle" style={{color:"#345581",marginRight:5}}><span id="orangeDot" ></span></i> My Jobs</Link></li>
				<li><Link id="activei2" onClick={()=>this.toggleActiveNested(2,"activei")} to={`/dashBoard/offers/received/jobs/cash`} className="Nestedlink"><i className="far fa-circle" style={{color:"#345581",marginRight:5}}><span id="orangeDot" ></span></i> Received Proposal</Link></li>
				<li><Link id="activei3" onClick={()=>this.toggleActiveNested(3,"activei")} to={`/dashBoard/offers/sent/jobs/cash`} className="Nestedlink"><i className="far fa-circle" style={{color:"#345581",marginRight:5}}><span id="orangeDot" ></span></i> Send Proposal</Link></li>
				<li><Link id="activei4" onClick={()=>this.toggleActiveNested(4,"activei")} to={`/dashBoard/contracts/jobs/cash`} className="Nestedlink"><i className="far fa-circle" style={{color:"#345581",marginRight:5}}><span id="orangeDot" ></span></i> Accepted Proposal</Link></li>
				<li><Link id="activei5" onClick={()=>this.toggleActiveNested(5,"activei")} to={`/dashBoard/completed/jobs/cash`} className="Nestedlink"><i className="far fa-circle" style={{color:"#345581",marginRight:5}}><span id="orangeDot" ></span></i> Complete Proposal</Link></li>
			  </ul>
			</li>
			<li className="treeview">
			  {/* <a href="#">
				<i className="fa fa-file" style={{color:"#345581",marginRight:5}} className="link"></i>  <span>Services</span>
				<span className="pull-right-container">
				  <i className="fa fa-angle-left pull-right"></i> 
				</span>
			  </a> */}
			  <Link id="active3" onClick={()=>this.toggleActive(3,"active")} to={`/dashBoard/services`} className="link"><i className="fa fa-scroll" style={{color:"#345581",marginRight:5}}></i> 
			  Services <span className="pull-right-container">
				  <i id="active3Icon" className="fa fa-angle-left pull-right"></i> 
				</span>
			  </Link>
			  <ul className="treeview-menu">
			  <li><Link id="activei6" onClick={()=>this.toggleActiveNested(6,"activei")} to={`/dashBoard/services`} className="Nestedlink"><i className="far fa-circle" style={{color:"#345581",marginRight:5}}><span id="orangeDot" ></span></i> My Service</Link></li>
				<li><Link id="activei7" onClick={()=>this.toggleActiveNested(7,"activei")} to={`/dashBoard/offers/received/services/cash`} className="Nestedlink activei"><i className="far fa-circle" style={{color:"#345581",marginRight:5}}><span id="orangeDot" ></span></i> Received Offers</Link></li>
				<li><Link id="activei8" onClick={()=>this.toggleActiveNested(8,"activei")} to={`/dashBoard/offers/sent/services/cash`} className="Nestedlink"><i className="far fa-circle" style={{color:"#345581",marginRight:5}}><span id="orangeDot" ></span></i> Send Offers</Link></li>
				<li><Link id="activei9" onClick={()=>this.toggleActiveNested(9,"activei")} to={`/dashBoard/contracts/services/cash`} className="Nestedlink"><i className="far fa-circle" style={{color:"#345581",marginRight:5}}><span id="orangeDot" ></span></i> Accepted Offers</Link></li>
				<li><Link id="activei10" onClick={()=>this.toggleActiveNested(10,"activei")} to={`/dashBoard/completed/services/cash`} className="Nestedlink"><i className="far fa-circle" style={{color:"#345581",marginRight:5}}><span id="orangeDot" ></span></i> Complete Offers</Link></li>
			  </ul>
			</li>
			<li><Link id="active4" onClick={()=>this.toggleActive(4,"active")} to={`/dashBoard/user/connection/my-cofounder`} className="link"><i className="fas fa-handshake" style={{color:"#345581",marginRight:5}}></i><span>Co-founder</span></Link></li>

			<li><Link id="active5" onClick={()=>this.toggleActive(5,"active")} to={`/dashBoard/user/favorite/services`} className="link"><i className="fas fa-bookmark" style={{color:"#345581",marginRight:5}}></i>Favorite</Link></li>

		 </ul>		
		
		  <ul className="sidebar-menu" data-widget="tree">
		  	<li><Link id="active6" onClick={()=>this.toggleActive(6,"active")} to={`/dashBoard/setting/transactions`} className="link"><i className="fas fa-exchange-alt" style={{color:"#345581",marginRight:5}}></i>Transactions</Link></li>
			
			<li><Link id="active7" onClick={()=>this.toggleActive(7,"active")} to={`/dashBoard/stripe-connect`} className="link"><i className="fas fa-money-check-alt" style={{color:"#345581",marginRight:5}}></i>Payment method</Link></li>

			<li><Link id="active8" onClick={()=>this.toggleActive(8,"active")} to={`/dashBoard/user/membership`} className="link"><i className="fas fa-credit-card" style={{color:"#345581",marginRight:5}}></i>Manage Membership</Link></li>

			<li><Link id="active9" onClick={()=>this.toggleActive(9,"active")} to={`/dashBoard/setting/notifications`} className="link"><i className="fas fa-bell" style={{color:"#345581",marginRight:5}}></i>Notifications</Link></li>

		 </ul>	
		 
		 
		
		  <ul className="sidebar-menu" data-widget="tree">
			<li>
			<Link id="active10" onClick={()=>this.toggleActive(10,"active")} to={`/dashBoard/user/update`} className="link">
				<i className="fas fa-user" style={{color:"#345581",marginRight:5}}></i><span>Edit Profile</span>
			</Link>
			</li>
			<li>
				<Link id="active11" onClick={()=>this.toggleActive(11,"active")} to={`/dashBoard/user/experience-and-education`} className="link">
					<i className="fas fa-book-reader" style={{color:"#345581",marginRight:5}}></i>Experience & Education
				</Link>
			</li>
			<li>
				<Link id="active12" onClick={()=>this.toggleActive(12,"active")} to={`/dashhBoard/user/co-founder`} className="link">
				<i className="fas fa-handshake" style={{color:"#345581",marginRight:5}}></i>Co-Founder
				</Link>
			</li>
			{/* <li>
			  <a href="profileimage.html">
				<i className="fa fa-image"></i>  <span>Change Profile Image</span>
			  </a>
			</li> */}
			<li>
			<Link id="active13" onClick={()=>this.toggleActive(13,"active")} to={`/dashBoard/setting/change-password`} className="link">
				<i className="fas fa-lock" style={{color:"#345581",marginRight:5}}></i><span>Change Password</span>
			</Link>
			</li>
		 </ul>			 
		       		
	    </div>
		
		{children}
      
	    
	        </div>
	    </div>
	</section>	 
            </Main>
        );
    }
}


const authSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);



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
    authSelector,
    (process, user, experiences, educations,authentication) => ({
        process, user, experiences, educations,authentication
    })
);

export default connect(mapStateToProps)(withRouter(DashBoard));

const DashboardTab = ()=> {
	return(

<div className="col-sm-8 col-md-9">
		 
		  <div className="dashboard-info">	
		  
		    <div id="deleteDiv" className="row">
			
		     <div className="col-sm-3">
			  <div className="fun-fact">
			   <div className="media-body">
				<h1>$0.00</h1>
				<span>Total Amount</span>
			   </div>
		      </div>
	         </div>
			 
			 <div className="col-sm-3">
			  <div className="fun-fact">
			   <div className="media-body">
			    <h1>0</h1>
			    <span>Contracts</span>
			   </div>
			  </div>
	         </div>
			 
			 <div className="col-sm-3">
			  <div className="fun-fact">
			   <div className="media-body">
				<h1>0:00:00</h1>
				<span>Total Logged</span>
			   </div>
			  </div>
	         </div>
			 
			 <div className="col-sm-3">
			  <div className="fun-fact">
			   <div className="media-body">
				<h1>0</h1>
				<span>Total Milestones</span>
			   </div>
			  </div>
	         </div>
			
		    </div>
		   
          
		  </div>
		  
		  <div className="prop-info text-center">
		     <i className="fa fa-align-left fa-5x"></i> 
			 <h3>You have no recent contracts.</h3>
			 <p>Look for work here <a href="">Home</a></p>
          </div>
			
              <div className="box">
                <div className="box-header">
                  <h3 className="box-title">Contracts</h3>
                </div>
                <div className="box-body">
                 <div className="table-responsive">
                  <table id="example1" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Freelancer</th>
                        <th>Job Title</th>
                        <th>Workroom</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
						 <img src="assets/img/users/1.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image"/>
						 <a href="company.html">Anna Morgan</a>
						</td>
                        <td><a href="workroom.html">I need a designer to design a logo & questionnaire for a Nutrition Company</a></td>
                        <td><a href="workroom.html" className="kafe-btn kafe-btn-mint-small"> Go to Workroom</a></td>
                      </tr>
                      <tr>
                        <td>
						 <img src="assets/img/users/3.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image"/>
						 <a href="company.html">Benjamin Robinson</a>
						</td>
                        <td><a href="workroom.html">Professional writer required</a></td>
                        <td><a href="workroom.html" className="kafe-btn kafe-btn-mint-small"> Go to Workroom</a></td>
                      </tr>
                      <tr>
                        <td>
						 <img src="assets/img/users/4.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image"/>
						 <a href="company.html">Sean Coleman</a>
						</td>
                        <td><a href="workroom.html">Content Writers Needed</a></td>
                        <td><a href="workroom.html" className="kafe-btn kafe-btn-mint-small"> Go to Workroom</a></td>
                      </tr>
                      <tr>
                        <td>
						 <img src="assets/img/users/5.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image"/>
						 <a href="company.html">Vanessa Wells</a>
						</td>
                        <td><a href="workroom.html">Website Design</a></td>
                        <td><a href="workroom.html" className="kafe-btn kafe-btn-mint-small"> Go to Workroom</a></td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Client</th>
                        <th>Job Title</th>
                        <th>Freelancer</th>
                      </tr>
                    </tfoot>
                  </table>
                 `</div>
                `</div>
              `</div>
			
					
		
		
	    `</div>
	)
}


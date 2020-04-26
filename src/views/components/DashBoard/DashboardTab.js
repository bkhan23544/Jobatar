import React from 'react';
import { ContractItems } from '../Contract/partials';
import { connect } from 'react-redux';
import { Main } from "../../layout";
import { createSelector } from "reselect";
import { authActions } from "../../../common/redux/actions";
import { globalService as gs, itemService } from '../../../common/services';
import { userActions } from '../../../common/redux/actions';
import { Switch, Route, Link, NavLink, withRouter } from "react-router-dom";


const dummy = [
    {
        actionBy:{
            avatar: "https://uploads.jobarter.com/cache/t/r/5/N/J/v/2/a/tr5NJv2aIIjxRVStjCWycjXKxgrq9SrL-300x300.jpg"
        },
        proposalRecipient:{
            name: "muhammad sadiq hanif"
        },
        item:{
            title: "i will translate japanenese to english vise versa my file is too long"
        }
    },
    {
        actionBy:{
            avatar: "https://uploads.jobarter.com/cache/t/r/5/N/J/v/2/a/tr5NJv2aIIjxRVStjCWycjXKxgrq9SrL-300x300.jpg"
        },
        proposalRecipient:{
            name: "muhammad sadiq hanif"
        },
        item:{
            title: "i will translate japanenese to english vise versa my file is too long"
        }
    },
    {
        actionBy:{
            avatar: "https://uploads.jobarter.com/cache/t/r/5/N/J/v/2/a/tr5NJv2aIIjxRVStjCWycjXKxgrq9SrL-300x300.jpg"
        },
        proposalRecipient:{
            name: "muhammad sadiq hanif"
        },
        item:{
            title: "i will translate japanenese to english vise versa my file is too long"
        }
    }
]

class DashboardTab extends React.Component {

constructor(props){
    super(props)
    this.state={
        loading:true,
        proposals:null,
        service:null
    }
}

loadProposal = (status, module, settlement, page,type, q = null) => {
    this.setState({ loading: true });
    const user_id = gs.identity && gs.identity.user && gs.identity.user.id;
    if(user_id){
        itemService.proposal("GET", null, { recipient_id: user_id, status: status, module: module, settlement: settlement, page: page, q: q }).then(response => {
            if(type=="proposals"){
            this.setState({ proposals: response, loading: false });
        }
            else if(type=="services"){
            this.setState({ service: response, loading: false });
        }
        });
    }
};




componentDidMount=()=>{
    this.loadProposal("Contracts", "UserItem", "cash", 1,"proposals");
    this.loadProposal("Contracts", "UserService", "cash", 1,"services");
}


    render() {

        const { user } = this.props;
        console.log(user,"sdadas")
        const {proposals,loading,service} = this.state;
        const jobTitle = "Accepted Jobs"
        const serviceTitle = "Accepted Services"
        const status = "Contracts"
     
         let jobs = proposals && proposals.items ? proposals.items : [];
         let services = service && service.items ? service.items : [];
        return (

            <div className="col-sm-8 col-md-9">

                <div className="dashboard-info">

                    <div className="row">

                        <div className="col-sm-3">
                           <div className="fun-fact">
                                <div className="media-body">
                                    <h1>$0.00</h1>
                                    <span>Total Amount</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                        <Link to={`/dashBoard/contracts/jobs/cash`}><div className="fun-fact">
                                <div className="media-body">
                                    <h1>{jobs.length}</h1>
                                    <span>Active Proposals</span>
                                </div>
                            </div></Link>
                        </div>

                        <div className="col-sm-3">
                        <Link to={`/dashBoard/contracts/services/cash`}><div className="fun-fact">
                                <div className="media-body">
                                    <h1>{services.length}</h1>
                                    <span>Active Offers</span>
                                </div>
                            </div></Link>
                        </div>

          <div className="col-sm-3">
          <Link to={`/user/public/ratings/${user && user.user.id}`}><div className="fun-fact">
                                <div className="media-body">
                                    {user && <h1>{parseInt(user.user.userProfile.avg_rating)}</h1>}
                                    <span>Average Rating</span>
                                </div>
                            </div></Link>
                        </div>

                    </div>


                </div>

                {jobs.length==0 &&
                    <div className="prop-info text-center">
                        <i className="fa fa-align-left fa-5x"></i>
                        <h3>You have no active jobs.</h3>
                        <p>Look for work here <a href="">Home</a></p>
                    </div>
            
                }

{ jobs.length>0 && 
            <ContractItems dashboard={jobTitle} results={jobs} pagination={1} status={status} settlement={"cash"} title={jobTitle}  />}


{services.length==0 &&
                    <div className="prop-info text-center">
                        <i className="fa fa-align-left fa-5x"></i>
                        <h3>You have no active services.</h3>
                        <p>Look for work here <a href="">Home</a></p>
                    </div>
            
                }


                {/* <ContractListing status="Contracts" title="Active Proposals" module="UserItem" settlement="cash" itemLink="/contracts/jobs" abc={true}/> */}
                {loading ? <div className="card service-box">
                <div className="card-body">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-info">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div> : services.length>0 && 
            <ContractItems dashboard={serviceTitle} results={services} pagination={1} status={status} settlement={"cash"} title={serviceTitle}  />}



                           </div>
        )
    }
}

const userSelector = createSelector(
    state => state.user,
    user => user
);

const mapStateToProps = createSelector(
    userSelector,
    ( user) => ({
         user
    })
);

export default connect(mapStateToProps)(DashboardTab);
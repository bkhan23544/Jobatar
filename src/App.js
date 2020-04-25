import React, { Fragment } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { history } from './helpers/history';
import { AuthRoute } from './route';
import { Login, Register, ForgotPassword, ResetPassword, EmailVerify } from './views/auth';
import { Home, DashBoard, NotFound, Logout } from './views/components';
import { HowItWorks, About, Media, PrivacyPolicy, HelpAndFAQ, ContactUs, Testimonials, TermsOfService, ComingSoon, PressRelease, PressReleaseView } from './views/components/common';
import ScrollToTop from './helpers/ScrollTop';
import { FreelancerSearch, JobSearch, ServiceSearch } from './views/components/Search';
import { ServiceCreate, ServiceUpdate, ServiceSuccess, ServiceListing, ServiceView } from './views/components/Service';
import { JobCreate, JobUpdate, JobView, JobSuccess, JobListing } from './views/components/Job';
import { BlogList, BlogView } from './views/components/Blog';
import Notifier from "./helpers/Notifier";
import { ProfileUpdate, ExperienceAndEducation, StripConnect, CoFounder, PublicAbout, PublicJob, PublicService, PublicCoFounder, PublicRating, PublicServiceView, FavoriteJobs, FavoriteFreelancer, PublicJobView, ConnectionsRequest, FavoriteService, Membership, Transactions, ChangePassword, ManageMembership, Notifications, Support, UserDetails, ConnectionsMy, ConnectionsSent, FavoriteCoFounder } from './views/components/User';
import { ContractListing, ContractView } from './views/components/Contract';
import Message from './views/components/Messanger';
import { userActions } from "./common/redux/actions";
// import Dashboard from './views/components/User/Private/Dashboard';
import DashboardTab from './views/components/DashBoard/DashboardTab';

class App extends React.Component {

  componentWillMount() {
    const { dispatch, authentication } = this.props;
    if (authentication.loggedIn) {
      const { user } = authentication.authentication;
      dispatch(userActions.publicProfile("GET", null, { item_id: user && user.id }));
    }
  }

  render() {
    return (
      <Fragment>
        <Notifier />
        <Router history={history}>
          <ScrollToTop>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />

              {/* Auth pages routs */}
              <Route path="/register" component={Register} />

              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/reset-password" component={ResetPassword} />
              <Route path="/email-verification" component={EmailVerify} />
              {/* Content pages routs */}
              <Route path="/how-it-works" component={HowItWorks} />
              <Route path="/about-us" component={About} />
              <Route path="/terms-of-service" component={TermsOfService} />
              <Route path="/media" component={Media} />
              <Route exact path="/press-release" component={PressRelease} />
              <Route exact path="/press-release/:slug" component={PressReleaseView} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/help-and-faq" component={HelpAndFAQ} />
              <Route path="/contact-us" component={ContactUs} />
              <Route path="/testimonials" component={Testimonials} />
              <Route path="/comming/:slug" component={ComingSoon} />
              {/* Seaech page routs */}

              <AuthRoute path="/welcome" component={Home} type="welcome" />
              <AuthRoute path="/freelancer-search" component={FreelancerSearch} title={`Freelancer Search`} />
              <AuthRoute path="/cofounders-search" component={FreelancerSearch} title={`Co-founder Search`} is_co_founder={true} />
              <AuthRoute path="/job-search" component={JobSearch} is_publish="publish" is_closed="0" />
              <AuthRoute path="/service-search" component={ServiceSearch} />
              {/* <AuthRoute path="/dashboard" component={Dashboard} /> */}

              {/* Create Service */}
              {/* <AuthRoute exact path="/services" component={ServiceListing} /> */}
              <AuthRoute exact path="/service/create" component={ServiceCreate} />
              <AuthRoute exact path="/service/update/:id" component={ServiceUpdate} />
              <AuthRoute exact path="/service/view/:id" private={true} component={PublicServiceView} />
              {/* <AuthRoute exact path="/service/proposal/:id" component={ServiceProposalView} /> */}
              <AuthRoute exact path="/service/success" component={ServiceSuccess} />

              {/* Job Links */}
              {/* <AuthRoute exact path="/jobs" component={JobListing} is_publish="publish" /> */}
              {/* <AuthRoute exact path="/job/draft" component={JobListing} is_publish="draft" />
                            <AuthRoute exact path="/job/closed" component={JobListing} is_closed="1" />
                            <AuthRoute exact path="/job/invited" component={JobListing} is_visibility="private" /> */}
              <AuthRoute exact path="/job/create" component={JobCreate} />
              <AuthRoute exact path="/job/update/:id" component={JobUpdate} />
              <AuthRoute exact path="/job/view/:id" component={JobView} />
              {/* <AuthRoute exact path="/job/proposal/:id" component={JobProposalView} /> */}
              <AuthRoute exact path="/job/success" component={JobSuccess} />

              {/* Contract Links */}

              {/* <AuthRoute exact path="/offers/jobs" component={ContractListing} status="Offers" title="Offers" module="UserItem" settlement="cash" itemLink="/offers/jobs"/> */}

              {/* <AuthRoute exact path="/offers/received/jobs/cash" component={ContractListing} status="Received" title="Received Proposals" module="UserItem" settlement="cash" itemLink="/offers/received/jobs" /> */}
              {/* <AuthRoute exact path="/offers/received/jobs/exchange" component={ContractListing} status="Received" title="Received Proposals" module="UserItem" settlement="exchange" itemLink="/offers/received/jobs" /> */}

              {/* <AuthRoute exact path="/offers/received/services/cash" component={ContractListing} status="Received" title="Received Offers" module="UserService" settlement="cash" itemLink="/offers/received/services" /> */}
              {/* <AuthRoute exact path="/offers/received/services/exchange" component={ContractListing} status="Received" title="Servicse Received Offers" module="UserService" settlement="exchange" itemLink="/offers/received/services" /> */}

              {/* <AuthRoute exact path="/offers/sent/services/cash" component={ContractListing} status="Sent" title="Sent Offers" module="UserService" settlement="cash" itemLink="/offers/sent/services" /> */}
              {/* <AuthRoute exact path="/offers/sent/services/exchange" component={ContractListing} status="Sent" title="Sent Offers" module="UserService" settlement="exchange" itemLink="/offers/sent/services" /> */}

              {/* <AuthRoute exact path="/offers/sent/jobs/cash" component={ContractListing} status="Sent" title="Sent Proposals" module="UserItem" settlement="cash" itemLink="/offers/sent/jobs" /> */}
              {/* <AuthRoute exact path="/offers/sent/jobs/exchange" component={ContractListing} status="Sent" title="Sent Proposals" module="UserItem" settlement="exchange" itemLink="/offers/sent/jobs" /> */}

              <AuthRoute exact path="/contracts/jobs" component={ContractListing} status="Contracts" title="Accepted Proposals" module="UserItem" settlement="cash" itemLink="/contracts/jobs" />
              {/* <AuthRoute exact path="/contracts/jobs/cash" component={ContractListing} status="Contracts" title="Accepted Proposals" module="UserItem" settlement="cash" itemLink="/contracts/jobs" /> */}
              {/* <AuthRoute exact path="/contracts/jobs/exchange" component={ContractListing} status="Contracts" title="Accepted Proposals" module="UserItem" settlement="exchange" itemLink="/contracts/jobs" /> */}

              <AuthRoute exact path="/contracts/services" component={ContractListing} status="Contracts" title="Accepted Offers" module="UserService" settlement="cash" itemLink="/contracts/services" />
              {/* <AuthRoute exact path="/contracts/services/cash" component={ContractListing} status="Contracts" title="Accepted Offers" module="UserService" settlement="cash" itemLink="/contracts/services" /> */}
              {/* <AuthRoute exact path="/contracts/services/exchange" component={ContractListing} status="Contracts" title="Accepted Offers" module="UserService" settlement="exchange" itemLink="/contracts/services" /> */}


              <AuthRoute exact path="/completed/jobs" component={ContractListing} status="Completed" title="Completed Proposals" module="UserItem" settlement="cash" itemLink="/completed/jobs" />
              {/* <AuthRoute exact path="/completed/jobs/cash" component={ContractListing} status="Completed" title="Completed Proposals" module="UserItem" settlement="cash" itemLink="/completed/jobs" /> */}
              {/* <AuthRoute exact path="/completed/jobs/exchange" component={ContractListing} status="Completed" title="Completed Proposals" module="UserItem" settlement="exchange" itemLink="/completed/jobs" /> */}


              <AuthRoute exact path="/completed/services" component={ContractListing} status="Completed" title="Completed Offers" module="UserService" settlement="cash" itemLink="/completed/services" />
              {/* <AuthRoute exact path="/completed/services/cash" component={ContractListing} status="Completed" title="Completed Offers" module="UserService" settlement="cash" itemLink="/completed/services" /> */}
              {/* <AuthRoute exact path="/completed/services/exchange" component={ContractListing} status="Completed" title="Completed Offers" module="UserService" settlement="exchange" itemLink="/completed/services" /> */}


              <AuthRoute exact path="/active/view/:id" component={ContractView} type="Active" />
              <AuthRoute exact path="/declined/view/:id" component={ContractView} type="Declined" />
              <AuthRoute exact path="/bids/view/:id" component={ContractView} type="Bids" />

              <AuthRoute exact path="/offers/view/:id" component={ContractView} type="Offer" />
              <AuthRoute exact path="/received/view/:id" component={ContractView} type="Received" />
              <AuthRoute exact path="/sent/view/:id" component={ContractView} type="Sent" />
              <AuthRoute exact path="/contracts/view/:id" component={ContractView} type="Contract" />
              <AuthRoute exact path="/completed/view/:id" component={ContractView} type="Completed" />
              <AuthRoute exact path="/services/proposal/:id" component={ContractView} type="Service" />
              <AuthRoute exact path="/jobs/proposal/:id" component={ContractView} type="Job" />

              {/* Blog Pages */}
              <Route exact path="/blogs" component={BlogList} />
              <Route exact path="/blog/category/:slug" component={BlogList} />
              <Route exact path="/blog/view/:slug" component={BlogView} />

              {/* User Profile Update */}
              {/* <AuthRoute exact path="/user/update" component={ProfileUpdate} /> */}
              {/* <AuthRoute exact path="/user/experience-and-education" component={ExperienceAndEducation} /> */}
              {/* <AuthRoute exact path="/user/co-founder" component={CoFounder} /> */}
              {/* <AuthRoute exact path="/user/membership" component={Membership} /> */}
              <AuthRoute exact path="/user/public/about/:id" component={PublicAbout} />
              <AuthRoute exact path="/user/public/job/:id" component={PublicJob} />
              <AuthRoute exact path="/user/public/service/:id" component={PublicService} />
              <AuthRoute exact path="/user/public/service/view/:id" component={PublicServiceView} />
              <AuthRoute exact path="/user/public/job/view/:id" component={PublicJobView} />
              <AuthRoute exact path="/user/public/co-founder/:id" component={PublicCoFounder} />
              <AuthRoute exact path="/user/public/ratings/:id" component={PublicRating} />
              {/* <AuthRoute exact path="/user/favorite/jobs" component={FavoriteJobs} />
                            <AuthRoute exact path="/user/favorite/freelancers" component={FavoriteFreelancer} />
                            <AuthRoute exact path="/user/favorite/co-founders" component={FavoriteCoFounder} /> */}
              {/* <AuthRoute exact path="/user/favorite/services" component={FavoriteService} /> */}
              {/* <AuthRoute exact path="/user/connection/my-cofounder" component={ConnectionsMy} /> */}
              {/* <AuthRoute exact path="/user/connection/received-request" component={ConnectionsRequest} />
                            <AuthRoute exact path="/user/connection/sent-request" component={ConnectionsSent} /> */}
              <AuthRoute exact path="/user/support" component={Support} />
              {/* <AuthRoute exact path="/setting/account-info" component={UserDetails} /> */}
              {/* <AuthRoute exact path="/setting/change-password" component={ChangePassword} /> */}
              <AuthRoute exact path="/setting/manage-membership" component={ManageMembership} />
              {/* <AuthRoute exact path="/setting/notifications" component={Notifications} /> */}
              {/* <AuthRoute exact path="/setting/stripe-connect" component={StripConnect} /> */}
              {/* <AuthRoute exact path="/setting/transactions" component={Transactions} /> */}

              {/* Message */}
              <AuthRoute exact path="/messages" component={Message} />
              <AuthRoute  >

                <Route>
                  <DashBoard>

                    <Switch>
                      {/* <Route exact path={"/dashBoard"}>
                        <DashboardTab />
                      </Route> */}
                      <AuthRoute exact path="/dashBoard/dashBoardTab" component={DashboardTab}  />



                      <AuthRoute  path="/dashBoard/jobs" component={JobListing} is_publish="publish" />
                      <AuthRoute  path="/dashBoard/job/draft" component={JobListing} is_publish="draft" />
                      <AuthRoute  path="/dashBoard/job/closed" component={JobListing} is_closed="1" />
                      <AuthRoute  path="/dashBoard/job/invited" component={JobListing} is_visibility="private" />


                      <AuthRoute  path="/dashBoard/offers/received/jobs/cash" component={ContractListing} status="Received" title="Received Proposals" module="UserItem" settlement="cash" itemLink="/offers/received/jobs" />
                      <AuthRoute  path="/dashBoard/offers/received/jobs/exchange" component={ContractListing} status="Received" title="Received Proposals" module="UserItem" settlement="exchange" itemLink="/offers/received/jobs" />

                      <AuthRoute  path="/dashBoard/offers/sent/jobs/cash" component={ContractListing} status="Sent" title="Sent Proposals" module="UserItem" settlement="cash" itemLink="/offers/sent/jobs" />
                      <AuthRoute  path="/dashBoard/offers/sent/jobs/exchange" component={ContractListing} status="Sent" title="Sent Proposals" module="UserItem" settlement="exchange" itemLink="/offers/sent/jobs" />

                      <AuthRoute  path="/dashBoard/contracts/jobs/cash" component={ContractListing} status="Contracts" title="Accepted Proposals" module="UserItem" settlement="cash" itemLink="/contracts/jobs" />
                      <AuthRoute  path="/dashBoard/contracts/jobs/exchange" component={ContractListing} status="Contracts" title="Accepted Proposals" module="UserItem" settlement="exchange" itemLink="/contracts/jobs" />

                      <AuthRoute  path="/dashBoard/completed/jobs/cash" component={ContractListing} status="Completed" title="Completed Proposals" module="UserItem" settlement="cash" itemLink="/completed/jobs" />
                      <AuthRoute  path="/dashBoard/completed/jobs/exchange" component={ContractListing} status="Completed" title="Completed Proposals" module="UserItem" settlement="exchange" itemLink="/completed/jobs" />

                      <AuthRoute  path="/dashBoard/services" component={ServiceListing} />

                      <AuthRoute  path="/dashBoard/offers/received/services/cash" component={ContractListing} status="Received" title="Received Offers" module="UserService" settlement="cash" itemLink="/offers/received/services" />
                      <AuthRoute  path="/dashBoard/offers/received/services/exchange" component={ContractListing} status="Received" title="Received Offers" module="UserService" settlement="exchange" itemLink="/offers/received/services" />

                      <AuthRoute  path="/dashBoard/offers/sent/services/cash" component={ContractListing} status="Sent" title="Sent Offers" module="UserService" settlement="cash" itemLink="/offers/sent/services" />
                      <AuthRoute  path="/dashBoard/offers/sent/services/exchange" component={ContractListing} status="Sent" title="Sent Offers" module="UserService" settlement="exchange" itemLink="/offers/sent/services" />

                      <AuthRoute  path="/dashBoard/contracts/services/cash" component={ContractListing} status="Contracts" title="Accepted Offers" module="UserService" settlement="cash" itemLink="/contracts/services" />
                      <AuthRoute  path="/dashBoard/contracts/services/exchange" component={ContractListing} status="Contracts" title="Accepted Offers" module="UserService" settlement="exchange" itemLink="/contracts/services" />

                      <AuthRoute  path="/dashBoard/completed/services/cash" component={ContractListing} status="Completed" title="Completed Offers" module="UserService" settlement="cash" itemLink="/completed/services" />
                      <AuthRoute  path="/dashBoard/completed/services/exchange" component={ContractListing} status="Completed" title="Completed Offers" module="UserService" settlement="exchange" itemLink="/completed/services" />

                      <AuthRoute  path="/dashBoard/user/favorite/services" component={FavoriteService} />
                      <AuthRoute  path="/dashBoard/user/favorite/jobs" component={FavoriteJobs} />
                      <AuthRoute  path="/dashBoard/user/favorite/freelancers" component={FavoriteFreelancer} />
                      <AuthRoute  path="/dashBoard/user/favorite/co-founders" component={FavoriteCoFounder} />

                      <AuthRoute  path="/dashBoard/user/connection/my-cofounder" component={ConnectionsMy} />
                      <AuthRoute  path="/dashBoard/user/connection/received-request" component={ConnectionsRequest} />
                      <AuthRoute  path="/dashBoard/user/connection/sent-request" component={ConnectionsSent} />

                      <AuthRoute  path="/dashBoard/user/membership" component={Membership} />

                      <AuthRoute  path="/dashBoard/stripe-connect" component={StripConnect} />
                      <AuthRoute  path="/dashBoard/setting/transactions" component={Transactions} />
                      <AuthRoute  path="/dashBoard/setting/notifications" component={Notifications} />

                      <AuthRoute  path="/dashBoard/user/update" component={ProfileUpdate} />
                      <AuthRoute  path="/dashBoard/user/experience-and-education" component={ExperienceAndEducation} />
                      <AuthRoute  path="/dashhBoard/user/co-founder" component={CoFounder} />
                      <AuthRoute  path="/dashBoard/setting/change-password" component={ChangePassword} />





                    </Switch>
                  </DashBoard>
                </Route>



              </AuthRoute>
              {/* <AuthRoute exact path="/dashBoard/jobs" component={JobListing} /> */}

              <AuthRoute path="/logout" component={Logout} />
              <Route path="*" component={NotFound} />
            </Switch>
          </ScrollToTop>

        </Router>
      </Fragment>
    );
  }
}

const authenticationSelector = createSelector(
  state => state.authentication,
  authentication => authentication
);

const mapStateToProps = createSelector(
  authenticationSelector,
  (authentication) => ({
    authentication
  })
);
export default connect(mapStateToProps)(App);
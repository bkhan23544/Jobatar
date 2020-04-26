import React, { Component } from 'react';
import { Main } from '../../layout';
import { Container, Row, Col } from 'react-bootstrap';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import {NavLink} from "react-router-dom";
import {createSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import { Element, Link, animateScroll as scroll } from 'react-scroll';


class HowItWorks extends Component {

    constructor(props) {
        super(props);
        this.loggedIn = this.props.authentication.loggedIn;
    }
    
    render() {
        return (<Main>
            <DocumentTitle title={`How it Works`}/>
            <div className="howWork-page">
                <div className="banner">
                    <img src="images/new/how-work-banner.jpg" alt="" className="img-fluid w-100" />
                    <div className="caption d-flex align-items-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-md-9 col-12 mr-auto banner-text">
                                    <h2 className="">How it Works</h2>
                                    <h6>An explanation of how JoBarter works</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inner-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="fourlist">
                                    <ul className="d-flex align-items-center justify-content-between">
                                        <li>
                                            <Link to="Hire" smooth={true} duration={1000}><div>
                                                <div className="image">
                                                    <img src="images/new/how-icon-1.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="title">Hirer</div>
                                            </div></Link>
                                        </li>
                                        <li>
                                        <Link to="Freelancer" smooth={true} duration={1000}>
                                            <div>
                                                <div className="image">
                                                    <img src="images/new/how-icon-2.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="title">Freelancer</div>
                                            </div>
                                            </Link>
                                        </li>
                                        <li>
                                        <Link to="Cofounder" smooth={true} duration={1000}>
                                            <div>
                                                <div className="image">
                                                    <img src="images/new/how-icon-3.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="title">Cofounder</div>
                                            </div>
                                            </Link>
                                        </li>
                                        <li>
                                        <Link to="Rating" smooth={true} duration={1000}>
                                            <div>
                                                <div className="image">
                                                    <img src="images/new/how-icon-4.png" alt="" className="img-fluid" />
                                                </div>
                                                <div className="title">Rating & Review</div>
                                            </div>
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className="action text-center">
                                        <NavLink className="btn btn-info" to="/register">Get Started</NavLink>
                                        <Element name="Hire"></Element>
                                    </div>
                                </div>
                                
                                <div className="center-text">
                                <h2>Hire the best experts</h2>
                                    <h6>Whatever you need, we have it. If you need to get work done, <br /> JoBarter can helo you two specific ways:</h6>
                                </div>
                            
                            </div>
                        </div>
                        <div className="row align-items-center list-box">
                            <div className="col-md-6">
                                <h3>1. Post a Job</h3>
                                <div className="text">
                                    <p>Simply click on our “<NavLink to="/job/create">Post a Job</NavLink>” button to start describing the job that you need. Fill in as much information that you can provide to make it easier for interested freelancers to understand your requirements. Once your job is posted, freelancers will start sending you proposals for your job post. You can choose to accept, decline, or revise the proposals.</p>
                                </div>
                                <div className="action text-center">
                                    <NavLink className="btn btn-info" to="/job/create">Post a Job</NavLink>
                                </div>
                            </div>
                            <div className="col-md-6 text-center">
                                <img src="/images/new/work-image-1.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="row align-items-start list-box">
                            <div className="col-md-6 text-center py-3">
                                <img src="/images/new/work-image-2.png" alt="" className="img-fluid" />
                            </div>
                            <div className="col-md-6">
                                <h3>2. Browse for Services</h3>
                                <div className="text">
                                    <p>If you have a job you want to get done, you can easily “Browse for Services” that our freelancers have posted. We have a pool of skilled professionals that post services they offer.  Use our filters and search bar to narrow down the type of service that you need and once you find a service that you want, simply click on the “Send an Offer” button to start bidding for the service. Our bidding system is designed for you to get the most affordable rate. Even more interesting, we allow counter offers so that you and the service provider can come to a price that works best for both of you.</p>
                                    <p>Note: And one more thing, if you are also a service provider, you can choose to exchange a service that you provide as payment for the service that you need. You have the option to either buy a service or exchange services if both parties are interested. Exchanging services with another service provider can help you save money.</p>
                                </div>
                                <div className="action text-center">
                                    <NavLink className="btn btn-info" to="/service-search">Browse for Service</NavLink>
                                    <Element name="Freelancer"></Element>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-12">
                                <div className="center-text">
                            <h2>Be a freelancer and manage <br /> your career.</h2>
                                    <h6>Need a job? You’ve come to the right place! JoBarter is here to help you sell your services and find<br /> clients. JoBarter makes it easier for you to find jobs. We can help you find jobs two specific ways:</h6>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center list-box">
                            <div className="col-md-6">
                                <h3>1.  Post a Service</h3>
                                <div className="text">
                                    <p>Take advantage of your skills and talent. Most people have an undiscovered talent. Whether you speak multiple languages, great in design, coding, bookkeeping, writing, marketing, you can start getting jobs to earn extra income by applying your various skills. It’s easier than you think! You simply have to click on “Post a Service” button and start describing the service that you offer. Provide as much information as you can so potential clients will know how proficient you are with your skills. After you submit and post your service, just wait and potential clients will start sending offers to you. </p>
                                </div>
                                <div className="action text-center">
                                    <NavLink className="btn btn-info" to="/service/create">Post A Service</NavLink>
                                </div>
                            </div>
                            <div className="col-md-6 text-center">
                                <img src="/images/new/work-image-3.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="row align-items-start list-box">
                            <div className="col-md-6 text-center py-3">
                                <img src="/images/new/work-image-4.png" alt="" className="img-fluid" />
                            </div>
                            <div className="col-md-6">
                                <h3>2. Browse for Jobs</h3>
                                <div className="text">
                                    <p>You can easily find what members in our platform are looking for through our “Browse for Jobs” page. Browse through a pool of jobs that are posted that hirers are looking for freelancers to fulfill them. If you see something that matches your skill, and that you can do, you can simply apply for it by clicking “Submit a Proposal” from the posted job. </p>
                                    <p>Prove to hirers that you have what it takes to accomplish the job. Put in as much detail as possible when sending a proposal so that you will have a better chance of getting hired. After submitting your proposal, wait for the hirer to respond back to you. If they accept your proposal, the job is yours. You can get paid hourly or fixed price. Just make sure you do the job well so that you can get a five-star rating and amazing feedback. </p>
                                </div>
                                <div className="action text-center">
                                    <NavLink className="btn btn-info" to="/job-search">Browse for Jobs</NavLink>
                                    <Element name="Cofounder"></Element>
                                </div>
                            </div>
                        </div>

                   <div className="row">
                            <div className="col-12">
                                <div className="center-text">
                            <h2>Find a COFOUNDER</h2>
                                    <h6>Need an ideal co-founder ot a busines partner? Before you decided to partner with someone an a Business idea, it is important for you get to know them first. Ideally, it would be great it you work with that person before making such a big decision. With JoBarter, you have the option to hire that person for a job or exchange services with that person to have a better understanding of the value they wpuld bring to your business. In addition, you can also review their rating and feedback to have a better understanding of their experience working with other people. We can help you find the ideal partner you have been looking for to launch your business venture in two specific ways:</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center list-box">
                            <div className="col-md-6">
                                <h3>1. Post Co-founder Profile</h3>
                                <div className="text">
                                    <p>If you are interested in finding a co-founder to partner with, you simply have to select “Co-founder” when filling out your profile information. From there, a tab will appear for you to provide more details about your own experience as a co-founder. You also will need to provide information about the ideal co-founder you are looking for, including your wish list, preferred location, and relevant industry.</p>
                                </div>
                                <div className="action text-center">
                                    <NavLink className="btn btn-info" to="/user/update">My Profile</NavLink>
                                </div>
                            </div>
                            <div className="col-md-6 text-center">
                                <img src="/images/new/work-image-5.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="row align-items-start list-box">
                            <div className="col-md-6 text-center py-3">
                                <img src="/images/new/work-image-6.png" alt="" className="img-fluid" />
                            </div>
                            <div className="col-md-6">
                                <h3>2. Browse for Co-founders</h3>
                                <div className="text">
                                    <p>You can easily find a partner for your business idea by navigating through our “Browse for Co-founders” page. To make it easier, you can select the category, rating, and country you want. If you find a potential candidate, you can add that person on your “Connection”. Upon receiving an “Accepted Request” notification, you can start messaging with the ideal co-founder.</p>
                                </div>
                                <div className="action text-center">
                                    <NavLink className="btn btn-info" to="/cofounders-search">Browse</NavLink>
                                    <Element name="Rating"> </Element>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="center-text">
                                <h2>Rating & Review</h2>
                                    <h6>After each transaction whether it is by hiring a freelancer of exchanging your service with another member, you can provide feedback about your experience. This process helps create a stronger community that is based on trust, transparency and collaboration.</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center list-box">
                            <div className="col-md-6">
                                <h3>1. Rating</h3>
                                <div className="text">
                                    <p>Provide a rating about your collaboration. You can assess the person’s communication, competence, and whether you would recommend the person to other members of our community.</p>
                                </div>
                            </div>
                            <div className="col-md-6 text-center">
                                <img src="/images/new/work-image-7.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="row align-items-start list-box">
                            <div className="col-md-6 text-center py-3">
                                <img src="/images/new/work-image-8.png" alt="" className="img-fluid" />
                            </div>
                            <div className="col-md-6">
                                <h3>2.  Review</h3>
                                <div className="text">
                                    <p>You can write a review that will be public about your experience to describe your experience after you have completed a service or a job contract with another freelancer. </p>
                                </div>
                                <div className="action text-center">
                                    <NavLink className="btn btn-info" to="/register">Join Now</NavLink>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </Main>);

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

export default connect(mapStateToProps)(HowItWorks);
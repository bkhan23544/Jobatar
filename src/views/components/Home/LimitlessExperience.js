import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class LimitlessExperience extends Component {
    render() {
        return (
            <div className="hExperience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-12 mb-3">
                            <span className="layer"><img src="images/hExperience.png" alt="" className="img-fluid" /></span>
                        </div>
                        <div className="col-md-6 col-12 pt-4">
                            <h2>Limitless Experience</h2>
                            <h6><span>Flexible options for your business</span></h6>
                            <div className="text">
                                <p>We are deeply passionate about serving our community of freelancers, entrepreneurs, startup founders and small business owners.</p>
                                <p>We are working very hard to build our website, IOS and Android applications. We are committed to making JoBarter mobile friendly so that members can use our one-stop platform to easily hire top freelancers, exchange skills and services, and find cofounders anywhere.</p>
                            </div>
{/*
                            <div className="store">
                                <NavLink to="#" className="mr-3">
                                    <img src="images/google-store.svg" alt="" className="img-fluid" />
                                </NavLink>
                                <NavLink to="#">
                                    <img src="images/apple-store.svg" alt="" className="img-fluid" />
                                </NavLink>
                            </div> */}
                        </div>
                    </div>

                    {/* <div className="row mt-lg-5 mt-2 text-left">
                        <div className="col-lg-3 col-sm-6 col-12 mb-3">
                            <h5>By Skills</h5>
                            <ul className="list-inline">
                                <li><NavLink to="#">Software Engineer</NavLink></li>
                                <li><NavLink to="#">Technical Writer</NavLink></li>
                                <li><NavLink to="#">UI Designer</NavLink></li>
                                <li><NavLink to="#">UX Designer</NavLink></li>
                                <li><NavLink to="#">Virtual Assistant</NavLink></li>
                                <li><NavLink to="#">Web Designer</NavLink></li>
                                <li><NavLink to="#">Wordpress Developer</NavLink></li>
                                <li><NavLink to="#">Content Writer</NavLink></li>
                            </ul>
                            <NavLink to="#" className="view-all">View All</NavLink>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12 mb-3">
                            <h5>Skills In US</h5>
                            <ul className="list-inline">
                                <li><NavLink to="#">HTML Developers </NavLink></li>
                                <li><NavLink to="#">HTML5 Developers</NavLink></li>
                                <li><NavLink to="#">JavaScript Developers </NavLink></li>
                                <li><NavLink to="#">Microsoft Word Experts</NavLink></li>
                                <li><NavLink to="#">PowerPoint Experts</NavLink></li>
                                <li><NavLink to="#">Social Media Marketers</NavLink></li>
                                <li><NavLink to="#">WordPress Developers</NavLink></li>
                                <li><NavLink to="#">Writers</NavLink></li>
                            </ul>
                            <NavLink to="#" className="view-all">View All</NavLink>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12 mb-3">
                            <h5>By Categories</h5>
                            <ul className="list-inline">
                                <li><NavLink to="#">Graphics & Design</NavLink></li>
                                <li><NavLink to="#">Digital Marketing</NavLink></li>
                                <li><NavLink to="#">Writing & Translation</NavLink></li>
                                <li><NavLink to="#">Video & Animation</NavLink></li>
                                <li><NavLink to="#">Music & Audio</NavLink></li>
                                <li><NavLink to="#">Programming & Tech</NavLink></li>
                                <li><NavLink to="#">Business</NavLink></li>
                                <li><NavLink to="#">Fun & Lifestyle</NavLink></li>
                            </ul>
                            <NavLink to="#" className="view-all">View All</NavLink>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12 mb-3">
                            <h5>By Location</h5>
                            <ul className="list-inline">
                                <li><NavLink to="#">Switzerland</NavLink></li>
                                <li><NavLink to="#">Canada</NavLink></li>
                                <li><NavLink to="#">Germany</NavLink></li>
                                <li><NavLink to="#">United Kingdom</NavLink></li>
                                <li><NavLink to="#">Japan</NavLink></li>
                                <li><NavLink to="#">Sweden</NavLink></li>
                                <li><NavLink to="#">Australia</NavLink></li>
                                <li><NavLink to="#">United States</NavLink></li>
                            </ul>
                            <NavLink to="#" className="view-all">View All</NavLink>
                        </div>
                    </div> */}

                </div>
            </div>
        );
    }
}

export default LimitlessExperience;
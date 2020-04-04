import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import NewsletterForm from './partials/NewsletterForm';

class Footer extends Component {

    getYear() {
        const d = new Date();
        return d.getFullYear();
    }

    render() {
        return (
            <footer id="footer">
                <div className="menus">
                    <div className="container">
                        <div className="row justify-content-center">
                            {/* <div className="col-12 logos mb-3">
                                <NavLink className="navbar-brand" to="/">
                                    <img src="/images/logo.svg" alt="" className="img-fluid" width="107" />
                                </NavLink>
                            </div> */}
                            <div className="col-lg-8 col-12">
                                <div className="row">
                                    <div className="col-md-4 col-12">
                                        <h4 className="pb-1">Company</h4>
                                        <ul className="list-inline">
                                            <li><NavLink to="/about-us">About Us</NavLink></li>
                                            <li><NavLink to="/privacy-policy">Privacy Policy </NavLink></li>
                                            <li><NavLink to="/terms-of-service">Terms of Service</NavLink></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-12">
                                        <h4 className="pb-1">Support</h4>
                                        <ul className="list-inline">
                                            <li><NavLink to="/how-it-works">How it Works</NavLink></li>
                                            {/* <li><NavLink to="/help-and-faq">Help and FAQ</NavLink></li> */}
                                            <li><NavLink to="/contact-us">Contact Us</NavLink></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-12">
                                        <h4 className="pb-1">Resources</h4>
                                        <ul className="list-inline">
                                            {/* <li><NavLink to="/testimonials">Testimonials</NavLink></li> */}
                                            <li><NavLink to="/media">Media</NavLink></li>
                                            <li><NavLink to="/blog/category/all">Blog</NavLink></li>
                                            <li><NavLink to="/press-release">Press Release</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <NewsletterForm />
                        </div>
                    </div>
                </div>
                <div className="copy-right">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 d-flex align-items-center">
                                <div className="text col pl-0"><NavLink to="/">jobarter</NavLink>. &copy; {this.getYear()} All Rights Reserved.</div>
                                <ul className="social-menu list-inline d-flex justify-content-center mb-0">

                                    <li><a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/jobarterapp/`}><i className="fab fa-facebook-f"></i></a></li>

                                    <li><a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/BarterJo`}><i className="fab fa-twitter"></i></a></li>

                                    <li><a target="_blank" rel="noopener noreferrer" href={`https://www.pinterest.com/jobarterapp/`}><i className="fab fa-pinterest"></i></a></li>

                                    <li><a target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/jobarterapp/`}><i className="fab fa-instagram"></i></a></li>

                                    <li><a target="_blank" rel="noopener noreferrer" href={`https://www.youtube.com/channel/UCQbb96RGviEu1kXNLjv93bw?view_as=subscriber`}><i className="fab fa-youtube"></i></a></li>

                                    <li><a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/company/49642886/admin/`}><i className="fab fa-linkedin"></i></a></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
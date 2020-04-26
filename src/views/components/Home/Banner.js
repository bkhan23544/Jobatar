import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
// import "../../../assets/css/style.css"
// eslint-disable-next-line
import HomeSearch from './partials/HomeSearch';
import { NavLink } from "react-router-dom";


class Banner extends Component {


    render() {
        return (
            // <div className="hBanner">
            //     <img src="images/home.jpg" alt="" className="img-fluid w-100" />
            //     <div className="caption d-flex align-items-center">
            //         <div className="container">
            //             <div className="row">
            //                 <div className="col-lg-6 col-md-9 col-12 mr-auto banner-text">
            //                     <h2 className="pt-lg-3 w-100 pull-left">Turn your dreams into reality.<br />
            //                         <b>
            //                             <big>Hire top-notch freelancers. Exchange your services. Connect with ideal co-founders.
            //                         </big></b><br />
            //                         {/* <b><small>
            //                              We are still finalizing JoBarter. Please sign up and we will keep you updated on our progress.
            //                             </small>
            //                         </b> */}
            //                     </h2>
            //                     {!this.loggedIn &&
            //                         <div className="w-100 pull-left mb-3">
            //                         <NavLink className="btn btn-info" to="/register">SIGN UP NOW</NavLink>
            //                     </div> }
            //                     { /* <HomeSearch /> */}
            //                     <div className="w-100 pull-left example d-flex align-items-center">
            //                         <button onClick={this.handleShow} className="btn btn-white d-flex align-items-center justify-content-center"><i className="fas fa-play"></i></button>
            //                         <h6>Watch our demo video</h6>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            <div>
            <section className="tr-banner section-before bg-image">
            <div className="container">
             <div className="banner-content text-center">
              <h2>Save money by using your skills</h2>
              <h3>Hire top-notch freelancers. Exchange your services. Connect with ideal co-founders.</h3>
                   
              <div id="deleteDiv" className="row hidden-xs">
                       
               <div className="col-lg-4 col-sm-6">
                <div className="features">
                  <span className="fa-stack fa-3x">
                   <i className="fa fa-circle fa-stack-2x"></i>
                   <i className="fa fa-clone fa-stack-1x fa-inverse"></i>
                  </span>
                <p>Post your job for free</p>
                </div>
               </div>
                       
               <div className="col-lg-4 col-sm-6">
                <div className="features">
                  <span className="fa-stack fa-3x">
                   <i className="fa fa-circle fa-stack-2x"></i>
                   <i className="fa fa-list-alt fa-stack-1x fa-inverse"></i>
                  </span>
                <p>Get proposals in minutes</p>
                </div>
               </div>
                       
               <div className="col-lg-4 col-sm-6">
                <div className="features">
                  <span className="fa-stack fa-3x">
                   <i className="fa fa-circle fa-stack-2x"></i>
                   <i className="fa fa-users fa-stack-1x fa-inverse"></i>
                  </span>
                <p>Choose your freelancer</p>
                </div>
               </div>
               
              </div>
              
             </div>
            </div>
           </section>	

          

            </div>
        );
    }
}

export default Banner;
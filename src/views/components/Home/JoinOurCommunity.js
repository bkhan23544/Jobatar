import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { globalService as gs } from '../../../common/services';
import "../../../custom.css"


class JoinOurCommunity extends Component {

  

    render() {
        return (
          <div className="hJoin">
          <img src="assets/img/join.png" alt="" className="img-fluid"/>
          <div className="caption align-items-center mt-5 w-100 h-100">
              <div className="container">
                  <div className="row">
                      <div className="col-12 text-center">
                          <h2>JOIN OUR COMMUNITY</h2>
                          <h5>DREAM BIG. ACHIEVE YOUR BUSINESS GOALS. TAKE ACTION TODAY.</h5>
                          {gs.identity && <NavLink to="/register" className="btn join-btn">GET STARTED</NavLink>}
                      </div>
                  </div>
              </div>
          </div>
          
      </div>

        );
    }
}

export default JoinOurCommunity;
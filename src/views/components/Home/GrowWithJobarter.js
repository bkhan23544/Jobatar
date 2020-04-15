import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { globalService as gs } from '../../../common/services';

class GrowWithJobarter extends Component {
    render() {
        return (
            <div className="hJoin">
          <img src="assets/img/video.png" alt="" className="img-fluid"/>
          <div className="caption align-items-center mt-5 w-100">
              <div className="container">
                  <div className="row">
                      <div className="col-12 text-center">
                          <h2 className="text join">GROW WITH JOBARTER</h2>
                          <h4 className="text">TRANSFORM YOUR BUSINESS WITH US</h4>
                          {!gs.identity && <NavLink to="/register" className="btn join-btn">JOIN NOW</NavLink>}
                      </div>
                  </div>
              </div>
          </div>
          
      </div>
        );
    }
}

export default GrowWithJobarter;
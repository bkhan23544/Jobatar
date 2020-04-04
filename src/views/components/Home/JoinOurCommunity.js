import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { globalService as gs } from '../../../common/services';

class JoinOurCommunity extends Component {
    render() {
        return (
            <div className="hJoin">
                <img src="images/hJoin-bg.png" alt="" className="img-fluid w-100" />
                <div className="caption d-flex align-items-center justify-content-center w-100 h-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h2>Join Our Community</h2>
                                <h6>DREAM BIG. ACHIEVE YOUR BUSINESS GOALS. TAKE ACTION TODAY.</h6>
                                {!gs.identity && <NavLink to="/register" className="btn btn-primary">JOIN NOW</NavLink>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoinOurCommunity;
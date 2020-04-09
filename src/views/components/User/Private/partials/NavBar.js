import React, {Fragment} from "react";
import {NavLink} from 'react-router-dom';
import { globalService as gs } from "../../../../../common/services";

const NavBar = (prop) => {

    const authentication = gs.parseItem('authentication');
    const is_co_founder = authentication.user.userProfile.is_co_founder;


    return (<Fragment>
        <ul className="nav flex-column mb-4">
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/user/update">Profile</NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/user/experience-and-education">Experience & Education</NavLink>
            </li>
            { (is_co_founder === 1) &&
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/user/co-founder">Co-founder</NavLink>
            </li>
            }
        </ul>
        <div className="card card-instruction">
            <div className="card-body">
                <h5 className="card-title section-titles">Instruction</h5>
                <div className="description-profile">

<ul className="tr-list resume-info">			

 <li>
 { (prop.instruction === 'profile') && <div className="media-body text-center">Filling out your profile information thoroughly will help us better meet your freelancing goals. Based on your specific interests, other members will be reviewing your profile before deciding whether to hire you, exchange services with you, or to consider you as a co-founder on their business ideas. It is really important to diligently highlight the breadth of your experience to make your profile standout.</div> }
 { (prop.instruction === 'experience') && <div className="media-body text-center">Provide comprehensive information about your professional experience and education to highlight your expertise.</div> }
 { (prop.instruction === 'co-founder') && <div className="media-body text-center">To more effectively match you with ideal co-founders for your business ideas, please ensure that you fill out all of your information, and also include your wish list request.</div> }
 </li>	
 </ul>
 </div>


                

            </div>
        </div>
    </Fragment>);
};

export default NavBar;

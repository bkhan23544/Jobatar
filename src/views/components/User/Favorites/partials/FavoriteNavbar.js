import React from 'react';
import {NavLink} from 'react-router-dom';

const FavoriteNavbar = () => {
    return (
        <div className="public-navbar card mb-4">
            <div className="card-body">
                <nav className="nav">
                    <NavLink className="nav-link" to={`/user/favorite/services`}>Services</NavLink>
                    <NavLink className="nav-link" to={`/user/favorite/jobs`}>Jobs</NavLink>
                    <NavLink className="nav-link" to={`/user/favorite/freelancers`}>Freelancers</NavLink>
                    <NavLink className="nav-link" to={`/user/favorite/co-founders`}>Co-founders</NavLink>
                </nav>
            </div>
        </div>
    )
};

export default FavoriteNavbar;
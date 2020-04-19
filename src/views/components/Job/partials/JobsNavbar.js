import React from 'react';
import { NavLink } from 'react-router-dom';

export const JobsNavbar = () => {
    return(
        <div className="public-navbar card mb-4">
            <div className="card-body">
                <nav className="nav">
                    <NavLink className="nav-link" to={`/dashBoard/jobs`}>Posted Jobs</NavLink>
                    <NavLink className="nav-link" to={`/dashBoard/job/draft`}>Draft Jobs</NavLink>
                    <NavLink className="nav-link" to={`/dashBoard/job/closed`}>Closed Jobs</NavLink>
                    <NavLink className="nav-link" to={`/dashBoard/job/invited`}>Invited Jobs</NavLink>
                </nav>
            </div>
        </div>
    )
};

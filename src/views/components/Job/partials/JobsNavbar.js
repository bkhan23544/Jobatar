import React from 'react';
import { NavLink } from 'react-router-dom';

export const JobsNavbar = () => {
    return(
        <div className="public-navbar card mb-4">
            <div className="card-body">
                <nav className="nav">
                    <NavLink className="nav-link" to={`/jobs`}>Posted Jobs</NavLink>
                    <NavLink className="nav-link" to={`/job/draft`}>Draft Jobs</NavLink>
                    <NavLink className="nav-link" to={`/job/closed`}>Closed Jobs</NavLink>
                    <NavLink className="nav-link" to={`/job/invited`}>Invited Jobs</NavLink>
                </nav>
            </div>
        </div>
    )
};

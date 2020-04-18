import React from 'react';
import {NavLink} from 'react-router-dom';

const CoFounderNavbar = () => {
    return (
        <div className="public-navbar card mb-4">
            <div className="card-body">
                <nav className="nav">
                    <NavLink className="nav-link" to={`/dashBoard/user/connection/my-cofounder`}>My Co-founder</NavLink>
                    <NavLink className="nav-link" to={`/dashBoard/user/connection/received-request`}>Received Request</NavLink>
                    <NavLink className="nav-link" to={`/dashBoard/user/connection/sent-request`}>Sent Request</NavLink>
                </nav>
            </div>
        </div>
    )
};

export default CoFounderNavbar;
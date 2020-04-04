import React from 'react';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom';

const PublicNavbar = (props) => {
    const {user} = props;
    let item = user ? user.user.userProfile : {};


    return (
        <div className="public-navbar card mb-4">
            <div className="card-body">
                <nav className="nav">
                    <NavLink className="nav-link" to={`/user/public/about/${item && item.user_id}`}>About Me</NavLink>
                    <NavLink className="nav-link" to={`/user/public/job/${item && item.user_id}`}>Jobs</NavLink>
                    <NavLink className="nav-link" to={`/user/public/service/${item && item.user_id}`}>Services</NavLink>
                    {item.is_co_founder ? <NavLink className="nav-link" to={`/user/public/co-founder/${item && item.user_id}`}>Co-founder</NavLink> : ''}
                    <NavLink className="nav-link" to={`/user/public/ratings/${item && item.user_id}`}>Rating & Review</NavLink>
                </nav>
            </div>
        </div>
    )
};

const userSelector = createSelector(
    state => state.user,
    user => user
);

const mapStateToProps = createSelector(
    userSelector,
    (user) => ({
        user
    })
);

export default connect(mapStateToProps)(PublicNavbar);

import React from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';

const ContractNavbar = (props) => {

    const { itemLink } = props;
    return (
        <div className="public-navbar card mb-4">
            <div className="card-body">
                <nav className="nav">
                    <NavLink className="nav-link" to={`/dashBoard` + itemLink + `/cash`}>Cash</NavLink>
                    <NavLink className="nav-link" to={`/dashBoard` + itemLink + `/exchange`}>Exchange</NavLink>
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

export default connect(mapStateToProps)(ContractNavbar);

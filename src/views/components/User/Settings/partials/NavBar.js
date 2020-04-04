import React, {Fragment} from "react";
import {NavLink} from 'react-router-dom';



const NavBar = (prop) => {
    return (<Fragment>
        <ul className="nav flex-column">
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/setting/account-info">My Account</NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/setting/change-password">Change Password</NavLink>
            </li>
            {/* <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/setting/manage-membership">Manage Membership</NavLink>
            </li> */}
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/setting/stripe-connect">Payment</NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/setting/transactions">Transactions</NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/setting/notifications">Notifications</NavLink>
            </li>
        </ul>
    </Fragment>);
};

export default NavBar;

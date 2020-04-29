
import React, { Component, Fragment } from 'react';
import { Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { authActions, jobActions, serviceActions, searchActions, favoriteActions, proposalActions, messageActions } from '../../../common/redux/actions';
import Notification from "./Notification";
import { globalService as gs, itemService } from '../../../common/services';
import Search from "./Search";
import SearchIcon from '@material-ui/icons/Search';

class LoggedUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authentication: props.authentication,
            renderNotification: true,
            item: null,
            unread: 0,
        };
        this.unread = 0;
    }

    componentWillMount = () => {
        this.isNew();
        this.recipientCounter()
    };

    componentWillUnmount() {
        this.setState({ renderNotification: false });
    }

    onLogout = () => {
        const { dispatch } = this.props;
        dispatch(proposalActions.clear());
        dispatch(favoriteActions.clear());
        dispatch(jobActions.clear());
        dispatch(serviceActions.clear());
        dispatch(messageActions.clear());
        dispatch(searchActions.clear());
        dispatch(authActions.logout());
    };

    isNew = () => {
        itemService.isnew("GET").then(response => {
            this.setState({ item: response, });
        });
    };

    recipientCounter = () => {
        const userKey = parseInt(gs.identity.user.id);
        gs.db.ref(`UserMessageRecipient`)
            .orderByChild('recipients/' + userKey + '/id')
            .equalTo(userKey)
            .on("value", (snap) => this.process(snap));
    };

    process = (snap) => {
        const items = gs.ObjectToArray(snap.val());
        const userKey = parseInt(gs.identity.user.id);
        let unread = 0;
        items.map(async (item) => {
            if (item && item.recipients) {
                let rs = Object.values(item.recipients),
                    r = rs.find((r) => (userKey === parseInt(r.id)));
                unread += parseInt(r.unread);
            }
        });
        this.setState({ unread });
    };


    render() {
        const { authentication, item, renderNotification } = this.state;
        const user = authentication && authentication.loggedIn && authentication.authentication.user;

        return (<Fragment>
            <Nav className="navbar-nav navbar-profile order-sm-2 order-lg-4">
                
                {(renderNotification === true) && <Notification />}
                <a className="nav-link" href="/messages">
                    <img src="/images/Message.png" alt="" className="img-fluid" width="25" style={{marginTop: 10}} />
                    <span className="badge badge-info">{this.state.unread ? this.state.unread : ''}</span>
                </a>
                <NavDropdown title={
                    <span>
                        <img src={user && user.avatar} alt="" className="img-fluid border rounded-circle" width="40" height="40" />
                    </span>
                } className="profile-dropdown">
                    <Dropdown>
                        <Dropdown.Toggle as="a" className="dropdown-item pr-2 border-bottom-0" to="/profile">
                            Profile <i className="fas fa-angle-up float-right"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {/* <NavLink className="dropdown-item" to={"/dashBoard/services"}>My Services</NavLink> */}
                            <NavLink className="dropdown-item border-bottom-0" to="/dashBoard/user/update">My Profile</NavLink>
                            <NavLink className="dropdown-item border-bottom-0" to="/dashBoard/user/experience-and-education">Experience & Education</NavLink>
                            <NavLink className="dropdown-item border-bottom-0" to="/dashhBoard/user/co-founder">Co-Founder</NavLink>
                            {/* <NavLink className="dropdown-item" to={"/dashBoard/offers/received/services/cash"}><span className="badge badge-danger">{(item && item.UserService && item.UserService.offers > 0 ? `new` : '')}</span> Received Offers</NavLink> */}
                            {/* <NavLink className="dropdown-item" to={"/dashBoard/offers/sent/services/cash"}><span className="badge badge-danger">{(item && item.UserService && item.UserService.counter > 0 ? `new` : '')}</span> Sent Offers</NavLink> */}
                            {/* <NavLink className="dropdown-item" to={"/dashBoard/contracts/services/cash"}>Accepted Offers</NavLink> */}
                            {/* <NavLink className="dropdown-item" to={"/dashBoard/completed/services/cash"}>Completed Offers</NavLink> */}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle as="a" className="dropdown-item pr-2 border-bottom-0" to="/services">
                            Services <i className="fas fa-angle-up float-right"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <NavLink className="dropdown-item" to={"/dashBoard/services"}>My Services</NavLink>
                            <NavLink className="dropdown-item" to={"/dashBoard/offers/received/services/cash"}><span className="badge badge-danger">{(item && item.UserService && item.UserService.offers > 0 ? `new` : '')}</span> Received Offers</NavLink>
                            <NavLink className="dropdown-item" to={"/dashBoard/offers/sent/services/cash"}><span className="badge badge-danger">{(item && item.UserService && item.UserService.counter > 0 ? `new` : '')}</span> Sent Offers</NavLink>
                            <NavLink className="dropdown-item" to={"/dashBoard/contracts/services/cash"}>Accepted Offers</NavLink>
                            <NavLink className="dropdown-item" to={"/dashBoard/completed/services/cash"}>Completed Offers</NavLink>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle as="a" className="dropdown-item pr-2 border-bottom-0" to="/jobs">
                            Jobs <i className="fas fa-angle-up float-right"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <NavLink className="dropdown-item" to={"/dashBoard/jobs"}>My Jobs</NavLink>
                            <NavLink className="dropdown-item" to={"/dashBoard/offers/received/jobs/cash"}><span className="badge badge-danger">{(item && item.UserItem && item.UserItem.offers > 0 ? `new` : '')}</span> Received Proposals</NavLink>
                            <NavLink className="dropdown-item" to={"/dashBoard/offers/sent/jobs/cash"}><span className="badge badge-danger">{(item && item.UserItem && item.UserItem.counter > 0 ? `new` : '')}</span> Sent Proposals</NavLink>
                            <NavLink className="dropdown-item" to={"/dashBoard/contracts/jobs/cash"}>Accepted Proposals</NavLink>
                            <NavLink className="dropdown-item" to={"/dashBoard/completed/jobs/cash"}>Completed Proposals</NavLink>
                        </Dropdown.Menu>
                    </Dropdown>


                    {/*
                   <NavLink className="dropdown-item border-bottom-0" to="/services">My Services</NavLink>
                   <NavLink className="dropdown-item" to="/jobs">My Jobs</NavLink>
                  <Dropdown>
                        <Dropdown.Toggle as="a" className="dropdown-item pr-2 border-bottom-0" to="/offers/received/services">
                            Received Offers <i className="fas fa-angle-up float-right"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <NavLink className="dropdown-item" to={"/offers/received/services/cash"}> <span className="badge badge-danger">{(item && item.services > 0 ? `new` : '')}</span> Services  </NavLink>
                            <NavLink className="dropdown-item" to={"/offers/received/jobs/cash"}> <span className="badge badge-danger">{(item && item.jobs > 0 ? `new` : '')}</span> Jobs </NavLink>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle as="a" className="dropdown-item pr-2 border-bottom-0" to="/offers/sent/services">
                            Sent Offers <i className="fas fa-angle-up float-right"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <NavLink className="dropdown-item" to={"/offers/sent/services/cash"}>Services</NavLink>
                            <NavLink className="dropdown-item" to={"/offers/sent/jobs/cash"}>Jobs</NavLink>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle as="a" className="dropdown-item pr-2 border-bottom-0" to="/contracts/jobs">
                            Contracts <i className="fas fa-angle-up float-right"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <NavLink className="dropdown-item" to={"/contracts/services/cash"}>Services</NavLink>
                            <NavLink className="dropdown-item" to={"/contracts/jobs/cash"}>Jobs</NavLink>
                        </Dropdown.Menu>
                    </Dropdown> */}

                    <NavLink className="dropdown-item border-bottom-0" to="/dashBoard/user/connection/my-cofounder"><span className="badge badge-danger">{(item && item.connection && item.connection.requests > 0 ? `new` : '')}</span> Co-founders</NavLink>
                    <NavLink className="dropdown-item border-bottom-0" to="/dashBoard/user/favorite/services">Favorites</NavLink>
                    <Dropdown.Divider />
                    {/* <NavLink className="dropdown-item" to="/user/transactions">Transactions</NavLink> */}
                    <NavLink className="dropdown-item border-bottom-0" to="/dashBoard/stripe-connect">Payment Method</NavLink>
                    <NavLink className="dropdown-item border-bottom-0" to="/dashBoard/setting/transactions">Transactions</NavLink>
                    <NavLink className="dropdown-item border-bottom-0" to="/dashBoard/setting/notifications">Notifications</NavLink>
                    <NavLink className="dropdown-item border-bottom-0" to="/dashBoard/user/membership">Manage Membership</NavLink>
                    <NavLink className="dropdown-item border-bottom-0" to="/user/support">Support</NavLink>
                    {/* <NavLink className="dropdown-item" to={`/user/public/about/${this.user.id}`}>View Profile</NavLink>
                    <NavLink className="dropdown-item" to="/user/change-password">Change Password</NavLink> */}
                    <NavLink className="dropdown-item border-bottom-0" to="/home" onClick={this.onLogout}>Logout <small>({user && user.name})</small></NavLink>
                </NavDropdown>
            </Nav>



        </Fragment>);
    }
}

const authSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const proposalSelector = createSelector(
    state => state.proposals,
    proposals => proposals
);

const mapStateToProps = createSelector(
    authSelector, proposalSelector,
    (authentication, proposals) => ({
        authentication, proposals
    })
);

export default connect(mapStateToProps)(LoggedUser);
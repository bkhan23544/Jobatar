import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Search from "./Search";
import {createSelector} from "reselect";
import {connect} from "react-redux";
import LoggedUser from "./LoggedUser";
import { globalService as gs } from '../../../common/services';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: props.authentication.loggedIn,
            authentication: props.authentication,
            activeClass: ''
        }
    }

    componentWillMount = () => {
        /*gs.db.ref(`User/${gs.getUser().id}/is_notified`)
        .on("value", (snap) => {
            console.log('Main Component');
        });*/
        window.addEventListener('scroll', (e) => {
            let activeClass = 'fixed';
            if(window.scrollY === 0){
                activeClass = 'no-fixed';
            }
            this.setState({ activeClass });
        }, 9000);
    };


    render() {
        const { history } = this.props;
        const { loggedIn } = this.state;
        return (
            <header id="header" className={`${this.state.activeClass}`}>
                
                <Navbar bg="light" expand="xl" variant="light" className="">
                    <Container>
                        <NavLink className="navbar-brand" to="/">
                            <img src="/images/logo.svg" alt="" className="img-fluid" width="140" />
                        </NavLink>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Search history={history} />
                        {loggedIn ?
                            <LoggedUser /> :
                            <Nav className="navbar-nav navbar-profile order-2 order-xl-4">
                                 <NavLink className="nav-link btn btn-info ml-3 sign-up-btn" to="/register">Sign Up</NavLink>
                                <NavLink className="nav-link btn btn-info login-btn" to="/login">Sign in</NavLink>
                             
                            </Nav>
                        }
                        <Navbar.Collapse id="basic-navbar-nav" className="order-xl-3 mr-lg-5">
                            <Nav className="navbar-nav ml-auto navbar-main">
                                <NavLink activeClassName="active" className="nav-link" to="/how-it-works"><b>HOW IT WORKS</b></NavLink>
                                <NavDropdown title="BROWSE">
                                    <NavLink to="/job-search" className="dropdown-item"><b>Browse for Jobs</b><br/><small>To Apply For</small></NavLink>
                                    <NavLink to="/service-search" className="dropdown-item"><b>Browse for Services</b><br/> <small>To Buy or Exchange</small></NavLink>
                                    <NavLink to="/freelancer-search" className="dropdown-item"><b>Browse for Freelancers</b><br/> <small>To Hire</small></NavLink>
                                    <NavLink to="/cofounders-search" className="dropdown-item"><b>Browse for Co-founders</b><br/> <small>To Partner With</small></NavLink>
                                </NavDropdown>
                                <NavDropdown title="POST">
                                    <NavLink to="/job/create" className="dropdown-item"><b>Post a Job</b><br/><small>To Receive Offers</small></NavLink>
                                    <NavLink to="/service/create" className="dropdown-item"><b>Post a Service</b><br/><small>To Sell or Exchange</small></NavLink>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>

                       
                        
                    </Container>
                </Navbar>
            </header>
        );
    }
}


const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    authenticationSelector,
    (authentication) => ({
        authentication
    })
);

export default connect(mapStateToProps)(Header);




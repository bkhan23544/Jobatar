import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Main } from '../../layout';
import { DocumentTitle } from '../../../helpers/DocumentTitle';

class HelpAndFAQ extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        alert(this.state.value);
        event.preventDefault();
    }
    
    render() {
        return (<Main>
            <DocumentTitle title={`Help and FAQ`}/>
            <div className="help-page">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-lg-2">
                            <h1 className="text-center heading"><span>Help Center</span></h1>
                            <div className="any-search mb-3 mb-lg-4">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search Any Question" onChange={this.handleChange} />
                                        <div className="input-group-prepend">
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="border left-side py-3 mb-md-4 mb-3">
                                <h3 className="text-uppercase ml-3 mb-3">Faq</h3>
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <NavLink className="nav-link active" to="#">All</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="#">Freelancers</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="#">Jobs</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="#">Services</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="#">Getting Started</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="#">Message Center</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="#">Payment</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row">
                                <div className="col-lg-6 col-12 mb-3">
                                    <h3 className="d-flex align-items-center">
                                        <span className="col pl-0">Companies</span>
                                        <small><NavLink to="#">View All</NavLink></small>
                                    </h3>
                                    <ul className="list-text">
                                        <li className="border-bottom pb-2"><NavLink to="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Cras id lorem sagittis ex convallis rutrum a blandit orci?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Nunc laoreet dui eget quam efficitur?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Urabitur pharetra, lorem et venenatis consequa?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Vestibulum ullamcorper ornare molestie?</NavLink></li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-12 mb-3">
                                    <h3 className="d-flex align-items-center">
                                        <span className="col pl-0">Freelancers</span>
                                        <small><NavLink to="#">View All</NavLink></small>
                                    </h3>
                                    <ul className="list-text">
                                        <li className="border-bottom pb-2"><NavLink to="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Cras id lorem sagittis ex convallis rutrum a blandit orci?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Nunc laoreet dui eget quam efficitur?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Urabitur pharetra, lorem et venenatis consequa?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Vestibulum ullamcorper ornare molestie?</NavLink></li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-12 mb-3">
                                    <h3 className="d-flex align-items-center">
                                        <span className="col pl-0">Jobs</span>
                                        <small><NavLink to="#">View All</NavLink></small>
                                    </h3>
                                    <ul className="list-text">
                                        <li className="border-bottom pb-2"><NavLink to="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Cras id lorem sagittis ex convallis rutrum a blandit orci?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Nunc laoreet dui eget quam efficitur?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Urabitur pharetra, lorem et venenatis consequa?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Vestibulum ullamcorper ornare molestie?</NavLink></li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-12 mb-3">
                                    <h3 className="d-flex align-items-center">
                                        <span className="col pl-0">Projects</span>
                                        <small><NavLink to="#">View All</NavLink></small>
                                    </h3>
                                    <ul className="list-text">
                                        <li className="border-bottom pb-2"><NavLink to="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Cras id lorem sagittis ex convallis rutrum a blandit orci?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Nunc laoreet dui eget quam efficitur?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Urabitur pharetra, lorem et venenatis consequa?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Vestibulum ullamcorper ornare molestie?</NavLink></li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-12 mb-3">
                                    <h3 className="d-flex align-items-center">
                                        <span className="col pl-0">Getting Started</span>
                                        <small><NavLink to="#">View All</NavLink></small>
                                    </h3>
                                    <ul className="list-text">
                                        <li className="border-bottom pb-2"><NavLink to="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Cras id lorem sagittis ex convallis rutrum a blandit orci?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Nunc laoreet dui eget quam efficitur?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Urabitur pharetra, lorem et venenatis consequa?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Vestibulum ullamcorper ornare molestie?</NavLink></li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-12 mb-3">
                                    <h3 className="d-flex align-items-center">
                                        <span className="col pl-0">Message Center</span>
                                        <small><NavLink to="#">View All</NavLink></small>
                                    </h3>
                                    <ul className="list-text">
                                        <li className="border-bottom pb-2"><NavLink to="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Cras id lorem sagittis ex convallis rutrum a blandit orci?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Nunc laoreet dui eget quam efficitur?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Urabitur pharetra, lorem et venenatis consequa?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Vestibulum ullamcorper ornare molestie?</NavLink></li>
                                    </ul>
                                </div>
                                <div className="col-lg-6 col-12 mb-3">
                                    <h3 className="d-flex align-items-center">
                                        <span className="col pl-0">Payment</span>
                                        <small><NavLink to="#">View All</NavLink></small>
                                    </h3>
                                    <ul className="list-text">
                                        <li className="border-bottom pb-2"><NavLink to="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Cras id lorem sagittis ex convallis rutrum a blandit orci?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Nunc laoreet dui eget quam efficitur?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Urabitur pharetra, lorem et venenatis consequa?</NavLink></li>
                                        <li className="border-bottom pb-2"><NavLink to="#">Vestibulum ullamcorper ornare molestie?</NavLink></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>);
    }
}

export default HelpAndFAQ;
import React from 'react';
import { connect } from 'react-redux';
import { Main } from "../../layout";
import { createSelector } from "reselect";
import { authActions } from "../../../common/redux/actions";
import { Switch, Route, Link, NavLink, withRouter } from "react-router-dom";

export default class DashboardTab extends React.Component {
    render() {
        const result = false
        return (

            <div className="col-sm-8 col-md-9">

                <div className="dashboard-info">

                    <div className="row">

                        <div className="col-sm-3">
                            <div className="fun-fact">
                                <div className="media-body">
                                    <h1>$0.00</h1>
                                    <span>Total Amount</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="fun-fact">
                                <div className="media-body">
                                    <h1>4</h1>
                                    <span>Active Proposals</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="fun-fact">
                                <div className="media-body">
                                    <h1>3</h1>
                                    <span>Active Offers</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-3">
                            <div className="fun-fact">
                                <div className="media-body">
                                    <h1>0</h1>
                                    <span>Total Milestones</span>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

                {result &&
                    <div className="prop-info text-center">
                        <i className="fa fa-align-left fa-5x"></i>
                        <h3>You have no recent contracts.</h3>
                        <p>Look for work here <a href="">Home</a></p>
                    </div>
                }

                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Active Proposals</h3>
                    </div>
                    <div className="box-body">
                        <div className="table-responsive">
                            <table id="example1" className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Freelancer</th>
                                        <th>Job Title</th>
                                        <th>Workroom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src="assets/img/users/1.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image" />
                                            <a href="company.html">Anna Morgan</a>
                                        </td>
                                        <td><a href="#">I need a designer to design a logo & questionnaire for a Nutrition Company</a></td>
                                        <td><a href="#" className="kafe-btn kafe-btn-mint-small">Chat</a></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="assets/img/users/3.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image" />
                                            <a href="company.html">Benjamin Robinson</a>
                                        </td>
                                        <td><a href="#">Professional writer required</a></td>
                                        <td><a href="#" className="kafe-btn kafe-btn-mint-small">Chat</a></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="assets/img/users/4.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image" />
                                            <a href="company.html">Sean Coleman</a>
                                        </td>
                                        <td><a href="#">Content Writers Needed</a></td>
                                        <td><a href="#" className="kafe-btn kafe-btn-mint-small">Chat</a></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="assets/img/users/5.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image" />
                                            <a href="company.html">Vanessa Wells</a>
                                        </td>
                                        <td><a href="#">Website Design</a></td>
                                        <td><a href="#" className="kafe-btn kafe-btn-mint-small">Chat</a></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Client</th>
                                        <th>Job Title</th>
                                        <th>Freelancer</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <ContractListing status="Contracts" title="Active Proposals" module="UserItem" settlement="cash" itemLink="/contracts/jobs" abc={true}/> */}

                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Active Offers</h3>
                    </div>
                    <div className="box-body">
                        <div className="table-responsive">
                            <table id="example1" className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Freelancer</th>
                                        <th>Job Title</th>
                                        <th>Workroom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img src="assets/img/users/1.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image" />
                                            <a href="company.html">Anna Morgan</a>
                                        </td>
                                        <td><a href="#">I need a designer to design a logo & questionnaire for a Nutrition Company</a></td>
                                        <td><a href="#" className="kafe-btn kafe-btn-mint-small">Chat</a></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="assets/img/users/3.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image" />
                                            <a href="company.html">Benjamin Robinson</a>
                                        </td>
                                        <td><a href="#">Professional writer required</a></td>
                                        <td><a href="#" className="kafe-btn kafe-btn-mint-small">Chat</a></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img src="assets/img/users/4.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image" />
                                            <a href="company.html">Sean Coleman</a>
                                        </td>
                                        <td><a href="#">Content Writers Needed</a></td>
                                        <td><a href="#" className="kafe-btn kafe-btn-mint-small">Chat</a></td>
                                    </tr>
                                    {/* <tr>
                                        <td>
                                            <img src="assets/img/users/5.jpg" className="img-responsive img-circle pull-left" width="50" height="50" alt="Image" />
                                            <a href="company.html">Vanessa Wells</a>
                                        </td>
                                        <td><a href="#">Website Design</a></td>
                                        <td><a href="#" className="kafe-btn kafe-btn-mint-small">Chat</a></td>
                                    </tr> */}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Client</th>
                                        <th>Job Title</th>
                                        <th>Freelancer</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
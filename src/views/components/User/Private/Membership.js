import React, { Component } from 'react';
import { Main } from '../../../layout';

class Membership extends Component {
    render() {
        return (<Main>
            <div className="subscribe-page">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center heading"><span>Pricing Plans</span></h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 col-12">
                            <div className="card plan-box">
                                <div className="card-body px-0">
                                    { /* <div className="icon d-flex justify-content-center">
                                        <div className="round d-flex justify-content-center align-items-center"><i className="far fa-dot-circle"></i></div>
                                    </div> */ }
                                    <div className="caption">
                                        <h3 className="card-title">Basic <br /><small>1 Month Plan</small></h3>
                                        <h3 className="price">$19.99 / <small>Month</small></h3>
                                        <div className="text px-3">
                                            <p>$19.99 billed monthly, cancel anytime <br /> <span className="text-info font-weight-bold">&nbsp;</span></p>
                                            <p>Unlimited access to service exchange &amp; find co-founders</p>
                                        </div>
                                        <div className="button px-3">
                                            <button className="btn btn-block btn-info">Purchase now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                            <div className="card plan-box active">
                                <div className="card-body px-0">
                                    {/* <div className="icon d-flex justify-content-center">
                                        <div className="round d-flex justify-content-center align-items-center"><i className="far fa-dot-circle"></i></div>
                                    </div> */}
                                    <div className="caption">
                                        <h3 className="card-title">Standard <br /> <small>6 Months Plan</small></h3>
                                        <h3 className="price">$14.99 / <small>Month</small></h3>
                                        <div className="text px-3">
                                            <p>$89.94 billed semi-annually, cancel anytime <br /> <span className="text-info font-weight-bold">Save $30</span></p>
                                            <p>Unlimited access to service exchange &amp; find co-founders</p>
                                        </div>
                                        <div className="button px-3">
                                            <button className="btn btn-block btn-info">Purchase now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                            <div className="card plan-box">
                                <div className="card-body px-0">
                                    {/* <div className="icon d-flex justify-content-center">
                                        <div className="round d-flex justify-content-center align-items-center"><i className="far fa-dot-circle"></i></div>
                                    </div> */}
                                    <div className="caption">
                                        <h3 className="card-title">Premium <br /> <small>12 Months Plan</small></h3>
                                        <h3 className="price">$8.99 / <small>Month</small></h3>
                                        <div className="text px-3">
                                            <p>$107.88 billed annually, cancel anytime<br /> <span className="text-info font-weight-bold">Save $132</span></p>
                                            <p>Unlimited access to service exchange &amp; find co-founders</p>
                                        </div>
                                        <div className="button px-3">
                                            <button className="btn btn-block btn-info">Purchase now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <p className="text-center">In the midst of the coronavirus pandemic, we are waiving our membership plan for all of our new members to use our unlimited access to exchange services and to connect with co-founders for the next 6 months. As a socially committed company, we are committed to do our part and do everything in our power to help our community of freelancers work remotely. Thank you for being a valuable member of our trusted community.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Main>);
    }
}

export default Membership;
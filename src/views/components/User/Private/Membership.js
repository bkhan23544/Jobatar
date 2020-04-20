import React, { Component } from 'react';
import { Main } from '../../../layout';

class Membership extends Component {
    render() {
        return (
            // <Main>
            <>
                <div className="subscribe-page col-lg-9 col-sm-12">
                    <div className="">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="text-center heading"><span>Pricing Plans</span></h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="card plan-box">
                                    <div className="card-body px-0">
                                        {/* <div className="icon d-flex justify-content-center">
                                        <div className="round d-flex justify-content-center align-items-center"><i className="far fa-dot-circle"></i></div>
                                    </div> */}
                                        <div className="caption">
                                            <h3 className="card-title">Basic <br /><small>1 Month Plan</small></h3>
                                            <h3 className="price">$39.99 / <small>Month</small></h3>
                                            <div className="text px-3">
                                                <p>$39.99 billed monthly, cancel anytime <br /> <span className="text-info font-weight-bold">&nbsp;</span></p>
                                                <p>Unlimited access to service exchange &amp; find co-founders</p>
                                            </div>
                                            <div className="button px-3">
                                                <button className="btn btn-block btn-info">Purchase now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="card plan-box active">
                                    <div className="card-body px-0">
                                        {/* <div className="icon d-flex justify-content-center">
                                        <div className="round d-flex justify-content-center align-items-center"><i className="far fa-dot-circle"></i></div>
                                    </div> */}
                                        <div className="caption">
                                            <h3 className="card-title">Standard <br /> <small>6 Months Plan</small></h3>
                                            <h3 className="price">$24.99 / <small>Month</small></h3>
                                            <div className="text px-3">
                                                <p>$179.94 billed semi-annually, cancel anytime <br /> <span className="text-info font-weight-bold">Save $60</span></p>
                                                <p>Unlimited access to service exchange &amp; find co-founders</p>
                                            </div>
                                            <div className="button px-3">
                                                <button className="btn btn-block btn-info">Purchase now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-12">
                                <div className="card plan-box">
                                    <div className="card-body px-0">
                                        {/* <div className="icon d-flex justify-content-center">
                                        <div className="round d-flex justify-content-center align-items-center"><i className="far fa-dot-circle"></i></div>
                                    </div> */}
                                        <div className="caption">
                                            <h3 className="card-title">Premium <br /> <small>12 Months Plan</small></h3>
                                            <h3 className="price">$19.99 / <small>Month</small></h3>
                                            <div className="text px-3">
                                                <p>$239.88 billed annually, cancel anytime<br /> <span className="text-info font-weight-bold">Save $240</span></p>
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
                                <p className="text-center memText">We are waiving our membership plan for our first 1,000 users for the first 6 months as a token of our appreciation. Enjoy your unlimited access to all of our features. Thank you for being a valuable member of our trusted community.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            // </Main>
        );
    }
}

export default Membership;
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class StripeConnection  extends Component {
    render() {
        return (
            <div className="create-service bg-body">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-12 mx-auto">
                            <div className="card custom-card success-service py-md-3">
                                <div className="card-body">
                                    <div className="image mb-3">
                                        <img src="/images/success1.PNG" alt="" className="img-fluid" />
                                    </div>
                                    <h2>Your Stripe account is not connected yet.</h2>
                                    <p>Please provide your Stripe account information before posting a service.</p>
                                    <p className="mb-0"><NavLink to={'/setting/stripe-connect'} className="btn btn-primary text-uppercase px-3 active font-weight-bold">Go to Stripe Connection</NavLink></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StripeConnection;

import React, { Component } from 'react';
import {Main} from "../../layout";
import { NavLink } from 'react-router-dom';


class ServiceSuccess  extends Component {
    render() {
        return (<Main>
            <div className="create-service bg-body">
                <div className="container">
                    <div className="row">
                        <div className="col-md-10 col-12 mx-auto">
                            <div className="card custom-card success-service py-md-3">
                                <div className="card-body">
                                    <div className="image mb-3">
                                        <img src="/images/success1.PNG" alt="" className="img-fluid" />
                                    </div>
                                    <h2>Your information has been submited successfully</h2>
                                    {/* <p>This information first goes to verify and approval. we ‘ll send you notification before publishing. <br /> Generally it will take 24-48 hours to review your</p> */}
                                    <p className="mb-0"><NavLink to={'/service-search'} className="btn btn-primary text-uppercase px-3 active font-weight-bold">Return to services</NavLink></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>);
    }
}

export default ServiceSuccess;

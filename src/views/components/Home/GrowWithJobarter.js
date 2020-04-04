import React, { Component } from 'react';

class GrowWithJobarter extends Component {
    render() {
        return (
            <div className="hGrow">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-center">Grow with JoBarter</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-2 col">
                            <div className="couter">
                                <big>12 Million</big>
                                <small>Services Completed</small>
                            </div>
                        </div>
                        <div className="col-lg-2 col">
                            <div className="couter">
                                <big>10000+</big>
                                <small>Freelancers</small>
                            </div>
                        </div>
                        <div className="col-lg-2 col">
                            <div className="couter">
                                <big>25000+</big>
                                <small>Jobs</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GrowWithJobarter;
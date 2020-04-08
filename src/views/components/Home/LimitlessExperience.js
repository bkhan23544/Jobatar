import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import "../../../custom.css"

class LimitlessExperience extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                value: ""
            },
            show: false
        };
        this.loggedIn = props.loggedIn;
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });


    render() {
        return (
            <div className="hExperience">
                <div className="container">


                    <div class="section-title section-padding">
                        <h1 className="explore">LIMITLESS EXPERIENCE</h1>
                        <p className="tagline-text">Flexible options for your business</p>
                    </div>

                    <div className="row container">
                        <span className="col-md-6" onClick={this.handleShow} className="layer"><img src="assets/img/video.jpg" alt="" className="img-fluid" width={500} /></span>
                        <div className="col-md-6 ml-5">
                            <div>
                                <h2>Easily hire top freelancers</h2>
                                <h6>Post jobs to hire talented freelancers per hour or fixed price</h6>
                            </div>

                            <div>
                                <h2>Exchange Services</h2>
                                <h6>Flexible options to exchange services. No money required</h6>
                            </div>

                            <div>
                                <h2>Find Co-founders</h2>
                                <h6>Connect with ideal partners to partner with for your business ideas</h6>
                            </div>
                        </div>
                    </div>

                </div>

                <Modal show={this.state.show} onHide={this.handleClose} className="demo-model" centered size="lg">
                    <Modal.Header closeButton className="py-2">
                        <Modal.Title as="h5">Watch our demo video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="p-0" style={{ marginBottom: '-7px' }}>
                        <video controls autoPlay className="w-100">
                            <source src="/images/JoBarterMainCorrected.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {/* <iframe width="560" className="w-100" title="Demo video"  height="515" src="https://www.youtube.com/embed/8HB4sA1dte0?&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default LimitlessExperience;
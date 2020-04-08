import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
// eslint-disable-next-line
import HomeSearch from './partials/HomeSearch';
import { NavLink } from "react-router-dom";


class Banner extends Component {

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
            <div className="hBanner">
                <img src="images/home.jpg" alt="" className="img-fluid w-100" />
                <div className="caption d-flex align-items-center" style={{background: 'rgba(0,0,0,0)'}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-9 col-12 mr-auto banner-text">
                                <h2 className="pt-lg-3 w-100 pull-left">Turn your dreams into reality.<br />
                                    <b>
                                        <big>Hire top-notch freelancers. Exchange your services. Connect with ideal co-founders.
                                    </big></b><br />
                                    {/* <b><small>
                                         We are still finalizing JoBarter. Please sign up and we will keep you updated on our progress.
                                        </small>
                                    </b> */}
                                </h2>
                                {!this.loggedIn &&
                                    <div className="w-100 pull-left mb-3">
                                    <NavLink className="btn btn-info" to="/register">SIGN UP NOW</NavLink>
                                </div> }
                                { /* <HomeSearch /> */}
                                <div className="w-100 pull-left example d-flex align-items-center">
                                    <button onClick={this.handleShow} className="btn btn-white d-flex align-items-center justify-content-center"><i className="fas fa-play"></i></button>
                                    <h6>Watch our demo video</h6>
                                </div>
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

export default Banner;
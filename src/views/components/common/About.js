import React from 'react';
import { connect } from 'react-redux';
import {createSelector} from 'reselect';
import { NavLink } from "react-router-dom";
import { Main } from '../../layout';
import { Container, Row, Col } from 'react-bootstrap';
import { DocumentTitle } from '../../../helpers/DocumentTitle';

class About extends React.Component {

    componentDidMount() {

    }

    render() {
        const { location } = this.props;
        let search = new URLSearchParams(location.search);

        return (<Main onlycontent={search.get("onlycontent")}>
            <DocumentTitle title={`About Us`}/>
            <div className="about-page">
                <div className="w-100">
                    <Container>
                        <Row>
                            <Col className="mb-lg-4">
                                <h1 className="text-center heading"><span>About Us</span></h1>

                                <p className="text-center">Our dedicated team at JoBarter believe in a world filled with endless possibilities and we are deeply passionate in making these opportunities available to everyone.</p>

<p className="text-center">Whether your talent is in sales, design or programming, we have everything that you need to help you reach your financial goals. We believe that everyone is good at something, and we help freelancers from around the world seize each new opportunity to use their gifts and pursue their passion.</p>

 <p className="text-center">Our mission is to empower people to use their talents and skills to get things done, provide for their families, and realize their dreams. This mission is what drives us at JoBarter to help revolutionize the future of jobs.</p>

<p className="text-center">
Founded in 2019, JoBarter is a one-stop marketplace for freelancers, small business owners, startup founders and entrepreneurs. We are an ecosystem that offers an array of services into a centralized platform to provide the best and most efficient user experience.</p>
<p className="text-center">
Team JoBarter is working every day and night to fulfill our mission. We believe that the next frontier in freelancing is happening now and we are honored to play a meaningful part in it. </p>
                            </Col>
                        </Row>
                    </Container>
                </div>

                { /* <div className="w-100 why-choose">
                    <Container>
                        <Row>
                            <div className="col-lg-5 col-md-7 py-lg-4 py-3">
                                <h3><span>Why Choose Us</span></h3>
                                <p>Fusce dictum mauris nec magna consequat, ut semper leo pulvinar. Cras rhoncus lorem lorem, a fermentum lacus congue vehicula. Nullam luctus mi eget nisl tincidunt lobortis.</p>
                                <ul className="checkbox">
                                    <li>Cras rhoncus lorem lorem, a fermentum lacus congue vehicula. Nullam luct mi eget nisl tincidunt lobortis.</li>
                                    <li>Cras rhoncus lorem lorem, a fermentum lacus congue vehicula. Nullam luct mi eget nisl tincidunt lobortis.</li>
                                    <li>Cras rhoncus lorem lorem, a fermentum lacus congue vehicula. Nullam luct mi eget nisl tincidunt lobortis.</li>
                                </ul>
                            </div>
                        </Row>
                    </Container>
        </div> */ }

                <div className="w-100 team">
                    <Container>
                        <Row>
                            <Col className="mb-lg-3">
                                <h3 className="text-center"><span>Our Leadership Team</span></h3>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md="3" sm="6">
                                    <div className="team-box border">
                                        <div className="image">
                                            <img src={'images/Steeve_Simbert_Profile_Pic.jpg'} alt="Steeve Simbert" className="img-fluid" />
                                        </div>
                                        <div className="caption text-center">
                                            <h5 className="text-truncate"><NavLink to="#">Steeve Simbert</NavLink></h5>
                                            <div className="position">CEO</div>
                                        </div>
                                    </div>
                                </Col>

                                <Col md="3" sm="6">
                                    <div className="team-box border">
                                        <div className="image">
                                            <img src={'images/France_Matias_Profile_Pic.jpg'} alt="France Matias" className="img-fluid" />
                                        </div>
                                        <div className="caption text-center">
                                            <h5 className="text-truncate"><NavLink to="#">France Matias</NavLink></h5>
                                            <div className="position">CIO</div>
                                        </div>
                                    </div>
                                </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Main>);
    }
}

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);


const mapStateToProps = createSelector(
    authenticationSelector,

    (authentication) =>
        ({authentication})
);

export default connect(mapStateToProps)(About);

import React, { Component } from 'react';
import { Main } from '../../layout';
import { Link } from 'react-router-dom';
import { Form, Button, Media } from 'react-bootstrap';


class BlogView extends Component {
    render() {
        const { params } = this.props.match;
        console.log(this.props.match);
        return (<Main>
            <div className="bIndividual">
                <div className="container bg-white">
                    <div className="row">
                        <div className="col-12">
                            <div className="content py-3">
                                <figure>
                                    <img src="/images/blog-individual.jpg" alt="" className="img-fluid w-100" />
                                </figure>
                                <h2>Who Else Wants To Be Successful With Business {params.slug}</h2>
                                <ul className="updated d-flex align-items-center flex-wrap">
                                    <li className=""><Link to="#"> June 27, 2018</Link></li>
                                    <li><Link to="#"><i className="far fa-user"></i> Willis Wainright</Link></li>
                                    <li><Link to="#"><i className="fas fa-tag"></i> Lifestyle & DIY</Link></li>
                                    <li><Link to="#"><i className="fas fa-bug"></i> Report Post</Link></li>
                                </ul>
                                <div className="details">
                                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed utem perspiciatis undesieu omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aiam eaqueiu ipsa quae ab illo inventore veritatisetm quasitea architecto beatae vitae dictaed quia consequuntur magni dolores eos quist ratione voluptatem sequei nesciunt. Neque porro quam est qui dolorem ipsum quia dolor sitem amet consectetur adipisci velit sed quianon numquam eius modi tempora incidunt ut labore etneise dolore magnam aliquam quaerat tatem dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.</p>
                                    <figure className="text-center">
                                        <img src={'/images/blog-content-1.jpg'} alt="" className="img-fluid" />
                                    </figure>
                                    <p>ncididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiate nulla pariatur. Excepteur sint occaecat cupidatat ainon proident sunt in culpa qui officia deserunt mollit anim id est laborum ut perspiciatis unde.</p>                                    
                                    <figure>
                                        <img src={'/images/blog-content-2.png'} alt="" className="img-fluid" />
                                        <figcaption className="text-center">As per current survey perspiciatis unde omnis iste natus error sit voluptatem.</figcaption>
                                    </figure>
                                    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                                    <ul className="list-inline">
                                        <li>Nemo enim ipsam voluptatem quia</li>
                                        <li>Adipisci velit, sed quia non numquam eius modi tempora </li>
                                        <li>Eaque ipsa quae ab illo inventore veritatis et quasi architecto </li>
                                        <li>Qui dolorem ipsum quia dolor sit amet</li>
                                    </ul>
                                    <p className="w-100">Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi quaerat voluptatem.</p>
                                    <div className="row">
                                        <div className="col-md-4 col-lg-3">
                                            <figure className="float-left text-center">
                                                <img src={'/images/blog-content-3.png'} alt="" className="img-fluid" />
                                                <figcaption className="text-center">As per current survey perspiciatis</figcaption>
                                            </figure>
                                        </div>
                                        <div className="col-md-8 col-lg-9">
                                            <p>Laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque lum, totam rem aiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dictation explicabo. nemo enim ipsam voluptatem quia voluptas. </p>
                                            <ul className="list-inline">
                                                <li>Nemo enim ipsam voluptatem quia</li>
                                                <li>Adipisci velit, sed quia non numquam eius modi tempora</li>
                                                <li>Eaque ipsa quae ab illo inventore veritatis et quasi architecto</li>
                                                <li>Qui dolorem ipsum quia dolor sit amet </li>
                                            </ul> 
                                            <br />
                                            <p className="">Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eiuste modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                                        </div>
                                    </div>

                                    

                                    <p>Excepteur sint eccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aiam eaque ipsa quae ab illo inventore veritatis et qaenuasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia.</p>
                                    <figure className="float-right ml-4">
                                        <img src={'/images/blog-content-4.png'} alt="" className="img-fluid" />
                                        <figcaption className="text-center">As per current survey perspiciatis</figcaption>
                                    </figure>
                                    <p>Laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque lum, totam rem aiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dictation explicabo. nemo enim ipsam voluptatem quia voluptas. </p>
                                    <ul className="list-inline">
                                        <li>Nemo enim ipsam voluptatem quia</li>
                                        <li>Adipisci velit, sed quia non numquam eius modi tempora</li>
                                        <li>Eaque ipsa quae ab illo inventore veritatis et quasi architecto</li>
                                        <li>Qui dolorem ipsum quia dolor sit amet </li>
                                    </ul>
                                    <p>Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eiuste modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

                                    <p>Excepteur sint eccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aiam eaque ipsa quae ab illo inventore veritatis et quasite architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia.</p>

                                    <figure>
                                        <img src={'/images/blog-content-5.png'} alt="" className="img-fluid" />
                                    </figure>

                                    <p>Laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque lum, totam rem aiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dictation explicabo. nemo enim ipsam voluptatem quia voluptas. </p>
                                    <ul className="list-inline">
                                        <li>Nemo enim ipsam voluptatem quia</li>
                                        <li>Adipisci velit, sed quia non numquam eius modi tempora</li>
                                        <li>Eaque ipsa quae ab illo inventore veritatis et quasi architecto</li>
                                        <li>Qui dolorem ipsum quia dolor sit amet </li>
                                    </ul>
                                    <p>Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eiuste modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

                                </div>

                                <div className="tags border-top d-flex flex-wrap align-items-center justify-content-center">
                                    <div className="d-flex align-items-center col pl-0">
                                        <big>Tag:</big>
                                        <ul className="chip d-flex align-items-center mb-0">
                                            <li><Link to="#" className="active">Sales</Link></li>
                                            <li><Link to="#">Tyre</Link></li>
                                            <li><Link to="#">DIY</Link></li>
                                            <li><Link to="#">Medical</Link></li>
                                            <li><Link to="#">Transport</Link></li>
                                        </ul>
                                    </div>
                                    <div className="sharing d-flex align-items-center">
                                        <big>Share this blog</big>
                                        <ul className="d-flex ">
                                            <li><Link to="#"><i className="fab fa-facebook-f"></i></Link></li>
                                            <li><Link to="#"><i className="fab fa-twitter-square"></i></Link></li>
                                            <li><Link to="#"><i className="fab fa-linkedin-in"></i></Link></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="comments border-top">
                                    <h4 className="comment-count">03 Comments</h4>
                                    <ul className="list-unstyled">
                                        <Media as="li">
                                            <img
                                            width={64}
                                            height={64}
                                            className="mr-3"
                                            src="/images/blog-comment-user.png"
                                            alt="Generic placeholder"
                                            />
                                            <Media.Body>
                                                <h5>Shakita Polinsky <br /> 
                                                    <small>11 days ago</small>
                                                    <button className="btn btn-link">Click To Reply </button>
                                                </h5>
                                                <p>
                                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                                    ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                                    tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                                                    fringilla. Donec lacinia congue felis in faucibus.
                                                </p>
                                                {[1,2,3].map((item) => 
                                                    <Media>
                                                        <img
                                                            width={64}
                                                            height={64}
                                                            className="mr-3"
                                                            src="/images/blog-comment-user.png"
                                                            alt="Generic placeholder"
                                                        />
                                                        <Media.Body>
                                                            <h5>Media Heading <br /> <small>11 days ago</small></h5>
                                                            <p>
                                                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
                                                            scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
                                                            vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
                                                            vulputate fringilla. Donec lacinia congue felis in faucibus.
                                                            </p>
                                                        </Media.Body>
                                                    </Media>
                                                )}
                                            </Media.Body>
                                        </Media>
                                    </ul>
                                    <div className="load-more text-center">
                                        <button className="btn btn-info">Load More</button>
                                    </div>
                                    <div className="from">
                                        <h4>Leave Your Comment</h4>
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 col-12">
                                                    <Form.Group controlId="commentName">
                                                        <Form.Control type="text" placeholder="Name*" name="name" />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <Form.Group controlId="commentEmail">
                                                        <Form.Control type="email" placeholder="Email*" name="email" />
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 col-12">
                                                    <Form.Group controlId="commentPhone">
                                                        <Form.Control type="text" placeholder="Phone*" name="phone" />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <Form.Group controlId="commentSubject">
                                                        <Form.Control type="text" placeholder="Subject*" name="subject" />
                                                    </Form.Group>
                                                </div>
                                                <div className="col-12">
                                                    <Form.Group controlId="commentMessage">
                                                        <Form.Control as="textarea" rows="4" placeholder="Message*" name="message" />
                                                    </Form.Group>
                                                    <Form.Group controlId="commentMessage">
                                                        <Button variant="info" type="submit">Send</Button>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6 col-12"></div>
                                                <div className="col-md-6 col-12"></div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>);
    }
}

export default BlogView;
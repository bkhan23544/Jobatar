import React, {Component} from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

class Testimonials extends Component {
    items = [
        {id: 1, title: 'Architect & Designer', name: 'José Luis Angarita. Ph.D.', image: '/images/new/client-1.jpg', description: 'As a freelancer for the past ten years, I love the concept behind JoBarter.  I have the flexible options to earn money charging on an hourly basis or fixed price. When business is slow, I use my skills to exchange services with other talented  freelancers from the platform.'},
        {id: 2, title: 'Architect & Designer', name: 'José Luis Angarita. Ph.D.', image: '/images/new/client-2.jpg', description: 'As a freelancer for the past ten years, I love the concept behind JoBarter.  I have the flexible options to earn money charging on an hourly basis or fixed price. When business is slow, I use my skills to exchange services with other talented  freelancers from the platform.'},
        {id: 3, title: 'Architect & Designer', name: 'José Luis Angarita. Ph.D.', image: '/images/new/client-3.jpg', description: 'As a freelancer for the past ten years, I love the concept behind JoBarter.  I have the flexible options to earn money charging on an hourly basis or fixed price. When business is slow, I use my skills to exchange services with other talented  freelancers from the platform.'},
        {id: 4, title: 'Architect & Designer', name: 'José Luis Angarita. Ph.D.', image: '/images/new/client-4.jpg', description: 'As a freelancer for the past ten years, I love the concept behind JoBarter.  I have the flexible options to earn money charging on an hourly basis or fixed price. When business is slow, I use my skills to exchange services with other talented  freelancers from the platform.'},
        {id: 5, title: 'Architect & Designer', name: 'José Luis Angarita. Ph.D.', image: '/images/new/client-5.jpg', description: 'As a freelancer for the past ten years, I love the concept behind JoBarter.  I have the flexible options to earn money charging on an hourly basis or fixed price. When business is slow, I use my skills to exchange services with other talented  freelancers from the platform.'},
        {id: 6, title: 'Architect & Designer', name: 'José Luis Angarita. Ph.D.', image: '/images/new/client-6.jpg', description: 'As a freelancer for the past ten years, I love the concept behind JoBarter.  I have the flexible options to earn money charging on an hourly basis or fixed price. When business is slow, I use my skills to exchange services with other talented  freelancers from the platform.'},
        {id: 7, title: 'Architect & Designer', name: 'José Luis Angarita. Ph.D.', image: '/images/new/client-7.jpg', description: 'As a freelancer for the past ten years, I love the concept behind JoBarter.  I have the flexible options to earn money charging on an hourly basis or fixed price. When business is slow, I use my skills to exchange services with other talented  freelancers from the platform.'},
        {id: 8, title: 'Architect & Designer', name: 'José Luis Angarita. Ph.D.', image: '/images/new/client-8.jpg', description: 'As a freelancer for the past ten years, I love the concept behind JoBarter.  I have the flexible options to earn money charging on an hourly basis or fixed price. When business is slow, I use my skills to exchange services with other talented  freelancers from the platform.'},
    ];
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
        };
    }
    slideToThumb = (i) => {
        this.Carousel.slideTo(i);
        //this.setState({ currentIndex: i });
    }

    render() {
        const { currentIndex } = this.state;
        return (
            <div className="hTestimonial">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className="explore">TESTIMONIALS</h1>
                        </div>
                        <div className="col-12">
                            <div className="slider">
                                <ul className="tubmb-slide">{this.items.map((item, i) =>
                                    <li key={`thumb${item.id}`} onClick={() => this.slideToThumb(i)} className={`thumb ${(currentIndex === i) ? 'active' : ''}`}>
                                        <img src={item.image} alt="" className="img-fluid" />
                                    </li>)}
                                </ul>
                                <AliceCarousel
                                    dotsDisabled={true}
                                    buttonsDisabled={false}
                                    mouseTrackingEnabled={false}
                                    fadeOutAnimation={true}
                                    items={this.items.map(item => <div key={`large${item.id}`} className="items">
                                        <div className="image"><img src={item.image} alt="" className="img-fluid" /></div>
                                        <div className="caption d-flex">
                                            <div className="icon">
                                                <img src="/images/new/testmonial-icon.png" alt=""/>
                                            </div>
                                            <div className="text">
                                                <div className="desc">"{item.description}"</div>
                                                <h5>{item.name} <br /> {item.title}</h5>
                                            </div>
                                        </div>
                                    </div>)}
                                    ref={(el) => (this.Carousel = el)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Testimonials;
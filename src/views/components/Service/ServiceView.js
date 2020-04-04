import React, { Component, Fragment } from 'react';
import { Main } from '../../layout';
import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link, Element } from 'react-scroll';
import { Redirect } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import { globalService as gs, itemService } from "../../../common/services";
import { ProposalReceived } from "../Contract/partials";
import { ModuleHelper } from '../../../helpers/module.helper';

class ServiceView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            id: null,
            is_redirected: false,
            galleryItems: [],
        };
    }

    componentWillMount() {
        const { match } = this.props;
        const id = match.params.id;
        this.setState({ id: id ? id : null });
        itemService.service("GET", null, { item_id: id }).then(res => {
            const item = res.model;
            if (item){
                if (item && item.user && !gs.isOwner(item.user.id)) {
                    this.setState({ is_redirected: true });
                }

                if (item && item.media) {
                    this.setState({ item: item, galleryItems: item.media.image });
                }
            }
        });
    }

    async componentDidMount() {
        const { item } = this.state;
        if (item && item.user && !gs.isOwner(item.user.id)) {
            this.setState({ is_redirected: true });
        }
    }

    render() {

        const { item, is_redirected, galleryItems } = this.state;
        if (item && is_redirected === true) {
            return (<Redirect to={`/user/public/service/view/${item.id}`} />)
        }
        return (<Main>
            {item && <div className="individual-service bg-body">
                <DocumentTitle title={item && item.title} />
                <div className="bg-white bottom-shadow w-100 float-left">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1>{item && item.title}</h1>
                                <div className="d-flex align-items-center headings flex-wrap">
                                    <div className="col pl-0 d-flex align-items-center flex-wrap mobile-width">
                                        <div className="sold">
                                            {item && item.category && item.category.title}
                                        </div>
                                        <div className="sold">{(item && item.proposal_count === 0) ? 'Not Booked' : `${item && item.proposal_count} Times Booked`} </div>
                                        <div className="price">{(item && item.budget === null) ? <small>Not Set</small> : `$${item && item.budget}`}</div>
                                        <div className="ratings d-flex align-items-center">
                                            {(parseFloat(item && item.avg_rating) !== 0) && <small>({parseFloat(item && item.avg_rating)})</small>}
                                            <Box component="fieldset" mx={1} borderColor="transparent">
                                                <Rating value={parseFloat(item && item.avg_rating)} readOnly />
                                            </Box>
                                            {(item && item.proposal_count !== 0) && <small className="count">{item.proposal_count}</small>}
                                        </div>

                                    </div>
                                    {item.received_offers && <div className="auction d-flex align-items-center">
                                        <div className="offer">
                                            <Link className="btn btn-sm btn-outline-primary" to="offers_received" smooth={true} duration={1000}>Offers Received ({item.received_offers})</Link>
                                        </div>
                                    </div>}
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-12">
                                {galleryItems &&
                                    <Fragment>
                                        <AliceCarousel className="mb-3"
                                            dotsDisabled={true}
                                            buttonsDisabled={true}
                                            slideToIndex={1}
                                            fadeOutAnimation={true}
                                            items={galleryItems.map((img) => (<div key={img.id} className="item"><img src={img.banner} alt="Gallery" className="img-fluid" /></div>))}
                                            ref={(el) => (this.Carousel = el)}
                                        />
                                        <nav className="d-flex galleryThumb">{galleryItems.map((thumb, i) => (<div className="thumb" key={`drr${i}`} onClick={() => this.Carousel.slideTo(i)}><img src={thumb.thumb} alt="Gallery" className="img-fluid" /></div>))}</nav>
                                    </Fragment>
                                }


                                {/*<div className="w-100 mb-3">
                                    <LazyLoadImage alt="image" className="img-fluid" src="/images/service-individual-slider.jpg" effect="blur"/>
                                </div>
                                <div className="row thumbs mb-2">
                                    {item && item.media.image && item.media.image.map((image) =>
                                        <div className="col" key={image.id}>
                                            <LazyLoadImage alt="image" className="img-fluid w-100" src={image.path} effect="blur"/>
                                        </div>
                                    )}
                                </div> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <nav className="nav nav-list">
                                    <Link className="nav-link active" to="description" smooth={true} duration={1000}>Description</Link>
                                    {item && item.media.docs && <Link className="nav-link" to="portfolio" smooth={true} duration={1000}>Portfolio</Link>}
                                    {item.received_offers && <Link className="nav-link" to="offers_received" smooth={true} duration={1000}>Offers Received</Link>}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-100 float-left pt-lg-4 pt-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <Element className="card" name="description">
                                    <div className="card-body px-0">
                                        <h5 className="card-title px-3">Description</h5>
                                        <hr />
                                        <div className="card-text px-3">
                                            <div className="custom-description" dangerouslySetInnerHTML={{__html: item && item.description}}></div>
                                        </div>
                                    </div>
                                </Element>
                                {item && item.media.docs && <Element className="card" name="portfolio">
                                    <div className="card-body px-0">
                                        <h5 className="card-title px-3">Portfolio</h5>
                                        <hr />
                                        <div className="card-text pt-4 px-3">
                                            <div className="row">
                                                {item && item.media.docs && item.media.docs.map((doc) =>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-6" key={doc.id}>
                                                        <div className="docs text-center mb-4">
                                                            {(doc.mimetype === 'application/pdf') ? <i className="far fa-file-pdf fa-5x"></i>
                                                                : (doc.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ?
                                                                    <i className="far fa-file-word fa-5x"></i>
                                                                    // : (doc.mimetype === 'txt') ? <i className="far fa-file-alt fa-5x"></i>
                                                                    // : (doc.mimetype === 'powerpoint') ? <i className="far fa-file-powerpoint fa-5x"></i>
                                                                    // : (doc.mimetype === 'exel') ? <i className="far fa-file-excel fa-5x"></i>
                                                                    // : (doc.mimetype === 'archive') ? <i className="far fa-file-archive fa-5x"></i>
                                                                    : <i className="far fa-file fa-5x"></i>}
                                                            <h6 className="text-truncate1">
                                                                <a target="_blank" rel="noopener noreferrer" href={`${doc.path}`} download>{doc.filename}</a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                )}
                                                {(item && item.media.docs && item.media.docs.length === 0) && <div className="col-12">Portfolio not found</div>}
                                            </div>
                                        </div>
                                    </div>
                                </Element>}

                                {item && item.userItemProposals && <div className="card-body px-0">
                                    <h5 className="card-title px-3">Offers Received ({item.received_offers})</h5>
                                    <hr />
                                    { <ProposalReceived results={item.userItemProposals} module={ModuleHelper.UserService}/>}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </Main>);
    }
}

export default ServiceView;

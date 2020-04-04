import React, { Component, Fragment } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IconButton } from '@material-ui/core';
import { Link, Element } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { Main } from "../../../layout";
import { DocumentTitle } from "../../../../helpers/DocumentTitle";
import RatingReview from "../../Service/partials/RatingReview";
import { serviceActions } from "../../../../common/redux/actions";
import { confirmAlert } from 'react-confirm-alert';
import { alertSelectors } from '../../../../common/redux/selectors';
import { PlaceOffer } from '../../Contract/partials/index';
import { ModuleHelper } from '../../../../helpers/module.helper';
import { globalService as gs, itemService } from '../../../../common/services';
import OtherServices from './partials/OtherServices';
import ReadMoreReact from "read-more-react";

const cashSettlement = ['cash', 'both'];

class PublicServiceView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: null,
            items: [],
            id: null,
            user_id: null,
            servicesList: null,
            setOffer: false,
            favorite: {}
        };
        this.initilizeState = this.state;
    }

    componentWillMount() {
        const { match } = this.props;
        const id = match.params.id;
        this.setState({ id: id ? id : null });
        this.service(id);
    }

    componentDidUpdate(prevProps) {
        const { match } = this.props;
        if (this.props.match.params.id !== prevProps.match.params.id) {
            const id = match.params.id;
            this.setState({ id: id ? id : null });
            if (id !== prevProps.match.params.id) {
                this.service(id);
            }
        }
    }

    componentWillUnmount(){
        this.setState(this.initilizeState);

    }

    service = (id) => {
        const { dispatch, authentication } = this.props;
        id && itemService.service("GET", null, { item_id: id }).then(res => {
            if (res.model) {
                let item = res.model;

                this.setState({ item: item });
                if (this.state.user_id !== item.user_id) {
                    dispatch(serviceActions.index("GET", null, { user_id: item.user_id }));
                    this.setState({ user_id: item.user_id });
                }
                const loginUser = authentication.authentication.user;
                itemService.service("GET", null, { user_id: loginUser.id }).then(responce => {
                    let servicesList = responce.items;
                    this.setState({ servicesList })
                });
            }
        });
    };

    offerOpen = () => {
        this.setState({
            setOffer: true
        })
    };

    offerClose = () => {
        this.setState({
            setOffer: false
        })
    };


    markAsFavorite = (item) => {
        const { dispatch } = this.props;
        const params = {
            "userFavorite": {
                favorite_id: item.id,
                moduleId: "UserService"
            }
        };

        let method = (item.is_favorite) ? "DELETE" : "POST";
        let param = (item.is_favorite) ? { item_id: item.is_favorite } : null;
        let action = (item.is_favorite) ? "remove" : "add";

        confirmAlert({
            title: `Please confirm to ${action}`,
            message: `Are you sure you want to ${action} this service to your favorites list?`,
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () =>
                        itemService.favorite(method, params, param)
                            .then(response => {
                                if (method === "POST") dispatch(alertSelectors.success("You have successfully selected a favorite."));
                                if (method === "DELETE") dispatch(alertSelectors.success("You have successfully removed a favorite."));
                                item.is_favorite = (method === "POST") ? response.model.id : false;
                                this.setState({ favorite: item });
                            })
                            .catch(exception => {
                                console.log(exception);
                            })
                }
            ]
        });
    };


    render() {
        const { item, setOffer, servicesList } = this.state;
        const { history } = this.props;
        const showSendOfferButton = item && !gs.isOwner(item.user_id) && (
            ((item.settlement === 'exchange') && (servicesList && servicesList.length > 0)) || cashSettlement.includes(item.settlement));

        return (item && <Main history={history}>
            <div className="individual-service bg-body">
                <DocumentTitle title={item && item.title} />
                <div className="bg-white bottom-shadow w-100 float-left">
                    <div className="container">

                        <div className="row">
                            <div className="col-12">
                                <h1>{item && item.title}</h1>
                                <div className="d-flex align-items-center flex-wrap mb-3 row mb-lg-4 headings">
                                    <div className="col d-flex align-items-center flex-wrap">
                                        {item && !gs.isOwner(item.user_id) &&
                                            <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                                {(item && item.is_favorite !== false) ? <i className="fas fa-heart text-info"></i> :
                                                    <i className="far fa-heart"></i>}
                                            </IconButton>
                                        }

                                        <div className="sold pr-1">
                                            <i className="far fa-chart-bar"></i> {item && item.proposal_count} times Booked
                                        </div>
                                        <div className="sold">
                                            <i className="fas fa-cubes"></i> {`${item && item.category.title}`}
                                        </div>
                                        <div className="price">{(item && item.budget === null) ? <small>Not Set</small> : `$${item && item.budget}`}</div>
                                    </div>
                                    {showSendOfferButton &&
                                        <div className="send-offer">
                                            {<button onClick={this.offerOpen} className="btn btn-info">Send Offer</button>}
                                        </div>
                                    }
                                    {item && setOffer && <PlaceOffer open={setOffer} item={item} item_id={item.id} moduleId={ModuleHelper.UserService} servicesList={servicesList} offerClose={this.offerClose} title={`Send Offer`} buttonTitle={`Send Offer`} isService={true} />}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-12">
                                {(item && item.media.image) &&
                                    <Fragment>
                                        <AliceCarousel className="mb-3"
                                            dotsDisabled={true}
                                            buttonsDisabled={true}
                                            slideToIndex={1}
                                            fadeOutAnimation={true}
                                            items={item && item.media.image.map((img) => (<div key={img.id} className="item"><img src={img.path} alt="Gallery" className="img-fluid" /></div>))}
                                            ref={(el) => (this.Carousel = el)}
                                        />
                                        <nav className="d-flex galleryThumb mb-3">{item && item.media.image.map((thumb, i) => (<div className="thumb" key={`drr${i}`} onClick={() => this.Carousel.slideTo(i)}><img src={thumb.thumb} alt="Gallery" className="img-fluid" /></div>))}</nav>
                                    </Fragment>
                                }
                                {(item && !item.media.image) && <img src="/images/no-image.jpg" alt="Not Found" className="img-fluid" />}
                            </div>
                            {item && <div className="col-md-4 col-12">
                                <div className="border profile px-0">
                                    <figure className="text-center px-3">
                                        <div className="pic">
                                            <LazyLoadImage alt="image" className="w-auto rounded-circle" width="130" height="130"
                                                src={item.user.avatar} effect="blur" />
                                            {/* <img src={'/images/badge.png'} alt="Badge" className="badge" /> */}
                                        </div>
                                        <figcaption>
                                            {<h4><NavLink to={`/user/public/about/${item.user_id}`}>{item.user.name}</NavLink></h4>}
                                            <h5>
                                                {item.user && item.user.countryCode && item.user.countryCode.name}
                                            </h5>
                                            <p>Since {item && item.user.since}</p>
                                        </figcaption>
                                    </figure>
                                    <hr />
                                    <ul className="social-login nav nav-pills nav-justified mb-3 px-3">
                                        <li className="nav-item verified"><small>Verified : {item.user.isVerified ? "Yes" : "No"}</small></li>
                                        {item.user.userProfilePlatforms && item.user.userProfilePlatforms.map((platform) =>
                                            (<li className="nav-item" key={platform.slug}><NavLink to={platform.link}><i className={`fab ${platform.icon}`}></i></NavLink></li>))}
                                    </ul>
                                    <hr />
                                    <div className="text px-3">
                                        {item && item.user && item.user.title}
                                    </div>
                                    <div className="info d-flex px-3">
                                        <i className="far fa-question-circle mr-2"></i>
                                        {item.user.about && <ReadMoreReact className="custom-description" text={item.user.about} min={120} ideal={150} max={200} readMoreText={'Read More'} />}
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <nav className="nav nav-list">
                                    <Link className="nav-link active" to="description" smooth={true} duration={1000}>Description</Link>
                                    <Link className="nav-link" to="portfolio" smooth={true} duration={1000}>Portfolio</Link>
                                    <Link className="nav-link" to="skills" smooth={true} duration={1000}>Skills</Link>
                                    <Link className="nav-link" to="rating_review" smooth={true} duration={1000}>Rating & Review</Link>
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
                                            <div className="custom-description" dangerouslySetInnerHTML={{ __html: item && item.description }}></div>
                                            {item && item.description.length === 0 && 'No data yet'}
                                        </div>
                                    </div>
                                </Element>

                                <Element className="card" name="portfolio">
                                    <div className="card-body px-0">
                                        <h5 className="card-title px-3">Portfolio</h5>
                                        <hr />
                                        <div className="card-text pt-4 px-3">
                                            <div className="row">
                                                {(item && item.media.docs && item.media.docs) ? '' : <div className="col-12" style={{marginTop: '-20px'}}>No data yet</div>}
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
                                            </div>
                                        </div>
                                    </div>
                                </Element>

                                <Element className="card" name="skills">
                                    <div className="card-body px-0">
                                        <h5 className="card-title px-3">Skills</h5>
                                        <hr />
                                        <div className="card-text px-3">
                                            {item && item.skills.map((skill) =>
                                                <div className="badge badge-pill badge-secondary" key={skill.id}>{skill.title}</div>
                                            )}
                                            {item && item.skills.length === 0 && 'No data yet'}
                                        </div>
                                    </div>
                                </Element>
                                <RatingReview item={item} moduleId={ModuleHelper.UserService} isShowDropdown={true} isShowAvgRating={true} />
                            </div>
                            <OtherServices item={item} service_id={this.state.id} service={this.service} />
                        </div>
                    </div>
                </div>
            </div>
        </Main>);
    }
}


const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const processSelector = createSelector(
    state => state.process,
    process => process
);

const serviceSelector = createSelector(
    state => state.services,
    services => services
);

const mapStateToProps = createSelector(
    authenticationSelector,
    processSelector,
    serviceSelector,
    (authentication, process, services) => ({
        authentication,
        process,
        services
    })
);

export default connect(mapStateToProps)(PublicServiceView);

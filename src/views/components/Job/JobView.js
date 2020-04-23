// import React, { Component, Fragment } from 'react';
// import { Main } from '../../layout';
// import { Redirect } from 'react-router-dom';
// import { createSelector } from "reselect";
// import { connect } from "react-redux";
// import { DocumentTitle } from '../../../helpers/DocumentTitle';
// import { SearchLoader } from '../../../common/loaders';
// import {globalService as gs, itemService} from '../../../common/services';
// import { ProposalReceived } from '../Contract/partials';
// import { ModuleHelper } from '../../../helpers/module.helper';
// import ReadMoreReact from "read-more-react";

// class JobView extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             item: null,
//             id: null,
//         };
//     }

//     componentWillMount() {
//         const { match } = this.props;
//         const id = match.params.id;
//         this.setState({ id: id ? id : null });
//         this.jobs(id);
//     }

//     jobs = (id) => {
//         id && itemService.job("GET", null, { item_id: id }).then(res => {
//             this.setState({ item: res.model });
//         });
//     };

//     render() {
//         const { process } = this.props;
//         let item = this.state.item;

//         return (<Main>
//             <DocumentTitle title={item && item.title} />
//             <div className="job-individual bg-body">
//                 <div className="container">
//                     <div className="row">
//                         {process.loading ? <div className="col-12"><SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={3} width={700} /></div> : <Fragment>
//                             {(item && item.length === 0) ? <Redirect to={{ pathname: '/not-found' }} /> : <Fragment>
//                                 <div className="col-12">
//                                     {/*<h1>Received Offers/Bids({item && item.userItemProposals.length})</h1>*/}
//                                     <div className="jobBox card mb-4">
//                                         <div className="card-body">
//                                             <div className="caption">
//                                                 <h3 className="d-flex align-items-center pr-0">
//                                                     <div className="col pl-0">
//                                                         {item && item.title}
//                                                         {/*<small> {item && item.category && item.category.parent ? item.category.parent.title + ',' : null} {item && item.category.title}</small>*/}
//                                                     </div>
//                                                 </h3>
//                                             </div>
//                                             <div className="prices d-flex align-items-center">
//                                                 {item && item.settlement && item && item.settlement === 'cash' && <div className="price">${item && item.budget}</div>}
//                                                 {/*<div className="fixed badge badge-secondary text-capitalize">{item && item.settlement}</div>*/}
//                                                 <div className="fixed badge badge-secondary text-capitalize">{(item && item.settlement === 'both') ? 'Cash & Exchange' : item && item.settlement}</div>
//                                                 {item && item.settlement && item && item.settlement === 'cash' &&
//                                                     <div className="cash badge badge-success text-capitalize">{item && item.type}</div>}
//                                             </div>
//                                             {item && item.skills &&
//                                             <div className="chips">
//                                                 <h6 className="h6 mb-0">Skills</h6>
//                                                 {item && item.skills.map((skill) =>
//                                                     <div className="badge badge-secondary" key={skill.id}>{skill.title}</div>
//                                                 )}
//                                             </div>}
//                                             {/*<div className="d-flex align-items-center proposals mb-0">*/}
//                                                 {/*<div className="deadline">*/}
//                                                     {/*{<h6>Project Deadline</h6>} {item && item.duration && `${item.duration - 4} - ${item.duration} Weeks`}*/}
//                                                 {/*</div>*/}
//                                                 {/*<div className="deadline">*/}
//                                                     {/*<h6>Visiblity</h6> {item && item.visibility}*/}
//                                                 {/*</div>*/}
//                                                 {/*<div className="deadline">*/}
//                                                     {/*<h6>Published on</h6> {(new Date(item && item.created_at * 1000)).toLocaleDateString('en-GB', {*/}
//                                                         {/*year: 'numeric',*/}
//                                                         {/*month: 'short',*/}
//                                                         {/*day: '2-digit'*/}
//                                                     {/*})}*/}
//                                                 {/*</div>*/}
//                                                 {/*<div className="deadline">*/}
//                                                     {/*<h6>Proposals</h6> {item && item.proposal_count}*/}
//                                                 {/*</div>*/}
//                                             {/*</div>*/}
//                                             {/*<ReadMoreReact className="text" text={gs.html2text(item && item.description)} min={120} ideal={150} max={200} readMoreText={'Read More'} />*/}
//                                             {/*<div className="text" dangerouslySetInnerHTML={{ __html: item && item.description }}></div>*/}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-12 sorting d-flex align-items-center">
//                                     { /* <div className="sort">
//                                         <Select
//                                             className="multiple-select"
//                                             classNamePrefix="multi"
//                                             placeholder="Sort By"
//                                             name="sort"
//                                             onChange={this.handleAll}
//                                             options={[{ value: "id", label: "Ascending" }, { value: "-id", label: "Descending" }]} />
//                                                 </div> */}
//                                 </div>
//                                 <div className="col-12">
//                                     {item && item.userItemProposals && <div className="card-body px-0 pt-0">
//                                         <h5 className="card-title" style={{fontSize: '18px'}}>Received Proposals ({item && item.userItemProposals.length})</h5>
//                                         <hr style={{margin: '10px 0px'}} />
//                                         { <ProposalReceived results={item.userItemProposals} module={ModuleHelper.UserItem} />}
//                                     </div>}

//                                 </div>
//                             </Fragment>}
//                         </Fragment>}
//                     </div>
//                 </div>
//             </div>
//         </Main>);
//     }
// }

// const processSelector = createSelector(
//     state => state.process,
//     process => process
// );

// const jobSelector = createSelector(
//     state => state.jobs,
//     jobs => jobs
// );

// const mapStateToProps = createSelector(
//     processSelector,
//     jobSelector,
//     (process, jobs) => ({
//         process, jobs
//     })
// );

// export default connect(mapStateToProps)(JobView);

import React, { Component, Fragment } from 'react';
import { Main } from '../../layout';
import { Box, IconButton } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Redirect, NavLink } from 'react-router-dom';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { itemService, globalService as gs } from '../../../common/services';
import { alertSelectors } from '../../../common/redux/selectors';
import { PlaceOffer, ProposalReceived } from '../Contract/partials';
import { ModuleHelper, commonHelper } from '../../../helpers';
import { DocumentTitle } from '../../../helpers/DocumentTitle';
import { confirmAlert } from "react-confirm-alert";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import '../../../../assets/css/font-awesome.min.css';


const deadlineList = [
    { id: 1, value: 'Up to 3 days' },
    { id: 2, value: 'Up to 1 week' },
    { id: 3, value: 'Up to 1 month' },
    { id: 4, value: 'Up to 3 months' },
    { id: 5, value: 'Up to 6 months' },
    { id: 6, value: 'Up to 1 year' },
];
const status_declined = 2;
const status_completed = 7;

class JobView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            id: null,
            loading: null,
            servicesList: null,
            favorite: {},
            setOffer: false,
            proposalStatus: false,
            proposal: null
        };
    }

    componentWillMount() {
        const { match, dispatch, authentication } = this.props;
        const id = match.params.id;
        const user = authentication.authentication.user;
        this.setState({ id: id ? id : null });
        //dispatch(jobActions.index("GET", null, { item_id: id }));
        this.job(id);
        itemService.proposal("GET", null, { item_id: id, user_id: user.id, moduleId: 'UserItem' }).then(response => {
            this.setState({ proposal: response.items[0] });
        });
        itemService.service("GET", null, { user_id: user.id }).then(response => {
            this.setState({ servicesList: response.items });
        });
    }

    job = (id) => {
        itemService.job("GET", null, { item_id: id }).then(res => {
            this.setState({ item: res.model, proposalStatus: res.model.proposalStatus });
        });
    };


    markAsFavorite = (item) => {
        const { dispatch } = this.props;
        const params = {
            "userFavorite": {
                favorite_id: item.id,
                moduleId: "UserItem"
            }
        };

        let method = (item.is_favorite) ? "DELETE" : "POST";
        let param = (item.is_favorite) ? { item_id: item.is_favorite } : null;
        let action = (item.is_favorite) ? "remove" : "add";

        confirmAlert({
            title: `Please confirm to ${action}`,
            message: `Are you sure to ${action} this favorite list`,
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

    offerOpen = () => {
        this.setState({
            setOffer: true
        })
    };

    offerClose = (event, type) => {
        this.setState({
            setOffer: false
        });
        this.setState(type);
    };



    render() {
        const { item, setOffer, proposalStatus, servicesList, proposal } = this.state;

        console.log('proposal', proposal);
        return (<Main>
            <DocumentTitle title={item && item.title} />
            {item && <PlaceOffer open={setOffer} item={item} item_id={item.id} servicesList={servicesList} moduleId={ModuleHelper.UserItem} offerClose={this.offerClose} title={`Place A Bid`} buttonTitle={`Submit proposal`} isJob={true} />}
            {/* <div className="job-individual bg-body">
                <div className="container">
                    {(item && item.length === 0) ? <Redirect to={{ pathname: '/not-found' }} /> :
                        <div className="row">
                            <div className="col-lg-9 col-md-8 col-12">
                                <div className="card views mb-4">
                                    <div className="card-body">
                                        <div className="heading border-bottom mb-3">
                                            <h1>{item && item.title}</h1>
                                            <h6 className="mb-3">{item && item.category.parent ? item.category.parent.title + ',' : null} {item && item.category.title}</h6>
                                            <div className="prices d-flex align-items-center">
                                                {item && item.settlement === 'cash' && <div className="price">${item && item.budget}</div>} */}
            {/*<div className="fixed badge badge-success text-capitalize">{item && item.settlement}</div>*/}
            {/* <div className="fixed badge badge-secondary text-capitalize">{(item && item.settlement === 'both') ? 'Cash & Exchange' : item && item.settlement}</div>
                                                {item && item.settlement === 'cash' &&
                                                    <div className="cash badge badge-success text-capitalize">{item && item.type}</div>}
                                                {item && item.is_nda === 1 && <div className="cash badge badge-primary ml-1">With NDA</div>}
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-start proposals mb-3">
                                            <div className="deadline w-20">
                                                <h6>Deadline</h6>
                                                {item && item.deadline && deadlineList.map((el) => <Fragment key={`deadline${el.id}`}>
                                                    {(parseInt(el.id) === parseInt(item.deadline)) ? el.value : ''}
                                                </Fragment>)}
                                            </div>
                                            <div className="deadline w-20">
                                                <h6>Visiblity</h6> {gs.capitalize(item && item.visibility)}
                                            </div>
                                            <div className="deadline w-20">
                                                <h6>Published</h6> {(new Date(item && item.created_at * 1000)).toLocaleDateString('en-GB', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit'
                                                })}
                                            </div> */}
            {/*<div className="deadline w-20">*/}
            {/*<h6>Proposals</h6> {item && item.proposal_count}*/}
            {/*</div>*/}
            {/* </div>
                                        <div className="text" dangerouslySetInnerHTML={{ __html: item && item.description }}></div>

                                        <div className="chips mb-3">
                                            <h6 className="h6">Skills</h6>
                                            {(item && item.skills.length === 0) && 'Skills not found'}
                                            {item && item.skills.map((skill) =>
                                                <div className="badge badge-secondary" key={skill.id}>{skill.title}</div>
                                            )}
                                        </div>
                                        {(item && item.userItemLocations.length > 0) &&
                                        <div className="chips mb-3">
                                            <h6 className="h6">Freelancer Location Peferences</h6>
                                            {item && item.userItemLocations && item.userItemLocations.map((location) =>
                                                <div className="badge badge-secondary" key={`location-${location.country_id}`}>{location.name}</div>
                                            )}
                                        </div>}

                                        <div className="document">
                                            <h6 className="h6">Portfolio</h6>
                                            <div className="row padding-5">
                                                {item && item.media.docs && item.media.docs.map((doc) =>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-6" key={doc.id}>
                                                        <div className="upload-box border text-center mb-2 bg-white">
                                                            <div className="d-flex align-items-center justify-content-center" style={{height: '110px'}}>
                                                                {(doc.mimetype === 'application/pdf') ?
                                                                    <i className="far fa-file-pdf fa-3x text-info"></i>
                                                                    : (doc.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ?
                                                                        <i className="far fa-file-word fa-3x text-info"></i>
                                                                        : <i className="far fa-file fa-3x text-info"></i>}
                                                            </div>
                                                            <h6 className="text-truncate px-1">
                                                                <a target="_blank" rel="noopener noreferrer" href={`${doc.path}`} title={doc.filename} download><small>{doc.filename}</small></a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                )}
                                                {item && item.media.image && item.media.image.map((imag) =>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-6" key={imag.id}>
                                                        <div className="upload-box border text-center mb-2 bg-white">
                                                            <img src={imag.thumb} alt={imag.filename} className="img-fluid w-100" style={{ maxHeight: '108px', maxWidth: "100%" }} />
                                                            <h6 className="text-truncate px-1">
                                                                <a target="_blank" rel="noopener noreferrer" href={`${imag.path}`} title={imag.filename} download><small>{imag.filename}</small></a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                )}

                                                {item && item.media.video && item.media.video.map((video) =>
                                                    <div className="col-lg-2 col-md-3 col-sm-4 col-6" key={video.id}>
                                                        <div className="upload-box border text-center mb-2 bg-white">
                                                            <video style={{ maxHeight: '170px', width: "100%" }} controls>
                                                                <source src={video.path} type={video.type} />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                            <h6 className="text-truncate px-1">
                                                                <a target="_blank" rel="noopener noreferrer" href={`${video.path}`} title={video.filename} download><small>{video.filename}</small></a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                )}

                                                {(item && item.media.length === 0) && <div className="col-12">Portfolio not found</div>}

                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="card mb-4 questinList">
                                    <div className="card-body">
                                        <h5>Service that I can exchange</h5>
                                        <div className="row">
                                            {item && item.services.map((service) =>
                                            <div className="col-lg-4 col-sm-6 col-12" key={service.id}>
                                                <div className="jobBox">
                                                    <div className="priview d-flex flex-wrap pb-0 border-bottom-0">
                                                        {(service.cover) && <div className="image">
                                                            <LazyLoadImage alt="image" className="img-fluid" src={service.cover.thumb} effect="blur" />
                                                        </div>}
                                                        <div className="caption">
                                                            <h4>
                                                                {service.title}
                                                            </h4>
                                                            <div className="ratings d-flex align-items-center">
                                                                <small>({service.avg_rating})</small>
                                                                <Box component="fieldset" mx={1} borderColor="transparent">
                                                                    <Rating value={Math.floor(service.avg_rating)} readOnly />
                                                                </Box>
                                                            </div>
                                                            <div className="price">
                                                                <span className="">{service.budget}</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-4 questinList">
                                    <div className="card-body">
                                        {(item && item.userItemQuestions.length === 0) && 'Questions not found'}
                                        {item && item.userItemQuestions.map((question, index) =>
                                            <div className="border-bottom" key={question.id}>
                                                <h5>Question {index + 1}</h5>
                                                <p>{question.question}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-3 col-md-4 col-12">
                                <div className="card mb-4 postBid">
                                    <div className="card-body">
                                        <h3>Submit Proposal</h3>
                                        <div className="card-text mb-2">Please ensure you fill out your profile before sending a proposal</div>

                                        {(item && !gs.isOwner(item.user_id) && (proposalStatus === false) && (item.is_closed === 0) && !(proposal && proposal.status === status_declined)) &&
                                            <div className="action mt-3">
                                                {<button className="btn btn-info btn-block" onClick={this.offerOpen}>Send Proposal</button>}
                                            </div>
                                        }
                                        {((item && proposalStatus === true) && !(proposal && parseInt(proposal.status) === parseInt(status_completed)) && !(proposal && parseInt(proposal.status) === parseInt(status_declined))) && <button className="btn btn-info btn-block mt-3" >Proposal in Process</button>}
                                        {((item && proposalStatus === true) && (proposal && parseInt(proposal.status) === parseInt(status_completed))) && <button className="btn btn-info btn-block mt-3" >Contract Completed</button>}
                                        {((item && !gs.isOwner(item.user_id)) && (proposal && parseInt(proposal.status) === parseInt(status_declined))) && <button className="btn btn-info btn-block mt-3" >Proposal Declined</button>}
                                        <ul className="social-login nav justify-content-center">
                                            <li className="nav-item verified">
                                                <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item && item)}>
                                                    {(item && item.is_favorite) ? <i className="fas fa-heart text-info"></i> :
                                                        <i className="far fa-heart"></i>}
                                                </IconButton>
                                            </li>
                                            <li className="nav-item">
                                                <FacebookShareButton
                                                    url={`${gs.rootUrl}/user/public/job/view/${item && item.id}`}
                                                    quote={item && item.title}
                                                    className="share-button">
                                                    <IconButton className="favorite" title="Facebook">
                                                        <i className="fab fab fa-facebook-f"></i>
                                                    </IconButton>
                                                </FacebookShareButton>
                                            </li>
                                            <li className="nav-item">
                                                <TwitterShareButton
                                                    url={`${gs.rootUrl}/user/public/job/view/${item && item.id}`}
                                                    title={item && item.title}
                                                    className="share-button">
                                                    <IconButton className="favorite" title="Twitter">
                                                        <i className="fab fa-twitter"></i>
                                                    </IconButton>
                                                </TwitterShareButton>
                                            </li>
                                            <li className="nav-item">
                                                <LinkedinShareButton
                                                    url={`${gs.rootUrl}/user/public/job/view/${item && item.id}`}
                                                    windowWidth={750}
                                                    windowHeight={600}
                                                    className="share-button">
                                                    <IconButton className="favorite" title="Linkedin">
                                                        <i className="fab fab fa-linkedin-in"></i>
                                                    </IconButton>
                                                </LinkedinShareButton>
                                            </li> */}
            {/*{item && item.user.userProfilePlatforms && item.user.userProfilePlatforms.length > 0 &&
                                                item.user.userProfilePlatforms.map((platform) => (<li className="nav-item" key={`platform-${platform.id}`}>
                                                    <IconButton className="favorite" title={platform.title}>
                                                        <i className={`fab ${platform.icon}`}></i>
                                                    </IconButton>
                                                </li>))}*/}
            {/* </ul>
                                    </div>
                                </div>
                                {item && <div className="card mb-4 buyerInfo">
                                    <div className="card-body text-center">
                                        <h5 className="card-title text-black pb-2">Client's Profile</h5>
                                        <div className="image">
                                            {gs.isOwner(item.user.id) && <NavLink to={`/user/public/about/${item.user.id}`}>
                                                <img className="rounded-circle" src={item && item.user.avatar} alt="Images" width="100" height="100" /></NavLink>}
                                        </div>
                                        <div className="text mb-0">
                                            {gs.isOwner(item.user.id) && <h4 style={{fontSize: '16px'}}><NavLink to={`/user/public/about/${item.user.id}`}>{item.user.name}</NavLink></h4>}
                                            <div className="rating d-flex align-items-center justify-content-center">
                                                {item.user.avg_rating > 0 && <small>({parseFloat(item.user.avg_rating)})</small>}
                                                <Box component="fieldset" mx={1} borderColor="transparent">
                                                    <Rating value={parseFloat(item.user.avg_rating)} readOnly size="small" />
                                                </Box>
                                                <small className="count">({item.proposal_count})</small>
                                            </div>
                                            <h6>{item.user.title} <br />
                                                {item.user && commonHelper.address(item.user)}
                                            </h6>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    }
                </div>
            </div> */}

            <section class="jobpost">
                <div class="container">
                    <div class="row">

                        <div class="card-box-profile">
                            <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12">

                                <div class="row bottom-sec">
                                    <div class="col-lg-12">
                                        <h3>{item && item.title}</h3>
                                        <h4>{item &&  item.category && item.category.parent && item.category.parent.title} - {item && item.category && item.category.title}</h4>

                                        <div class="col-lg-12">
                                            <hr class="small-hr" />
                                        </div>

                                        <div class="col-lg-2">
                                            <h5> Posted </h5>
                                            <p>{(new Date(item && item.created_at * 1000)).toLocaleDateString('en-GB', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: '2-digit'
                                            })}
                                            </p>
                                        </div>
                                        <div class="col-lg-2">
                                            <h5> Location </h5>
                                            <p><i class="fas fa-map-marker-alt"></i>{item && item.user.countryCode && item.user.countryCode.name}</p>
                                        </div>
                                        <div class="col-lg-2">
                                            <h5> Budget </h5>
                                            <p>{item && item.budget}</p>
                                        </div>
                                        <div class="col-lg-2">
                                            <h5> Duration </h5>
                                            <p>{item && item.deadline && deadlineList.map((el) => <Fragment key={`deadline${el.id}`}>
                                                {(parseInt(el.id) === parseInt(item.deadline)) ? el.value : ''}
                                            </Fragment>)}
                                            </p>
                                        </div>
                                        <div class="col-lg-2">
                                            <h5> Proposals </h5>
                                            <p>{item && item.proposal_count}</p>
                                        </div>
                                        <div class="col-lg-2 buttton">
                                            {(item && !gs.isOwner(item.user_id) && (proposalStatus === false) && (item.is_closed === 0) && !(proposal && proposal.status === status_declined)) &&
                                                <a href="#" onClick={this.offerOpen} class="kafe-btn kafe-btn-mint-small"><i class="fa fa-align-left"></i> Send Proposal</a>
                                            }
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section class="profile-details">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-7 col-md-7 col-sm-6 col-xs-12">
                            <div class="card-box-profile-details">

                                <div class="description-profile">

                                    <ul class="tr-list resume-info">

                                        <li>
                                            <div class="icon">
                                                <p class="tr-title"><i class="fab fa-black-tie"></i> Job Description</p>
                                            </div>
                                            <div className="media-body" dangerouslySetInnerHTML={{ __html: item && item.description }}></div>
                                            <div className="chips mb-3">
                                                <h6 className="h6">Skills</h6>
                                                {(item && item.skills.length === 0) && 'Skills not found'}
                                                {item && item.skills.map((skill) =>
                                                    <div className="badge badge-secondary" key={skill.id}>{skill.title}</div>
                                                )}
                                            </div>
                                            {(item && item.userItemLocations.length > 0) &&
                                                <div className="chips mb-3">
                                                    <h6 className="h6">Freelancer Location Peferences</h6>
                                                    {item && item.userItemLocations && item.userItemLocations.map((location) =>
                                                        <div className="badge badge-secondary" key={`location-${location.country_id}`}>{location.name}</div>
                                                    )}
                                                </div>}
                                        </li>


                                    </ul>

                                </div>

                            </div>

                            {item && item.userItemQuestions &&
                                <div class="work">

                                    <div class="col-lg-12">
                                        <div class="icon">
                                            <p class="tr-title">Questions</p>
                                        </div>
                                    </div>
                                    <div className="questionDiv">
                                        {(item && item.userItemQuestions.length === 0) && 'Questions not found'}
                                        {item && item.userItemQuestions.map((question, index) =>
                                            <div className="border-bottom" key={question.id}>
                                                <h5>Question {index + 1}</h5>
                                                <p>{question.question}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            }
                        </div>

                        <div class="col-lg-5 col-md-5 col-sm-8 col-xs-12">

                            <div class="stats">
                                <div class="row">
                                    <h5>Service that I can exchange </h5>
                                    <div style={{ width: "100%" }} className="row">
                                        {item && item.services.map((service) =>
                                            <div className="col-lg-12" key={service.id}>
                                                <div className="jobBox">
                                                    <div className="priview d-flex flex-wrap pb-0 border-bottom-0">
                                                        {(service.cover) && <div className="image">
                                                            <LazyLoadImage alt="image" className="img-fluid" src={service.cover.thumb} effect="blur" />
                                                        </div>}
                                                        <div className="caption">
                                                            <h4>
                                                                {service.title}
                                                            </h4>
                                                            <div className="ratings d-flex align-items-center">
                                                                <small>({service.avg_rating})</small>
                                                                <Box component="fieldset" mx={1} borderColor="transparent">
                                                                    <Rating value={Math.floor(service.avg_rating)} readOnly />
                                                                </Box>
                                                            </div>
                                                            <div className="price">
                                                                <span className="">{service.budget}</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* <div class="stats">
                                <div class="row">
                                    <h5>Activity</h5>
                                    <div class="col-sm-4">
                                        <h6>3</h6>
                                        <p class="bottom">Proposals</p>
                                    </div>
                                    <div class="col-sm-4">
                                        <h6>0</h6>
                                        <p class="bottom">Interviewing</p>
                                    </div>
                                    <div class="col-sm-4">
                                        <h6>0</h6>
                                        <p class="bottom">Hired</p>
                                    </div>
                                    <p class="bottom"> Last viewed by client: <b> 3 days ago </b></p>
                                </div>
                            </div> */}

                            <div class="card-box text-center">
                                <div class="clearfix"></div>
                                <div class="member-card">
                                    <h3>Client's profile</h3>
                                    <div class="thumb-xl member-thumb m-b-10 center-block">
                                        <LazyLoadImage alt="image" class="img-circle img-thumbnail" src={item && item.user.avatar} effect="blur" />
                                        {/* <img src={item && item.user.avatar} class="img-circle img-thumbnail" alt="profile-image" /> */}
                                        {/* <i class="fa fa-star member-star text-success" title="verified user"></i> */}
                                    </div>
                                    <h5><NavLink to={`/user/public/about/${item && item.user.id}`}>{item && item.user.name}</NavLink></h5>

                                    {/* <div class="row">
                                        <div class="col-sm-6">
                                            <h4 class="top">1</h4>
                                            <p class="bottom">Jobs Posted</p>
                                        </div>
                                        <div class="col-sm-6">
                                            <h4 class="top">$0.00</h4>
                                            <p class="bottom">Spent</p>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12 stats">
                            {item && item.userItemProposals && <div className="card-body px-0 pt-0">
                                <h5 className="card-title" style={{ fontSize: '18px' }}>Received Proposals ({item && item.userItemProposals.length})</h5>
                                <hr style={{ margin: '10px 0px' }} />
                                {<ProposalReceived results={item.userItemProposals} module={ModuleHelper.UserItem} />}
                            </div>}

                        </div>
                    </div>
                </div>
            </section>

        </Main>);
    }
}
const jobSelector = createSelector(
    state => state.jobs,
    jobs => jobs
);

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    jobSelector,
    authenticationSelector,
    (jobs, authentication) => ({
        jobs, authentication
    })
);

export default connect(mapStateToProps)(JobView);

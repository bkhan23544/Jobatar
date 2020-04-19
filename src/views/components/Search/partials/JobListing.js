import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import { IconButton, Box, } from '@material-ui/core';
import { confirmAlert } from 'react-confirm-alert';
import { alertSelectors } from '../../../../common/redux/selectors';
import { globalService as gs, itemService } from '../../../../common/services';
import { SearchLoader } from '../../../../common/loaders';
import Rating from '@material-ui/lab/Rating';
import ReactReadMoreReadLess from "react-read-more-read-less";

class JobListing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            favorite: {},
        }
    }

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

    render() {
        const { process, results } = this.props;
        console.log((results))
        return (
            // <div className="row">
            //     <div className="col-12">
            //         {process.loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={4} /> :
            //             <Fragment>
            //                 {results && results.items && results.items.map((item) =>
            //                     <div className="jobBox card mb-4" key={`item-${item.id}`}>
            //                         <div className="card-body">
            //                             <div className="caption">
            //                                 <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
            //                                     {(item.is_favorite) ? <i className="fas fa-heart text-info"></i> :
            //                                         <i className="far fa-heart"></i>}
            //                                 </IconButton>
            //                                 <h3><NavLink to={`/user/public/job/view/${item.id}`}>{item.title}</NavLink> {/* <small>{item.category && item.category.parent ? item.category.parent.title + ',' : null} {item.category && item.category.title}</small> */}</h3>
            //                             </div>
            //                             <div className="prices d-flex align-items-center">
            //                                 {item.settlement && item.settlement === 'cash' && <div className="price">${item.budget}</div>}
            //                                 <div className="fixed badge badge-secondary text-capitalize">{(item.settlement === 'both') ? 'Cash & Exchange' : item.settlement}</div>
            //                                 {item.settlement && item.settlement === 'cash' && <div className="cash badge badge-success text-capitalize">{item.type}</div>}
            //                             </div>
            //                             {(item.services.length > 0) &&
            //                             <div className="priview d-flex flex-wrap">
            //                                 {(item.services[0].cover) &&
            //                                     <div className="image">
            //                                         <LazyLoadImage alt="image" className="img-fluid" src={item.services[0].cover.thumb} effect="blur" />
            //                                     </div>
            //                                 }
            //                                 <div className="caption">
            //                                     <h4>
            //                                         {item.services[0].title}
            //                                         {(item.services.length > 1) && <NavLink to={`/user/public/job/view/${item.id}`} className="ml-3 text-info">+{item.services.length - 1} more </NavLink>}
            //                                     </h4>
            //                                     <div className="ratings d-flex align-items-center">
            //                                         <small>({item.services[0].avg_rating})</small>
            //                                         <Box component="fieldset" mx={1} borderColor="transparent">
            //                                             <Rating value={Math.floor(item.services[0].avg_rating)} readOnly />
            //                                         </Box>
            //                                     </div>
            //                                     <div className="price">
            //                                         <span className="">{item.services[0].budget}</span>
            //                                     </div>
            //                                 </div>
            //                             </div>}
            //                             {/*<div className="d-flex align-items-center proposals mb-1">*/}
            //                                 {/*<div className="deadline">*/}
            //                                     {/*<h6>Deadline</h6> {item.duration && `${item.duration - 4} - ${item.duration} Weeks`}*/}
            //                                 {/*</div>*/}
            //                                 {/*<div className="deadline" style={{ textTransform: 'capitalize' }}>*/}
            //                                     {/*<h6>Visiblity</h6> {item.visibility}*/}
            //                                 {/*</div>*/}
            //                                 {/*<div className="deadline">*/}
            //                                     {/*<h6>Published</h6> {(new Date(item.created_at * 1000)).toLocaleDateString('en-GB', {*/}
            //                                         {/*year: 'numeric',*/}
            //                                         {/*month: 'short',*/}
            //                                         {/*day: '2-digit'*/}
            //                                     {/*})}*/}
            //                                 {/*</div>*/}
            //                                 {/*<div className="deadline">*/}
            //                                     {/*<h6>Proposals</h6> {item.proposal_count}*/}
            //                                 {/*</div>*/}
            //                             {/*</div>*/}
            //                             {/*<div className="text" dangerouslySetInnerHTML={{ __html: gs.truncateString(item && item.description, 400) }}></div>*/}
            //                             <ReadMoreReact className="text" text={gs.html2text(item && item.description)} min={120} ideal={150} max={200} readMoreText={'Read More'} />

            //                             <div className="chips">
            //                                 {item.skills && item.skills.map((skill) =>
            //                                     <div className="badge badge-secondary" style={{ textTransform: 'capitalize' }} key={skill.id}>{skill.title}</div>)}
            //                             </div>
            //                         </div>
            //                     </div>
            //                 )}
            //             </Fragment>
            //         }
            //     </div>
            // </div>

            process.loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={4} /> :
                results && results.items && results.items.map((item) =>
                    <div class="job">

                        <div class="row top-sec">
                            <div class="col-lg-12">
                                <div className="topLabel">
                                    {/* {item.settlement && item.settlement === 'cash' && <div className="price">${item.budget}</div>} */}
                                    <div className="cashAndExchange">{(item.settlement === 'both') ? 'Cash & Exchange' : item.settlement}</div>
                                    {/* {item.settlement && item.settlement === 'cash' && <div className="label label-primary">{item.type}</div>} */}
                                </div>
                                <div class="col-lg-12 col-xs-12">
                                    <h4><a href="jobpost.html"><NavLink to={`/user/public/job/view/${item.id}`}>{item.title}</NavLink></a>
                                    </h4>
                                    {item.category.parent ?
                                        <h5>{item.category && item.category.parent && item.category.parent.title} <small>- {item.category.title}</small></h5>
                                        :
                                        <h5>{item.category.title}<small></small></h5>
                                    }

                                    {item.settlement === 'both' || item.settlement === 'cash' ?
                                        <div className="prices d-flex align-items-center">
                                            {/* {item.settlement && item.settlement === 'cash' && <div className="price">${item.budget}</div>} */}
                                            <div className="">Cash</div>
                                            {/* {item.settlement && item.settlement === 'cash' && <div className="">{item.type}</div>} */}
                                        </div>
                                        : null}

                                    {item.type === "hourly" ?
                                        <p className="cash-text">{item.budget ? "$"+item.budget+"/hr" : ""}</p>
                                        :
                                        <p>{item.budget ? "$"+item.budget+" Fixed" : ""}</p>
                                    }
                                    {/* <p><small>Posted 14 Hours ago</small></p> */}
                                </div>

                            </div>
                        </div>

                        <div class="row mid-sec">
                            <div class="col-lg-12">
                                <div class="col-lg-12">
                                    {/* <hr class="small-hr" /> */}
                                    {/* <p>Description of every page/module: I have a PSD ebay store and listing design in photoshop that needs to be sliced and coded for eBay to be mobile responsive. Description of requirements/features: Mobile Responsive Ebay store and listing design...</p> */}
                                  {/* <ReadMoreReact text={item && gs.html2text(item.description)} min={120} ideal={150} max={200} readMoreText={'Read More'} /> */}
                                  <ReactReadMoreReadLess
        charLimit={200}
        readMoreText={"Read more ▼"}
        readLessText={"Read less ▲"}
        readMoreClassName="job-text"
        readLessClassName="job-text"
      >
         {gs.html2text(item.description)}
          </ReactReadMoreReadLess>
                                {/* <p className="job-text">{gs.html2text(item.description)}</p> */}

                                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
                                        {item.skills.length &&
                                            item.skills.map((a, index) =>
                                                <span key={index} class="label label-success">{a.title}</span>
                                            )
                                        }
                                        {/* <span class="label label-success">HTML 5</span>
                                    <span class="label label-success">CSS3</span>
                                    <span class="label label-success">PHP 5.4</span>
                                    <span class="label label-success">Mysql</span>
                                    <span class="label label-success">Bootstrap</span> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                        {item.settlement === 'both' || item.settlement === 'exchange' ?
                            <div class="row mid-sec">
                                <div class="col-lg-12">
                                    <div class="col-lg-12">
                                        <hr class="small-hr" />
                                        <div className="prices d-flex align-items-center">
                                            {/* {item.settlement && item.settlement === 'cash' && <div className="price">${item.budget}</div>} */}
                                            <div className="">{(item.settlement === 'both') ? 'Exchange' : item.settlement}</div>
                                            {/* {item.settlement && item.settlement === 'cash' && <div className="">{item.type}</div>} */}
                                        </div>
                                        {(item.services.length > 0) &&
                                            <div className="priview d-flex flex-wrap">
                                                {(item.services[0].cover) &&
                                                    <div className="image">
                                                        {item.services[0].cover.thumb &&
                                                            <LazyLoadImage alt="image" className="img-fluid" src={item.services[0].cover.thumb} effect="blur" />
                                                        }
                                                    </div>
                                                }
                                                <div className="caption">
                                                    <h5>
                                                        {item.services[0].title}
                                                        {(item.services.length > 1) && <NavLink to={`/user/public/job/view/${item.id}`} className="ml-3 text-info">+{item.services.length - 1} more </NavLink>}
                                                    </h5>
                                                    <div className="ratings d-flex align-items-center">
                                                        <p class="p-star">
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="fa fa-star rating-star"></i>
                                                        </p>
                                                    </div>
                                                    <p>
                                                        {item.services[0].budget}
                                                    </p>
                                                </div>
                                            </div>}
                                    </div>
                                </div>
                            </div> : null}

                        <div class="row bottom-sec">
                            <div class="col-lg-12">

                                <div class="col-lg-12">
                                    <hr class="small-hr" />
                                </div>

                                <div className="col-lg-12 prices">
                                    <div className="">posted by:</div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="pull-left">
                                        <NavLink to="#">
                                            {item.user.avatar ?
                                                <img class="img-responsive" src={item.user.avatar} alt="Image" />
                                                : ""}
                                        </NavLink>
                                    </div>
                                    <h5> {item.user.name} </h5>
                                    <p><i class="fas fa-map-marker-alt icon-color" style={{marginRight: 2}}></i>{item.user.countryCode && item.user.countryCode.name}</p>
                                    <p class="p-star">
                                        {item.user.avg_job_rating === "5.00" ?
                                            <>
                                                <i class="fa fa-star rating-star"></i>
                                                <i class="fa fa-star rating-star"></i>
                                                <i class="fa fa-star rating-star"></i>
                                                <i class="fa fa-star rating-star"></i>
                                                <i class="fa fa-star rating-star"></i>
                                            </>
                                            :
                                            item.user.avg_job_rating === "4.00" ?
                                                <>
                                                    <i class="fa fa-star rating-star"></i>
                                                    <i class="fa fa-star rating-star"></i>
                                                    <i class="fa fa-star rating-star"></i>
                                                    <i class="fa fa-star rating-star"></i>
                                                    <i class="far fa-star"></i>
                                                </>
                                                :
                                                item.user.avg_job_rating === "3.00" ?
                                                    <>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="far fa-star"></i>
                                                        <i class="far fa-star"></i>
                                                    </>
                                                    :
                                                    item.user.avg_job_rating === "2.00" ?
                                                        <>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="far fa-star"></i>
                                                            <i class="far fa-star"></i>
                                                            <i class="far fa-star"></i>
                                                        </>
                                                        :
                                                        item.user.avg_job_rating === "1.00" ?
                                                            <>
                                                                <i class="fa fa-star rating-star"></i>
                                                                <i class="far fa-star"></i>
                                                                <i class="far fa-star"></i>
                                                                <i class="far fa-star"></i>
                                                                <i class="far fa-star"></i>
                                                            </>
                                                            :
                                                            item.user.avg_job_rating === "0.00" ?
                                                                <>
                                                                    <i class="far fa-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                </>
                                                                : null
                                        }
                                    </p>
                                </div>
                                {/* <div class="col-lg-6">
                                    <div class="pull-right">
                                        <h4> 5 </h4>
                                        <p> Applicants</p>
                                    </div>
                                </div> */}

                            </div>
                        </div>

                    </div>
                )


        );
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    (process) => ({
        process
    })
);

export default connect(mapStateToProps)(JobListing);

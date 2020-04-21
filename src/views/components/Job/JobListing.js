import React, { Component, Fragment } from 'react';
import JobLayout from './JobLayout';
import { Link, NavLink } from 'react-router-dom';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import Pagination from '../../../helpers/Pagination';
import { SearchLoader } from '../../../common/loaders';
import { globalService as gs, itemService } from '../../../common/services';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { LazyLoadImage } from 'react-lazy-load-image-component';

class JobListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
                user_id: parseInt(gs.identity.user.id),
                is_publish: null,
                is_closed: null,
                page: 1,
            },
            jobs: [],
            loading: false
        };
        this.initializedStated = this.state
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        //console.log(this.props,  nextProps)
        if (this.props.is_publish === nextProps.is_publish) {
            this.loadJobs(1);
        }
    }

    componentWillMount() {
        const { is_publish, is_closed, is_visibility } = this.props;
        console.log("is_visibility:", is_visibility)
        const formField = { ...this.state.formField };
        const user_id = gs.identity && gs.identity.user && gs.identity.user.id;
        formField["user_id"] = user_id;
        formField["is_publish"] = is_publish ? is_publish : '';
        formField["is_closed"] = is_closed ? is_closed : '';
        formField["is_visibility"] = is_visibility ? is_visibility : 'public';
        //console.log("formField:", formField)
        //this.loadJobs(formField);
        this.setState({ formField });
    }

    loadJobs = (page) => {
        const { is_publish, is_closed, is_visibility } = this.props;
        const formField = { ...this.state.formField };
        const user_id = gs.identity && gs.identity.user && gs.identity.user.id;
        formField["user_id"] = user_id;
        formField["is_publish"] = is_publish ? is_publish : null;
        formField["is_closed"] = is_closed ? is_closed : null;
        formField["is_visibility"] = is_visibility ? is_visibility : null;
        formField["page"] = page;
        this.setState({ loading: true });
        itemService.job("GET", null, formField).then(response => {
            this.setState({ jobs: response, loading: false });
            console.log(response,"Mine")
        });
        
    };

    onChangePage = (page) => {
        //if (page !== 1) {}
        this.loadJobs(page);
    };

    renderItem = (item) => {
        let isOwner = (item.user_id === gs.identity.user.id);
        let viewLink = isOwner ? `/job/view/${item.id}` : `/user/public/job/view/${item.id}`;
        return (
            // <div className="jobBox card mb-4" key={item.id}>
            //     <div className="card-body">
            //         <div className="caption">
            //             <h3 className="d-flex align-items-center pr-0">
            //                 <div className="col pl-0">
            //                     <NavLink to={viewLink}>{item.title}</NavLink> {/* <small> {item.category && item.category.parent ? item.category.parent.title + ',' : null} {item.category.title}</small> */}
            //                 </div>
            //                 {isOwner && <div className="d-flex">
            //                     <NavLink to={viewLink} className="btn btn-secondary mr-2"><i
            //                         className="far fa-eye"></i> View {item.view_counts}</NavLink>
            //                     <NavLink to={`/job/update/${item.id}`} className="btn btn-primary"><i
            //                         className="fas fa-pencil-alt"></i> Edit</NavLink>
            //                 </div>}
            //             </h3>
            //         </div>
            //         <div className="prices d-flex align-items-center">
            //             {item.settlement && item.settlement === 'cash' && <div className="price">${item.budget}</div>}
            //             <div className="fixed badge badge-secondary text-capitalize">{item.settlement}</div>
            //             {item.settlement && item.settlement === 'cash' &&
            //                 <div className="cash badge badge-success text-capitalize">{item.type}</div>}
            //         </div>
            //         <div className="priview d-flex flex-wrap pb-0"></div>
            //         <ReadMoreReact className="text" text={gs.html2text(item && item.description)} min={120} ideal={150} max={200} readMoreText={'Read More'} />

            //         <div className="chips">
            //             {item.skills && item.skills.map((skill) =>
            //                 <div className="badge badge-secondary" style={{ textTransform: 'capitalize' }} key={skill.id}>{skill.title}</div>)}
            //         </div>
            //     </div>
            // </div>

            <div class="job">

                <div class="row top-sec">
                    <div class="col-lg-12">
                        {/* {item.settlement && item.settlement === 'cash' && <div className="price">${item.budget}</div>} */}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="previousButton">
                                {isOwner && <div className="d-flex">
                                    <NavLink to={viewLink} className="btn btn-secondary mr-2"><i
                                        className="far fa-eye"></i> View {item.view_counts}</NavLink>
                                    <NavLink to={`/job/update/${item.id}`} className="btn btn-primary"><i
                                        className="fas fa-pencil-alt"></i> Edit</NavLink>
                                </div>}
                            </div>
                            <div className="topLabel">
                                <div className="cashAndExchange">{(item.settlement === 'both') ? 'Cash & Exchange' : item.settlement}</div>
                            </div>
                            {/* {item.settlement && item.settlement === 'cash' && <div className="label label-primary">{item.type}</div>} */}
                        </div>
                        <div class="col-lg-12 col-xs-12">
                            <h4><a href="jobpost.html"><NavLink to={viewLink}>{item.title}</NavLink></a>
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
                               <p className="cash-text">{item.budget ? "$"+item.budget+" Fixed" : ""}</p>
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
                            <ReactReadMoreReadLess
        charLimit={200}
        readMoreText={"Read more ▼"}
        readLessText={"Read less ▲"}
        readMoreClassName="job-text"
        readLessClassName="job-text"
      >
         {gs.html2text(item.description).slice(-6)==="&nbsp;" ? gs.html2text(item.description).slice(0,gs.html2text(item.description).length-7) : gs.html2text(item.description)}
          </ReactReadMoreReadLess>

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
                            <p><i class="fas fa-map-marker-alt icon-color"></i> {item.user.countryCode && item.user.countryCode.name}</p>
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
    }

    render() {
        const { jobs, loading } = this.state;
        const { is_publish, is_closed, is_visibility } = this.props;
        let results = (jobs && jobs.items) ? jobs.items : null;

        return (<JobLayout>
            <div className="row" style={{margin:0}}>
                <div className="jobBoxx col-12" style={{padding: 0}}>
                    {loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={2} width={700} /> : <Fragment>
                        {(results && results.length === 0) && <div>
                            <div className="jobBox card mb-4">
                                <div className="card-body">
                                    <div className="common-not-found d-flex align-items-center justify-content-center">
                                        <div className="inner text-center">
                                            <figure>
                                                <img src="/images/not-found/My-Services.png" alt="Image" width="100" />
                                            </figure>
                                            {((is_publish === 'publish') || (is_publish === 'draft')) &&
                                                <h5>You have not posted any jobs yet</h5>
                                            }
                                            {(is_closed === '1') &&
                                                <h5>You have not closed any jobs yet</h5>
                                            }
                                            {((is_publish === 'publish') || (is_publish === 'draft')) &&
                                                <p className="title">This is where you’ll be able to track all the jobs you posted</p>
                                            }
                                            {(is_closed === '1') &&
                                                <p className="title">This is where you’ll be able to track all the jobs you closed</p>
                                            }
                                            {(is_visibility === 'private') &&
                                                <p className="title">This is where you’ll be able to track all the jobs you private</p>
                                            }
                                            <div className={'text-center'}>
                                                <p className="mb-1"><Link className="btn btn-link text-uppercase" to="/job-search">Find Jobs</Link></p>
                                                <p className="mb-2"><b>OR</b></p>
                                                <p> <Link className="btn btn-primary" to="/job/create">Post Job</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {results && results.map((item) => this.renderItem(item))}
                    </Fragment>}
                </div>
                <div className="col-12">
                    <Pagination className="justify-content-end"
                        pageSize={20}
                        totalCount={(jobs && jobs.publish && jobs.publish.pagination.totalCount) ? jobs.publish.pagination.totalCount : 10}
                        onChangePage={this.onChangePage} />
                </div>
            </div>
        </JobLayout>);
    }
}


const processSelector = createSelector(
    state => state.process,
    process => process
);

const jobSelector = createSelector(
    state => state.jobs,
    jobs => jobs
);

const mapStateToProps = createSelector(
    processSelector,
    jobSelector,
    (process, jobs) => ({
        process, jobs
    })
);

export default connect(mapStateToProps)(JobListing);

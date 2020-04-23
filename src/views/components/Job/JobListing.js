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
            console.log(response, "Mine")
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

            <div className="job">

                <div className="row top-sec">

                    {/* <div className="col-2" style={{border:"1px solid red"}}>
			 <a href="freelancer.html">
			  <img className="img-responsive" src="images/team-1.jpg" alt=""/>
			 </a>
			</div> */}
                    <div className="col-12 row">
                        <img className="img-responsive" src={item.user.avatar} alt="" />
                        <div className="col-lg-8 col-sm-12">
                            <h4><NavLink to={viewLink}>{item.title}</NavLink></h4>
                            {item.category && item.category.parent ?
                                <h5>{item.category && item.category.parent && item.category.parent.title} <small>- {item.category.title && item.category.title}</small></h5>
                                : <h5>{item.category && item.category.title && item.category.title}<small></small></h5>}
                        </div>

                        {isOwner && <div className="EditDeleteButton">
                            <NavLink to={viewLink} className="btn btn-secondary mr-2"><i
                                className="far fa-eye"></i> View {item.view_counts}</NavLink>
                            <NavLink to={`/job/update/${item.id}`} className="btn btn-primary"><i
                                className="fas fa-pencil-alt"></i> Edit</NavLink>
                        </div>}
                    </div>
                </div>

                <div className="row mid-sec">
                    <div className="col-lg-12">
                        <div className="col-lg-12">
                            <hr className="small-hr" />
                            <p>{gs.html2text(item.description)}</p>
                            <div className="flexWrap">
                                {item.skills.length &&
                                    item.skills.map((a, index) =>
                                        <span key={index} class="label label-success">{a.title}</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row bottom-sec">
                    <div className="col-lg-12">

                        <div className="col-lg-12">
                            <hr className="small-hr" />
                        </div>

                        <div className="col-lg-2">
                            <h5> Type </h5>
                            <p>{(item.settlement === 'both') ? 'Cash & Exchange' : item.settlement.charAt(0).toUpperCase() + item.settlement.slice(1)}</p>
                        </div>
                        {item.budget && <div className="col-lg-2">
                            <h5> Budget </h5>
                            {item.type === "hourly" ?
                                <p>{item.budget ? "$" + item.budget + "/hr" : ""}</p>
                                :
                                <p>{item.budget ? "$" + item.budget + " Fixed" : ""}</p>

                            }
                        </div>}
                        {item.settlement === 'both' || item.settlement === 'exchange' &&
                            <div className="col-lg-2">
                                <h5> Exchange With </h5>
                                <p><NavLink to={`/user/public/job/view/${item.id}`}>{item.services[0].title}</NavLink>
                                    {(item.services.length > 1) && <NavLink to={`/user/public/job/view/${item.id}`}>+{item.services.length - 1} more </NavLink>}</p>
                            </div>
                        }
                        <div className="col-lg-2">
                            <h5>Posted By</h5>
                            <p><NavLink to={`/user/public/about/${item && item.user.id}`}>{item.user.name}</NavLink></p>
                        </div>
                        <div className="col-lg-4">
                        </div>

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
            <div className="row" style={{ margin: 0 }}>
                <div className="jobBoxx col-12" style={{ padding: 0 }}>
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

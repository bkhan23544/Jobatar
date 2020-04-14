import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import { IconButton, } from '@material-ui/core';
import { confirmAlert } from 'react-confirm-alert';
import { alertSelectors } from '../../../../common/redux/selectors';
import { itemService } from '../../../../common/services';
import { SearchLoader } from '../../../../common/loaders';

class FreelancerListing extends Component {

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
                moduleId: "UserProfile"
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
        const { process, results, is_co_founder } = this.props;
        console.log(results)
        return (
            // <div className="row ">
            //     <div className="col-md-4">
            //         {process.loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={4} /> :
            //             // <Fragment>
            //                 results && results.items && results.items.map((item) =>
            //                     // <div className="freLncrBox card mb-4" key={`item-${item.id}`}>
            //                     //     <div className="card-body d-flex flex-wrap">
            //                     //         <div className="profile">
            //                     //             <NavLink to={`/user/public/${(is_co_founder) ? 'co-founder' : 'about'}/${item.id}`}> 
            //                     //                 <LazyLoadImage alt="image" className="img-fluid rounded-circle" width="145" height="145" src={item.avatar} effect="blur" />
            //                     //             </NavLink>
            //                     //         </div>
            //                     //         <div className="caption">
            //                     //             <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
            //                     //                 {(item.is_favorite) ? <i className="fas fa-heart text-info"></i> :
            //                     //                     <i className="far fa-heart"></i>}
            //                     //             </IconButton>
            //                     //             <h3><NavLink to={`/user/public/${(is_co_founder) ? 'co-founder' : 'about'}/${item.id}`}>{item.name}</NavLink></h3>
            //                     //             <div className="position">
            //                     //                 {item.skills && item.skills.map((skill) => skill.title).join(", ")}
            //                     //             </div>
            //                     //             {(item && item.countryCode) &&
            //                     //             <div className="address">
            //                     //                 <i className="fas fa-map-marker-alt"></i> {item && item.countryCode && item.countryCode.name}
            //                     //             </div>}
            //                     //             <div className="text">{item.about && item.about.substr(0, 180)}</div>
            //                     //         </div>
            //                     //     </div>
            //                     // </div>
            //                     <div class="card-box text-center">
            //                         <div class="most-popular">
            //                             <span>Feautured</span>
            //                         </div>
            //                         <div class="clearfix"></div>
            //                         <div class="member-card">
            //                             <div class="member-thumb">
            //                                 <a href="company.html"><img src={item.avatar} class="img-circle img-thumbnail" alt="profile-image" /></a>
            //                                 <i class="fa fa-star member-star text-success" title="verified user"></i>
            //                             </div>

            //                             <div class="small-line-height">
            //                                 <h4><a href="company.html">Julie L. Arsenault</a></h4>
            //                                 <p class="text-muted p-location"><i class="fa fa-map-marker"></i> Nairobi, Kenya</p>
            //                                 <p class="p-star">
            //                                     <i class="fa fa-star rating-star"></i>
            //                                     <i class="fa fa-star rating-star"></i>
            //                                     <i class="fa fa-star rating-star"></i>
            //                                     <i class="fa fa-star rating-star"></i>
            //                                     <i class="fa fa-star rating-star"></i>
            // 	 99% (222)
            // 	</p>
            //                             </div>

            //                             <h5>ISTQB certified Expert QA Engineer, QA Lead</h5>
            //                             <h6>Company</h6>
            //                             <p class="text-muted font-16">
            //                                 Hi I'm Johnathn Deo,has been the industry's standard dummy text ever since the 1500s.
            //    </p>

            //                         </div>

            //                         <div class="row">
            //                             <div class="col-sm-4">
            //                                 <h6>1</h6>
            //                                 <p class="bottom">Jobs Done</p>
            //                             </div>
            //                             <div class="col-sm-4">
            //                                 <h6>4,345</h6>
            //                                 <p class="bottom">Hours Worked</p>
            //                             </div>
            //                             <div class="col-sm-4">
            //                                 <h6>$15.00/hr</h6>
            //                                 <p class="bottom">Hourly Rate</p>
            //                             </div>
            //                         </div>

            //                     </div>
            //                 )
            //             // </Fragment>
            //         }
            //     </div>
            // </div>

            <div class="row">
                {
                    process.loading ? "Loading.." :
                        results && results.items && results.items.map((item) =>
                            <div class="col-md-4">
                                <div class="card-box text-center">
                                    <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                        {(item.is_favorite) ? <i className="fas fa-heart text-info"></i> :
                                            <i className="far fa-heart"></i>}
                                    </IconButton>
                                    {item.feautured &&
                                        <div class="most-popular">
                                            <span>Feautured</span>
                                        </div>
                                    }
                                    <div class="clearfix"></div>
                                    <div class="member-card">
                                        <div class="member-thumb">
                                            <NavLink to={`/user/public/${(is_co_founder) ? 'co-founder' : 'about'}/${item.id}`}><img src={item.avatar} class="img-circle img-thumbnail" alt="profile-image" /></NavLink>
                                            {item.feautured && <i class="fa fa-star member-star text-success" title="verified user"></i>}
                                        </div>

                                        <div class="small-line-height">
                                            <NavLink to={`/user/public/${(is_co_founder) ? 'co-founder' : 'about'}/${item.id}`}><h4><a href="company.html">{item.name}</a></h4></NavLink>
                                            <p class="text-muted p-location"><i class="fas fa-map-marker-alt icon-color"></i> {item && item.countryCode && item.countryCode.name}</p>
                                            <p class="p-star">
                                                {item.avg_job_rating === "5.00" ?
                                                    <>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="fa fa-star rating-star"></i>
                                                        <i class="fa fa-star rating-star"></i>
                                                    </>
                                                    :
                                                    item.avg_job_rating === "4.00" ?
                                                        <>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="fa fa-star rating-star"></i>
                                                            <i class="far fa-star"></i>
                                                        </>
                                                        :
                                                        item.avg_job_rating === "3.00" ?
                                                            <>
                                                                <i class="fa fa-star rating-star"></i>
                                                                <i class="fa fa-star rating-star"></i>
                                                                <i class="fa fa-star rating-star"></i>
                                                                <i class="far fa-star"></i>
                                                                <i class="far fa-star"></i>
                                                            </>
                                                            :
                                                            item.avg_job_rating === "2.00" ?
                                                                <>
                                                                    <i class="fa fa-star rating-star"></i>
                                                                    <i class="fa fa-star rating-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                    <i class="far fa-star"></i>
                                                                </>
                                                                :
                                                                item.avg_job_rating === "1.00" ?
                                                                    <>
                                                                        <i class="fa fa-star rating-star"></i>
                                                                        <i class="far fa-star"></i>
                                                                        <i class="far fa-star"></i>
                                                                        <i class="far fa-star"></i>
                                                                        <i class="far fa-star"></i>
                                                                    </>
                                                                    :
                                                                    item.avg_job_rating === "0.00" ?
                                                                        <>
                                                                            <i class="far fa-star"></i>
                                                                            <i class="far fa-star"></i>
                                                                            <i class="far fa-star"></i>
                                                                            <i class="far fa-star"></i>
                                                                            <i class="far fa-star"></i>
                                                                        </>
                                                                        : null
                                                }
                                                {/* 99% (222) */}
                                            </p>
                                        </div>

                                        <h5 style={!item.skills.length ? { opacity: 0 } : { opacity: 1 }} >{item.skills.length ? item.skills.map((a) => `${a.title}, `) : "aaaaaaaaaa aaaaaaaaaaaa aaaaaaaa aaaaa"}</h5>
                                        <div className="text">{item.about && item.about.substr(0, 180)}{item.about && item.about.length > 180 ? "..." : null}</div>

                                        {/* <h6>{is_co_founder ? "Co-founder" : "Individual"}</h6> */}
                                        {/* <p class="text-muted font-16">
                                        {item.about}
		   </p> */}

                                    </div>
                                    {/* <div class="row">
                                    <div class="col-sm-4">
                                        <h6>1</h6>
                                        <p class="bottom">Jobs Done</p>
                                    </div>
                                    <div class="col-sm-4">
                                        <h6>4,345</h6>
                                        <p class="bottom">Hours Worked</p>
                                    </div>
                                    <div class="col-sm-4">
                                        <h6>$15.00/hr</h6>
                                        <p class="bottom">Hourly Rate</p>
                                    </div>
                                </div> */}
                                </div>
                            </div>
                        )
                }
            </div>
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

export default connect(mapStateToProps)(FreelancerListing);
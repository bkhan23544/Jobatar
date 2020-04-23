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
        console.log(results && results.items && gs.html2text(results.items[4].description).slice(-8) === "&nbsp;" && "verified", "description")
        return (


            process.loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={4} /> :
                results && results.items ? results.items.map((item) =>
                    <div className="job" style={{overflow: "hidden"}}>

                        <div className="row top-sec">

                     
                            <div className="col-12 row">
                            <NavLink to={`/user/public/about/${item && item.user.id}`}><img className="img-responsive" src={item.user.avatar} alt="" /></NavLink>
                                <div className="col-10">
                                    <h4><NavLink to={`/user/public/job/view/${item.id}`}>{item.title}</NavLink></h4>
                                    {item.category && item.category.parent ?
                                        <h5>{item.category && item.category.parent && item.category.parent.title} <small>- {item.category.title && item.category.title}</small></h5>
                                        : <h5>{item.category && item.category.title && item.category.title}<small></small></h5>}
                                </div>


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
                    : null


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

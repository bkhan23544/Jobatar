import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { NavLink } from "react-router-dom";
import { IconButton, Box, } from '@material-ui/core';
import { confirmAlert } from 'react-confirm-alert';
import { alertSelectors } from '../../../../common/redux/selectors';
import {globalService as gs, itemService} from '../../../../common/services';
import { SearchLoader } from '../../../../common/loaders';
import Rating from '@material-ui/lab/Rating';
import ReadMoreReact from "read-more-react";

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

        return (<div className="row">
            <div className="col-12">
                {process.loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={4} /> :
                    <Fragment>
                        {results && results.items && results.items.map((item) =>
                            <div className="jobBox card mb-4" key={`item-${item.id}`}>
                                <div className="card-body">
                                    <div className="caption">
                                        <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                            {(item.is_favorite) ? <i className="fas fa-heart text-info"></i> :
                                                <i className="far fa-heart"></i>}
                                        </IconButton>
                                        <h3><NavLink to={`/user/public/job/view/${item.id}`}>{item.title}</NavLink> {/* <small>{item.category && item.category.parent ? item.category.parent.title + ',' : null} {item.category && item.category.title}</small> */}</h3>
                                    </div>
                                    <div className="prices d-flex align-items-center">
                                        {item.settlement && item.settlement === 'cash' && <div className="price">${item.budget}</div>}
                                        <div className="fixed badge badge-secondary text-capitalize">{(item.settlement === 'both') ? 'Cash & Exchange' : item.settlement}</div>
                                        {item.settlement && item.settlement === 'cash' && <div className="cash badge badge-success text-capitalize">{item.type}</div>}
                                    </div>
                                    {(item.services.length > 0) &&
                                    <div className="priview d-flex flex-wrap">
                                        {(item.services[0].cover) &&
                                            <div className="image">
                                                <LazyLoadImage alt="image" className="img-fluid" src={item.services[0].cover.thumb} effect="blur" />
                                            </div>
                                        }
                                        <div className="caption">
                                            <h4>
                                                {item.services[0].title}
                                                {(item.services.length > 1) && <NavLink to={`/user/public/job/view/${item.id}`} className="ml-3 text-info">+{item.services.length - 1} more </NavLink>}
                                            </h4>
                                            <div className="ratings d-flex align-items-center">
                                                <small>({item.services[0].avg_rating})</small>
                                                <Box component="fieldset" mx={1} borderColor="transparent">
                                                    <Rating value={Math.floor(item.services[0].avg_rating)} readOnly />
                                                </Box>
                                            </div>
                                            <div className="price">
                                                <span className="">{item.services[0].budget}</span>
                                            </div>
                                        </div>
                                    </div>}
                                    {/*<div className="d-flex align-items-center proposals mb-1">*/}
                                        {/*<div className="deadline">*/}
                                            {/*<h6>Deadline</h6> {item.duration && `${item.duration - 4} - ${item.duration} Weeks`}*/}
                                        {/*</div>*/}
                                        {/*<div className="deadline" style={{ textTransform: 'capitalize' }}>*/}
                                            {/*<h6>Visiblity</h6> {item.visibility}*/}
                                        {/*</div>*/}
                                        {/*<div className="deadline">*/}
                                            {/*<h6>Published</h6> {(new Date(item.created_at * 1000)).toLocaleDateString('en-GB', {*/}
                                                {/*year: 'numeric',*/}
                                                {/*month: 'short',*/}
                                                {/*day: '2-digit'*/}
                                            {/*})}*/}
                                        {/*</div>*/}
                                        {/*<div className="deadline">*/}
                                            {/*<h6>Proposals</h6> {item.proposal_count}*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="text" dangerouslySetInnerHTML={{ __html: gs.truncateString(item && item.description, 400) }}></div>*/}
                                    <ReadMoreReact className="text" text={gs.html2text(item && item.description)} min={120} ideal={150} max={200} readMoreText={'Read More'} />

                                    <div className="chips">
                                        {item.skills && item.skills.map((skill) =>
                                            <div className="badge badge-secondary" style={{ textTransform: 'capitalize' }} key={skill.id}>{skill.title}</div>)}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Fragment>
                }
            </div>
        </div>);
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

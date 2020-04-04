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
        return (<div className="row">
            <div className="col-12">
                {process.loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={4} /> :
                    <Fragment>
                        {results && results.items && results.items.map((item) =>
                            <div className="freLncrBox card mb-4" key={`item-${item.id}`}>
                                <div className="card-body d-flex flex-wrap">
                                    <div className="profile">
                                        <NavLink to={`/user/public/${(is_co_founder) ? 'co-founder' : 'about'}/${item.id}`}> 
                                            <LazyLoadImage alt="image" className="img-fluid rounded-circle" width="145" height="145" src={item.avatar} effect="blur" />
                                        </NavLink>
                                    </div>
                                    <div className="caption">
                                        <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                            {(item.is_favorite) ? <i className="fas fa-heart text-info"></i> :
                                                <i className="far fa-heart"></i>}
                                        </IconButton>
                                        <h3><NavLink to={`/user/public/${(is_co_founder) ? 'co-founder' : 'about'}/${item.id}`}>{item.name}</NavLink></h3>
                                        <div className="position">
                                            {item.skills && item.skills.map((skill) => skill.title).join(", ")}
                                        </div>
                                        {(item && item.countryCode) &&
                                        <div className="address">
                                            <i className="fas fa-map-marker-alt"></i> {item && item.countryCode && item.countryCode.name}
                                        </div>}
                                        <div className="text">{item.about && item.about.substr(0, 180)}</div>
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

export default connect(mapStateToProps)(FreelancerListing);
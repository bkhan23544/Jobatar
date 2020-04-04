import React, { Component, Fragment } from 'react';
import PublicLayout from './PublicLayout';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { userActions, jobActions } from '../../../../common/redux/actions';
import { IconButton } from '@material-ui/core';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import Pagination from '../../../../helpers/Pagination';
import { SearchLoader } from '../../../../common/loaders';
import {globalService as gs, itemService} from '../../../../common/services';
import { alertSelectors } from '../../../../common/redux/selectors';
import { confirmAlert } from 'react-confirm-alert';
import ReadMoreReact from "read-more-react";

class PublicJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                page: 1,
                user_id: null,
                is_publish: 'publish',
                is_closed: 0,
            },
            favorite: {},
        };
    }

    componentWillMount() {
        const { dispatch, user } = this.props;
        let id = this.props.match.params.id;
        const formField = { ...this.state.formField };
        formField.user_id = id;
        this.setState({formField});
        user === null && dispatch(userActions.publicProfile("GET", null, {item_id: id}));
        dispatch(jobActions.index("GET", null, formField));
    }

    onChangePage = (page) => {
        const { dispatch } = this.props;
        const formField = { ...this.state.formField };
        formField["page"] = page;
        dispatch(jobActions.index("GET", null, formField));
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

    render() {
        const { jobs, process } = this.props;
        let results = (jobs && jobs.publish) ? jobs.publish.items : [];
        return (<PublicLayout>
            <DocumentTitle title="Jobs"/>
            <div className="w-100">
                {process.loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={3} width={700} /> : <Fragment>
                    {(results && results.length === 0) && <div className="card service-box">
                        <div className="card-body text-center">
                            <div className="common-not-found d-flex align-items-center justify-content-center">
                                <div className="inner text-center">
                                    <figure>
                                        <img src="/images/not-found/My-Services.png" alt="Image" width="100" />
                                    </figure>
                                    <h5>No Jobs are listed yet</h5>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {results && results.map((item) =>
                        <div className="jobBox card mb-4" key={item.id}>
                            <div className="card-body">
                                <div className="caption">
                                    <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                        {(item.is_favorite !== false) ? <i className="fas fa-heart text-info"></i> :
                                            <i className="far fa-heart"></i>}
                                    </IconButton>
                                    <h3><NavLink to={`/user/public/job/view/${item.id}`}>{item.title}</NavLink></h3>
                                </div>
                                <div className="prices d-flex align-items-center">
                                    {item.settlement && item.settlement === 'cash' && <div className="price">${item.budget}</div>}
                                    <div className="fixed badge badge-secondary text-capitalize">{(item.settlement === 'both') ? 'Cash & Exchange' : item.settlement}</div>
                                    {item.settlement && item.settlement === 'cash' &&
                                    <div className="cash badge badge-success text-capitalize">{item.type}</div>}
                                </div>
                                <div className="priview d-flex flex-wrap pb-0"></div>
                                <ReadMoreReact className="text" text={gs.html2text(item.description)} min={120} ideal={150} max={200} readMoreText={'Read More'} />
                            </div>
                        </div>
                    )}
                </Fragment>}
                <div className="w-100">
                    <Pagination className="justify-content-end"
                        pageSize={20}
                        totalCount={(jobs && jobs.data && jobs.data.pagination.totalCount) ? jobs.data.pagination.totalCount : 10}
                        onChangePage={this.onChangePage} />
                </div>
            </div>
        </PublicLayout>);
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const userSelector = createSelector(
    state => state.user,
    user => user
);

const jobsSelector = createSelector(
    state => state.jobs,
    jobs => jobs
);

const mapStateToProps = createSelector(
    processSelector,
    userSelector,
    jobsSelector,
    (process, user, jobs) => ({
        process, user, jobs
    })
);

export default connect(mapStateToProps)(PublicJob);
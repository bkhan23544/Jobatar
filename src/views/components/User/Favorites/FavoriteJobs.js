import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import FavoriteLayout from './FavoriteLayout';
import { NavLink } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Pagination from '../../../../helpers/Pagination';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import { favoriteActions } from '../../../../common/redux/actions';
import { SearchLoader } from '../../../../common/loaders';
import {globalService as gs, itemService} from '../../../../common/services';
import { alertSelectors } from '../../../../common/redux/selectors';
import ReadMoreReact from "read-more-react";

class FavoriteJobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                moduleId: "UserItem",
                page: 1,
            },
            favorite:null,
        };
    }

    async componentWillMount() {
        const { dispatch } = this.props;
        //favorite.jobs === null && dispatch(favoriteActions.favorites("GET", null, this.state.formField, 'jobs'));
        dispatch(favoriteActions.favorites("GET", null, this.state.formField, 'jobs'));
    }

    componentWillUnmount() {
        //const { dispatch } = this.props;
        //dispatch(favoriteActions.clear());
    }

    onChangePage = (page) => {
        if(page !== 1) {
            const { dispatch } = this.props;
            const formField = { ...this.state.formField };
            formField["page"] = page;
            dispatch(favoriteActions.favorites("GET", null, formField, 'jobs'));
        }
    };

    markAsFavorite = (item) => {
        const { dispatch } = this.props;
        confirmAlert({
            title: 'Please confirm to remove',
            message: 'Are you sure to remove this favorite list',
            buttons: [
              {
                label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
              },
              {
                label: 'Yes',
                onClick: () =>
                    itemService.favorite("DELETE", null, { item_id: item.id })
                        .then(response => {
                            dispatch(alertSelectors.success("You have successfully removed a favorite."));
                            dispatch(favoriteActions.remove(item.id, 'jobs'));
                        })
                        .catch(exception => {
                            console.log(exception);
                        })
                }
            ]
        });
    };

    render() {
        const { favorite, process } = this.props;
        let results = (favorite && favorite.jobs) ? favorite.jobs.items : null;
        return (<FavoriteLayout>
            <DocumentTitle title="My Favorites Jobs" />
            <div className="row">
                <div className="col-12">
                    {process.loading ? <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={2} width={700} /> : <Fragment>

                        {(results && results.length === 0) &&  <div className="card service-box">
                            <div className="card-body text-center">
                                <div className="common-not-found d-flex align-items-center justify-content-center">
                                    <div className="inner">
                                        <figure>
                                            <img src="/images/not-found/My-Services.png" alt="Not found" width="100" />
                                        </figure>
                                        <h5>You don’t have any favorite jobs</h5>
                                        <p className="title">This is where you’ll see all your favorite jobs</p>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {results && results.map((item) =>
                            <div className="jobBox card mb-4" key={Math.random() * (+30 - +4)}>
                                <div className="card-body">
                                    <div className="caption">
                                        <IconButton className="favorite" aria-label="Favorite" onClick={() => this.markAsFavorite(item)}>
                                            <i className="fas fa-heart text-info"></i>
                                        </IconButton>
                                        <h3><NavLink to={`/user/public/job/view/${item.item && item.item.id}`}>{item.item && item.item.title}</NavLink> {/* <small>{item.item && item.item.category.title}</small> */}</h3>
                                    </div>
                                    <div className="prices d-flex align-items-center">
                                        {item.item && item.item.settlement === 'cash' && <div className="price">${item.item && item.item.budget}</div>}
                                        {/*<div className="fixed badge badge-secondary text-capitalize">{item.item && item.item.settlement}</div>*/}
                                        <div className="fixed badge badge-secondary text-capitalize">{(item.item && item.item.settlement === 'both') ? 'Cash & Exchange' : item.item && item.item.settlement}</div>
                                        {item.item && item.item.settlement === 'cash' &&
                                        <div className="cash badge badge-success text-capitalize">{item.item && item.item.type}</div>}

                                        {/* <div className="price">{item.item && item.item.budget}</div>
                                        <div className="fixed badge badge-secondary text-capitalize">{item.item && item.item.type}</div>
                                        <div className="cash badge badge-success text-capitalize">{item.item && item.item.settlement}</div> */}
                                    </div>
                                    <div className="priview d-flex flex-wrap pb-0"></div>
                                    {/*<div className="d-flex align-items-center proposals mb-3">*/}
                                        {/*<div className="deadline">*/}
                                            {/*<h6>Project Deadline</h6> {`${item.item && item.item.duration - 4} - ${item.item && item.item.duration}`} Weeks*/}
                                        {/*</div>*/}
                                        {/*<div className="deadline">*/}
                                            {/*<h6>Visiblity</h6> {item.item && item.item.visibility}*/}
                                        {/*</div>*/}
                                        {/*<div className="deadline">*/}
                                            {/*<h6>Published on</h6> {(new Date(item.item && item.item.created_at*1000)).toLocaleDateString('en-GB', {*/}
                                                {/*year: 'numeric',*/}
                                                {/*month: 'short',*/}
                                                {/*day: '2-digit'*/}
                                            {/*})}*/}
                                        {/*</div>*/}
                                        {/*<div className="deadline">*/}
                                            {/*<h6>Proposals</h6> {item.item && item.item.proposal_count}*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="text" dangerouslySetInnerHTML={{ __html: gs.truncateString(item && item.item && item.item.description, 400) }}></div>*/}
                                    <ReadMoreReact className="text" text={gs.html2text(item && item.item && item.item.description)} min={120} ideal={150} max={200} readMoreText={'Read More'} />
                                    <div className="chips">
                                        {item.item && item.item.skills.map((skill) =>
                                            <div className="badge badge-secondary" key={skill.id}>{skill.title}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Fragment>}
                </div>

                <div className="col-12">
                    <Pagination className="justify-content-end"
                        pageSize={20}
                        totalCount={(favorite && favorite.data && favorite.data.pagination.totalCount) ? favorite.data.pagination.totalCount : 10}
                        onChangePage={this.onChangePage} />
                </div>
            </div>
        </FavoriteLayout>);
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const favoriteSelector = createSelector(
    state => state.favorite,
    favorite => favorite
);

const mapStateToProps = createSelector(
    processSelector,
    favoriteSelector,
    (process, favorite) => ({
        process, favorite
    })
);

export default connect(mapStateToProps)(FavoriteJobs);

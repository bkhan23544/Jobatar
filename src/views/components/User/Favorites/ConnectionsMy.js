import React, { Component, Fragment } from 'react';
import { Main } from '../../../layout';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import Pagination from '../../../../helpers/Pagination';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import { favoriteActions, messageActions } from '../../../../common/redux/actions';
import { SearchLoader } from '../../../../common/loaders';
import { globalService as gs, itemService } from '../../../../common/services';
import { confirmAlert } from 'react-confirm-alert';
import { alertSelectors } from '../../../../common/redux/selectors';
import CoFounderNavbar from './partials/CoFounderNavbar';
import { ModuleHelper as mh } from '../../../../helpers';


class ConnectionsMy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                page: 1,
                connection_id: null,
                status: 1,
                key: 'my-connections'
            },
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        const formField = { ...this.state.formField };
        formField["connection_id"] = gs.getUser().id;
        dispatch(favoriteActions.connections("GET", null, { key: 'my-connections', status: 1 }));
    }

    onChangePage = (page) => {
        if (page !== 1) {
            const { dispatch } = this.props;
            const formField = { ...this.state.formField };
            formField["page"] = page;
            dispatch(favoriteActions.connections("GET", null, formField));
        }
    };

    accept = (item, index) => {
        this.request(item, index, 1, 'accept');
    };

    decline = (item, index) => {
        this.request(item, index, 2, 'decline');
    };

    messageOpen = (item) => {
        item.message_id ?
            this.props.history.push(`/messages/?key=${item.message_id}`) :
            this.message(item);
    };

    message = (item) => {
        const { dispatch } = this.props;
        if (item.message_id === null) {
            const params = {};
            const messageKey = item.message_id;
            const recipients = [];
            recipients[item.user_id] = {
                id: item.user.id,
                avatar: item.user.avatar,
                hometown: item.user.hometown,
                name: item.user.name
            };
            recipients[item.connection_id] = {
                id: item.connection_id,
                avatar: item.connection.avatar,
                hometown: item.connection.hometown,
                name: item.connection.name
            };
            params.user_id = gs.identity.user.id;
            params.recipients = recipients;
            params.text = 'Hi';
            params.group = null;
            params.attachment = null;
            params.item = { module: mh.UserConnection, moduleType: mh.UserConnection };
            dispatch(messageActions.sendMessageToFirebase(params, messageKey));
            this.props.history.push(`/messages/?key=${messageKey}`)
        }

        return true;
    };

    request = (item, index, status, action) => {
        const { dispatch } = this.props;
        const params = {
            "userConnection": {
                user_id: item.user_id,
                connection_id: item.connection_id,
                status: status
            }
        };
        confirmAlert({
            title: `Please confirm to ${action} `,
            message: `Are you sure to ${action} this connection list`,
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () =>
                        itemService.connection("POST", params)
                            .then(response => {
                                dispatch(alertSelectors.success(`You have successfully ${action} connection request`));
                                dispatch(favoriteActions.connections("GET", null));
                            })
                            .catch(exception => {
                                console.log(exception);
                            })
                }
            ]
        });
    };

    remove = (item, index) => {
        const { dispatch } = this.props;
        const params = {
            "userConnection": {
                user_id: item.user_id,
                connection_id: item.connection_id,
                status: 2
            }
        };
        confirmAlert({
            title: `Please confirm to remove `,
            message: `Are you sure to remove this connection list`,
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () =>
                        itemService.connection("POST", params)
                            .then(response => {
                                dispatch(alertSelectors.success(`You have successfully removed a connection request.`));
                                dispatch(favoriteActions.remove(index, 'connections'));
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
        let results = (favorite && favorite.connections) ? favorite.connections.items : null;
        // if (results) {
        //     for (let i = 0; i < 10; i++) {
        //         results.push(results[0])
        //     }
        // }
        return (
            // <Main>
            <>
                <DocumentTitle title="Cofounder Connection" />

                <div className="bg-body my-favorites col-lg-9 col-sm-12 paddingTop0">
                    <div className="">
                        <div className="row">
                            <div className="col-12 MarginTop47">
                                <h1 className="pb-2 d-flex align-items-center flex-wrap heading marginBottom0">Co-founder</h1>
                            </div>
                            <div className="col-12">
                                <CoFounderNavbar />
                            </div>
                            <div className="col-12" style={{overflow: "hidden"}}>
                                <div className="row">
                                    {process.loading ? <Fragment>
                                        {[1, 2, 3, 4].map((item) =>
                                            <div className="col-md-6 col-12" key={`loa${item}`}>
                                                <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={0} width={300} />
                                            </div>
                                        )}
                                    </Fragment> : <Fragment>
                                            {results && results.map((item, index) =>
                                                <div className="col-md-6 col-12" key={Math.floor(Math.random() * (+40 - +1)) + +1}>
                                                    <div className="freLncrBox no-hover card mb-4" style={{padding: 0}}>
                                                        <div className="card-body d-flex flex-wrap">
                                                            <div className="profile">
                                                                <img alt="images" className="img-fluid rounded-circle" width="145" height="145" src={item.connection && item.connection.avatar} />
                                                            </div>
                                                            <div className="caption">
                                                                <h3><NavLink to={`/user/public/about/${item.connection && item.connection.id}`}>{item.connection && item.connection.name}</NavLink></h3>
                                                                <div className="position">
                                                                    <span>{item.connection && item.connection.title}</span>
                                                                </div>
                                                                <div className="address d-flex align-items-center flex-wrap">
                                                                    <div className="w-100 mb-1 text-truncate">
                                                                        <i className="fas fa-map-marker-alt mr-2"></i>
                                                                        {item.connection && item.connection.countryCode && item.connection.countryCode.name}
                                                                    </div>
                                                                    <div className="w-100 mb-2">
                                                                        {item.connection.connections} Connections
                                                            </div>
                                                                </div>
                                                                <div className="action d-flex align-items-center">
                                                                    <button className="btn btn-primary px-4" onClick={() => this.messageOpen(item)}>Message</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {(results && results.length === 0) && <div className="col-12">
                                                <div className="card service-box">
                                                    <div className="card-body text-center">
                                                        <div className="common-not-found d-flex align-items-center justify-content-center">
                                                            <div className="inner">
                                                                <figure>
                                                                    <img src="/images/not-found/Co-founder.png" alt="Not found" width="100" />
                                                                </figure>
                                                                <h5>You have not connected with any co-founder yet</h5>
                                                                <p className="title">This is where you'll see all the co-founders you are connected with</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                        </Fragment>}
                                    <div className="col-12">
                                        <Pagination className="justify-content-end"
                                            pageSize={20}
                                            totalCount={(favorite && favorite.connections && favorite.connections.pagination.totalCount) ? favorite.connections.pagination.totalCount : 10}
                                            onChangePage={this.onChangePage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            // </Main>
        );
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

const authenticationSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const mapStateToProps = createSelector(
    processSelector,
    favoriteSelector,
    authenticationSelector,
    (process, favorite, authentication) => ({
        process, favorite, authentication
    })
);

export default connect(mapStateToProps)(ConnectionsMy);

import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import { itemService } from '../../../../common/services';
import Pagination from '../../../../helpers/Pagination';
import { SearchLoader } from '../../../../common/loaders';
import { confirmAlert } from 'react-confirm-alert';
import {alertSelectors, processSelectors} from '../../../../common/redux/selectors';
import { Main } from '../../../layout';
import CoFounderNavbar from './partials/CoFounderNavbar';

class ConnectionsRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            totalCount: null
        }
    }

    componentWillMount() {
        this.connection(1);
    }

    onChangePage = (page) => {
        if(page !== 1) {
            this.connection(page);
        }
    };

    connection = (page) => {
        const { dispatch } = this.props;
        dispatch(processSelectors.start());
        let param2 = {
            key: 'connection-requests',
            page: page
        };
        itemService.connection("GET", null, param2)
            .then(res => {
                this.setState({ items: res.items, totalCount: res.pagination.totalCount });
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                console.log(exception);
                dispatch(processSelectors.stop());
            });
    };

    accept = (item, index) => {
        this.request(item, index, 1, 'accept');
    };

    decline = (item, index) => {
        this.request(item, index, 2, 'decline');
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
            message: (action === 'accept') ? 'Are you sure you want to add this co-founder to your connection?' :  `You have successfully ${action} connection request`,
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
                                if(response.success === true) {
                                    dispatch(alertSelectors.success(`You have successfully ${action} connection request`));
                                    const items = this.state.items;
                                    items.splice(index, 1);
                                    this.setState({items: items});
                                } else {
                                    dispatch(alertSelectors.error('Error'));
                                }
                            })
                            .catch(exception => {
                                console.log(exception);
                            })
                }
            ]
        });
    };

    render() {
        const { process } = this.props;
        const { items, totalCount } = this.state;

        return (<Main>
            <DocumentTitle title="Received Request" />
            <div className="bg-body my-favorites">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="pb-2 d-flex align-items-center flex-wrap heading">Received Request</h1>
                        </div>
                        <div className="col-12">
                            <CoFounderNavbar />
                        </div>
                        {process.loading ? <Fragment>
                            {[1,2,3].map((item) =>
                                <div className="col-12" key={`loa${item}`}>
                                    <SearchLoader primaryBg={"#ddd"} secondaryBg={"#999"} listCount={0} width={900} />
                                </div>
                            )}
                        </Fragment> : <Fragment>
                            {items && items.map((item, index) =>
                                <div className="col-12" key={Math.floor(Math.random() * (+30 - +1)) + +1}>
                                    <div className="freAcpBox no-hover card mb-4">
                                        <div className="card-body d-flex">
                                            <div className="profile">
                                                <img alt="images" className="img-fluid rounded-circle" width="60" height="60" src={item.user.avatar} />
                                            </div>
                                            <div className="caption col">
                                                <div className="row">
                                                    <div className="col">
                                                        <h3><NavLink to={`/user/public/about/${item.user.id}`}>{item.user.name} </NavLink></h3>
                                                        {/* <div className="address d-flex align-items-center flex-wrap">
                                                            <div className="w-100 mb-1">
                                                                <i className="fas fa-map-marker-alt"></i> {item.user && commonHelper.address(item.user)}
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                    <div className="col">
                                                        {item.user.title}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="action d-flex align-items-center">
                                                <button className="btn btn-primary mr-2" onClick={() => this.accept(item, index)}><i className="fas fa-check text-white"></i> Accept</button>
                                                <button className="btn btn-accept" onClick={() => this.decline(item, index)}><i className="fas fa-times text-white"></i> Decline</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(items && items.length === 0) && <div className="col-12">
                                <div className="card service-box">
                                    <div className="card-body text-center">
                                        <div className="common-not-found d-flex align-items-center justify-content-center">
                                            <div className="inner">
                                                <figure>
                                                    <img src="/images/not-found/Co-founder.png" alt="Not found" width="100" />
                                                </figure>
                                                <h5>You have not received any co-founder request yet</h5>
                                                <p className="title">This is where you’ll see all the connection requests you received from co-founders</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </Fragment>}
                        <div className="col-12">
                            <Pagination className="justify-content-end"
                                pageSize={20}
                                totalCount={(totalCount && totalCount) ? totalCount : 10}
                                onChangePage={this.onChangePage} />
                        </div>

                    </div>
                </div>
            </div>
        </Main>);
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

export default connect(mapStateToProps)(ConnectionsRequest);

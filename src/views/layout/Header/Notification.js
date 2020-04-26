import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {Dropdown} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import {defaultService, globalService as gs} from "../../../common/services";
import {urlHelper} from "../../../helpers";
import {alertSelectors} from "../../../common/redux/selectors";

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            hasMore: true,
            count: 0,
            totalCount: null
        };
        this.offset = 1;
        this.initilizeState = this.state;
    }

    componentDidMount = () => {
        let user_id = gs.getUser().id;
        gs.db.ref(`User/${user_id}/is_notified`)
        .on("value", (snap) => {
            this.fetchFirst();
        });
    };

    componentWillUnmount(){
        this.setState(this.initilizeState);
    }

    fetchFirst = () => {
        defaultService.notificationPull({ page: 1 }).then(data => {
            let items = data.items;
            let count = data.pagination.totalCount;
            this.setState({ items, count });
            //console.log('data', data);
            //console.log('this.state', this.state);
        }).catch(error => {
            console.log(error);
        });
    };

    fetchMoreData = () => {
        const { items, count } = this.state;
        if (items.length >= count) {
          this.setState({ hasMore: false });
          return;
        }
        this.fetchNoti();
    };

    fetchNoti = () => {
        defaultService.notificationPull({page: this.offset}).then(data => {
            this.offset = this.offset + 1;
            let lists = this.state.items;
            data.items.forEach(group => {
                lists.push(group);
            });
            this.setState({
                items: lists,
                totalCount: data.pagination.totalCount
            });
        }).catch(error => {
            console.log(error);
        });
    };

    read = (item) => {
        const { dispatch } = this.props;
        defaultService.notificationRead({"selection":item.message_id}).then(data => {
            dispatch(alertSelectors.success(data.message));
            //dispatch(notificationActions.pull(null));
            this.fetchFirst();
        }).catch(error => {
            console.log(error);
        });
    };




    render() {
        //console.log(this.state)
        //const { notifications } = this.props;
        const { count } = this.state;
        return(
            <Fragment>
                <Dropdown className="dropdown-notification">
                    <Dropdown.Toggle as="a" className="nav-link" to="/setting/notifications">
                        <img src="/images/Bell.png" alt="" className="img-fluid" width="25" />
                        <span className="badge badge-info">{(count > 0) ? count : ''}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-right dropdown-menu-media">
                        <div className="dropdown-arrow"></div>
                        <div className="dropdown-header text-center">
                            <div>
                                <span className="font-18"><strong>{count} New</strong> Notifications</span>
                            </div>
                            <NavLink className="text-muted font-13" to="/dashBoard/setting/notifications">view all</NavLink>
                        </div>
                        <div className="w-100 timeline">
                            {(this.state.items.length > 0) &&
                                <InfiniteScroll className="scroll css-scroll list-group"
                                                dataLength={this.state.items.length}
                                                next={this.fetchMoreData}
                                                hasMore={this.state.hasMore}
                                                loader={<p className="text-center mb-0">Loading...</p>}
                                                height={300}
                                                endMessage={
                                                    <p className="text-center mb-0"> <b>Yay! You have seen it all</b> </p>
                                                }
                                >
                                    {this.state.items.map((item, index) => (
                                        <Link to={urlHelper.notifyUrl(item)} className={`list-group-item list-group-item-action borderBottomNoti`} key={item && item.message_id} onClick={() => this.read(item)}>
                                            {item.avatar &&
                                            <div className="image">
                                                <img src={item.avatar.thumb} alt="" className="img-fluid border rounded-circle" width="40" height="40" />
                                            </div>}
                                            <div className={`caption ${item.avatar ? '' : 'w-100'}`}>
                                                <span className="text">{item && item.notification}</span>
                                                <small className="float-right text-muted ml-2 nowrap">{moment(item && item.created_at * 1000).format('LL')}</small>
                                            </div>
                                        </Link>
                                    ))}
                                </InfiniteScroll>
                            }
                            {(this.state.items.length === 0) && <div className={'common-not-found p-3 text-center'} style={{minHeight: '240px'}}>
                                <div className="inner">
                                    <figure>
                                        <img src="/images/not-found/No-notification.png" alt="Not found" width="100" />
                                    </figure>
                                    <h5>NO NOTIFICATIONS YET</h5>
                                    <p className="title">This is where you’ll see all your notifications</p>
                                </div>
                            </div>}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </Fragment>
        )
    }
}

const authSelector = createSelector(
    state => state.authentication,
    authentication => authentication
);

const notificationSelector = createSelector(
    state => state.notifications,
    notifications => notifications
);

const mapStateToProps = createSelector(
    authSelector, notificationSelector,
    (authentication, notifications) => ({
        authentication, notifications
    })
);

export default connect(mapStateToProps)(Notification);
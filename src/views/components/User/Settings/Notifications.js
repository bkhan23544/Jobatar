import React, {Component} from 'react';
import {createSelector} from "reselect";
import {connect} from "react-redux";
import {Card, Row, Col} from 'react-bootstrap';
import { Main } from '../../../layout';
import { DocumentTitle } from '../../../../helpers/DocumentTitle';
import NavBar from './partials/NavBar';
import Pagination from '../../../../helpers/Pagination';
import moment from "moment";
import {defaultService} from "../../../../common/services";
import { Link } from "react-router-dom";
import { notificationActions } from "../../../../common/redux/actions";
import {alertSelectors} from "../../../../common/redux/selectors";
import {urlHelper} from "../../../../helpers";
import {confirmAlert} from "react-confirm-alert";

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pagesize: 20,
        }
    }

    componentWillMount = async () => {
        //const { dispatch, notifications } = this.props;
        //Object.getOwnPropertyNames(notifications).length === 0 && dispatch(notificationActions.list(null));
        //Object.getOwnPropertyNames(notifications).length === 0 && dispatch(notificationActions.actions(null));
    };

    componentDidMount = async () => {
        //console.log(await this.props);
    };

    read = (item) => {
        const { dispatch } = this.props;
        if(item.seen === false) {
            defaultService.notificationRead({"selection":item.message_id}).then(data => {
                dispatch(alertSelectors.success(data.message));
            }).catch(error => {
                console.log(error);
            });
        }
    };

    delete = (item) => {
        const { dispatch } = this.props;

        confirmAlert({
            title: `Please confirm to delete `,
            message: `Are you sure you want to delete this notification?`,
            buttons: [
                {
                    label: 'No',
                    onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                },
                {
                    label: 'Yes',
                    onClick: () =>
                        defaultService.notificationDelete({"selection":item.message_id}).then(data => {
                            dispatch(alertSelectors.success(data.message));
                            dispatch(notificationActions.list({page: 1}));
                        }).catch(error => {
                            console.log(error);
                        })
                }
            ]
        });

    };

    onChangePage = (page) => {
        const { dispatch } = this.props;
        dispatch(notificationActions.list({page: page}));
    };

    render() {
        const { notifications } = this.props;
        let notification = (notifications && notifications.list && notifications.list.items) ? notifications.list.items : [];
        return (<Main>
            <DocumentTitle title={`Notifications`}/>

            <div className="update-profile bg-body">
                <div className="container">
                    <Card className="mb-4 mb-lg-5">
                        <Card.Header>Notifications</Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs="12" md="3" xl="3">
                                    <NavBar />
                                </Col>
                                <Col xs="12" md="9" xl="9" className="add-stripe-account">
                                    <Card.Title>Notifications</Card.Title>
                                    {(notification && notification === 0) && <div className={'common-not-found p-3 text-center'} style={{minHeight: '240px'}}>
                                        <div className="inner">
                                            <figure>
                                                <img src="/images/not-found/No-notification.png" alt="Not found" width="100" />
                                            </figure>
                                            <h5>NO NOTIFICATIONS YET</h5>
                                            <p className="title">This is where you’ll see all your notifications</p>
                                        </div>
                                    </div>}
                                    <div className="notification-list list-group mb-4">
                                        {notification && notification.map(item => <div className={`list-group-item list-group-item-action d-flex align-items-center ${(item && item.status === 'Read') ? 'bg-white' : 'bg-light'}`} key={item && item.message_id}>
                                            <span className={'w-100'} onClick={() => this.read(item)}><Link to={urlHelper.notifyUrl(item)}>{item && item.notification}</Link></span>
                                            <small className="float-right text-muted ml-2 text-nowrap">{moment(item && item.created_at * 1000).format('LL')}</small>
                                            <button className={'btn btn-outline-info btn-sm float-right ml-2'} onClick={() => this.delete(item)}><i className={'fa fa-trash'}></i></button>
                                        </div>)}
                                    </div>
                                    <Pagination className="justify-content-end"
                                    pageSize={this.state.pagesize}
                                    totalPages={3}
                                    totalCount={(notifications && notifications.list && notifications.list.pagination && notifications.list.pagination.totalCount) ? notifications.list.pagination.totalCount : 10}
                                    onChangePage={this.onChangePage} />
                                    
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        </Main>);
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const notificationSelector = createSelector(
    state => state.notifications,
    notifications => notifications
);

const mapStateToProps = createSelector(
    processSelector, notificationSelector,
    (process, notifications) => ({
        process, notifications
    })
);

export default connect(mapStateToProps)(Notifications);

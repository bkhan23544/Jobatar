import React, { Component } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import moment from 'moment';
import { history } from '../../../../helpers/history';
import { globalService as gs } from '../../../../common/services';
import { commonHelper as common } from '../../../../helpers';
import './ConversationListItem.scss';

class ConversationListItem extends Component {

  constructor(props) {
    super(props);
    this.state = { activeKey: null, user_id: parseInt(gs.identity.user.id), recipient: props.recipient };
  }

  loadNewMessage = (current) => {

    const {  activeKey } = this.props;
    if (activeKey === current.key) return false;

    if (current.group === null || current.group === undefined) {
      current.group = { image: this.state.recipient.avatar, name: this.state.recipient.name };
    }
    this.props.changeCurrent(current);
    this.setState({ activeKey: current.key });
    history.push(`/messages/?${common.urlParams('key', current.key)}`);
  };

  getImage = () => {
    const { recipient } = this.state;
    return recipient && (<img className="conversation-photo" src={recipient.avater} alt={recipient.name} />)
  }

  getTitle = () => {
    const { recipient } = this.state;
    return (recipient) && (<span className="col pl-0 pr-2">{recipient.name}</span>);
  };

  groupImage = (group) => {
    let groupImage = group.image === '' ? '/images/no-image.jpg' : group.image;
    return (<img className="conversation-photo" src={groupImage} alt={group.title} />)
  }

  render() {

    const { data, searchParam, activeKey } = this.props;
    const { message, key } = data;
    if (data.group === null || data.group === undefined) {
      data.group = null;
    }

    const search = new URLSearchParams(searchParam.location.search);
    const searchKey = search.get("key") === null ? activeKey : search.get("key");
    let cr = data.recipients[gs.identity.user.id];
    const unread = cr === undefined ? 0 : cr.unread;
    const dateTime = moment(message.created_at).format('HH:mm');
    const oldDay = new Date().getTime() - (24 * 60 * 60 * 1000);
    const dateFormat = (message.created_at > oldDay) ? dateTime : moment(message.created_at).format('LL');

    return (message) &&
      (<div className={'conversation-list-item border-bottom ' + ((key === searchKey) ? 'active' : '') + ' ' + ((unread !== 0) ? 'unread' : '')} onClick={() => this.loadNewMessage(data)}>
        {(data.group === null) ? this.getImage() : this.groupImage(data.group)}
        <div className="conversation-info">
          <h2 className="conversation-title d-flex align-items-center">
            {data.group === null ? this.getTitle() : (<span className="col pl-0 pr-2">{data.group && gs.truncateString(data.group.title, 50)}</span>)}
            <small> {dateFormat}</small>
            {(unread !== 0) && <small className="unreadCircle">{unread} </small>}
          </h2>
          <p className="conversation-snippet" dangerouslySetInnerHTML={{ __html: message && gs.truncateString(message.text, 45) }}></p>
        </div>
      </div>
      );
  }
}

const authSelector = createSelector(
  state => state.authentication,
  authentication => authentication
);

const mapStateToProps = createSelector(
  authSelector,
  (authentication) => ({
    authentication
  })
);


export default connect(mapStateToProps)(ConversationListItem);
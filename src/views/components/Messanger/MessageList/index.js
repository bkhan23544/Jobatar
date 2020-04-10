import React, { Component, Fragment } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import Compose from "../Compose";
import moment from 'moment';
import UserProfile from "../UserProfile";
import Attachment from "./Attachment";
import { globalService as gs } from "../../../../common/services";
import "./MessageList.scss";
import "./Message.css";

class MessageList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      activeKey: null,
      current: null,
      threads: [],
      profile: props.recipient,
      user_id: gs.identity.user.id,
      previousAt: null,
      lastAt: Date.now(),
      loading: true,
      error: null,
      refreshing: false,
      isOnly: false,
      attachment: null,
      attachments: null,
    };
    this.attachmentDated = null;
    this.initilizeState = this.state;
    this.previousAt = Date.now();
    this.lastAt = Date.now();
    this.messagingRef = React.createRef();
  }

  componentDidMount = () => {
    this._mount(this.props);
  }

  componentWillUnmount() {
    this.setState(this.initilizeState);
  }

  componentWillReceiveProps = (props) => {
    let newCurrent = props && props.current;
    const { activeKey, current } = this.props;
    if (newCurrent && (props.activeKey === activeKey)) {
      this.scrollDown(current);
    }
  }

  _mount = (props) => {
    let current = props && props.current;
    if (current && (current.key !== this.state.activeKey)) {
      this.setState({ threads: [], current, activeKey: current.key }, () => {
        this.load(current, Date.now());
      });
    }
  }

  load = (current) => {
    const { isOnly, lastAt, previousAt } = this.state;
    let currentPreviousAt = (isOnly) ? Date.now() : this.previousAt;
    if (current) {
      gs.db.ref(`UserMessage/${current.key}`)
        .orderByChild('created_at')
        .endAt(currentPreviousAt)
        .limitToLast(isOnly ? 1 : 50)
        .on("value", (snap) => {
          if ((this.lastAt === lastAt || lastAt === null) && (this.previousAt === previousAt || previousAt === null)) {
            let threads = snap && gs.ObjectToArray(snap.val());
            this.process(threads);
          }
        });
    }
  };

  process = (items) => {
    const { current } = this.state;
    let threads = [];
    const isOnly = this.state.isOnly;
    if (current !== null) {
      let tempThreads = (isOnly === true) ? [...this.state.threads, ...items] : [...items, ...this.state.threads];
      tempThreads = tempThreads.filter((v, i, a) => a.indexOf(v) === i);
      threads = tempThreads.sort((a, b) => (a.created_at > b.created_at ? 1 : (a.created_at < b.created_at ? -1 : 0)));
      this.previousAt = threads && threads[0] && (parseInt(threads[0]['created_at'] - 1));
      this.lastAt = threads && (parseInt(threads[threads.length - 1]['created_at'] - 1));
      this.setState({ threads, previousAt: this.previousAt, lastAt: this.lastAt, refreshing: false, isOnly: false });
      if (isOnly === true) {
        let ref = this.messagingRef;
        if (ref.current !== null) {
          ref.current.scrollTop = ref.current.scrollHeight;
        }
      }
    }
  };

  getProfile = (current) => {
    const { profile } = this.state
    return (profile) && (<UserProfile current={current} profile={profile} />);
  };

  /*renderAttachment = (activeKey, createdAt, uri) => {
    let extension = gs.fileExtension(uri);
    let icons = gs.classIcon(extension);
      return (uri !== undefined || uri !== '' || uri !== null) ? ((gs.checkImage(extension) === true) ?
        (<div className="attachments"><a href={`${uri}`} target="_blank" rel="noopener noreferrer"><img src={uri} width="200" /></a></div>) : (<div className="attachments"><a href={`${uri}`} target="_blank" rel="noopener noreferrer"><i className={`fa-6x far fa-file-${icons}`}></i></a></div>)) : (<span></span>);
  }*/

  renderMessage = (idx, data, activeKey) => {
    const isMine = Number.isInteger(data.sender) ? (parseInt(gs.identity.user.id) === parseInt(data.sender)) :
      (parseInt(gs.identity.user.id) === parseInt(data.sender.id));
    const friendlyTimestamp = moment(data.created_at).format('LLLL');

    return (
      <div key={idx} className={isMine === true ? 'message mine' : 'message'}>
        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            {(data.is_attachment === true) ? (<Attachment activeKey={activeKey} createdAt={data.created_at} attachment={data.text} />) : (<div dangerouslySetInnerHTML={{ __html: (data && data.text) }}></div>)}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { threads, profile, activeKey, current } = this.state;
    return (
      <Fragment>
        {current &&
          <div className="message-list">
            {(current.group === undefined || current.group === null) && profile ? this.getProfile(current) : (<UserProfile current={current} profile={profile} />)}
            {<div name="messaging" className={"message-list-container css-scroll"}
              ref={this.messagingRef}
              onScroll={this.handleRefresh}
              id="messagingContainer">
              {(threads && threads.length) ? threads.map((thread, idx) => this.renderMessage(idx, thread, activeKey)) : this.renderLoading()}
            </div>}
            <Compose profile={profile} activeKey={activeKey} current={current} />
          </div>
        }
      </Fragment>
    );
  }

  renderLoading = () => {
    return (
      <div className="blank_page d-flex align-items-center justify-content-center w-100 h-100">
        <div className="common-not-found d-flex align-items-center justify-content-center">
          <div className="inner text-center">
            <figure>
              <img src="/images/not-found/message-empty.png" alt="message empty" width="100" />
            </figure>
            <h5>Loding.....</h5>
          </div>
        </div>
      </div>
    );
  };

  scrollDown = (current) => {
    this.setState({ refreshing: true, isOnly: true, current, activeKey: current.key }, () => {
      this.load(current);
    });
  };

  handleRefresh = () => {
    let ref = this.messagingRef;
    const scrollTop = ref.current.scrollTop;
    if (scrollTop === 0) {
      this.setState({ refreshing: true, isOnly: false }, () => {
        this.load(this.state.current);
        ref.current.scrollTop = 20;
      });
    }
  }
}

const processSelector = createSelector(
  state => state.process,
  process => process
);

const authenticationSelector = createSelector(
  state => state.authentication,
  authentication => authentication
);

const mapStateToProps = createSelector(
  processSelector,
  authenticationSelector,
  (process, authentication) => ({
    process,
    authentication,
  })
);

export default connect(mapStateToProps)(MessageList);
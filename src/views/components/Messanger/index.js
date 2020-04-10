import React, { Component } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import MessageList from "./MessageList";
import ConversationList from "./ConversationList";
import "./Messenger.css";
import { globalService as gs, itemService } from "../../../common/services";
import { ModuleHelper as mh, commonHelper as common } from "../../../helpers";
import { history } from "../../../helpers/history";
import { Main } from "../../layout";
import { DocumentTitle } from "../../../helpers/DocumentTitle";

class Messenger extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			loading: true,
			activeKey: null,
			user_id: parseInt(gs.identity.user.id),
			recipient: null,
			current: null,
			modules: null,
			mountCurrent: false,
		};
		this.module = 'All';
		this.modules = [];
		this.activeKey = null;
		this.messages = [];
		this.current = null;
		this.sortedItems = null;
		this._isMounted = false;
		this.initilizeState = this.state;
	}

	componentWillMount = () => {
		const userKey = parseInt(this.state.user_id);
		gs.db.ref(`UserMessageRecipient`)
			.orderByChild('recipients/' + userKey + '/id')
			.equalTo(userKey)
			.on("value", (snap) => this.process(snap));
	}

	componentDidMount = () => {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this.current = null;
		this._isMounted = false;
		this.setState(this.initilizeState);
	}

	getParamKey() {
		let search = new URLSearchParams(this.props.location.search);
		let paramKey = search && search.get("key");
		return (paramKey === undefined || paramKey === null) ? null : paramKey;
	}



	process = (snap) => {
		const i = gs.ObjectToArray(snap.val());
		this.sortedItems = i.sort((a, b) => (a.updated_at < b.updated_at ? 1 : (a.updated_at > b.updated_at ? -1 : 0)));
		let data = this.sortedItems && this.sortedItems.map((item) => item.item.moduleType);
		this.modules = data.filter((v, i, a) => a.indexOf(v) === i);
		this.sortedMessage();
	};

	sortedMessage = () => {
		this.messages = [];
		this.sortedItems && this.sortedItems.map((item) => {
			if (item && item.message && this.module !== null) {
				if (this.module === item.item.moduleType) {
					this.messages.push(item);
				}
				if (this.module === 'All') {
					this.messages.push(item);
				}
			}
		});
		if (this.messages.length > 0) {
			this.currentMessage();
		}
		this.setState({ loading: false, });


	};

	currentMessage = () => {
		let key = this.getParamKey();
		const { current } = this.state;
		const message = (current === null && this.messages.length > 0) ? this.messages[0] : current;
		let keyMessage = (key) ? this.messages.find((thread) => (thread.key === key)) : message;
		keyMessage = (keyMessage === undefined || keyMessage === null) ? message : keyMessage;
		if (keyMessage) {
			this.setCurrent(keyMessage);
		}
	};

	setCurrent = (recent) => {
		let moduleType = (this.module === null) ? recent.item.moduleType : this.module;
		if ((this.activeKey === null) || (this.activeKey !== recent.key)) {
			this.setState({ module: moduleType, messages: this.messages, mountCurrent: false, });
			this.loadRecipient(recent);
			this.activeKey = recent.key;
			history.push(`/messages/?${common.urlParams('key', recent.key)}`);
		} else {
			const { current } = this.state;
			if (current && (recent.message.created_at > current.message.created_at)) {
				current.message = recent.message;
				this.setState({ module: moduleType, messages: this.messages, current });
			}
		}
	};

	loadRecipient = (current) => {
		let rs = Object.values(current.recipients),
			r = rs.find((r) => (this.state.user_id !== parseInt(r.id)));
		try {
			itemService
				.profile("GET", null, { item_id: r.id })
				.then((response) => {
					let p = response.user;
					let recipient = { id: r.id, avater: p.avatar, name: p.name, status: r.status, hometown: p.hometown }
					if (current.group === undefined || current.group === null) {
						current.group = { image: recipient.avater, title: recipient.name };
					}
					current.group.hometown = recipient.hometown;
					this.setState({ recipient, current, activeKey: current.key, mountCurrent: true, });
					gs.readMessageThread(current.key, this.state.user_id);
				});
		} catch (e) {
			console.log("Error: ", e);
		}
	};

	setModule = (module) => {
		this.module = module;
		this.setState({ current: null, activeKey: null });
		this.activeKey = null;
		this.sortedMessage();
	};

	loadConversation = () => {
		const { messages, activeKey, recipient } = this.state;
		return (recipient && <ConversationList messages={messages} activeKey={activeKey} searchParam={this.props} setModule={this.setModule} module={this.module} modules={this.modules} changeCurrent={this.setCurrent} recipient={recipient} />);
	};

	loadMessage = () => {
		const { activeKey, recipient, current } = this.state;
		return (recipient && current && <MessageList searchParam={this.props} current={current} recipient={recipient} activeKey={activeKey} />);
	};

	renderEmpty = () => {
		return (
			<div className="blank_page d-flex align-items-center justify-content-center w-100 h-100">
				<div className="common-not-found d-flex align-items-center justify-content-center">
					<div className="inner text-center">
						<figure>
							<img src="/images/not-found/message-empty.png" alt="message empty" width="100" />
						</figure>
						<h5>Your inbox message is empty.</h5>
					</div>
				</div>
			</div>
		);
	};

	renderLoadingEmpty = () => {
		return (
			<div className="blank_page d-flex align-items-center justify-content-center w-100 h-100">
				<div className="common-not-found d-flex align-items-center justify-content-center">
					<div className="inner text-center">
						<figure>
							<img src="/images/not-found/message-empty.png" alt="message empty" width="100" />
						</figure>
						<h5>Loading ...</h5>
					</div>
				</div>
			</div>
		);
	};

	render() {
		const { mountCurrent, messages, current, loading } = this.state;
		return (
			<Main>
				<DocumentTitle title={`Messages`} />
				<div className="w-100 pull-left bg-body">
					{(messages && messages.length > 0) ? (<div className="messenger container my-4">
						<div className="sidebar">
							{this.loadConversation()}
						</div>
						<div className="content">
							{current && mountCurrent && this.loadMessage()}
						</div>
					</div>) : loading === true ? this.renderLoadingEmpty() : this.renderEmpty() }
				</div>
			</Main>
		);
	}
}

const processSelector = createSelector(
	state => state.process,
	process => process
);

const messageSelector = createSelector(
	state => state.message,
	message => message
);

const mapStateToProps = createSelector(
	processSelector,
	messageSelector,
	(process, message) => ({
		process,
		message
	})
);

export default connect(mapStateToProps)(Messenger);

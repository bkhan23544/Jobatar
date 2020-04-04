import React, { Component, Fragment } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import ConversationSearch from "../ConversationSearch";
import ConversationModule from "../ConversationModule";
import ConversationListItem from "../ConversationListItem";
import "./ConversationList.css";


class ConversationList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			hasMore: true,
			per_page: 20,
			page: 1,
			activeKey: null,
			searchResult: [],
			recipient: props.recipient,
			module: 'All'
		};
	}

	componentDidMount = () => {
		const { messages, activeKey, module } = this.props;
		this.loadMessage(messages, activeKey, module);
	};

	componentWillReceiveProps(props) {
		const { messages, activeKey, module } = props;
		this.loadMessage(messages, activeKey, module);
	}

	loadMessage = (messages, activeKey, module, value = null) => {
		if (value !== null && value.length > 0) {
			let result = messages;
			result = result.filter((item) => {
				let itemName = item.group.title.toLowerCase() + item.message.text.toLowerCase();
				return itemName.indexOf(value.toLowerCase()) !== -1
			});
			this.setState({
				activeKey,
				messages: result,
				module
			});
		} else {
			this.setState({ activeKey, messages, module });
		}
	};

	search = (value = null) => {
		const { messages, activeKey, module } = this.props;
		this.loadMessage(messages, activeKey, module, value);
	};

	setModule = (module) => {
		this.setState({ module });
		this.props.setModule(module);
	};

	changeCurrent = (item) => {
		this.setState({ activeKey: item.key });
		this.props.changeCurrent(item);
	};

	render() {
		const { messages, activeKey, module, recipient } = this.state;
		return (<Fragment>
			<div className="search-toolbar">
				<h3 className="toolbar-title col">Message</h3>
				<ConversationModule setModule={this.setModule} module={module} modules={this.props.modules} />
			</div>
			<ConversationSearch onChange={this.search} />
			{messages && activeKey && <div className="conversation-list pb-1">
				<div className="scrollable11 css-scroll" style={{ overflowX: 'hidden', overflowY: 'scroll' }}>
					{messages && messages.map(item => (item && <ConversationListItem key={item.key} data={item} activeKey={activeKey} searchParam={this.props.searchParam} recipient={recipient} changeCurrent={this.changeCurrent} />))}
					{(messages && messages.length === 0) && <div className="p-3 text-center">Result not found</div>}
				</div>
			</div>}
		</Fragment>
		);
	}
}


const processSelector = createSelector(
	state => state.process,
	process => process
);

const mapStateToProps = createSelector(
	processSelector,
	(process, ) => ({
		process,
	})
);

export default connect(mapStateToProps)(ConversationList);

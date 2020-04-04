import React, { Component } from 'react';
import { FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import './ConversationModule.css';
import { ModuleHelper as mh } from '../../../../helpers';


class ConversationModule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			module: 'All',
		}
	}

	componentDidMount() {
		const { module, modules } = this.props;
		this.setState({ module })
	}

	componentWillReceiveProps(props) {
		const { module } = props;
		this.setState({ module });
	}

	handleChange = (e) => {
		this.setState({
			module: e.target.value
		});
		this.props.setModule(e.target.value);
	};

	render() {
		const { module } = this.state;
		return (
			<div className="pr-3">
				<FormControl className="select-type">
					<Select
						id="simple-message-type"
						value={module}
						name="messageType"
						onChange={this.handleChange}>
						<MenuItem value={'All'}>All</MenuItem>
						{this.props.modules && this.props.modules.map((item) => (<MenuItem key={item} value={item}>{mh.moduleTitle(item)}</MenuItem>))}
					</Select>
				</FormControl>
			</div>);
	}
}

export default ConversationModule;
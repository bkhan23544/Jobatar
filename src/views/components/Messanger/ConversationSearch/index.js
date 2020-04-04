import React, { Component } from 'react';
import './ConversationSearch.css';

class ConversationSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  search: ""
		}
	}

	componentDidMount() {
		//console.log(this.props);
	}

	handleChange = (e) => {
		this.setState({
		  search: e.target.value
		});
		this.props.onChange(e.target.value)
	};

  	render() {
		return (
			<div className="conversation-search border-bottom">
				<input type="search" className="conversation-search-input" placeholder="Search Messages" name="search" value={this.state.search} onChange={this.handleChange} />
			</div>
		);
  	}
}

export default ConversationSearch;
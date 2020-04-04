import React, { Component } from 'react';
import './Toolbar.css';

export default class Toolbar extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="toolbar">
        <h1 className="toolbar-title">{ title }</h1>
        <div className="right-items">Select Message Type</div>
      </div>
    );
  }
}
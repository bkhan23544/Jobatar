import React, { Component } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";
import "./UserProfile.scss";
import { Link } from "react-router-dom";
import { ModuleHelper as mh } from "../../../../helpers";

class UserProfile extends Component {

  _showName = () => {
    const { profile } = this.props
    return (profile && <h6 className="mb-0">{profile.name}</h6>);
  }

  render() {

    const { current, profile } = this.props;
    let image = (current.group.image === "") ? profile.avater : current.group.image;
    return (
      current && current.group &&
      <div className="w-100">
        <div className="top-profile border-bottom d-flex align-items-center">
          <div className="profile">
            <img
              src={image}
              alt="Profile"
              width="60"
              height="60"
              className="img-fluid rounded-circle"
            />
          </div>
          <div className="caption col pr-0 d-flex align-items-center">
            <div className="title col pl-0">
              <h5 className="mb-0 conv-title">{current.group.title}</h5>
              <p className="user-name">{(current.item.module === mh.UserItemProposal) && this._showName()}</p>
              <p className="mb-0">{current.group.hometown}</p>
            </div>
            <div className="action">
              {((current.item.module === mh.UserItemProposal) && (<Link to={`/contracts/view/${current.item.item_id}`} className="btn btn-info view-det-btn">View Details</Link>))}
            </div>
          </div>
        </div>
      </div>
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

const authenticationSelector = createSelector(
  state => state.authentication,
  authentication => authentication
);

const mapStateToProps = createSelector(
  processSelector,
  messageSelector,
  authenticationSelector,
  (process, message, authentication) => ({
    process,
    message,
    authentication
  })
);

export default connect(mapStateToProps)(UserProfile);

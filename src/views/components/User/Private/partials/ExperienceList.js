import React, {Component, Fragment} from "react";
import { Row, Col } from "react-bootstrap";
import {createSelector} from "reselect";
import {connect} from "react-redux";
import moment from 'moment';


class ExperienceList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getYear = (date) => {
        let nedDate = [];
        //return new Date(date).getFullYear();
        nedDate.push(new Date(date).getMonth());
        nedDate.push(new Date(date).getFullYear());
        return nedDate.join("/ ")
    };

    onEdit = (item) => this.props.onEdit('experience', item, true);
    onDelete = (item) => this.props.onDelete('experience', item);

    render() {
        const items = this.props.items;

        return (<Fragment>
            <div>
                <div>
                    <ul className="list-group">
                        {items && items.map(item =>
                            (<li key={`experience-${item.id}`} className="list-group-item d-flex align-items-center">
                                <h6 className="mb-0 col pl-0">{item.title} <small>({`${moment(item.from).format('MM/YYYY')} to ${item.is_present === 1 ? 'Present' : moment(item.to).format('MM/YYYY')}`})</small></h6>
                                <div className="d-flex">
                                    <button className="btn btn-sm btn-outline-info mr-1 trash-btn" onClick={() => this.onDelete(item.id)}><i
                                        className="far fa-trash-alt"></i></button>
                                    <button className="btn btn-outline-primary float-right btn-sm" onClick={() => this.onEdit(item)}><i className="fas fa-pencil-alt"></i></button>

                                </div>
                            </li>)
                        )}
                        {items && (items.length === 0) &&
                            <div className="pl-2">None</div>
                        }
                    </ul>
                </div>
            </div>
        </Fragment>);
    }
}

const experiencesSelector = createSelector(
    state => state.experiences,
    experiences => experiences
);

const mapStateToProps = createSelector(
    experiencesSelector,
    (experiences) => ({
        experiences
    })
);


export default connect(mapStateToProps)(ExperienceList);



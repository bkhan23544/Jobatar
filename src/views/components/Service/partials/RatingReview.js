import React, { Component, Fragment } from 'react';
import Rating from '@material-ui/lab/Rating';
import { Element } from 'react-scroll';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Box } from '@material-ui/core';
import "react-alice-carousel/lib/alice-carousel.css";
import { itemService } from '../../../../common/services';
import Select from 'react-select';


class RatingReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reviews: null,
            item: null,
            settlement: null,
            moduleId: null,
            isShowDropdown: true,
            isShowAvgRating: true,
            proposal: null,
            selectedReviews: null
        };
    }

    componentWillMount() {
        const { item, moduleId, isShowDropdown, isShowAvgRating, proposal } = this.props;
        this.setState({
            item,
            moduleId,
            isShowDropdown,
            isShowAvgRating,
            proposal
        });
        this.ratings(moduleId);
    }

    componentWillReceiveProps() {
        const { item, moduleId, isShowDropdown, isShowAvgRating, proposal } = this.props;
        this.setState({
            item,
            moduleId,
            isShowDropdown,
            isShowAvgRating,
            proposal
        });
        this.ratings(moduleId);
    }

    ratings = (moduleId, settlement = null) => {
        const { item, proposal } = this.props;
        let user_id = item && item.user && item.user.id;
        let item_id = item && item.id;
        let proposal_id = proposal && proposal.id ? proposal.id : null;
        itemService.review("GET", null, { item_id, moduleId, settlement, user_id, proposal_id })
            .then(res => {
                res && res.items && this.setState({ reviews: res.items });
            });
    };

    handleChange = (e) => {
        const { moduleId } = this.state;
        this.ratings(moduleId, e.target.value);
        let formField = { ...this.state.formField };
        if (e.target.value) {
            formField['selectedReviews'] = e.target.value;
            this.setState(formField);
        } else {
            formField['selectedReviews'] = null;
            this.setState(formField);
        }

    };

    changable=(e)=>{
        this.setState({
            settlement: e
        },()=>{
            console.log(this.state.settlement)
        })
    }

    render() {
        const { item, reviews, isShowDropdown, isShowAvgRating, selectedReviews } = this.state;
        let profile = item && item.user && item.user.userProfile;
        console.log(profile,"this is profile")
        const options = [
            { value: '', label: 'All Reviews' },
            { value: 'cash', label: 'Cash Reviews' },
            { value: 'exchange', label: 'Exchange Reviews' }
        ]
        return (<Element className="public-rating card col-lg-12 col-md-12 col-sm-12 col-12" name="rating_review">
            {reviews ? <div className="card-body">
                <div className="d-flex align-items-center w-100 mb-4">

                    <p className="col pl-0 mb-0 rating-heading"><i className="fa fa-star rating-icon" aria-hidden="true"></i>  Rating & Review</p>
                    {isShowDropdown &&
                        <Select
                            name="settlement"
                            className="selecttt"
                            onChange={(e)=>this.changable(e)}
                            options={options}
                            value={this.state.settlement}
                        />
                        // <select className="custom-select" name="settlement" onChange={this.handleChange} style={{ width: '230px' }}>
                        //     <option value="">All Reviews</option>
                        //     <option value="cash">Cash Reviews</option>
                        //     <option value="exchange">Exchange Reviews</option>
                        // </select>
                    }
                </div>

                <hr />
                {profile && (isShowAvgRating === true) && <div className="w-100 px-3">
                    <div className="row rating-all align-items-center">
                        {profile.avg_rating && <div className="col-md-4 col-12 mb-3">
                            <div className="overall">
                                <big>{parseFloat(profile.avg_rating)}</big>
                                <Box component="div" className="d-flex justify-content-center w-100 float-left"
                                    borderColor="transparent">
                                    <Rating value={parseFloat(profile.avg_rating)} size="large" readOnly />
                                </Box>
                                <small className="w-100 float-left">Service Rating</small>
                            </div>
                        </div>}
                        <div className="col-md-7 col-12 mb-3">
                            <div className="overall-list">
                                {profile.avg_rating_communication && <div className="list d-flex align-items-center">
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: (parseFloat(profile.avg_rating_communication) * 100 / 5) + '%' }}></div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Box component="div" mx={1} borderColor="transparent" title="Communication">
                                            <Rating value={parseFloat(profile.avg_rating_communication)} readOnly />
                                        </Box>
                                        <small>{(parseFloat(profile.avg_rating_communication) * 100 / 5)}%</small>
                                    </div>
                                </div>}

                                {profile.avg_rating_competence && <div className="list d-flex align-items-center">
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: (parseFloat(profile.avg_rating_competence) * 100 / 5) + '%' }}></div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Box component="div" mx={1} borderColor="transparent" title="Professionalism">
                                            <Rating value={parseFloat(profile.avg_rating_competence)} readOnly />
                                        </Box>
                                        <small>{(parseFloat(profile.avg_rating_competence) * 100 / 5)}%</small>
                                    </div>
                                </div>}

                                {profile.avg_rating_quality && <div className="list d-flex align-items-center">
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: (parseFloat(profile.avg_rating_quality) * 100 / 5) + '%' }}></div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Box component="div" mx={1} borderColor="transparent" title="Quality">
                                            <Rating value={parseFloat(profile.avg_rating_quality)} readOnly />
                                        </Box>
                                        <small>{(parseFloat(profile.avg_rating_quality) * 100 / 5)}%</small>
                                    </div>
                                </div>}

                                {profile.avg_rating_deadline && <div className="list d-flex align-items-center">
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: (parseFloat(profile.avg_rating_deadline) * 100 / 5) + '%' }}></div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Box component="div" mx={1} borderColor="transparent" title="Timely">
                                            <Rating value={parseFloat(profile.avg_rating_deadline)} readOnly />
                                        </Box>
                                        <small>{(parseFloat(profile.avg_rating_deadline) * 100 / 5)}%</small>
                                    </div>
                                </div>}
                                {profile.avg_rating_recommend && <div className="list d-flex align-items-center">
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: (parseFloat(profile.avg_rating_recommend) * 100 / 5) + '%' }}></div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Box component="div" mx={1} borderColor="transparent" title="Recommend">
                                            <Rating value={parseFloat(profile.avg_rating_recommend)} readOnly />
                                        </Box>
                                        <small>{(parseFloat(profile.avg_rating_recommend) * 100 / 5)}%</small>
                                    </div>
                                </div>}
                                {/* {item.avg_rating_quality && <div className="list d-flex align-items-center">
                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: (parseFloat(item.avg_rating_quality) * 100 / 5) + '%' }}></div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Box component="div" mx={1} borderColor="transparent">
                                            <Rating value={parseFloat(item.avg_rating_quality)} readOnly />
                                        </Box>
                                        <small>{(parseFloat(item.avg_rating_quality) * 100 / 5)}%</small>
                                    </div>
                                </div>} */}

                            </div>
                        </div>
                    </div>
                </div>}
                {reviews && reviews.length > 0 &&
                    <Fragment><div className="review-heading px-3">
                        {(selectedReviews === null) && 'All Reviews'}
                        {(selectedReviews === 'cash') && 'Cash Reviews'}
                        {(selectedReviews === 'exchange') && 'Exchange Reviews'}
                    </div>
                        <hr /></Fragment>
                }
                {reviews && reviews.length === 0 &&
                    <div className="review-text px-3" style={{ marginTop: '-8px' }}>
                        <div className="common-not-found d-flex align-items-center justify-content-center">
                            <div className="inner text-center">
                                <figure>
                                    <img src="/images/not-found/REVIEW-1-01.png" alt="Review not found" width="100" />
                                </figure>
                                <h5>No Rating & Review has been given yet</h5>
                            </div>
                        </div>
                    </div>
                }
                {reviews && reviews.map((item) =>
                    <div className="review-list d-flex flex-wrap px-3" key={item.id}>
                        <div className="image">
                            <img src={item.actionBy.avatar} alt="profile" className="img-fluid rounded-circle" />
                        </div>
                        <div className="caption">
                            <Box component="div" className="rating" borderColor="transparent">
                                <Rating value={parseFloat(item.rating_avg)} readOnly />
                            </Box>
                            <h4><Link to={`/user/public/about/${item.actionBy && item.actionBy.id}`}>{item.actionBy && item.actionBy.name}</Link></h4>
                            <div className="date">
                                {(new Date(item && item.created_at * 1000)).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: '2-digit'
                                })}
                            </div>
                            <div className="text">{item.review}</div>
                        </div>
                    </div>
                )}
            </div> : <div className="common-not-found d-flex align-items-center justify-content-center">
                    <div className="inner text-center">
                        <figure>
                            <img src="/images/not-found/REVIEW-1-01.png" alt="Review not found" width="100" />
                        </figure>
                        <h5>No Rating & Review has been given yet</h5>
                    </div>
                </div>}
        </Element>);
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

export default connect(mapStateToProps)(RatingReview);

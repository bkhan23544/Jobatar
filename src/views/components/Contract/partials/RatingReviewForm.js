import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab, Box } from '@material-ui/core';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { proposalActions } from '../../../../common/redux/actions';
import FormValidator from '../../../../helpers/FormValidator';
import Rating from '@material-ui/lab/Rating';
import {globalService as gs, itemService} from "../../../../common/services";
import {alertSelectors, processSelectors} from "../../../../common/redux/selectors";
import {EXPAND_RIGHT} from "react-ladda";
import LaddaButton from "react-ladda";

class RatingReviewForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formField: {
                proposal_id: "",
                title: '',
                review: '',
                rating_skills: 0,
                rating_quality: 0,
                rating_availability: 0,
                rating_deadline: 0,
                rating_communication: 0,
                rating_cooperation: 0,
                rating_avg: 0,
                rating_competence: 0,
                rating_recommend: 0,
            },
            open: false,
            item: null,
            submitted:false,
            loading:false,
            validation: this.validator().valid(),
        };
    }

    componentWillMount() {
        this._mount()
    }

    componentWillReceiveProps() {
        this._mount()
    }

    _mount = () => {
        const { open, item } = this.props;
        let { formField } = this.state;
        if (item) {
            formField['proposal_id'] = item.id;
            this.setState({ id: item.id, open, item, formField });
        }
     }

    validator = () => {
        return new FormValidator([
            //{ field: 'title', method: 'isEmpty', validWhen: false, message: 'Title is required.' },
            { field: 'review', method: 'isEmpty', validWhen: false, message: 'Review is required.' },
            { field: 'rating_communication', method: 'isEmpty', validWhen: false, message: 'Rating for communication is required.' },
            { field: 'rating_competence', method: 'isEmpty', validWhen: false, message: 'Rating for competence is required.' },
            { field: 'rating_quality', method: 'isEmpty', validWhen: false, message: 'Rating for quality is required.' },
            { field: 'rating_deadline', method: 'isEmpty', validWhen: false, message: 'Rating for deadline is required.' },
            { field: 'rating_recommend', method: 'isEmpty', validWhen: false, message: 'Rating for recommend is required.' },
            //{ field: 'rating_skills', method: 'isEmpty', validWhen: false, message: 'Rating for skill is required.' },
            //{ field: 'rating_availability', method: 'isEmpty', validWhen: false, message: 'Rating for availability is required.' },
            //{ field: 'rating_cooperation', method: 'isEmpty', validWhen: false, message: 'Rating for cooperation is required.' },
        ]);
    };

    handleChange = (e) => {
        const { formField } = this.state;
        formField[e.target.name] = e.target.value;
        this.setState({ formField });
    };

    handleSelect = (item, { action, name }) => {
        let formField = { ...this.state.formField };
        formField[name] = item;
        this.setState({ formField });
    };

    handleClose = () => {
        this.props.reviewClose();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { formField } = this.state;
        const validation = this.validator().validate(formField);
        this.setState({ validation, submitted: true, loading: true });
        if (validation.isValid) {
            const { dispatch } = this.props;
            const params = {};
            params.proposal_id = formField.proposal_id;
            params.title = formField.title;
            params.review = formField.review;
            params.rating_communication = formField.rating_communication;
            params.rating_competence = formField.rating_competence;
            params.rating_quality = formField.rating_quality;
            params.rating_deadline = formField.rating_deadline;
            params.rating_recommend = formField.rating_recommend;
            params.rating_avg = (   parseInt(formField.rating_communication) +
                                    parseInt(formField.rating_competence) +
                                    parseInt(formField.rating_quality) +
                                    parseInt(formField.rating_deadline) +
                                    parseInt(formField.rating_recommend)
                                ) / 5;
            params.rating_avg = parseFloat(params.rating_avg).toFixed(2);

            itemService.review("POST", { userItemProposalReview: params}, null)
                .then(response => {
                    (response.code === true) ?
                    dispatch(alertSelectors.success(response.message)) :
                    dispatch(alertSelectors.error(response.message));
                    dispatch(processSelectors.stop());
                    this.setState({ loading: false });
                    this.setState(this.initializeState);
                    this.handleClose();
                })
                .catch(exception => {
                    gs.showErrors(dispatch, exception, alertSelectors);
                    dispatch(processSelectors.stop());
                    this.setState({ loading: false });
                });
        }
    };

    render() {
        const { open, buyer } = this.props;
        const { formField, submitted, validation, loading } = this.state;
        let isValid = submitted ? this.validator().validate(formField) : validation;
        let totalRating = (parseInt(formField.rating_communication) + parseInt(formField.rating_competence) + parseInt(formField.rating_quality) + parseInt(formField.rating_deadline) + parseInt(formField.rating_recommend)) / 5;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                disableBackdropClick
                disableEscapeKeyDown
                fullWidth={true}
                maxWidth={'md'}
                className="offer-dialog">
                    <DialogTitle><span className="text-primary">Rate your experience with <span>{buyer.name}</span></span>
                    <Fab color="inherit" onClick={this.handleClose}>
                        <i className="fas fa-times"></i>
                    </Fab>
                </DialogTitle>
                <DialogContent>
                    <form name="review" onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>

                        <div className="form-group d-flex">
                            <label className="w-100">
                                <b>1. Communication</b> <br /> <small style={{fontSize: '90%', fontWeight: '600'}}>&nbsp;&nbsp;&nbsp;&nbsp; Explain clearly scope of work and responsive</small>
                            </label>
                            <div className="input-group">
                                <Box component="div" mb={3} className="d-flex mb-0"
                                    borderColor="transparent">
                                    <Rating name="rating_communication" value={parseInt(formField.rating_communication)} onChange={this.handleChange} />
                                </Box>
                                {submitted && isValid.rating_communication.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.rating_communication.message} </div>
                                }
                            </div>
                        </div>

                        <div className="form-group d-flex">
                            <label className="w-100">
                                <b>2. Professionalism</b> <br /> <small style={{ fontSize: '90%', fontWeight: '600' }}>&nbsp;&nbsp;&nbsp;&nbsp; Respectful and competent</small>
                            </label>
                            <div className="input-group">
                                <Box component="div" mb={3} className="d-flex mb-0"
                                    borderColor="transparent">
                                    <Rating name="rating_competence" value={parseInt(formField.rating_competence)} onChange={this.handleChange} />
                                </Box>
                                {submitted && isValid.rating_competence.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.rating_competence.message} </div>
                                }
                            </div>
                        </div>

                        {/* <div className="form-group d-flex">
                            <label className="w-100">Skills</label>
                            <div className="input-group">
                                <Box component="div" mb={3} className="d-flex mb-0"
                                    borderColor="transparent">
                                    <Rating name="rating_skills" value={parseInt(formField.rating_skills)} onChange={this.handleChange} />
                                </Box>
                                {submitted && isValid.rating_skills.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.rating_skills.message} </div>
                                }
                            </div>
                        </div> */}

                        <div className="form-group d-flex">
                            <label className="w-100">
                                <b>3. Quality</b> <br /> <small style={{fontSize: '90%', fontWeight: '600'}}>&nbsp;&nbsp;&nbsp;&nbsp; Meet expectation as described</small>
                            </label>
                            <div className="input-group">
                                <Box component="div" mb={3} className="d-flex mb-0"
                                    borderColor="transparent">
                                    <Rating name="rating_quality" value={parseInt(formField.rating_quality)} onChange={this.handleChange} />
                                </Box>
                                {submitted && isValid.rating_quality.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.rating_quality.message} </div>
                                }
                            </div>
                        </div>

                        {/* <div className="form-group d-flex">
                            <label className="w-100">Availability</label>
                            <div className="input-group">
                                <Box component="div" mb={3} className="d-flex mb-0"
                                    borderColor="transparent">
                                    <Rating name="rating_availability" value={parseInt(formField.rating_availability)} onChange={this.handleChange} />
                                </Box>
                                {submitted && isValid.rating_availability.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.rating_availability.message} </div>
                                }
                            </div>
                        </div> */}

                        <div className="form-group d-flex">
                            <label className="w-100">
                                <b>4. Timely</b> <br /> <small style={{fontSize: '90%', fontWeight: '600'}}>&nbsp;&nbsp;&nbsp;&nbsp; Project was done on time as agreed</small>
                            </label>
                            <div className="input-group">
                                <Box component="div" mb={3} className="d-flex mb-0"
                                    borderColor="transparent">
                                    <Rating name="rating_deadline" value={parseInt(formField.rating_deadline)} onChange={this.handleChange} />
                                </Box>
                                {submitted && isValid.rating_deadline.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.rating_deadline.message} </div>
                                }
                            </div>
                        </div>

                        <div className="form-group d-flex">
                            <label className="w-100">
                                <b>5. Recommend</b> <br /> <small style={{fontSize: '90%', fontWeight: '600'}}>&nbsp;&nbsp;&nbsp;&nbsp; Fantastic and collaborative experience</small>
                            </label>
                            <div className="input-group">
                                <Box component="div" mb={3} className="d-flex mb-0"
                                    borderColor="transparent">
                                    <Rating name="rating_recommend" value={parseInt(formField.rating_recommend)} onChange={this.handleChange} />
                                </Box>
                                {submitted && isValid.rating_recommend.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.rating_recommend.message} </div>
                                }
                            </div>
                        </div>

                        {/* <div className="form-group d-flex">
                            <label className="w-100">Co-Operation</label>
                            <div className="input-group">
                                <Box component="div" mb={3} className="d-flex mb-0"
                                    borderColor="transparent">
                                    <Rating name="rating_cooperation" value={parseInt(formField.rating_cooperation)} onChange={this.handleChange} />
                                </Box>
                                {submitted && isValid.rating_cooperation.isInvalid &&
                                    <div className="invalid-feedback"> {isValid.rating_cooperation.message} </div>
                                }
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" value={formField.title} onChange={this.handleChange} className={'form-control ' + (submitted && isValid.title.isInvalid ? 'is-invalid' : '')} />

                            {submitted && isValid.title.isInvalid &&
                                <div className="invalid-feedback"> {isValid.title.message} </div>
                            }
                        </div> */}


                        <div className="form-group">
                            <h4 style={{fontWeight: '600'}}>Total Score: { totalRating }</h4>
                            <label>Write a public review about your experience with {buyer.name}</label>
                            <textarea placeholder="Review ..." onChange={this.handleChange}
                                name="review" rows={3} className={'form-control ' + (submitted && isValid.review.isInvalid ? 'is-invalid' : '')} />

                            {submitted && isValid.review.isInvalid &&
                                <div className="invalid-feedback"> {isValid.review.message} </div>
                            }
                        </div>


                    </form>
                </DialogContent>
                <DialogActions className="pb-3">
                    {/*<button className="btn btn-info" onClick={this.handleSubmit} autoFocus></button>*/}
                    <LaddaButton className="btn btn-info" loading={loading} data-style={EXPAND_RIGHT} onClick={this.handleSubmit}>Submit</LaddaButton>
                </DialogActions>
            </Dialog>)
    }
}

const processSelector = createSelector(
    state => state.process,
    process => process
);

const mapStateToProps = createSelector(
    processSelector,
    (process) => ({
        process,
    })
);

export default connect(mapStateToProps)(RatingReviewForm);
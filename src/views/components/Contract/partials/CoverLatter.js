import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";

class CoverLatter extends Component {

    render() {
        const { proposal } = this.props;
        const media = proposal.media;
        const questions = proposal.userItemProposalAnswers;
        return (<Fragment>
            <div className="card mb-4 milestones">
                <div className="card-body">
                    <div className="offer">
                        <h5>Job Proposal</h5>
                    </div>
                    <div className="milestones-box ">
                        <div className="card-body">
                            {(proposal.budget) && <h6 className="card-title pb-3">
                                <span className="pr-2">Budget:</span> <span className="font-weight-bold text-primary">${proposal.budget}</span>
                            </h6>}

                            <h6 className="card-title mb-1">Job Proposal</h6>

                            <div className="card-text" style={{fontSize: '13px', fontWeight: 400}}>{proposal.comment}</div>

                            <h6 className="card-title mb-1">Questions About this Job</h6>

                            <div className="card-text" style={{fontSize: '13px', fontWeight: 400}}>{proposal.comment}</div>

                            {((media && media.image) || (media && media.docs) || (media && media.video)) && <Fragment>
                                <h6 className="card-title mb-3">Documents</h6>
                                <div className="image-list mb-3">
                                    <div className="row padding-5">
                                        {media.image && media.image.map((item) =>
                                            <div className="col-lg-2 col-4" key={`image-${item.media.id}`} >
                                                <div className="upload-box border text-center mb-2 bg-white">
                                                    <img src={item.media.thumb} alt="" className="img-fluid w-100"
                                                         style={{ maxHeight: '170px', maxWidth: "100%" }} />
                                                    <div className="text-truncate px-1" title={item.media.filename}>
                                                        <a rel="noopener noreferrer" target="_blank" href={item.media.path} download><small>{item.media.filename}</small></a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {media.docs && media.docs.map((item) =>
                                            <div className="col-lg-2 col-4" key={`image-${item.media.id}`} >
                                                <div className="upload-box border text-center mb-2 bg-white">
                                                    <div className="d-flex align-items-center justify-content-center" style={{height: '110px'}}>
                                                        {(item.media.mimetype === 'application/pdf') ?
                                                            <i className="far fa-file-pdf fa-3x text-info"></i>
                                                            : (item.media.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ?
                                                                <i className="far fa-file-word fa-3x text-info"></i>
                                                                : <i className="far fa-file fa-3x text-info"></i>}
                                                    </div>
                                                    <div className="text-truncate px-1" title={item.media.filename}>
                                                        <a rel="noopener noreferrer" target="_blank" href={item.media.path} download><small>{item.media.filename}</small></a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {media.video && media.video.map((item) =>
                                            <div className="col-lg-2 col-4" key={`video-${item.media.id}`}>
                                                <div className="upload-box border text-center mb-2 bg-white">
                                                    <video style={{ height: '100px', width: "100%" }} controls>
                                                        <source src={item.path} type={item.media.type} />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                    <div className="text-truncate px-1" title={item.media.filename}>
                                                        <a rel="noopener noreferrer" target="_blank" href={item.media.path} download><small>{item.media.filename}</small></a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Fragment>}


                            {(questions.length > 0) && <Fragment>
                                <h6 className="card-title mb-3">Questions</h6>

                                {questions && questions.map((item) =>
                                    <Fragment key={`ques${item.question_id}`}>
                                        <h6 className="card-title mb-1"><small className="font-weight-bold">{item.question.question}</small></h6>
                                        <div className="card-text" style={{fontSize: '13px', fontWeight: 400}}>{item.answer}</div>
                                    </Fragment>
                                )}
                            </Fragment>}

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>)
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

export default connect(mapStateToProps)(CoverLatter);
import React, { Component, Fragment } from 'react';
import { createSelector } from "reselect";
import { connect } from "react-redux";
import { defaultActions, } from "../../../common/redux/actions";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { NoUploadedFiles } from "../../../helpers/file.helper";
import { alertSelectors, uploadSelectors } from "../../../common/redux/selectors";
import { confirmAlert } from "react-confirm-alert";
import { itemService } from "../../../common/services";
import ImageCropper from '../Job/imageCropper';

class FileUploader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cropper: false,
        };
    }

    handleRemove = (id, type = null) => {
        const { dispatch } = this.props;
        if (id !== '' || id !== null) {
            confirmAlert({
                title: null,
                message: `Are you sure you want to delete this file?`,
                buttons: [
                    {
                        label: 'No',
                        onClick: () => dispatch(alertSelectors.success("You have not accepted the request."))
                    },
                    {
                        label: 'Yes',
                        onClick: () => {
                            dispatch(defaultActions.remove(id, type));
                            this.removeFile(id);
                        }
                    }
                ]
            });
        }
    };

    removeFile(id) {
        const { upload, dispatch } = this.props;
        let filesArr = upload.files ? upload.files : [];
        let docsIdx = filesArr.docs && filesArr.docs.findIndex(file => (file.id === parseInt(id)));
        (filesArr.docs && docsIdx !== -1) && filesArr.docs.splice(docsIdx, 1);
        let imageIdx = filesArr.image && filesArr.image.findIndex(file => (file.id === parseInt(id)));
        (filesArr.image && imageIdx !== -1) && filesArr.image.splice(imageIdx, 1);
        let videoIdx = filesArr.video && filesArr.video.findIndex(file => (file.id === parseInt(id)));
        (filesArr.video && videoIdx !== -1) && filesArr.video.splice(videoIdx, 1);
        dispatch(uploadSelectors.respond(upload.files));
    }

    handleUpload = (e) => {
        const { upload, dispatch } = this.props;
        // console.log(e.target.files)
        if (e.target.files.length > 0) {
            if (e.target.files[0].type.slice(0, 5) === "image") {

                // image cropper
                // console.log(e.target.files)
                // this.setState({
                //     files: e.target.files,
                //     cropper: true
                // })

                dispatch(defaultActions.upload(e.target.files, upload));

            } else {
                dispatch(defaultActions.upload(e.target.files, upload));
            }
        }
    };

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(uploadSelectors.clear());
    }

    coverPhoto = (item) => this.props.coverPhoto(item);




    render() {
        const { upload, title, accept } = this.props;
        let filesList = upload.files ? upload.files : [];
        const { dispatch } = this.props;

        return (
            this.state.cropper ?
                <ImageCropper files={this.state.files} upload={upload} dispatch={dispatch} />
                :
                <Fragment>
                    {title ? <label className="font-black">{title}</label> :
                        <label>Document & Other files
                    <OverlayTrigger placement={'top'} overlay={<Tooltip>Document & Other files</Tooltip>}>
                                <span className="question text-light ml-2"><i className="far fa-question-circle"></i></span>
                            </OverlayTrigger>
                        </label>}
                    <div className="upload-all mb-3">
                        <div className="bg d-flex align-items-center justify-content-center"><i
                            className="fas fa-cloud-upload-alt"></i></div>
                        <div className="select-file d-flex align-items-center justify-content-center">
                            <div className="inner">
                                Drop here to upload or <label>Choose File
                                                <input type="file" name="media[]" id="fileElem1" accept={'*'}
                                        onChange={this.handleUpload}
                                        multiple /></label>
                            </div>
                        </div>
                        <div className="upload-progress" style={{ display: this.props.upload.progress ? 'block' : 'none' }}>
                            <div className="progress rounded-0">
                                <div className="progress-bar" role="progressbar" style={{ width: `${this.props.upload.progress}%` }}></div>
                            </div>
                        </div>
                    </div>
                    {upload.hasFiles ?
                        <div>
                            <ul className="upload-pdf pl-0">
                                {filesList.docs && filesList.docs.map((item) =>
                                    item.id && (<li className="d-flex flex-wrap mb-2" key={`doc-${item.id}`}>
                                        <div className="col pl-0 d-flex align-items-center">
                                            {(item.mimetype === 'application/pdf') ?
                                                <i className="far fa-file-pdf fa-2x text-info"></i>
                                                : (item.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') ?
                                                    <i className="far fa-file-word fa-2x text-info"></i>
                                                    : <i className="far fa-file fa-2x text-info"></i>}
                                            <span className="title pl-2">{item.filename}</span>
                                        </div>
                                        <button type="button" className="btn btn-outline-info" item={item.id}
                                            onClick={this.handleRemove.bind(this, item.id, 'docs')}>Remove</button>
                                    </li>)
                                )}
                            </ul>

                            <div className="image-list">
                                <div className="row padding-5">
                                    {filesList.image && filesList.image.map((item) =>
                                        item.id && (<div className="col-lg-2 col-4" key={`image-${item.id}`} item={`image-${item.id}`} >
                                            <div className="upload-box border text-center mb-3">
                                                <img src={item.path} alt="" className="img-fluid"
                                                    style={{ maxHeight: '170px', maxWidth: "100%" }} />
                                                {(this.props.coverImage) && <div className="custom-control custom-radio radio-tranparen">
                                                    <input
                                                        type="radio" id={`cover-${item.id}`}
                                                        value={item.id}
                                                        name="coverImages"
                                                        defaultChecked={(item.id === this.props.coverImage)}
                                                        className="custom-control-input" onClick={() => this.coverPhoto(item.id)}
                                                    />
                                                    <label className="custom-control-label"
                                                        htmlFor={`cover-${item.id}`}>&nbsp;</label>
                                                </div>}
                                                <button type="button" className="btn btn-danger btn-sm px-1 py-0" item={item.id}
                                                    onClick={this.handleRemove.bind(this, item.id, 'image')}><i className="far fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>)
                                    )}
                                    {this.props.coverImage && <div className="col-12 mb-3">
                                        <div>
                                            <label className="" htmlFor="customCheckg1">
                                                By clicking any of checkbox you can make that image as service cover image
                                                        </label>
                                        </div>
                                    </div>}

                                </div>
                            </div>

                            <div className="image-list">
                                <div className="row">
                                    {filesList.video && filesList.video.map((item) =>
                                        <div className="col-sm-3 col-md-4 col-sm-6 col-12" key={`video-${item.id}`}>
                                            <div className="upload-box mb-3">
                                                <video style={{ maxHeight: '170px', width: "100%" }} controls>
                                                    <source src={item.path} type={item.type} />
                                                Your browser does not support the video tag.
                                                                        </video>
                                                <button type="button" className="btn btn-outline-info" item={item.id}
                                                    onClick={this.handleRemove.bind(this, item.id, 'video')}>Remove
                                                                        </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        : <NoUploadedFiles />}

                </Fragment>
        );
    }
}


const uploadSelector = createSelector(
    state => state.upload,
    upload => upload
);

const mapStateToProps = createSelector(
    uploadSelector,
    (upload) => ({
        upload
    })
);

export default connect(mapStateToProps)(FileUploader);

import { alertSelectors, processSelectors, uploadSelectors, commonSelectors } from "../selectors";
import { globalService as gs, defaultService } from '../../services';
import {userActions} from "./user.actions";

const upload = (files, upload) => {
    console.log(files)
    return dispatch => {
        dispatch(processSelectors.start());
        let uploadedFiles = upload.files;
        defaultService.uploadAndProgress(files, dispatch)
            .then(response => {
                dispatch(alertSelectors.success('File successfully uploaded.'));
                dispatch(processSelectors.stop());
                let files = response.files &&
                    {
                        image: response.files.filter(file => (file.mimetype === 'image')),
                        video: response.files.filter(file => (file.mimetype === 'video')),
                        docs: response.files.filter(file => (file.mimetype !== 'video' && file.mimetype !== 'image')),
                    };
                const allFiles = {
                    image: (uploadedFiles && uploadedFiles.image) ? files.image.concat(uploadedFiles.image) : files.image,
                    video: (uploadedFiles && uploadedFiles.video) ? files.video.concat(uploadedFiles.video) : files.video,
                    docs: (uploadedFiles && uploadedFiles.docs) ? files.docs.concat(uploadedFiles.docs) : files.docs,
                };
                dispatch(uploadSelectors.respond(allFiles));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const remove = (id, type = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        defaultService.deleteFile(null, { item_id: id})
            .then(response => {
                (response.code === 1) && dispatch(alertSelectors.success('File successfully deleted.'));
                //(response.code === 1) && dispatch(uploadSelectors.remove({id: id, type: type}));
                (response.code === 1) && dispatch(userActions.profile("GET", null, 'delete_photo'));
                (response.code === false) && dispatch(alertSelectors.error(response.message));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const categories = () => {
    return dispatch => {
        defaultService.categories()
            .then(response => {
                dispatch(commonSelectors.categories(response.categories));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const skills = () => {
    return dispatch => {

        defaultService.skills()
            .then(response => {
                dispatch(commonSelectors.skills(response.skills));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const countries = () => {
    return dispatch => {
        defaultService.countries()
            .then(response => {
                dispatch(commonSelectors.countries(response));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            })
    }
};

const questions = () => {
    return dispatch => {
        defaultService.questions()
            .then(response => {
                dispatch(commonSelectors.questions(response.questions));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            })
    }
};

const platforms = () => {
    return dispatch => {
        defaultService.platforms()
            .then(response => {
                dispatch(commonSelectors.platforms(response.platforms));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            })
    }
};



const contact = (params) => {
    return dispatch => {
        defaultService.contact(params)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            })
    }
};

const newsletter = (params) => {
    return dispatch => {
        dispatch(processSelectors.start());
        defaultService.newsletter(params)
            .then(response => {
                (response.code === true) ?
                    dispatch(alertSelectors.success(response.message)) :
                    dispatch(alertSelectors.error(response.message));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                console.log(exception);
            })
    }
};


export const defaultActions = {
    upload,
    remove,
    categories,
    skills,
    countries,
    questions,
    platforms,
    newsletter,
    contact,
};




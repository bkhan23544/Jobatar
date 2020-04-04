import {uploadConstants} from "../constants/upload.constants";

export const start = () => {
    return {
        type: uploadConstants.UPLOAD_PROCESS_START,
        payload: {loading: true}
    };
};
export const stop = () => {
    return {
        type: uploadConstants.UPLOAD_PROCESS_STOP,
        payload: {loading: false}
    };
};


export const remove = (res) => {
    return {
        type: uploadConstants.UPLOAD_DELETE,
        payload: {item: res}
    };
};

export const respond = (res) => {
    return {
        type: uploadConstants.UPLOAD_RESPOND,
        payload: {files: res}
    };
};

export const progress = (res) => {
    return {
        type: uploadConstants.UPLOAD_PROGRESS,
        payload: {progress: res}
    };
};

export const clear = () => {
    return {
        type: uploadConstants.UPLOAD_PROCESS_CLEAR,
        payload: {clear: null}
    };
};

export const uploadSelectors = {
    start,
    stop,
    respond,
    remove,
    progress,
    clear,
};

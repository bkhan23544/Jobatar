import {uploadConstants} from '../constants/upload.constants';

const initialState = {loading: false, hasFiles: false, files: []};
export const uploadReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case uploadConstants.UPLOAD_PROCESS_START:
            return {
                type: uploadConstants.UPLOAD_PROCESS_START,
                loading: true,
            };
        case uploadConstants.UPLOAD_PROCESS_STOP:
            return {
                type: uploadConstants.UPLOAD_PROCESS_STOP,
                loading: false,
            };
        case uploadConstants.UPLOAD_RESPOND:
            return {
                type: uploadConstants.UPLOAD_RESPOND,
                loading: false,
                hasFiles: true,
                files: payload.files,
            };

        case uploadConstants.UPLOAD_PROGRESS:
            return {
                type: uploadConstants.UPLOAD_PROGRESS,
                loading: true,
                progress: payload.progress,
            };

        /*case uploadConstants.UPLOAD_DELETE:
            console.log(payload.item);
            switch (payload.item.type) {
                case 'image':
                    console.log('image');
                    const newFiles = state.files.image.filter( val => val.id !== payload.item.id );
                    const updateFiles = {
                        image: newFiles,
                        docs: payload.files && payload.files.docs,
                        video: payload.files && payload.files.video
                    };
                    return {
                        ...state.files.docs,
                        ...state.files.video,
                        type: uploadConstants.UPLOAD_DELETE,
                        loading: false,
                        hasFiles: true,
                        files: updateFiles
                    };
                    break;
                case 'docs':
                    console.log('docs');
                    const newDocs = state.files.docs.filter( val => val.id !== payload.item.id );
                    const updatedDocs = {
                        image: payload.files && payload.files.image,
                        docs: newDocs,
                        video: payload.files && payload.files.video
                    };
                    return {
                        ...state.files.image,
                        ...state.files.video,
                        type: uploadConstants.UPLOAD_DELETE,
                        loading: false,
                        hasFiles: true,
                        files: updatedDocs,
                    };
                    break;
                case 'video':
                    console.log('video');
                    const newVideo = state.files.video.filter( val => val.id !== payload.item.id );
                    const updatedVideo = {
                        image: payload.files && payload.files.image,
                        docs: payload.files && payload.files.docs,
                        video: newVideo
                    };
                    return {
                        ...state.files.docs,
                        ...state.files.image,
                        type: uploadConstants.UPLOAD_DELETE,
                        loading: false,
                        hasFiles: true,
                        files: updatedVideo,
                    };
                    break;
                default:
            }*/

        case uploadConstants.UPLOAD_PROCESS_CLEAR:
            return {};
        default:
            return state
    }
};

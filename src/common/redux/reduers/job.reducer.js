import { jobConstants } from "../constants";

export const jobReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case jobConstants.JOB_LIST_PUBLISH:
            return {
                type: jobConstants.JOB_LIST_PUBLISH,
                publish: payload.publish
            };
        case jobConstants.JOB_LIST_DRAFT:
            return {
                type: jobConstants.JOB_LIST_DRAFT,
                draft: payload.draft
            };
        case jobConstants.JOB_VIEW:
            return {
                type: jobConstants.JOB_VIEW,
                item: payload.item
            };
        case jobConstants.JOB_LIST:
            return {
                type: jobConstants.JOB_LIST_DRAFT,
                data: payload.list
            };
        case jobConstants.JOB_CLEAR:
            return {
                type: jobConstants.JOB_CLEAR,
                data: null,
                publish: null,
                draft: null,
            };

        default:
            return state
    }
};



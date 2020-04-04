import { jobConstants } from '../constants/job.constants';

const publish = (res) => {
    return { type: jobConstants.JOB_LIST_PUBLISH, payload: { publish: res } };
};

const item = (res) => {
    return { type: jobConstants.JOB_VIEW, payload: { item: res } };
};

const draft = (res) => {
    return { type: jobConstants.JOB_LIST_DRAFT, payload: { draft: res } };
};

const list = (res) => {
    return {type: jobConstants.JOB_LIST, payload: {list: res}};
};

const clear = () => {
    return {type: jobConstants.JOB_CLEAR, payload: {data: null}};
};

export const jobSelectors = {
    list,
    publish,
    draft,
    item,
    clear,
};

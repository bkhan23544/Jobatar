import { searchConstants } from "../constants";

const freelancers = (res) => {
    return { type: searchConstants.SEARCH_FREELANCES, payload: { freelancers: res } };
};

const jobs = (res) => {
    return { type: searchConstants.SEARCH_JOB, payload: { jobs: res } };
};

const services = (res) => {
    return { type: searchConstants.SEARCH_SERVICES, payload: { services: res } };
};

const clear = () => {
    return { type: searchConstants.SEARCH_CLEAR, payload: { jobs: null, freelancers: null, services:null } };
};

export const searchSelectors = {
    freelancers,
    jobs,
    services,
    clear
};

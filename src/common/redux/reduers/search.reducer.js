import { searchConstants } from "../constants";
const initialState = { jobs: null, freelancers: null, services: null };
export const searchReducer = (state = initialState, {type, payload}) => {
    
    switch (type) {
        case searchConstants.SEARCH_FREELANCES:
            return {
                type: searchConstants.SEARCH_FREELANCES,
                freelancers: payload.freelancers
            };

        case searchConstants.SEARCH_JOB:
            return {
                type: searchConstants.SEARCH_JOB,
                jobs: payload.jobs
            };

        case searchConstants.SEARCH_SERVICES:
            return {
                type: searchConstants.SEARCH_SERVICES,
                services: payload.services
            };

        case searchConstants.SEARCH_CLEAR:
            return {
                type: searchConstants.SEARCH_CLEAR,
                freelancers: [],
                jobs: [],
                services: [],
            };

        default:
            return state
    }
};

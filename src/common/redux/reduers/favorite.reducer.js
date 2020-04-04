import {favoriteConstants} from "../constants";
const initialState = {jobs: null, freelancers: null, connections: null, services: null};
export const favoriteReducer = (state = initialState, {type, payload}) => {
    //console.log(payload);
    switch (type) {
        case favoriteConstants.FAVORITE_JOBS:
            return {
                ...state,
                type: favoriteConstants.FAVORITE_JOBS,
                jobs: payload.job
            };
        case favoriteConstants.FAVORITE_JOB_ADD:
            return {
                ...state,
                type: favoriteConstants.FAVORITE_JOB_ADD,
                jobs:[...state.jobs.items, payload.job],
            };
        case favoriteConstants.FAVORITE_JOB_REMOVE:
            const newJob = state.jobs.items.filter( val => val.id !== payload.job );
            const updateJob = {
                pagination: state.jobs.pagination,
                items: newJob
            };
            return {
                ...state,
                type: favoriteConstants.FAVORITE_JOB_REMOVE,
                jobs: updateJob
            };
        case favoriteConstants.FAVORITE_FREELANCERS:
            return {
                ...state,
                type: favoriteConstants.FAVORITE_FREELANCERS,
                freelancers: payload.freelancers
            };
        case favoriteConstants.FAVORITE_FREELANCER_ADD:
            return {
                ...state,
                type: favoriteConstants.FAVORITE_FREELANCER_ADD,
                freelancers:[...state.freelancers.items, payload.freelancers],
            };
        case favoriteConstants.FAVORITE_FREELANCER_REMOVE:
            const newFreelancer = state.freelancers.items.filter( val => val.id !== payload.freelancers );
            const updateFreelancer = {
                pagination: state.freelancers.pagination,
                items: newFreelancer
            };
            return {
                ...state,
                type: favoriteConstants.FAVORITE_FREELANCER_REMOVE,
                freelancers: updateFreelancer
            };

        case favoriteConstants.FAVORITE_SERVICES:
            return {
                ...state,
                type: favoriteConstants.FAVORITE_SERVICES,
                services: payload.services
            };
        case favoriteConstants.FAVORITE_SERVICE_ADD:
            return {
                ...state,
                type: favoriteConstants.FAVORITE_SERVICE_ADD,
                services:[...state.services.items, payload.services],
            };
        case favoriteConstants.FAVORITE_SERVICE_REMOVE:
            const newServices = state.services.items.filter( val => val.id !== payload.services );
            const updateServices = {
                pagination: state.services.pagination,
                items: newServices
            };
            return {
                ...state,
                type: favoriteConstants.FAVORITE_SERVICE_REMOVE,
                services: updateServices
            };

        case favoriteConstants.FAVORITE_CONNECTIONS:
            return {
                ...state,
                type: favoriteConstants.FAVORITE_CONNECTIONS,
                connections: payload.connections
            };
        case favoriteConstants.FAVORITE_CONNECTION_ADD:
            return {
                ...state,
                type: favoriteConstants.FAVORITE_CONNECTION_ADD,
                connections:[...state.connections.items, payload.connections],
            };
        case favoriteConstants.FAVORITE_CONNECTION_REMOVE:
            const newConnections = state.connections.items;
            newConnections.splice(payload.connections, 1);
            console.log(payload.connections);
            const updateConnections = {
                pagination: state.connections.pagination,
                items: newConnections
            };
            return {
                ...state,
                type: favoriteConstants.FAVORITE_CONNECTION_REMOVE,
                connections: updateConnections
            };
        case favoriteConstants.FAVORITE_CLEAR:
            return {};
        default:
            return state
    }
};
import { favoriteConstants } from '../constants';

const jobs = (res) => {
    return {type: favoriteConstants.FAVORITE_JOBS, payload: {job: res}};
};

const jobAdd = (res) => {
    return {type: favoriteConstants.FAVORITE_JOB_ADD, payload: {job: res}};
};

const jobRemove = (res) => {
    return {type: favoriteConstants.FAVORITE_JOB_REMOVE, payload: {job: res}};
};

const freelancers = (res) => {
    return {type: favoriteConstants.FAVORITE_FREELANCERS, payload: {freelancers: res}};
};

const freelancerAdd = (res) => {
    return {type: favoriteConstants.FAVORITE_FREELANCER_ADD, payload: {freelancers: res}};
};

const freelancerRemove = (res) => {
    return {type: favoriteConstants.FAVORITE_FREELANCER_REMOVE, payload: {freelancers: res}};
};

const services = (res) => {
    return {type: favoriteConstants.FAVORITE_SERVICES, payload: {services: res}};
};

const serviceAdd = (res) => {
    return {type: favoriteConstants.FAVORITE_SERVICE_ADD, payload: {services: res}};
};

const serviceRemove = (res) => {
    return {type: favoriteConstants.FAVORITE_SERVICE_REMOVE, payload: {services: res}};
};

const connections = (res) => {
    return {type: favoriteConstants.FAVORITE_CONNECTIONS, payload: {connections: res}};
};

const connectionsAdd = (res) => {
    return {type: favoriteConstants.FAVORITE_CONNECTION_ADD, payload: {connections: res}};
};

const connectionsRemove = (res) => {
    return {type: favoriteConstants.FAVORITE_CONNECTION_REMOVE, payload: {connections: res}};
};

const clear = () => {
    return {type: favoriteConstants.FAVORITE_CLEAR, payload: {data: null}};
};

export const favoriteSelectors = {
    jobs,
    jobAdd,
    jobRemove,
    freelancers,
    freelancerAdd,
    freelancerRemove,
    services,
    serviceAdd,
    serviceRemove,
    connections,
    connectionsAdd,
    connectionsRemove,
    clear,
};

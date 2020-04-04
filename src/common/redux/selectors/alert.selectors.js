import {alertConstants} from '../constants/alert.constants';

const failure = (message) => {
    return {type: alertConstants.FAILURE, payload: {message: message}};
};

const success = (message) => {
    return {type: alertConstants.SUCCESS, payload: {message: message}};
};

const error = (message) => {
    return {type: alertConstants.ERROR, payload: {message: message}};
};

const clear = () => {
    return {type: alertConstants.CLEAR, payload: {message: ''}};
};

const warning = (message) => {
    return { type: alertConstants.WARNING, payload: { message: message } };
};

const unVerified = (message, user_id) => {
    return { type: alertConstants.UNVERIFIED, payload: { message: message, user_id: user_id } };
};

export const alertSelectors = {
    success,
    error,
    clear,
    failure,
    warning,
    unVerified,
};

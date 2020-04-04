
import {authConstants} from "../constants";

const success = (response) => {
    return { type: authConstants.LOGIN_SUCCESS, payload: { user: response}}
};

const failure = (error) => {
    return {type: authConstants.LOGIN_FAILURE, payload: {error: error}}
};

const logout = (response) => {
    return {type: authConstants.AUTH_LOGOUT, payload: {message: response}}
};

export const authSelectors = {
    success,
    logout,
    failure,
};

import {userConstants} from '../constants/user.constants';

const experiences = (res) => {
    return {type: userConstants.USER_EXPERIENCES, payload: {data: res}};
};

const educations = (res) => {
    return {type: userConstants.USER_EDUCATIONS, payload: {data: res}};
};

const connections = (res) => {
    return {type: userConstants.USER_CONNECTIONS, payload: {data: res}};
};

const favorites = (res) => {
    return {type: userConstants.USER_FAVORITES, payload: {data: res}};
};

const publicProfile = (user) => {
    return {type: userConstants.USER_PUBLIC, payload: {user: user}};
};


export const userSelectors = {
    experiences,
    educations,
    connections,
    favorites,
    publicProfile,


};

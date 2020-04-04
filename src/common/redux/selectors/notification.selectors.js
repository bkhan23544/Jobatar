import {notificationConstants} from "../constants";

const list = (res) => {
    return {type: notificationConstants.ALL_LIST, payload: {data: res}};
};

const pull = (res) => {
    return {type: notificationConstants.PULL, payload: {data: res}};
};

const read = (res) => {
    return {type: notificationConstants.READ, payload: {data: res}};
};

const trash = (res) => {
    return {type: notificationConstants.TRASH, payload: {data: res}};
};

const actions = (res) => {
    return {type: notificationConstants.ACTIONS, payload: {data: res}};
};

export const notificationSelectors = {
    list,
    pull,
    read,
    trash,
    actions,
};

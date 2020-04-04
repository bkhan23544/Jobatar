import {notificationConstants} from "../constants";


export const notificationReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case notificationConstants.ALL_LIST:
            return {
                ...state,
                type: notificationConstants.ALL_LIST,
                list: payload.data
            };
        case notificationConstants.PULL:
            return {
                ...state,
                type: notificationConstants.PULL,
                pull: payload.data
            };
        case notificationConstants.ACTIONS:
            return {
                ...state,
                type: notificationConstants.ACTIONS,
                actions: payload.data
            };
        case notificationConstants.READ:
            return {
                ...state,
                type: notificationConstants.READ,
                list: payload.data
            };
        case notificationConstants.TRASH:
            const newList = state.list.items.filter( val => val.id !== payload.data );
            const updateList = {
                pagination: state.list.pagination,
                list: newList
            };
            return {
                ...state,
                type: notificationConstants.TRASH,
                list: updateList
            };
        default:
            return state
    }
};

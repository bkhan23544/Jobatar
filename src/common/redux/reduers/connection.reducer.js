 import {userConstants} from "../constants";

export const connectionReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case userConstants.USER_CONNECTIONS:
            return {
                type: userConstants.USER_CONNECTIONS,
                data: payload.data
            };
        default:
            return state
    }
};

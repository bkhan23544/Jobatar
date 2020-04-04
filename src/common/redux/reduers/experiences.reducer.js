 import {userConstants} from "../constants";

export const experiencesReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case userConstants.USER_EXPERIENCES:
            return {
                type: userConstants.USER_EXPERIENCES,
                data: payload.data
            };
        default:
            return state
    }
};

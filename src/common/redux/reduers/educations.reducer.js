 import {userConstants} from "../constants";

export const educationsReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case userConstants.USER_EDUCATIONS:
            return {
                type: userConstants.USER_EDUCATIONS,
                data: payload.data
            };
        default:
            return state
    }
};

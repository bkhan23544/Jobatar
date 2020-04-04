import { userConstants } from '../constants/user.constants';


export const userReducer = (state = {}, {type, payload}) => {

    switch (type) {
        case userConstants.ALL_REQUEST:
            return {loading: true};
        case userConstants.ALL_SUCCESS:
            return {user: payload.user};
        case userConstants.ALL_FAILURE:
            return {error: payload.error};
        case userConstants.USER_PUBLIC:
            return {user: payload.user};
        default:
            return state
    }
};

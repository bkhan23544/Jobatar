import {authConstants} from '../constants/auth.constants';
import { globalService as gs } from '../../services';


let authentication = gs.parseItem('authentication');
const initialState = authentication ? {loggedIn: true, authentication} : {loggedIn: false, authentication: null};

export const authReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case authConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                authentication: payload.user
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                authentication: payload.user
            };
        case authConstants.REGISTRATION_REQUEST:
        case authConstants.REGISTRATION_SUCCESS:
            return {
                loggingIn: false,
                authentication: payload.user
            };
        case authConstants.LOGIN_FAILURE:
        case authConstants.REGISTRATION_FAILURE:
            return {
                loggedIn: false,
                authentication: payload.error
            };
        case authConstants.AUTH_LOGOUT:
            return {
                loggedIn: false,
                authentication: null,
            };

        case authConstants.ITEM_SUCCESS:
        case authConstants.ITEM_REQUEST:
        case authConstants.ITEM_FAILURE:
            return {
                loggedIn: false,
                authentication: null,
                message: payload.message
            };
        default:
            return state
    }
};







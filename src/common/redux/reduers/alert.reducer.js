import { alertConstants } from '../constants/alert.constants';
export const alertReducer = (state = false, {type, payload}) => {

    switch (type) {
        case alertConstants.SUCCESS:
            return {
                type: alertConstants.SUCCESS,
                message: payload.message
            };

        case alertConstants.ERROR:
            return {
                type: alertConstants.ERROR,
                message: payload.message
            };

        case alertConstants.UNVERIFIED:
            console.log(payload);
            return {
                type: alertConstants.ERROR,
                message: payload.message,
                user_id: payload.user_id,
            };

        case alertConstants.CLEAR:
            return {};
        default:
            return state
    }
};



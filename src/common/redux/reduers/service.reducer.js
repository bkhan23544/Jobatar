import { serviceConstants } from '../constants/service.constants';

export const serviceReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case serviceConstants.SERVICE_LIST:
            return {
                type: serviceConstants.SERVICE_LIST,
                data: payload.data
            };

        case serviceConstants.SERVICE_CLEAR:
            return {
                type: serviceConstants.SERVICE_CLEAR,
                data: null
            };

        default:
            return state
    }
};



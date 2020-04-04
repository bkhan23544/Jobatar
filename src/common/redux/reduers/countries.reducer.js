import { commonConstants } from '../constants/common.constants';

export const countriesReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case commonConstants.COMMON_COUNTRIES:
            return {
                type: commonConstants.COMMON_COUNTRIES,
                data: payload.data
            };
        default:
            return state
    }
};



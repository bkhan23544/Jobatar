import { commonConstants } from '../constants/common.constants';

export const categoriesReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case commonConstants.COMMON_CATEGORIES:
            return {
                type: commonConstants.COMMON_CATEGORIES,
                data: payload.data
            };
        default:
            return state
    }
};



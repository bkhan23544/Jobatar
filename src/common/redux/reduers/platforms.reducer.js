import { commonConstants } from '../constants/common.constants';

export const platformsReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case commonConstants.COMMON_PLATFORMS:
            return {
                type: commonConstants.COMMON_PLATFORMS,
                data: payload.data
            };
        default:
            return state
    }
};



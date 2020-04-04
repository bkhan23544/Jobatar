import { commonConstants } from '../constants/common.constants';

export const skillsReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case commonConstants.COMMON_SKILLS:
            return {
                type: commonConstants.COMMON_SKILLS,
                data: payload.data
            };

        default:
            return state
    }
};



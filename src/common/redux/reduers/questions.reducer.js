import { commonConstants } from '../constants/common.constants';

export const questionsReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case commonConstants.COMMON_QUESTIONS:
            return {
                type: commonConstants.COMMON_QUESTIONS,
                data: payload.data
            };
        default:
            return state
    }
};



import { processConstants } from '../constants/process.constants';

const initialState = {loading: false};
export const processReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case processConstants.PROCESS_START:
            return {
                type: processConstants.PROCESS_START,
                loading: true
            };
        case processConstants.PROCESS_STOP:
            return {
                type: processConstants.PROCESS_STOP,
                loading: false
            };
        case processConstants.PROCESS_CLEAR:
            return {};
        default:
            return state
    }
};

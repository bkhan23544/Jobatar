import {processConstants} from "../constants/process.constants";

export const start = () => {
    return {
        type: processConstants.PROCESS_START,
        payload: {loading: true}
    };
};
export const stop = () => {
    return {
        type: processConstants.PROCESS_STOP,
        payload: {loading: false}
    };
};
export const processSelectors = {
    start,
    stop
};

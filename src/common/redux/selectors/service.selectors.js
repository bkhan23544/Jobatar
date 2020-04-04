import { serviceConstants } from '../constants/service.constants';

const list = (res) => {
    return {type: serviceConstants.SERVICE_LIST, payload: {data: res}};
};

const clear = () => {
    return {type: serviceConstants.SERVICE_CLEAR, payload: {data: null}};
};

export const serviceSelectors = {
    list,
    clear,
};

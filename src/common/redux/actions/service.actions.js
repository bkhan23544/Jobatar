import { processSelectors, alertSelectors, serviceSelectors } from "../selectors";
import { itemService } from '../../services';

const create = (params) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.service("POST", params)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                console.log(exception);
            });
    };
};

const update = (id, params) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.service("POST", params)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                console.log(exception);
            });

    };
};

const remove = (item_id) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.service("DELETE", {item_id:item_id})
            .then(response => {
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                console.log(exception);
            });

    };
};

const index = (method = "GET", params = null, params2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.service(method, params, params2)
            .then(response => {
                dispatch(serviceSelectors.list(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                console.log( exception );
            });
    };
};

const clear = () => {
    return dispatch => {
        dispatch(serviceSelectors.clear());
    };
};

export const serviceActions = {
    index,
    create,
    update,
    remove,
    clear,
};


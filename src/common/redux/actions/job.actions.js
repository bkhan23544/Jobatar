import { alertSelectors, processSelectors, jobSelectors } from "../selectors";
import { itemService, globalService as gs } from "../../services";

const create = (params) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.job("POST", params)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const update = (id, params) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.job("POST", params)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });

    };
};


const list = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.job(method, params, param2)
            .then(response => {
                dispatch(jobSelectors.list(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });

    };
};

const remove = (item_id) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.job("DELETE", { item_id: item_id })
            .then(response => {
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });

    };
};

const index = (method = "GET", params = null, params2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.job(method, params, params2)
            .then(response => {
                switch (params2.is_publish) {
                    case "publish":
                        dispatch(jobSelectors.publish(response));
                        break;
                    case "draft":
                        dispatch(jobSelectors.draft(response));
                        break;
                    default:
                        dispatch(jobSelectors.item(response));
                }
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const clear = () => {
    return dispatch => {
        dispatch(jobSelectors.clear());
    };
};

export const jobActions = {
    index,
    clear,
    create,
    update,
    list,
    remove,
};
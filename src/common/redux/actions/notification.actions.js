import {defaultService, globalService as gs} from '../../services';
import {alertSelectors} from "../selectors/alert.selectors";
import {processSelectors} from "../selectors/process.selectors";
import {notificationSelectors} from "../selectors";


const list = (params = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        defaultService.notification(params)
            .then(response => {
                dispatch(notificationSelectors.list(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const pull = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        defaultService.notificationPull(method, params, param2 )
            .then(response => {
                dispatch(notificationSelectors.pull(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const read = (params = null) => {
    console.log('params', params);
    return dispatch => {
        dispatch(processSelectors.start());
        defaultService.notificationRead(params)
            .then(response => {
                dispatch(notificationSelectors.read(response));
                dispatch(processSelectors.stop());
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const trash = (method = "POST", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        defaultService.notificationDelete(method, params, param2 )
            .then(response => {
                dispatch(notificationSelectors.trash(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const actions = (params = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        defaultService.notificationActions(params)
            .then(response => {
                dispatch(notificationSelectors.actions(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

export const notificationActions = {
    list,
    pull,
    read,
    trash,
    actions,
};


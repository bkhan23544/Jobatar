import { alertSelectors, processSelectors, blogSelectors } from "../selectors";
import { itemService, globalService as gs} from "../../services";

const item = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.item(method, params, param2)
            .then(response => {
                dispatch(blogSelectors.list(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const categories = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.categories(method, params, param2)
            .then(response => {
                dispatch(blogSelectors.categories(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const reactions = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.reactions(method, params, param2)
            .then(response => {
                //dispatch(blogSelectors.re(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const comment = (method = "POST", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.comment(method, params, param2)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const reply = (method = "POST", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.reply(method, params, param2)
            .then(response => {
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const clear = () => {
    return dispatch => {
        dispatch(blogSelectors.clear());
    };
};

export const blogAction = {
    item,
    categories,
    reactions,
    comment,
    reply,
    clear
};
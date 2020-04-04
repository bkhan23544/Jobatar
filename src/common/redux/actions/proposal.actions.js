import { itemService, globalService as gs } from '../../services';
import { processSelectors, alertSelectors, proposalSelectors } from "../selectors";
import { messageActions } from './message.actions';
import { commonHelper as common, ModuleHelper as mh } from '../../../helpers';
import {history} from "../../../helpers/history";


const index = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.proposal(method, params, param2)
            .then(response => {
                dispatch(proposalSelectors.items(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const proposal = (method = "GET", params = null, param2 = null, redirectTo = null) => {

    return dispatch => {
        dispatch(processSelectors.start());
        itemService.proposal(method, params, param2)
            .then(response => {

                if (((method === 'POST') || (method === 'GET') || (method === 'DELETE')) && (response.code === true)) {
                    (method !== 'DELETE') && dispatch(proposalSelectors.item(response));
                    (method === 'POST') && dispatch(alertSelectors.success(response.message));
                    if (method === 'DELETE') {
                        dispatch(alertSelectors.success(response.message));
                        history.push(`/offers/sent/jobs/cash`) ;
                    }
                    if (response.recipients !== null) {
                        gs.isNotified(response.recipients);
                        if (response.model && response.model.message_id === null && response.model.moduleId === mh.UserService) {
                            let messenger = common.messenger(response.model.comment, response.model.title, response.model);
                            dispatch(messageActions.sendMessageToFirebase(messenger));
                        }
                    }
                    redirectTo && gs.navigation(redirectTo);
                } else {
                    (response.message !== '') && dispatch(alertSelectors.error(response.message));
                }
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};



const review = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.review(method, params, param2)
            .then(response => {
                if (method === 'POST') {
                    (response.code === true) ?
                        dispatch(alertSelectors.success(response.message)) :
                        dispatch(alertSelectors.error(response.message));
                }
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const milestone = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.milestone(method, params, param2)
            .then(response => {
                if (method === 'POST') {
                    (response.code === true)
                        ? dispatch(alertSelectors.success(response.message))
                        : dispatch(alertSelectors.error(response.message));

                    if (response.recipients !== null) {
                        gs.isNotified(response.recipients);
                    }
                }

                dispatch(proposal("GET", null, { proposal_id: param2.proposal_id }));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const dispute = (method = "GET", params = null, param2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.dispute(method, params, param2)
            .then(response => {
                if (method === 'POST') {
                    (response.code === true) ?
                        dispatch(alertSelectors.success(response.message)) :
                        dispatch(alertSelectors.error(response.message));
                    gs.isNotified(response.recipients);
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
        dispatch(proposalSelectors.clear());
    }
};

export const proposalActions = {
    index,
    proposal,
    review,
    milestone,
    clear,
    dispute
};
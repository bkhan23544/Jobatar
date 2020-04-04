import { processSelectors, alertSelectors, messageSelectors } from "../selectors";
import { itemService, globalService as gs } from '../../services';
import { ModuleHelper as mh } from "../../../helpers";


const dbRecipients = (method = "GET", params = null, params2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.recipients(method, params, params2)
            .then(response => {
                dispatch(messageSelectors.recipients(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const index = (params2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        itemService.message("GET", null, params2)
            .then(response => {
                dispatch(messageSelectors.messages(response));
                dispatch(processSelectors.stop());
            })
            .catch(exception => {
                gs.showErrors(dispatch, exception, alertSelectors);
                dispatch(processSelectors.stop());
            });
    };
};

const send = (params, params2 = null) => {
    return dispatch => {
        dispatch(processSelectors.start());
        let formData = {
            userMessage: {
                text: params2.message.text
            }
        };
        itemService.message("POST", formData, { message_id: params2.message.message_id })
            .then(response => {
                dispatch(alertSelectors.success(response.message));
            })
            .catch(exception => {
                dispatch(processSelectors.stop());
            });
    };
};

const activeMessage = (message, key) => {
    return dispatch => {
        dispatch(messageSelectors.activeMessage(message, key));
    }
};
const recipients = (users) => {
    return dispatch => {
        dispatch(messageSelectors.recipients(users));
    }
};

const sendMessageToFirebase = (data, key = null) => {

    return dispatch => {
        if (data && data !== undefined) {
            dispatch(processSelectors.start());
            let dateNow = (data.created_at === null || data.created_at === undefined ) ? Date.now() : data.created_at;
            const cId = parseInt(data.user_id);

            let recipients = [];
            data.recipients && data.recipients.forEach(el => {
                let uId = parseInt(el.id);
                let unread = (el.unread === undefined ? 0 : el.unread);
                recipients[uId] = (uId === cId) ? { id: uId, status: 'read', unread: unread } : { id: uId, status: 'unread', unread: unread };
            });

            let is_attachment = (((data.attachment === false) || (data.attachment === null)) ? false : true);

            if (is_attachment === true) {
                const attachments = { id: dateNow, key: key, files: data.attachment };
                data.attachment = attachments;
            }
            let message = {
                text: data.text,
                recipients: recipients,
                is_attachment: is_attachment,
                deleted: {},
                sender: cId,
                created_at: dateNow,
                updated_at: dateNow,
            };

            const userMessage = {
                message: message,
                recipients: {
                    message: message,
                    recipients: recipients,
                    is_attachment: is_attachment,
                    group: data.group,
                    item: data.item,
                    created_at: dateNow,
                    updated_at: dateNow,
                },
                group: (key === null || key === undefined) ? data.group : null,
                item: (key === null || key === undefined) ? data.item : null,
            };

            /*if (data.attachment !== null) {
                userMessage.attachment = data.attachment
            }*/

            gs.messageToFirebase(userMessage, key).then((messageKey) => {
                if (data.item && ((messageKey !== '') || (messageKey !== null))) {
                    if (data.item.module === mh.UserConnection) {
                        itemService.connection("POST", { messageKey, recipients }, { key: 'connection-message' });
                        gs.navigation('connection-message',false, { key: messageKey });
                    } else {
                        const proposal_id = data.item.item_id;
                        itemService.proposal("POST", { userProposal: { message_id: messageKey } }, { proposal_id: proposal_id });
                    }
                }
            });

            dispatch(alertSelectors.success("Sent."));
            dispatch(processSelectors.stop());
            return true;
        }
    }
};



const clear = () => {
    return dispatch => {
        dispatch(processSelectors.start());
        dispatch(messageSelectors.clear());
        dispatch(processSelectors.stop());
    };
};



export const messageActions = {
    index,
    dbRecipients,
    send,
    clear,
    sendMessageToFirebase,
    activeMessage,
    recipients
};


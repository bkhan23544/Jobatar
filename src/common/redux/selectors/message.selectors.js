import { messageConstants } from '../constants/message.constants';

const messages = (res) => {
    return { type: messageConstants.MESSAGE_MESSAGES, payload: { messages: res}};
};

const recipients = (res) => {
    return { type: messageConstants.MESSAGE_RECIPIENTS, payload: { recipients: res } };
};

const clear = (res) => {
    return { type: messageConstants.MESSAGE_CLEAR, payload: { recipients: null, messages: null } };
};

const activeMessage = (message, key) => {
    return { type: messageConstants.MESSAGE_KEY, payload: { message: message, key: key } };
};


export const messageSelectors = {
    messages,
    recipients,
    clear,
    activeMessage,
};

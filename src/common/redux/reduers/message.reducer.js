import { messageConstants } from '../constants/message.constants';

export const messageReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case messageConstants.MESSAGE_MESSAGES:
            return {
                type: messageConstants.MESSAGE_MESSAGES,
                messages: payload.messages
            };

        case messageConstants.MESSAGE_RECIPIENTS:
            return {
                type: messageConstants.MESSAGE_RECIPIENTS,
                recipients: payload.recipients
            };

        case messageConstants.MESSAGE_CLEAR:
            return {
                type: messageConstants.MESSAGE_CLEAR,
                data: null,
                recipients: null,
                messages: null,
            };

        case messageConstants.MESSAGE_KEY:
            return {
                type: messageConstants.MESSAGE_KEY,
                message: payload.message,
                key: payload.key,
            };

        default:
            return state
    }
};



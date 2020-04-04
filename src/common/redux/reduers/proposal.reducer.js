import { proposalConstants } from '../constants/proposal.constants';

export const proposalReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case proposalConstants.PROPOSAL_LIST:
            return {
                type: proposalConstants.PROPOSAL_LIST,
                items: payload.items
            };

        case proposalConstants.PROPOSAL_ITEM:
            return {
                type: proposalConstants.PROPOSAL_ITEM,
                item: payload.item
            };


        case proposalConstants.PROPOSAL_CLEAR:
            return {
                type: proposalConstants.PROPOSAL_CLEAR,
                items: null,
                item: null,
            };

        default:
            return state
    }
};



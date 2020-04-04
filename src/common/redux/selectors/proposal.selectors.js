import { proposalConstants } from '../constants/proposal.constants';

const items = (res) => {
    return { type: proposalConstants.PROPOSAL_LIST, payload: {items: res}};
};

const item = (res) => {
    return { type: proposalConstants.PROPOSAL_ITEM, payload: { item: res } };
};


const clear = () => {
    return { type: proposalConstants.PROPOSAL_CLEAR, payload: {data: null}};
};

export const proposalSelectors = {
    items,
    item,
    clear,
};

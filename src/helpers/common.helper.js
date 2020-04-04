// eslint-disable-next-line
import { ModuleHelper as mh } from "./module.helper";
import { globalService as gs } from "../common/services";


const isWeb = process.env.REACT_APP_IS_WEB;
const range = (start, end, step = 1) => {
    return Array(end - start + step).fill().map((_, idx) => start + idx);
};

const locationAddress = (address, country) => {
    let location = (address ? address : '');
    location += country ? (',').concat(country.name) : '';
    return location;
};

const address = (item) => {
    let location = [];
    //item && (item.hometown || item.location) && (location.push(item.hometown) || location.push(item.location));
    item && item.countryCode && location.push(item.countryCode.name);
    //console.log(item);
    return location.join(", ");
};

const messenger = (text, subject = null, proposal = null, attachment = null) => {
    const params = {};
    const recipients = [];
    proposal.userItemProposalRecipients.map((item) => {
        recipients[item.recipient.id] = {
            id: item.recipient.id,
            avatar: item.recipient.avatar,
            hometown: item.recipient.hometown,
            name: item.recipient.name
        }
    });
    params.user_id = gs.identity.user.id;
    params.recipients = recipients;
    params.text = text;
    let title = subject !== null ? subject : proposal.item.title;
    let groupImage = proposal.item.cover === undefined ? '' : proposal.item.cover;
    let groupImageId = proposal.item.cover_id === undefined ? '' : proposal.item.cover_id;
    params.group = { group_id: proposal.id, title: title, image: groupImage, image_id: groupImageId };
    params.item = { item_id: proposal.id, module: mh.UserItemProposal, moduleType: proposal.moduleId };
    params.attachment = attachment;
    return params;
};

const urlParams = ( key, val ) => {
    const searchParams = new URLSearchParams();
    searchParams.set(key, val);
    return searchParams.toString();
};

export const commonHelper = {
    range,
    locationAddress,
    address,
    messenger,
    urlParams
};

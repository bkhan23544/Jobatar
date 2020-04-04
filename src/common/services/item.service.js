import { globalService as gs } from "./global.service";

const execute = (requestKey, method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/${requestKey}`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

/* ** cms-item ** */
const item = (method = "GET", params = null, params2 = null) => {
    /* return execute('item/index', method, params, params2); */
    let url = gs.httpURL(`${gs.apiRoot}/item/${gs.identity ? 'index' : 'public-index'}`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const categories = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/item/${gs.identity ? 'categories' : 'public-categories'}`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const reactions = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/item/reactions`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const comment = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/item/comments`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const reply = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/item/reply`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

/* ** user ** */
const users = (method = "GET", params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/search`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions(method, null));
};

const changeEmail = (method = "POST", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/change-email`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const changePassword = (method = "POST", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/change-password`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const deactivateAccount = (method = "POST", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/deactivate-account`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const stripeConnect = (method = "POST", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/stripe-connect`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const stripeDisconnect = (method = "POST", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/stripe-disconnect`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const stripeRetrieve = (method = "GET", params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/stripe-retrieve`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions(method, null));
};

const newsletter = (method = "POST", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/newsletter`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const profile = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/profile`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const company = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/company`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const education = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/education`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const experience = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/experience`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const portfolio = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/portfolio`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

//search by services
const services = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/services`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const service = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/service`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const coFounder = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/co-founder`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const favorite = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/favorite`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};
const connection = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/connection`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};
const inviteMember = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/invite-member`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const logout =  (method = "POST", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/profile`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const isnew = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/is-new`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

/* Jobs */
//search by services
const jobs = (method = "GET", params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-item/search`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions(method, null));
};

const job = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-item/job`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const suggestion = (method = "GET", params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-item/suggestion`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions(method, null));
};



/** proposals */

const proposal = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-item-proposal/proposal`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const milestone = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-item-proposal/milestone`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const review = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-item-proposal/review`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const dispute = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-item-proposal/dispute`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

/** messages */
const message = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-message/message`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const recipients = (method = "GET", params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-message/recipients`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions(method, null));
};

const unread = (method = "GET", params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-message/unread-count`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions(method, null));
};

/** Transactions */
const transactions = (method = "GET", params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user/transactions`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions(method, null));
};

/** messages */
const support = (method = "GET", params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-support/message`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const supportRecipients = (method = "GET", params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/user-support/recipients`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions(method, null));
};

export const itemService = {
    execute,
    item,
    categories,
    reactions,
    comment,
    reply,

    /* user */
    users,
    changeEmail,
    changePassword,
    deactivateAccount,
    stripeConnect,
    stripeDisconnect,
    stripeRetrieve,
    newsletter,
    profile,
    company,
    education,
    experience,
    portfolio,

    service,
    services,
    coFounder,
    favorite,
    connection,
    inviteMember,
    logout,
    isnew,
    /* job */
    jobs,
    job,
    suggestion,

    /** proposals */
    proposal,
    milestone,
    review,
    dispute,

    /** transactions */
    transactions,

    /** messages */
    recipients,
    message,
    unread,

    /** Support */
    support,
    supportRecipients
};

import {globalService as gs} from "./global.service";

const login = (params, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/authentication/login`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions('POST', params));
};

const loginByAuth = (params, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/authentication/oauth`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions('POST', params));
};

const register = (params, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/authentication/register`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions('POST', params));
};

const logout = () => {
    // remove user from local storage to log user out
    gs.logout('authentication');
    let url = gs.httpURL(`${gs.apiRoot}/authentication/logout`);
    return gs.request(url, gs.requestOptions('POST', null));
};

const forgotPassword = (params, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/authentication/forgot-password`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions('POST', params));
};

const resetPassword = (params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/authentication/reset-password`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions("POST", params));
};

const emailVerification = (params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/authentication/email-verification`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions('POST', params));
};

const resendVerification = (params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/authentication/resend-verification`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions('POST', params));
};


export const authService = {
    login,
    loginByAuth,
    register,
    logout,
    forgotPassword,
    resetPassword,
    emailVerification,
    resendVerification,
};
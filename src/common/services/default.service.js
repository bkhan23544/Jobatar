import { globalService as gs } from "./global.service";
import axios from 'axios';
import { uploadSelectors } from "../redux/selectors";

const countries = (method = "GET", params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/country-codes`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const newsletter = (params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/newsletter`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions("POST", params));
};

const timeZone = (method = "GET", params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/timezone`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions(method, params));
};

const contact = (params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/contact`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions("POST", params));
};

// Image upload service
const deleteFile = (params = null, params2 = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/delete-file`);
    url = (params2 !== null) ? gs.requestParams(url, params2) : url;
    return gs.request(url, gs.requestOptions("DELETE", params));
};

const autocomplete = (params = null, item = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/${item}-autocomplete`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("GET", null));
};

const categories = (params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/categories`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("GET", null));
};

const skills = (params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/skills`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("GET", null));
};

const questions = (params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/questions`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("GET", null));
};

const platforms = (params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/platforms`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("GET", null));
};

const notification = (params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/notifications/index`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("GET", null));
};

const notificationPull = (params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/notifications/pull`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("GET", null));
};

const notificationActions = (params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/notifications/notifications`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("GET", null));
};

const notificationRead = (params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/notifications/read`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("POST", params));
};

const notificationDelete = (params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/notifications/deleted`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("POST", params));
};

const coreField = (params = null) => {
    let url = gs.httpURL(`${gs.apiRoot}/default/core-field-options`);
    url = (params !== null) ? gs.requestParams(url, params) : url;
    return gs.request(url, gs.requestOptions("GET", null));
};

// Image upload service
const uploadFile = (files) => {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('file[]', f));
    return fetch(`${gs.apiRoot}/default/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${gs.authToken()}` },
        body: formData
    })
        .then(
            response => {
                if (!response.ok) {
                    throw response
                }
                return response.json();
            });
};

const uploadWithoutProgress = (files) => {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('file[]', f));
    return fetch(`${gs.apiRoot}/default/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${gs.authToken()}` },
        body: formData
    })
        .then(
            response => {
                if (!response.ok) {
                    throw response
                }
                return response.json();
            });
};

const uploadAndProgress = (files, dispatch) => {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('file[]', f));
    return axios.request({
        method: "post",
        url: `${gs.apiRoot}/default/upload`,
        headers: { 'Authorization': `Bearer ${gs.authToken()}` },
        data: formData,
        onUploadProgress: (p) => {
            let progress = calcProgressPercent(p);
            dispatch(uploadSelectors.progress(progress));
        }
    }).then(
        response => {
            if (response.status !== 200) {
                throw response
            }
            return response.data;
        })
};

const calcProgressPercent = (event) => {
    let progress = Math.round(100 * event.loaded / event.total);
    return progress
};


export const defaultService = {
    countries,
    timeZone,
    contact,
    autocomplete,
    uploadFile,
    deleteFile,
    uploadWithoutProgress,
    uploadAndProgress,
    calcProgressPercent,
    categories,
    skills,
    questions,
    platforms,
    coreField,
    newsletter,
    notification,
    notificationPull,
    notificationActions,
    notificationRead,
    notificationDelete,
};

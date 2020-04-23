import { history } from "../helpers/history";

const welcome = (is_redirect) => {
    is_redirect ? (window.location.href = '/') : history.push('/');
};

const services = (is_redirect) => {
    is_redirect ? (window.location.href = '/services') : history.push('/services');
};

const home = (is_redirect) => {
    is_redirect ? (window.location.href = '/') : history.push('/');
};

const login = () => {
    window.location.href = '/login';
};

const logout = () => {
    window.location.href = '/';
};

const serviceSearch = (is_redirect) => {
    is_redirect ? (window.location.href = '/service-search') :  history.push('/service-search');
};

const dashBoard = (is_redirect) => {
    is_redirect ? (window.location.href = '/dashBoard') :  history.push('/dashBoard');
}

const offersLocation = (location) => {
    history.push(`/${location}`) ;
};

const message = (is_redirect, query = null) => {
    let location = `/messages` + (query ? `/?${query}` : '');
    is_redirect ? (window.location.href = `${location}`) : history.push(`${location}`);
};

export const navigationHelper = {
    welcome,
    home,
    login,
    logout,
    offersLocation,
    serviceSearch,
    services,
    message,
    dashBoard
};

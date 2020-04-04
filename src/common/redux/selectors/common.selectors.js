import {commonConstants} from '../constants';

const categories = (res) => {
    return {type: commonConstants.COMMON_CATEGORIES, payload: {data: res}};
};

const skills = (res) => {
    return {type: commonConstants.COMMON_SKILLS, payload: {data: res}};
};

const countries = (res) => {
    return {type: commonConstants.COMMON_COUNTRIES, payload: {data: res}};
};

const questions = (res) => {
    return {type: commonConstants.COMMON_QUESTIONS, payload: {data: res}};
};

const platforms = (res) => {
    return { type: commonConstants.COMMON_PLATFORMS, payload: { data: res } };
};

export const commonSelectors = {
    categories,
    skills,
    countries,
    questions,
    platforms,
};

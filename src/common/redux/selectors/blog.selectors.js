import { blogConstants } from '../constants/blog.constants';

const list = (res) => {
    return {type: blogConstants.BLOG_LIST, payload: {list: res}};
};

const categories = (res) => {
    return {type: blogConstants.BLOG_CATEGORIES, payload: {categories: res}};
};

const comment = (res) => {
    return {type: blogConstants.BLOG_COMMENT, payload: {comment: res}};
};

const clear = () => {
    return {type: blogConstants.BLOG_CLEAR, payload: {data: null}};
};

export const blogSelectors = {
    list,
    categories,
    comment,
    clear,
};

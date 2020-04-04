import { blogConstants } from "../constants";

export const blogReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case blogConstants.BLOG_LIST:
            return {
                ...state,
                type: blogConstants.BLOG_LIST,
                list: payload.list
            };
        case blogConstants.BLOG_CATEGORIES:
            return {
                ...state,
                type: blogConstants.BLOG_CATEGORIES,
                categories: payload.categories
            };
        case blogConstants.BLOG_COMMENT:
            return {
                ...state,
                type: blogConstants.BLOG_COMMENT,
                comment: payload.comment
            };
        case blogConstants.BLOG_CLEAR:
            return {
                type: blogConstants.BLOG_CLEAR,
                list: null,
                categories: null,
                comment: null,
            };

        default:
            return state
    }
};



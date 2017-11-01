export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_UPDATE_POST = 'ADD_UPDATE_POST';
export const ADD_UPDATE_COMMENT = 'ADD_UPDATE_COMMENT';
export const SORT_DATA = 'SORT_DATA';

export const addCategory = (category) => {
    return {
        type: ADD_CATEGORY,
        category
    }
};

export const addUpdatePost = (post) => {
    return {
        type: ADD_UPDATE_POST,
        post
    }
};

export const addUpdateComment = (comment) => {
    return {
        type: ADD_UPDATE_COMMENT,
        comment
    }
};

export const sortData = (sortId, sortKey, sortOrder) => {
    return {
        type: SORT_DATA,
        sortId,
        sortKey,
        sortOrder
    }
};
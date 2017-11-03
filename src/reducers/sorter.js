import { SORT_DATA } from '../actions/types';

export const sortData = (state={}, action) => {
    switch(action.type){
        case SORT_DATA:
            const { sortId, sortKey, sortOrder } = action;

            return {
                ...state,
                [sortId]: {
                    sortKey: sortKey,
                    sortOrder: sortOrder
                }
            };
        default:
            return state;
    }
};

export default sortData;
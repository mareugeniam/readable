import { sortData } from '.';

export function doSort(sortId, sortKey, sortOrder){
    return function(dispatch){
        dispatch(sortData(sortId, sortKey, ++sortOrder > 2 ? 0 : sortOrder));
    };
};
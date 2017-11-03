import * as PostsAPI from '../utils/PostsAPI';
import { addCategory } from '.';

export function loadAllCategories() {
    return function(dispatch) {
        PostsAPI.getAllCategories()
            .then(result => result.categories.map(category => dispatch(addCategory(category))));
    };
};
import { combineReducers } from 'redux';
import { categories } from './categories';
import { posts } from './posts';
import { comments } from './comments';
import { sortData } from './sorter';

export default combineReducers({ categories, posts, comments, sortData });
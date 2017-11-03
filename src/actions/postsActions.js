import * as PostsAPI from '../utils/PostsAPI';
import { addUpdatePost, addCategory, addUpdateComment } from '.';
import { loadAllCategories } from './categoriesActions';
import { upVote, downVote } from './voteOptions';

export function loadAllPosts() {
    return function(dispatch) {
        PostsAPI.getAllPosts()
            .then(posts => posts.map(post => dispatch(addUpdatePost(post))));
    };
};

export function loadPostComments(postId){
    return function(dispatch) {
        PostsAPI.getCommentsByPost(postId)
            .then(comments => comments.map(comment => dispatch(addUpdateComment(comment))));
    };
};

export function loadPostByIdWithComments(postId) {
    return function(dispatch) {
        dispatch(loadAllCategories());
        PostsAPI.getPostById(postId)
            .then(result => dispatch(addUpdatePost(result)));
        dispatch(loadPostComments(postId));
    };
};

export function doAddPost(post) {
    return function(dispatch) {
        PostsAPI.addPost(post).then(result => dispatch(addUpdatePost(result)));
    };
};

export function doUpdatePost(post) {
    return function(dispatch) {
        PostsAPI.updatePost(post).then(result => dispatch(addUpdatePost(result)));
    };
};

export function doDeletePost(postId) {
    return function(dispatch) {
        PostsAPI.deletePost(postId).then(result => dispatch(addUpdatePost(result)));
    };
};

export function loadComposedPostData(){
    return function(dispatch) {
        Promise.all([
            PostsAPI.getAllCategories(),
            PostsAPI.getAllPosts()
        ]).then(result => {
            result[0].categories.map(category => dispatch(addCategory(category)));
            result[1].map(post => dispatch(loadPostByIdWithComments(post.id)));
        });

    };
};

export function doPostVote(post, option) {
    return function(dispatch) {
        const postVote = option === true 
            ? PostsAPI.addPostVote(post.id, upVote) 
            : PostsAPI.addPostVote(post.id, downVote);
        postVote.then(result => dispatch(addUpdatePost(result)));
    };
};
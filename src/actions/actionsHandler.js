import * as PostsAPI from '../utils/PostsAPI';
import { addCategory, addUpdatePost, addUpdateComment, sortData } from '.';

export function loadAllCategories() {
    return function(dispatch) {
        PostsAPI.getAllCategories()
            .then(result => result.categories.map(category => dispatch(addCategory(category))));
    };
};

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

export function doAddComment(comment) {
    return function(dispatch) {
        PostsAPI.addComment(comment).then(result => dispatch(addUpdateComment(result)));
    };
};

export function doUpdateComment(comment) {
    return function(dispatch) {
        PostsAPI.updateComment(comment).then(result => dispatch(addUpdateComment(result)));
    };
};

export function doDeleteComment(commentId) {
    return function(dispatch) {
        PostsAPI.deleteComment(commentId).then(result => dispatch(addUpdateComment(result)));
    };
};

const upVote = JSON.stringify({ "option": "upVote" });
const downVote = JSON.stringify({ "option": "downVote" });

export function doPostVote(post, option) {
    return function(dispatch) {
        const postVote = option === true 
            ? PostsAPI.addPostVote(post.id, upVote) 
            : PostsAPI.addPostVote(post.id, downVote);
        postVote.then(result => dispatch(addUpdatePost(result)));
    };
};

export function doCommentVote(comment, option) {
    return function(dispatch) {
        const commentVote = option === true 
            ? PostsAPI.addCommentVote(comment.id, upVote) 
            : PostsAPI.addCommentVote(comment.id, downVote);
        commentVote.then(result => dispatch(addUpdateComment(result)));
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

export function doSort(sortId, sortKey, sortOrder){
    return function(dispatch){
        dispatch(sortData(sortId, sortKey, ++sortOrder > 2 ? 0 : sortOrder));
    };
};
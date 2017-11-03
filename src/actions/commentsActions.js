import * as PostsAPI from '../utils/PostsAPI';
import { addUpdateComment } from '.';
import { upVote, downVote } from './voteOptions';

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

export function doCommentVote(comment, option) {
    return function(dispatch) {
        const commentVote = option === true 
            ? PostsAPI.addCommentVote(comment.id, upVote) 
            : PostsAPI.addCommentVote(comment.id, downVote);
        commentVote.then(result => dispatch(addUpdateComment(result)));
    };
};
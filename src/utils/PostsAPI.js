const api = "http://localhost:5001";

// Generate a unique token for storing posts data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
};

export const getAllCategories = () => 
    fetch(`${api}/categories`, { headers })
        .then(res => res.json());

export const getPostsByCategory = (category) => 
    fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json());

export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
    .then(res => res.json());

export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers,
        body: JSON.stringify(post)
    }).then(res => res.json());

export const getPostById = (postId) =>
    fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json());

export const addPostVote = (postId, option) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'POST',
        headers,
        body: option
    }).then(res => res.json());

export const updatePost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(post)
    }).then(res => res.json());

export const deletePost = (postId) =>
    fetch(`${api}/posts/${postId}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json());

export const getCommentsByPost = (postId) =>
    fetch(`${api}/posts/${postId}/comments` , { headers })
    .then(res => res.json());

export const addComment = (comment) =>
fetch(`${api}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(comment)
}).then(res => res.json());

export const getCommentById = (commentId) =>
    fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json());

export const addCommentVote = (commentId, option) =>
fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers,
    body: option
}).then(res => res.json());

export const updateComment = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(comment)
    }).then(res => res.json());

export const deleteComment = (commentId) =>
    fetch(`${api}/comments/${commentId}`, {
        method: 'DELETE',
        headers
    }).then(res => res.json());
import axios from 'axios';
import { FETCH_USER, FETCH_POSTS, FETCH_DATES } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });    
};

export const fetchPosts = () => async dispatch => {
    const res = await axios.get('/api/posts');

    dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const fetchDates = () => async dispatch => {
    const res = await axios.get('/api/dates');

    dispatch({ type: FETCH_DATES, payload: res.data });
}

export const createPost = (values, history) => async dispatch => {
    const res = await axios.post('/api/posts', values);

    history.push('/posts');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const createPostComment = (comment, postId) => async dispatch => {
    const requestBody = { 
        commentText: comment,
        postId: postId
    };
    await axios.post('/api/comments', requestBody);

    const res = await axios.get('/api/posts');

    dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const deleteComment = (commentId, postId) => async dispatch => {
    const body = {
        commentId: commentId,
        postId: postId
    };
    await axios.post('/api/comments/delete', body);

    const res = await axios.get('/api/posts');

    dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const deletePost = (postId, history) => async dispatch => {
    const body = { postId: postId }

    await axios.post('/api/posts/delete', body);

    const res = await axios.get('/api/posts');

    history.push('/posts');
    dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const createReservation = (state, history) => async dispatch => {
    await axios.post('/api/reservations', state);

    const res = await axios.get('/api/dates');

    history.push('/amenities');
    dispatch({ type: FETCH_DATES, payload: res.data });
}




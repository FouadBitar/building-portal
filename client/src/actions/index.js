import axios from 'axios';
import { FETCH_USER, FETCH_POSTS, FETCH_DATES } from './types';

//getState - allows you to get the values from the state right after you update it, so you can get the updated values in an action creator
export const loginUser = (credentials, history) => async dispatch => {
    const res = await axios.post('/api/login', credentials); 
    
    if(res.status !== 401) {
        const user = res.data;
        
        //awaiting this does not do anything, it is a synchronous call since the javascript object is passed to the dispatch
        await dispatch({ type: FETCH_USER, payload: user });
        history.push('/posts');
    }
    else {
        console.log('login failed\n');
        
        // history.push('/login');
        dispatch({ type: FETCH_USER, payload: { isAuthenticated: false, user: { username: "", role: "" } } })
    }
}

export const logoutUser = (history) => async dispatch => {
    const res = await axios.get('/api/logout');

    const { user, isAuthenticated } = res.data;
    history.push('/');
    dispatch({ type: FETCH_USER, payload: { user, isAuthenticated } });
}

export const fetchUser = () => async dispatch => {
    try{
        const res = await axios.get('/api/current_user');
        
        const { user, isAuthenticated } = res.data;
        dispatch({ type: FETCH_USER, payload: { isAuthenticated, user } });          
    }
    catch(err) {
        console.log(err);
        dispatch({ type: FETCH_USER, payload: { isAuthenticated: false, user: { username: "", role: "" } } }); 
    }
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
    try{
        //create post, if it succeeds retrieve new array of posts to display on dashboard
        await axios.post('/api/posts', values);

        const res = await axios.get('/api/posts');

        history.push('/posts');
        dispatch({ type: FETCH_POSTS, payload: res.data });
    }
    catch(error) {
        console.log(error);
    }
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


export const createBatchEmail = (formValues, history) => async dispatch => {
    await axios.post('/api/emails', formValues);

    history.push('/admin');
}

//do we have to dispatch?
export const createUser = (user, history) => async dispatch => {
    await axios.post('/api/admin/new/user', user);

    history.push('/admin');
}

export const createAdmin = (admin, history) => async dispatch => {
    await axios.post('/api/admin/new/admin', admin);

    history.push('/admin');
}






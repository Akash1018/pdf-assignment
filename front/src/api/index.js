import axios from 'axios'

const url = process.env.REACT_APP_BACK_END;

const API = axios.create({ baseURL:url });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
}) // checking token

export const fetchPosts = (id, search) => API.get(`/posts/look/${id}/${search === '' ? '2.36' : search}`);
export const createPost = (newPost) => API.post('/posts/upload', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

export const fetchPost = (id) => API.get(`/posts/get/${id}`);
export const sharePost = (id) => API.get(`/posts/share/${id}`);

export const comment = (value, id) => API.post(`/posts/${id}/comment`, {value});
export const forgot = (formData) => API.post('/users/forgot-password', formData);
export const reset = ({formData, token}) => API.post('/users/reset-password', {formData,token});
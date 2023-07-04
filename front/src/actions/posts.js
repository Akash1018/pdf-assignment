import * as api from '../api';
import { CREATE,UPDATE, DELETE,FETCH_ALL, FETCH_POST, COMMENT, SHARE } from '../constants/actionTypes';
// Action Creators
//thunk - allows to specify a additional arrow funtion.
export const getPosts = (id, search) => async (dispatch) => {
    try{
        const { data } = await api.fetchPosts(id, search);

        console.log(data);
        dispatch({ type: FETCH_ALL, payload: data});
    } catch(error){
        console.log(error.message);
    }
}

export const getPost = (id) => async (dispatch) => {
    try{
        console.log(id);
        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data});
    } catch(error){
        console.log(error.message);
    }
}

export const createPost = (post) => async (dispatch) =>{
    try{
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data});
    } catch(error){
        console.log(error);
    } 
}

export const updatePost = (id,post) => async (dispatch) => {
    try {  
       const { data } = await api.updatePost(id, post);
       
       dispatch({type: UPDATE,payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);

      dispatch({ type: COMMENT, payload: data});

      return data.comments;
    } catch (error) {
        console.log(error);
    }
}

export const searchPost = (value, id) => async (dispatch) => {
    try {
      const { data } = await api.comment(value, id);

      dispatch({ type: COMMENT, payload: data});

      return data.comments;
    } catch (error) {
        console.log(error);
    }
}

export const sharePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.sharePost(id);

      dispatch({ type: SHARE});
      console.log(data);
     
      return data;
    } catch (error) {
        console.log(error);
    }
}

import * as api from '../api/index';
import { AUTH } from '../constants/actionTypes';

export const signin = (formData, navigate ) => async (dispatch) => {
    try {
      // log in th user..
      const { data } = await api.signIn(formData);

      dispatch({ type: AUTH, data});
      navigate(`/posts/${data.result._id}`);
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, navigate ) => async (dispatch) => {
    try {
      await api.signUp(formData);

      navigate('/verify');
    } catch (error) {
        console.log(error);
    }
}

export const forgotPassword = (formData, navigate ) => async (dispatch) => {
  try {
    await api.forgot(formData);

    navigate('/reset');
  } catch (error) {
      console.log(error);
  }
}

export const resetPassword = ({formData,token}, navigate ) => async (dispatch) => {
  try {
    await api.reset({formData, token});

    navigate('/');
  } catch (error) {
      console.log(error);
  }
}
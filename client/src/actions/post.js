import axios from 'axios';
import { ENDPOINT } from '../components/utils/misc';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  CREATE_POST,
  GET_POST_BY_ID,
  EDIT_POST,
  CLEAR_EDIT_POST_FORM
} from './types';
import { setAlert } from '../actions/alert';

export const getAllPosts = () => async dispatch => {
  try {
    const response = await axios.get(`${ENDPOINT}api/post/posts`);
    console.log(response.data[0])
    dispatch({
      type: GET_POSTS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

export const addInterest = post_id => async dispatch => {
  try {
    const response = await axios.put(`${ENDPOINT}api/post/like/${post_id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: response.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

export const removeInterest = post_id => async dispatch => {
  try {
    const response = await axios.put(`${ENDPOINT}api/post/unlike/${post_id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: response.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

export const deletePost = (post_id, history) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      await axios.delete(`${ENDPOINT}api/post/remove/${post_id}`);

      dispatch(getAllPosts());
      history.push('/user/view/newsletter');
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: 'Post Error Deleted'
      });
    }
  }
};

export const createPost = dataToSubmit => async dispatch => {
  try {
    const response = await axios.post(`${ENDPOINT}api/post/add`, dataToSubmit);
    dispatch({
      type: CREATE_POST,
      payload: response.data
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

export const editPostById = (post_id, dataToSubmit) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.put(
      `${ENDPOINT}api/post/edit/${post_id}`,
      dataToSubmit,
      config
    );
    dispatch({
      type: EDIT_POST,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

export const getPostById = post_id => async dispatch => {
  try {
    const response = await axios.get(`${ENDPOINT}api/post/${post_id}`);

    dispatch({
      type: GET_POST_BY_ID,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

export const clearEditPost = () => dispatch => {
  dispatch({
    type: CLEAR_EDIT_POST_FORM,
    payload: ''
  });
};

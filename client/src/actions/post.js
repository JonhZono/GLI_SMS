import axios from 'axios';
import {
  GET_POSTS,
  POST_ERROR,
  CREATE_POST,
  GET_POST_BY_ID,
  EDIT_POST,
  CLEAR_EDIT_POST_FORM,
  CLEAR_VIEW_POST,
  UPDATE_LIKE,
  GET_LIKES,
  GET_SNS,
  UPDATE_SNS
} from './types';
import { setAlert } from '../actions/alert';

export const getAllPosts = () => async dispatch => {
  try {
    const response = await axios.get(`/api/post/posts`);
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

export const deletePost = (post_id, history) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      await axios.delete(`/api/post/remove/${post_id}`);
      dispatch(getAllPosts());
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: 'Post Error Deleted'
      });
    }
  }
};

export const createPost = dataToSubmit => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(`/api/post/add`, dataToSubmit, config);
    dispatch({
      type: CREATE_POST,
      payload: response.data
    });
    dispatch(
      setAlert('News Letter or Event Create & Send Successfully', 'success')
    );
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

export const editPostById = (post_id, dataToSubmit) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.put(
      `/api/post/edit/${post_id}`,
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
    const response = await axios.get(`/api/post/${post_id}`);

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

export const getLikeLists = postId => async dispatch => {
  try {
    const response = await axios.get(`/api/post/get/likes/${postId}`);
    dispatch({
      type: GET_LIKES,
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

export const getSnsLists = postId => async dispatch => {
  try {
    const response = await axios.get(`/api/post/get/sns/${postId}`);
    dispatch({
      type: GET_SNS,
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

export const getPostLikes = postId => async dispatch => {
  try {
    const response = await axios.put(`/api/post/like/${postId}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { postId, likes: response.data }
    });
    dispatch(getPostById(postId));
    dispatch(getLikeLists(postId));
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
export const getSnsLikes = postId => async dispatch => {
  try {
    const response = await axios.put(`/api/post/sns/${postId}`);
    dispatch({
      type: UPDATE_SNS,
      payload: { postId, likes: response.data }
    });
    dispatch(getPostById(postId));
    dispatch(getSnsLists(postId));
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

export const removeLike = postId => async dispatch => {
  try {
    const response = await axios.put(`/api/post/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKE,
      payload: { postId, likes: response.data }
    });
    dispatch(getPostById(postId));
    dispatch(getLikeLists(postId));
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

export const removeSns = postId => async dispatch => {
  try {
    const response = await axios.put(`/api/post/sns/no/${postId}`);
    dispatch({
      type: UPDATE_SNS,
      payload: { postId, sns: response.data }
    });
    dispatch(getPostById(postId));
    dispatch(getSnsLists(postId));
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

export const clearViewPost = () => dispatch => {
  dispatch({
    type: CLEAR_VIEW_POST
  });
};

export const clearEditPost = () => dispatch => {
  dispatch({
    type: CLEAR_EDIT_POST_FORM,
    payload: ''
  });
};

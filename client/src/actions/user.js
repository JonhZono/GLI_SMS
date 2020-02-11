import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  LOG_OUT,
  ADMIN_CREATE_USER,
  CREATE_USER_ERROR,
  ADMIN_GET_USER_ACCOUNT,
  GET_USER_AUTH,
  ALL_STUDENT_ACCOUNTS,
  CLEAR_USER_LIST
} from './types';
import { setAlert } from '../actions/alert';
import setGlobalToken from '../components/utils/setGlobalToken';
import { clearProfileDetails, clearConfigData } from '../actions/profile';
import { clearViewPost, clearEditPost } from './post';
import { clearStatistic, clearViewPerformance } from './analysis';
import { clearExam, clearViewExam } from './exam';
import { clearFee } from './duefee';
import { clearViewEachFeedback } from './feedback';

//load user to check if token is available,
//since token is stateless when reload is clear from the header, set up global header to store token
export const loadUser = () => async dispatch => {
  //call global token
  if (localStorage.token) {
    setGlobalToken(localStorage.token);
  }
  try {
    const response = await axios.get(`/api/user/auth/`);
    dispatch({
      type: LOAD_USER,
      payload: response.data
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const loginUser = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = {
    email,
    password
  };
  try {
    const res = await axios.post('/api/user/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert('Sign in successful', 'link'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logOut = history => dispatch => {
  dispatch({ type: LOG_OUT });
  dispatch(clearProfileDetails());
  dispatch(clearConfigData());
  dispatch(clearViewPost());
  dispatch(clearEditPost());
  dispatch(clearStatistic());
  dispatch(clearViewPerformance());
  dispatch(clearViewEachFeedback());
  dispatch(clearExam());
  dispatch(clearViewExam());
  dispatch(clearFee());
  history.push('/');
};

export const adminCreateUser = dataToSubmit => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `/api/user/register`,
      dataToSubmit,
      config
    );
    dispatch({
      type: ADMIN_CREATE_USER,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
    dispatch(adminGetUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
    dispatch({
      type: CREATE_USER_ERROR
    });
  }
};

export const adminGetUser = () => async dispatch => {
  try {
    const response = await axios.get(`/api/admin/user_accounts`);
    dispatch({
      type: ADMIN_GET_USER_ACCOUNT,
      payload: response.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

//select field student
export const studentSelectField = () => async dispatch => {
  try {
    const response = await axios.get(`/api/admin/student/accounts`);
    dispatch({
      type: ALL_STUDENT_ACCOUNTS,
      payload: response.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const adminDeleteUserAccountById = user_id => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      await axios.delete(`/api/admin/remove/${user_id}`);
      dispatch(adminGetUser());
    } catch (err) {
      if (err) throw err;
    }
  }
};

export const getUserAuth = () => async dispatch => {
  try {
    const response = await axios.get(`/api/user/auth/me`);
    dispatch({
      type: GET_USER_AUTH,
      payload: response.data
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const clearUserData = () => dispatch => {
  dispatch({
    type: CLEAR_USER_LIST
  });
};

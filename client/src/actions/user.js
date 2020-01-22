import axios from 'axios';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  LOG_OUT,
  CLEAR_PROFILE,
  ADMIN_CREATE_USER,
  CREATE_USER_ERROR,
  ADMIN_GET_USER_ACCOUNT,
  GET_USER_AUTH,
  ALL_STUDENT_ACCOUNTS
} from './types';
import { ENDPOINT } from '../components/utils/misc';
import { setAlert } from '../actions/alert';
import {} from '../actions/feedback';
import setGlobalToken from '../components/utils/setGlobalToken';

//load user to check if token is available,
//since token is stateless when reload is clear from the header, set up global header to store token
export const loadUser = () => async dispatch => {
  //call global token
  if (localStorage.token) {
    setGlobalToken(localStorage.token);
  }
  try {
    const response = await axios.get(`${ENDPOINT}api/user/auth/`);
    console.log(response.data);
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
    const res = await axios.post(`${ENDPOINT}api/user/login`, body, config);
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
    console.log(err.message);
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logOut = history => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOG_OUT });
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
      `${ENDPOINT}api/user/register`,
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
    const response = await axios.get(`${ENDPOINT}api/admin/user_accounts`);
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
    const response = await axios.get(`${ENDPOINT}api/admin/student/accounts`);
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
      await axios.delete(`${ENDPOINT}api/admin/remove/${user_id}`);
      dispatch(adminGetUser());
    } catch (err) {
      if (err) throw err;
    }
  }
};

export const getUserAuth = () => async dispatch => {
  try {
    const response = await axios.get(`${ENDPOINT}api/user/auth/me`);
    dispatch({
      type: GET_USER_AUTH,
      payload: response.data
    });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_ERROR,
  LOG_OUT,
  CLEAR_PROFILE,
  ALL_STUDENT_ACCOUNTS,
  ADMIN_CREATE_USER,
  CREATE_USER_ERROR,
  ADMIN_GET_USER_ACCOUNT,
  GET_USER_AUTH
} from '../actions/types';

const initialState = {
  loading: true,
  role: '',
  isAuth: false,
  token: localStorage.getItem('token'),
  userData: null,
  userLists: [],
  getUserAuth: null,
  getUserData: null,
  allStudentSelectField: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        isAuth: true,
        loading: false,
        role: payload.role,
        id: payload._id,
        name: payload.name,
        email: payload.email,
        avatar: payload.avatar
      };
    case ADMIN_CREATE_USER:
      return {
        ...state,
        success: payload.success
      };
    case GET_USER_AUTH:
      return {
        ...state,
        getUserData: payload,
        loading: false
      };
    case ADMIN_GET_USER_ACCOUNT:
      return { ...state, userLists: payload, loading: false };
    case ALL_STUDENT_ACCOUNTS:
      return { ...state, allStudentSelectField: payload, loading: false };
    case CREATE_USER_ERROR:
      return { ...state, success: false };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false,
        role: payload.role,
        userData: payload
      };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
        loading: false,
        token: null,
        role: '',
        userData: null,
        getUserAuth: null
      };
    default:
      return state;
  }
};

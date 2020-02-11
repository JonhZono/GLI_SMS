import {
  GET_POSTS,
  POST_ERROR,
  REMOVE_POST,
  CREATE_POST,
  GET_POST_BY_ID,
  EDIT_POST,
  CLEAR_EDIT_POST_FORM,
  CLEAR_VIEW_POST,
  UPDATE_LIKE,
  GET_LIKES,
  UPDATE_SNS,
  GET_SNS
} from '../actions/types';

const initialState = {
  posts: [],
  postById: null,
  loading: true,
  error: {},
  getLikes: [],
  getSns: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload, loading: false };
    case GET_POST_BY_ID:
      return {
        ...state,
        postById: payload,
        loading: false
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case EDIT_POST:
      return {
        ...state,
        adminEditPost: payload,
        loading: false
      };
    case CLEAR_EDIT_POST_FORM:
      return {
        ...state,
        postById: null,
        loading: false
      };

    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case GET_LIKES:
      return {
        ...state,
        getLikes: payload,
        loading: false
      };

    case UPDATE_SNS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId ? { ...post, sns: payload.sns } : post
        ),
        loading: false
      };
    case GET_SNS:
      return {
        ...state,
        getSns: payload,
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_VIEW_POST:
      return {
        ...state,
        postById: null,
        posts: [],
        getSns: [],
        getLikes: [],
        loading: false
      };
    default:
      return state;
  }
};

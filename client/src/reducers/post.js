import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  REMOVE_POST,
  CREATE_POST,
  GET_POST_BY_ID,
  EDIT_POST,
  CLEAR_EDIT_POST_FORM
} from '../actions/types';

const initialState = {
  posts: [],
  postById: null,
  loading: true,
  error: {}
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
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.post_id
            ? { ...post, likes: payload.likes }
            : post
        ),
        loading: false
      };
    default:
      return state;
  }
};

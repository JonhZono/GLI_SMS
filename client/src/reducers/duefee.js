import {
  ADMIN_CREATE_DUE_FEE,
  INDIVIDUAL_FEE_LISTS,
  ADMIN_GET_FEE_LISTS
} from '../actions/types';

const initialState = {
  adminCreateFee: null,
  individualFeeLists: [],
  adminGetFeeLists: [],
  loading: true
};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_CREATE_DUE_FEE:
      return { ...state, adminCreateFee: payload };
    case INDIVIDUAL_FEE_LISTS:
      return { ...state, individualFeeLists: payload, loading: false };
    case ADMIN_GET_FEE_LISTS:
      return {
        ...state,
        adminGetFeeLists: payload,
        loading: true
      };
    default:
      return state;
  }
};

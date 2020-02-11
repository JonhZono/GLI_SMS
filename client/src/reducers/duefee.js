import {
  ADMIN_CREATE_DUE_FEE,
  INDIVIDUAL_FEE_LISTS,
  ADMIN_GET_FEE_LISTS,
  ADMIN_EDIT_FEE_BY_ID,
  CLEAR_DUE_FEE
} from '../actions/types';

const initialState = {
  adminCreateFee: null,
  individualFeeLists: null,
  adminGetFeeLists: [],
  adminEditFee: [],
  loading: true
};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_CREATE_DUE_FEE:
      return { ...state, adminCreateFee: payload };
    case INDIVIDUAL_FEE_LISTS:
      return { ...state, individualFeeLists: payload, loading: false };
    case ADMIN_EDIT_FEE_BY_ID:
      return {
        ...state,
        adminEditFee: payload,
        loading: false
      };
    case ADMIN_GET_FEE_LISTS:
      return {
        ...state,
        adminGetFeeLists: payload,
        loading: true
      };
    case CLEAR_DUE_FEE:
      return {
        ...state,
        loading: true,
        adminGetFeeLists: [],
        individualFeeLists: null,
        adminCreateFee: null
      };
    default:
      return state;
  }
};

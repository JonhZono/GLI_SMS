import axios from 'axios';
import {
  ADMIN_CREATE_DUE_FEE,
  INDIVIDUAL_FEE_LISTS,
  ADMIN_GET_FEE_LISTS,
  ADMIN_EDIT_FEE_BY_ID,
  CLEAR_DUE_FEE
} from './types';
import { setAlert } from '../actions/alert';

export const adminCreateDueFee = dataToSubmit => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(
      `/api/duefee/create`,
      dataToSubmit,
      config
    );
    dispatch({
      type: ADMIN_CREATE_DUE_FEE,
      payload: response.data
    });
    dispatch(setAlert('Message send successfully', 'success'));
    dispatch(adminGetDueFeeLists());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const adminGetFeeById = fee_id => async dispatch => {
  try {
    const response = await axios.get(`/api/duefee/by_id/${fee_id}`);

    dispatch({
      type: INDIVIDUAL_FEE_LISTS,
      payload: response.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const adminGetDueFeeLists = () => async dispatch => {
  try {
    const response = await axios.get(`/api/duefee/all`);

    dispatch({
      type: ADMIN_GET_FEE_LISTS,
      payload: response.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const adminRemoveDueFeeLists = (fee_id, history) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      await axios.delete(`/api/duefee/remove/${fee_id}`);

      dispatch(adminGetDueFeeLists());
      history.push('/admin/view/duefee/lists');
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  }
};

export const adminEditFeeById = (
  fee_id,
  dataToSubmit,
  history
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.put(
      `/api/duefee/by_id/${fee_id}`,
      dataToSubmit,
      config
    );
    dispatch({
      type: ADMIN_EDIT_FEE_BY_ID,
      payload: response.data
    });
    dispatch(adminGetDueFeeLists());
    dispatch(setAlert(response.msg, 'success'));
    history.push('/admin/view/duefee/lists');
  } catch (error) {
    if (error) throw error;
  }
};

export const clearFee = () => dispatch => {
  dispatch({
    type: CLEAR_DUE_FEE
  });
};

import axios from 'axios';
import {
  ADMIN_CREATE_DUE_FEE,
  INDIVIDUAL_FEE_LISTS,
  ADMIN_GET_FEE_LISTS
} from './types';
import { ENDPOINT } from '../components/utils/misc';
import { setAlert } from '../actions/alert';

export const adminCreateDueFee = dataToSubmit => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(
      `${ENDPOINT}api/duefee/create`,
      dataToSubmit,
      config
    );
    console.log(response.data);
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

export const studentDueFeeLists = fee_id => async dispatch => {
  try {
    const response = await axios.get(
      `${ENDPOINT}api/student/duefee/all/${fee_id}`
    );

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
    const response = await axios.get(`${ENDPOINT}api/duefee/all`);
    console.log(response.data);
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

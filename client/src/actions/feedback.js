import axios from 'axios';
import { ENDPOINT } from '../components/utils/misc';
import {
  STUDENT_INDIVIDUAL_FEEDBACK_REPORT,
  ADMIN_GET_OVERALL_FEEDBACK,
  GET_STUDENT_REPORT_BY_ID,
  CLEAR_VIEW_EACH_FEEDBACK,
  ADMIN_DASHBOARD_FEEDBACK,
  STUDENT_DASHBOARD_FEEDBACK
} from './types';
import { setAlert } from '../actions/alert';

export const createStudentFeedback = dataToSubmit => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await axios.post(
      `${ENDPOINT}api/classfeedback/create`,
      dataToSubmit,
      config
    );

    dispatch(adminGetOverallReport());
    dispatch(setAlert('Feedback Create Successful', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const editStudentFeedback = (
  report_id,
  dataToSubmit
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.put(
      `${ENDPOINT}api/classfeedback/class/${report_id}`,
      dataToSubmit,
      config
    );

    dispatch(adminGetOverallReport());
    dispatch(setAlert(response.data.msg, 'success'));
    //history.push('/student/feedbacks/history')
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const getIndividualStudentReportById = report_id => async dispatch => {
  const response = await axios.get(
    `${ENDPOINT}api/student/classfeedback/all/${report_id}`
  );

  try {
    dispatch({
      type: STUDENT_INDIVIDUAL_FEEDBACK_REPORT,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};
//admin get overall report
export const adminGetOverallReport = () => async dispatch => {
  const response = await axios.get(`${ENDPOINT}api/classfeedback/classes`);

  try {
    dispatch({
      type: ADMIN_GET_OVERALL_FEEDBACK,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};
export const getStudentReportById = report_id => async dispatch => {
  const response = await axios.get(
    `${ENDPOINT}api/classfeedback/class/${report_id}`
  );
  console.log(response.data);
  try {
    dispatch({
      type: GET_STUDENT_REPORT_BY_ID,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};

export const deleteStudentReportById = (
  report_id,
  history
) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      await axios.delete(`${ENDPOINT}api/classfeedback/class/${report_id}`);
      dispatch(adminGetOverallReport());
      history.push('/user/feedbacks/history');
    } catch (error) {
      if (error) throw error;
    }
  }
};
//admin and staff
export const adminDashboardFeedback = () => dispatch => {
  return axios
    .get(`${ENDPOINT}api/classfeedback/dashboard/classes`)
    .then(response => {
      dispatch({
        type: ADMIN_DASHBOARD_FEEDBACK,
        payload: response.data.articles
      });
    });
};
//student only
export const studentDashboardFeedbackById = () => dispatch => {
  return axios
    .get(`${ENDPOINT}api/student/dashboard/classes`)
    .then(response => {
      dispatch({
        type: STUDENT_DASHBOARD_FEEDBACK,
        payload: response.data.articles
      });
    });
};

export const clearViewEachFeedback = () => dispatch => {
  dispatch({
    type: CLEAR_VIEW_EACH_FEEDBACK
  });
};

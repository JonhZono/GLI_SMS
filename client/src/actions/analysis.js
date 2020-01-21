import axios from 'axios';
import { ENDPOINT } from '../components/utils/misc';
import {
  CLEAR_VIEW_STATISTICS,
  ADMIN_GET_OVERALL_PERFORMANCES,
  GET_PERFORMANCE_BY_ID,
  ADMIN_EDIT_PERFORMANCE_BY_ID,
  CLEAR_STATISTICS,
  STUDENT_INDIVIDUAL_DAILY_ANALYSIS,
  GET_STUDENT_PERFORMANCE_ME,
  ADMIN_GET_STUDENT_PERFORMANCE,
  GET_ANALYSIS_BY_STUDENT_ID
} from './types';
import { setAlert } from '../actions/alert';

export const createStudentPerformance = (
  dataToSubmit
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(
      `${ENDPOINT}api/analyze/create`,
      dataToSubmit,
      config
    );
    dispatch(adminGetStatistics());
    dispatch(setAlert(response.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const getIndividualStudentDailyAnalysisById = performance_id => async dispatch => {
  const response = await axios.get(
    `${ENDPOINT}api/student/performance/all/${performance_id}`
  );

  try {
    dispatch({
      type: STUDENT_INDIVIDUAL_DAILY_ANALYSIS,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};
//Everyone get individual daily analysis to show in viewEachFeedback 
export const getAnalysisByStudentID = student_id => async dispatch => {
  const response = await axios.get(
    `${ENDPOINT}api/student/performance/all/${student_id}`
  );

  try {
    dispatch({
      type: GET_ANALYSIS_BY_STUDENT_ID,
      payload: response.data[0]
    });
  } catch (error) {
    if (error) throw error;
  }
};
export const getStudentDailyAnalysisById = performance_id => async dispatch => {
  const response = await axios.get(
    `${ENDPOINT}api/student/performance/all/${performance_id}`
  );
  console.log(response.data);
  console.log('Here');
  try {
    dispatch({
      type: 'STUDENT_INDIVIDUAL_DAILY_BY_OWN_ID',
      payload: response.data[0]
    });
  } catch (error) {
    if (error) throw error;
  }
};
//admin get overall report
export const adminGetStatistics = () => async dispatch => {
  try {
    const response = await axios.get(`${ENDPOINT}api/analyze/performances`);
    console.log(response);
    dispatch({
      type: ADMIN_GET_OVERALL_PERFORMANCES,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};

export const adminDeleteStatistic = (
  performance_id,
  history
) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `${ENDPOINT}api/analyze/performance/${performance_id}`
      );
      dispatch(adminGetStatistics());
      dispatch(setAlert(response.msg, 'success'));
      history.push('/user/analysis');
    } catch (error) {
      if (error) throw error;
    }
  }
};

export const getStatisticById = performance_id => dispatch => {
  return axios
    .get(`${ENDPOINT}api/analyze/performance/${performance_id}`)
    .then(response => {
      dispatch({
        type: GET_PERFORMANCE_BY_ID,
        payload: response.data
      });
    })
    .catch(err => {
      if (err) throw err;
    });
};

//student dashboard analysis data
export const getStudentPerformanceMe = () => dispatch => {
  return axios
    .get(`${ENDPOINT}api/student/get/performance/me`)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: GET_STUDENT_PERFORMANCE_ME,
        payload: response.data
      });
    })

    .catch(err => {
      console.log(err.response.data);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    });
};

//admin dashboard analysis data
export const adminGetStudentPerformance = () => dispatch => {
  return axios
    .get(`${ENDPOINT}api/analyze/get/dashboard/performance`)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: ADMIN_GET_STUDENT_PERFORMANCE,
        payload: response.data
      });
    })

    .catch(err => {
      console.log(err.response.data);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    });
};

//staff dashboard analysis data
export const staffGetStudentPerformance = () => dispatch => {
  return axios
    .get(`${ENDPOINT}api/analyze/get/dashboard/staff/performance`)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: 'STAFF_GET_STUDENT_PERFORMANCE',
        payload: response.data
      });
    })

    .catch(err => {
      console.log(err.response.data);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    });
};

export const adminEditStatisticById = (
  performance_id,
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
      `${ENDPOINT}api/analyze/performance/${performance_id}`,
      dataToSubmit,
      config
    );
    dispatch({
      type: ADMIN_EDIT_PERFORMANCE_BY_ID,
      payload: response.data
    });
    dispatch(setAlert(response.msg, 'success'));
    history.push('/user/analysis');
  } catch (error) {
    if (error) throw error;
  }
};

export const clearStatistic = () => dispatch => {
  dispatch({
    type: CLEAR_STATISTICS
  });
};

export const clearViewPerformance = () => dispatch => {
  dispatch({
    type: CLEAR_VIEW_STATISTICS
  });
};

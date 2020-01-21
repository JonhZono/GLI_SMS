import axios from 'axios';
import { ENDPOINT } from '../components/utils/misc';
import {
  ADMIN_GET_OVERALL_EXAM_SCORE,
  STUDENT_INDIVIDUAL_EXAM_SCORE,
  GET_EXAM_SCORE_BY_ID,
  ADMIN_EDIT_EXAM_SCORE_BY_ID,
  GET_EXAM_SCORE_BY_STUDENT_ID,
  ADMIN_DASHBOARD_EXAM,
  CLEAR_LIST_EXAM_SCORE,
  CLEAR_VIEW_EXAM_SCORE,
  STUDENT_DASHBOARD_EXAM
} from './types';
import { setAlert } from '../actions/alert';

export const createStudentExam = dataToSubmit => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(
      `${ENDPOINT}api/exam/score/create`,
      dataToSubmit,
      config
    );
    dispatch(adminGetExam());
    dispatch(setAlert(response.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const getIndividualStudentExamById = exam_id => async dispatch => {
  const response = await axios.get(
    `${ENDPOINT}api/student/exam/score/all/${exam_id}`
  );

  try {
    dispatch({
      type: STUDENT_INDIVIDUAL_EXAM_SCORE,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};
//Everyone get individual exam score to show in viewEachFeedback
export const getExamScoreByStudentID = student_id => async dispatch => {
  const response = await axios.get(
    `${ENDPOINT}api/student/exam/score/all/${student_id}`
  );
  console.log(response.data[0]);
  try {
    dispatch({
      type: GET_EXAM_SCORE_BY_STUDENT_ID,
      payload: response.data[0]
    });
  } catch (error) {
    if (error) throw error;
  }
};
//admin get overall exam score
export const adminGetExam = () => async dispatch => {
  try {
    const response = await axios.get(`${ENDPOINT}api/exam/scores`);
    dispatch({
      type: ADMIN_GET_OVERALL_EXAM_SCORE,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};

export const adminDeleteExam = (exam_id, history) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `${ENDPOINT}api/exam/score/${exam_id}`
      );
      dispatch(adminGetExam());
      dispatch(setAlert(response.msg, 'success'));
      history.push('/user/exam/scores');
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  }
};

export const getExamById = exam_id => dispatch => {
  return axios
    .get(`${ENDPOINT}api/exam/score/${exam_id}`)
    .then(response => {
      dispatch({
        type: GET_EXAM_SCORE_BY_ID,
        payload: response.data
      });
    })
    .catch(err => {
      if (err) throw err;
    });
};

export const adminEditExamById = (
  exam_id,
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
      `${ENDPOINT}api/exam/score/${exam_id}`,
      dataToSubmit,
      config
    );
    dispatch({
      type: ADMIN_EDIT_EXAM_SCORE_BY_ID,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
    history.push('/user/exam/scores');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const adminDashboardExam = () => dispatch => {
  return axios.get(`${ENDPOINT}api/exam/dashboard/all`).then(response => {
    dispatch({
      type: ADMIN_DASHBOARD_EXAM,
      payload: response.data.articles
    });
  });
};

//student only
export const studentDashboardExamById = () => dispatch => {
  return axios
    .get(`${ENDPOINT}api/student/dashboard/exam/scores`)
    .then(response => {
      dispatch({
        type: STUDENT_DASHBOARD_EXAM,
        payload: response.data.articles
      });
    });
};

export const clearExam = () => dispatch => {
  dispatch({
    type: CLEAR_LIST_EXAM_SCORE
  });
};

export const clearViewExam = () => dispatch => {
  dispatch({
    type: CLEAR_VIEW_EXAM_SCORE
  });
};

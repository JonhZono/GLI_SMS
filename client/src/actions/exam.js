import axios from 'axios';
import {
  ADMIN_GET_OVERALL_EXAM_SCORE,
  STUDENT_INDIVIDUAL_EXAM_SCORE,
  GET_EXAM_SCORE_BY_ID,
  ADMIN_EDIT_EXAM_SCORE_BY_ID,
  GET_EXAM_SCORE_BY_STUDENT_ID,
  ADMIN_DASHBOARD_EXAM,
  CLEAR_LIST_EXAM_SCORE,
  CLEAR_VIEW_EXAM_SCORE,
  STUDENT_DASHBOARD_EXAM,
  GET_EIKEN_EXAM_SCORE_BY_ID,
  ADMIN_EDIT_EIKEN_EXAM_SCORE_BY_ID,
  ADMIN_GET_OVERALL_EIKEN_EXAM_SCORE,
  ADMIN_GET_OVERALL_JUNIOR_EIKEN_EXAM_SCORE,
  GET_JUNIOR_EIKEN_EXAM_SCORE_BY_ID,
  ADMIN_EDIT_JUNIOR_EIKEN_EXAM_SCORE_BY_ID,
  STUDENT_INDIVIDUAL_EIKEN_EXAM_SCORE,
  STUDENT_INDIVIDUAL_JUNIOR_EIKEN_EXAM_SCORE,
  GET_EIKEN_EXAM_SCORE_BY_STUDENT_ID,
  GET_JUNIOR_EIKEN_EXAM_SCORE_BY_STUDENT_ID
} from './types';
import { setAlert } from '../actions/alert';

//GLI exam score
export const createStudentExam = dataToSubmit => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(
      `/api/exam/score/create`,
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
//eiken exam score
export const createEikenExam = dataToSubmit => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(
      `/api/eiken_exam/score/create`,
      dataToSubmit,
      config
    );
    dispatch(adminGetEikenExam());
    dispatch(setAlert(response.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};
//junior eiken exam score
export const createJuniorEikenExam = dataToSubmit => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post(
      `/api/junior_eiken_exam/score/create`,
      dataToSubmit,
      config
    );
    dispatch(adminGetJuniorEikenExam());
    dispatch(setAlert(response.data.msg, 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

//GLI Exam
export const getIndividualStudentExamById = exam_id => async dispatch => {
  const response = await axios.get(`/api/student/exam/score/all/${exam_id}`);

  try {
    dispatch({
      type: STUDENT_INDIVIDUAL_EXAM_SCORE,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};
//Eiken Exam
export const getIndividualStudentEikenExamById = exam_id => async dispatch => {
  const response = await axios.get(`/api/student/eiken_exam/score/all/${exam_id}`);

  try {
    dispatch({
      type: STUDENT_INDIVIDUAL_EIKEN_EXAM_SCORE,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};
//Junior Eiken Exam
export const getIndividualStudentJuniorEikenExamById = exam_id => async dispatch => {
  const response = await axios.get(`/api/student/junior_eiken_exam/score/all/${exam_id}`);

  try {
    dispatch({
      type: STUDENT_INDIVIDUAL_JUNIOR_EIKEN_EXAM_SCORE,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};
//Everyone get individual exam score to show in viewEachFeedback
export const getExamScoreByStudentID = student_id => async dispatch => {
  const response = await axios.get(`/api/student/exam/score/all/${student_id}`);
  try {
    dispatch({
      type: GET_EXAM_SCORE_BY_STUDENT_ID,
      payload: response.data[0]
    });
  } catch (error) {
    if (error) throw error;
  }
};
//Everyone get individual eiken exam score to show in viewEachFeedback
export const getEikenExamScoreByStudentID = student_id => async dispatch => {
  const response = await axios.get(`/api/student/eiken_exam/score/all/${student_id}`);
  try {
    dispatch({
      type: GET_EIKEN_EXAM_SCORE_BY_STUDENT_ID,
      payload: response.data[0]
    });
  } catch (error) {
    if (error) throw error;
  }
};
//Everyone get individual junior eiken exam score to show in viewEachFeedback
export const getJuniorEikenExamScoreByStudentID = student_id => async dispatch => {
  const response = await axios.get(`/api/student/junior_eiken_exam/score/all/${student_id}`);
  try {
    dispatch({
      type: GET_JUNIOR_EIKEN_EXAM_SCORE_BY_STUDENT_ID,
      payload: response.data[0]
    });
  } catch (error) {
    if (error) throw error;
  }
};
//admin get overall GLI exam score
export const adminGetExam = () => async dispatch => {
  try {
    const response = await axios.get(`/api/exam/scores`);
    dispatch({
      type: ADMIN_GET_OVERALL_EXAM_SCORE,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};
//admin get overall eiken exam score
export const adminGetEikenExam = () => async dispatch => {
  try {
    const response = await axios.get(`/api/eiken_exam/scores`);
    dispatch({
      type: ADMIN_GET_OVERALL_EIKEN_EXAM_SCORE,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};

//admin get overall junior eiken exam score
export const adminGetJuniorEikenExam = () => async dispatch => {
  try {
    const response = await axios.get(`/api/junior_eiken_exam/scores`);
    dispatch({
      type: ADMIN_GET_OVERALL_JUNIOR_EIKEN_EXAM_SCORE,
      payload: response.data
    });
  } catch (error) {
    if (error) throw error;
  }
};

//GLI delete exam score
export const adminDeleteExam = (exam_id, history) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(`/api/exam/score/${exam_id}`);
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
//delete eiken exam score
export const adminDeleteEikenExam = (exam_id, history) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(`/api/eiken_exam/score/${exam_id}`);
      dispatch(adminGetEikenExam());
      dispatch(setAlert(response.msg, 'success'));
      history.push('/user/eiken_exam/scores');
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  }
};

//delete junior eiken exam score
export const adminDeleteJuniorEikenExam = (
  exam_id,
  history
) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `/api/junior_eiken_exam/score/${exam_id}`
      );
      dispatch(adminGetJuniorEikenExam());
      dispatch(setAlert(response.msg, 'success'));
      history.push('/user/junior_eiken_exam/scores');
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  }
};

//GLI exam by id
export const getExamById = exam_id => dispatch => {
  return axios
    .get(`/api/exam/score/${exam_id}`)
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
//eiken exam by id
export const getEikenExamById = exam_id => dispatch => {
  return axios
    .get(`/api/eiken_exam/score/${exam_id}`)
    .then(response => {
      dispatch({
        type: GET_EIKEN_EXAM_SCORE_BY_ID,
        payload: response.data
      });
    })
    .catch(err => {
      if (err) throw err;
    });
};

//junior eiken exam by id
export const getJuniorEikenExamById = exam_id => dispatch => {
  return axios
    .get(`/api/junior_eiken_exam/score/${exam_id}`)
    .then(response => {
      dispatch({
        type: GET_JUNIOR_EIKEN_EXAM_SCORE_BY_ID,
        payload: response.data
      });
    })
    .catch(err => {
      if (err) throw err;
    });
};
//GLI admin edit exam score
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
      `/api/exam/score/${exam_id}`,
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
//admin edit eiken exam score
export const adminEditEikenExamById = (
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
      `/api/eiken_exam/score/${exam_id}`,
      dataToSubmit,
      config
    );
    dispatch({
      type: ADMIN_EDIT_EIKEN_EXAM_SCORE_BY_ID,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
    history.push('/user/eiken_exam/scores');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

//admin edit junior eiken exam score
export const adminEditJuniorEikenExamById = (
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
      `/api/junior_eiken_exam/score/${exam_id}`,
      dataToSubmit,
      config
    );
    dispatch({
      type: ADMIN_EDIT_JUNIOR_EIKEN_EXAM_SCORE_BY_ID,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
    history.push('/user/junior_eiken_exam/scores');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const adminDashboardExam = () => dispatch => {
  return axios.get(`/api/exam/dashboard/all`).then(response => {
    dispatch({
      type: ADMIN_DASHBOARD_EXAM,
      payload: response.data.articles
    });
  });
};

//student only
export const studentDashboardExamById = () => dispatch => {
  return axios.get(`/api/student/dashboard/exam/scores`).then(response => {
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

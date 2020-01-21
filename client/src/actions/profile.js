import axios from 'axios';
import { ENDPOINT } from '../components/utils/misc';
import {
  GET_TEACHER,
  GET_GRADE,
  GET_STUDENT,
  GET_COURSE,
  GET_POSITION,
  CREATE_STUDENT_PROFILE,
  GET_CLASSROOM,
  GET_STUDENT_PROFILE_LISTS,
  GET_STUDENT_PROFILE_ID,
  CLEAR_PROFILE,
  PROFILE_ERROR,
  GET_STAFF_PROFILE_LISTS,
  GET_STAFF_PROFILE_ID,
  ADMIN_EDIT_STAFF_PROFILE,
  CREATE_CLASS,
  GET_CLASS_BY_ID,
  CLEAR_CONFIG_DATA,
  CREATE_GRADE,
  GET_GRADE_BY_ID,
  CREATE_COURSE,
  GET_COURSE_BY_ID,
  CREATE_STUDENT,
  GET_STUDENT_BY_ID,
  CREATE_TEACHER,
  GET_TEACHER_BY_ID,
  CREATE_POSITION,
  GET_POSITION_BY_ID,
  GET_CURRENT_STAFF_PROFILE,
  GET_CURRENT_ADMIN_PROFILE,
  GET_CURRENT_STUDENT_PROFILE,
  CLEAR_STUDENT_PROFILE
} from './types';
import { setAlert } from '../actions/alert';

//Admin get their current own profile route
export const getCurrentAdminProfile = () => async dispatch => {
  try {
    const response = await axios.get(`${ENDPOINT}api/admin/profile/me`);
    dispatch({
      type: GET_CURRENT_ADMIN_PROFILE,
      payload: response.data
    });
  } catch (err) {
    //catch profile err here
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Student get their current own profile route
export const getCurrentStudentProfile = () => async dispatch => {
  try {
    const response = await axios.get(`${ENDPOINT}api/student/profile/me`);

    dispatch({
      type: GET_CURRENT_STUDENT_PROFILE,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Staff get their current own profile route
export const getCurrentStaffProfile = () => async dispatch => {
  try {
    const response = await axios.get(`${ENDPOINT}api/staff/profile/me`);

    dispatch({
      type: GET_CURRENT_STAFF_PROFILE,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

export const clearProfileDetails = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE,
    payload: ''
  });
};

//admin edit student profile api
export const adminEditStudentProfileById = (
  profile_id,
  dataToSubmit
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.put(
      `${ENDPOINT}api/admin/edit/student/${profile_id}`,
      dataToSubmit,
      config
    );

    dispatch({
      type: 'ADMIN_EDIT_STUDENT_PROFILE',
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//admin edit staff profile api
export const adminEditStaffProfileById = (
  profile_id,
  dataToSubmit
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.put(
      `${ENDPOINT}api/admin/edit/staff/${profile_id}`,
      dataToSubmit,
      config
    );

    dispatch({
      type: ADMIN_EDIT_STAFF_PROFILE,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//admin delete student profile api
export const deleteStudentProfileById = (
  profile_id,
  history
) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `${ENDPOINT}api/admin/remove/student/${profile_id}`
      );
      dispatch(getStudentProfileLists());
      history.push('/user/student/profiles');
      dispatch(setAlert(response.data.msg, 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  }
};

//admin delete staff profile api
export const deleteStaffProfileById = (
  profile_id,
  history
) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      await axios.delete(`${ENDPOINT}api/admin/remove/staff/${profile_id}`);
      dispatch(getStaffProfileLists());
      history.push('/user/staff/profiles');
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  }
};

//We can use this action for student profile, for admin, no permission
export const createStudentProfile = (
  dataToSubmit,
  history,
  edit = false
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `${ENDPOINT}api/student/createprofile`,
      dataToSubmit,
      config
    );
    dispatch({
      type: CREATE_STUDENT_PROFILE,
      payload: response.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/user/student/profile');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

//create staff profile
export const createStaffProfile = (dataToSubmit, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `${ENDPOINT}api/staff/profile`,
      dataToSubmit,
      config
    );
    dispatch({
      type: CREATE_STUDENT_PROFILE,
      payload: response.data
    });
    dispatch(setAlert('Profile Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};

export const studentEditProfileById = (
  profile_id,
  dataToSubmit
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.put(
      `${ENDPOINT}api/student/edit/${profile_id}`,
      dataToSubmit,
      config
    );

    dispatch(getCurrentStudentProfile());
    dispatch(setAlert(response.data.msg, 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

export const studentDeleteProfileById = (
  profile_id,
  history
) => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `${ENDPOINT}api/student/remove/${profile_id}`
      );
      dispatch(getCurrentStudentProfile());
      history.push('/user/student/feedback/view');
      dispatch(clearStudentProfile());
      dispatch(setAlert(response.data.msg, 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        }
      });
    }
  }
};

export const clearStudentProfile = () => dispatch => {
  dispatch({
    type: CLEAR_STUDENT_PROFILE,
    payload: ''
  });
};

//admin
export const getStudentProfileById = profile_id => async dispatch => {
  try {
    const response = await axios.get(
      `${ENDPOINT}api/admin/get/student/profile/${profile_id}`
    );

    dispatch({
      type: GET_STUDENT_PROFILE_ID,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response, status: err.response }
    });
  }
};

export const getStudentProfileLists = () => async dispatch => {
  try {
    const response = await axios.get(
      `${ENDPOINT}api/admin/get/student/profiles`
    );

    dispatch({
      type: GET_STUDENT_PROFILE_LISTS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getStaffProfileById = profile_id => async dispatch => {
  try {
    const response = await axios.get(
      `${ENDPOINT}api/admin/get/staff/profile/${profile_id}`
    );

    dispatch({
      type: GET_STAFF_PROFILE_ID,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getStaffProfileLists = () => async dispatch => {
  try {
    const response = await axios.get(`${ENDPOINT}api/admin/get/staff/profiles`);

    dispatch({
      type: GET_STAFF_PROFILE_LISTS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getTeacher = () => dispatch => {
  return axios.get(`${ENDPOINT}api/lists/get/teachers`).then(response => {
    dispatch({
      type: GET_TEACHER,
      payload: response.data
    });
  });
};

export const addTeacher = dataToSubmit => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `${ENDPOINT}api/lists/add/teacher`,
      dataToSubmit,
      config
    );
    dispatch({
      type: CREATE_TEACHER,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
    dispatch(getTeacher());
    dispatch(clearConfigData());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};
export const getTeacherById = teacher_id => async dispatch => {
  try {
    const response = await axios.get(
      `${ENDPOINT}api/lists/get/teacher/${teacher_id}`
    );
    console.log(response.data);
    dispatch({
      type: GET_TEACHER_BY_ID,
      payload: response.data
    });
  } catch (err) {
    if (err) throw err;
  }
};
export const editTeacher = (
  teacher_id,
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
      `${ENDPOINT}api/lists/edit/teacher/${teacher_id}`,
      dataToSubmit,
      config
    );
    dispatch(getTeacher());
    dispatch(setAlert(response.data.msg, 'success'));
    history.push('/admin/config/data');
  } catch (err) {
    if (err) throw err;
  }
};

export const deleteTeacher = teacher_id => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `${ENDPOINT}api/lists/remove/teacher/${teacher_id}`
      );
      dispatch(getTeacher());
      dispatch(setAlert(response.data.msg, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  }
};

export const getStudent = () => dispatch => {
  return axios.get(`${ENDPOINT}api/lists/get/students`).then(response => {
    dispatch({
      type: GET_STUDENT,
      payload: response.data
    });
  });
};

export const addStudent = dataToSubmit => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `${ENDPOINT}api/lists/add/student`,
      dataToSubmit,
      config
    );
    dispatch({
      type: CREATE_STUDENT,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
    dispatch(getStudent());
    dispatch(clearConfigData());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};
export const getStudentById = student_id => async dispatch => {
  try {
    const response = await axios.get(
      `${ENDPOINT}api/lists/get/student/${student_id}`
    );
    dispatch({
      type: GET_STUDENT_BY_ID,
      payload: response.data
    });
  } catch (err) {
    if (err) throw err;
  }
};
export const editStudent = (
  student_id,
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
      `${ENDPOINT}api/lists/edit/student/${student_id}`,
      dataToSubmit,
      config
    );
    dispatch(getStudent());
    dispatch(setAlert(response.data.msg, 'success'));
    history.push('/admin/config/data');
  } catch (err) {
    if (err) throw err;
  }
};

export const deleteStudent = student_id => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `${ENDPOINT}api/lists/remove/student/${student_id}`
      );
      dispatch(getStudent());
      dispatch(setAlert(response.data.msg, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  }
};

export const getGrade = () => dispatch => {
  return axios.get(`${ENDPOINT}api/lists/get/grades`).then(response => {
    dispatch({
      type: GET_GRADE,
      payload: response.data
    });
  });
};

export const addGrade = dataToSubmit => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `${ENDPOINT}api/lists/add/grade`,
      dataToSubmit,
      config
    );
    dispatch({
      type: CREATE_GRADE,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
    dispatch(getGrade());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};
export const getGradeById = grade_id => async dispatch => {
  try {
    const response = await axios.get(
      `${ENDPOINT}api/lists/get/grade/${grade_id}`
    );
    console.log(response.data);
    dispatch({
      type: GET_GRADE_BY_ID,
      payload: response.data
    });
  } catch (err) {
    if (err) throw err;
  }
};
export const editGrade = (
  grade_id,
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
      `${ENDPOINT}api/lists/edit/grade/${grade_id}`,
      dataToSubmit,
      config
    );
    dispatch(getGrade());
    dispatch(setAlert(response.data.msg, 'success'));
    history.push('/admin/config/data');
  } catch (err) {
    if (err) throw err;
  }
};

export const deleteGrade = grade_id => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `${ENDPOINT}api/lists/remove/grade/${grade_id}`
      );
      dispatch(getGrade());
      dispatch(setAlert(response.data.msg, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  }
};

export const getCourse = () => dispatch => {
  return axios.get(`${ENDPOINT}api/lists/get/courses`).then(response => {
    dispatch({
      type: GET_COURSE,
      payload: response.data
    });
  });
};

export const addCourse = dataToSubmit => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `${ENDPOINT}api/lists/add/course`,
      dataToSubmit,
      config
    );
    dispatch({
      type: CREATE_COURSE,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
    dispatch(getCourse());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};
export const getCourseById = course_id => async dispatch => {
  try {
    const response = await axios.get(
      `${ENDPOINT}api/lists/get/course/${course_id}`
    );
    console.log(response.data);
    dispatch({
      type: GET_COURSE_BY_ID,
      payload: response.data
    });
  } catch (err) {
    if (err) throw err;
  }
};
export const editCourse = (
  course_id,
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
      `${ENDPOINT}api/lists/edit/course/${course_id}`,
      dataToSubmit,
      config
    );
    dispatch(getClassroom());
    dispatch(setAlert(response.data.msg, 'success'));
    history.push('/admin/config/data');
  } catch (err) {
    if (err) throw err;
  }
};

export const deleteCourse = course_id => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `${ENDPOINT}api/lists/remove/course/${course_id}`
      );
      dispatch(getCourse());
      dispatch(setAlert(response.data.msg, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  }
};

export const getClassroom = () => dispatch => {
  return axios.get(`${ENDPOINT}api/lists/get/classrooms`).then(response => {
    dispatch({
      type: GET_CLASSROOM,
      payload: response.data
    });
  });
};

export const addClassroom = dataToSubmit => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `${ENDPOINT}api/lists/add/classroom`,
      dataToSubmit,
      config
    );
    dispatch({
      type: CREATE_CLASS,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
    dispatch(getClassroom());
    dispatch(clearConfigData());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};
export const getClassById = classroom_id => async dispatch => {
  try {
    const response = await axios.get(
      `${ENDPOINT}api/lists/get/classroom/${classroom_id}`
    );
    console.log(response.data);
    dispatch({
      type: GET_CLASS_BY_ID,
      payload: response.data
    });
  } catch (err) {
    if (err) throw err;
  }
};
export const editClass = (
  classroom_id,
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
      `${ENDPOINT}api/lists/edit/classroom/${classroom_id}`,
      dataToSubmit,
      config
    );
    dispatch(getClassroom());
    dispatch(setAlert(response.data.msg, 'success'));
    history.push('/admin/config/data');
  } catch (err) {
    if (err) throw err;
  }
};

export const deleteClass = classroom_id => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `${ENDPOINT}api/lists/remove/classroom/${classroom_id}`
      );
      dispatch(getClassroom());
      dispatch(setAlert(response.data.msg, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  }
};

export const getPosition = () => dispatch => {
  return axios.get(`${ENDPOINT}api/lists/get/positions`).then(response => {
    dispatch({
      type: GET_POSITION,
      payload: response.data
    });
  });
};

export const addPosition = dataToSubmit => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await axios.post(
      `${ENDPOINT}api/lists/add/position`,
      dataToSubmit,
      config
    );
    dispatch({
      type: CREATE_POSITION,
      payload: response.data
    });
    dispatch(setAlert(response.data.msg, 'success'));
    dispatch(getPosition());
    dispatch(clearConfigData());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }
  }
};
export const getPositionById = position_id => async dispatch => {
  try {
    const response = await axios.get(
      `${ENDPOINT}api/lists/get/position/${position_id}`
    );
    console.log(response.data);
    dispatch({
      type: GET_POSITION_BY_ID,
      payload: response.data
    });
  } catch (err) {
    if (err) throw err;
  }
};
export const editPosition = (
  position_id,
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
      `${ENDPOINT}api/lists/edit/position/${position_id}`,
      dataToSubmit,
      config
    );
    dispatch(getPosition());
    dispatch(setAlert(response.data.msg, 'success'));
    history.push('/admin/config/data');
  } catch (err) {
    if (err) throw err;
  }
};

export const deletePosition = position_id => async dispatch => {
  if (window.confirm('Are you sure, this can be undone!')) {
    try {
      const response = await axios.delete(
        `${ENDPOINT}api/lists/remove/position/${position_id}`
      );
      dispatch(getPosition());
      dispatch(setAlert(response.data.msg, 'success'));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
      }
    }
  }
};

export const clearConfigData = () => dispatch => {
  dispatch({
    type: CLEAR_CONFIG_DATA,
    payload: ''
  });
};

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
  CREATE_POSITION,
  GET_POSITION_BY_ID,
  CREATE_TEACHER,
  GET_TEACHER_BY_ID,
  GET_CURRENT_STAFF_PROFILE,
  GET_CURRENT_ADMIN_PROFILE,
  GET_CURRENT_STUDENT_PROFILE,
  CLEAR_STUDENT_PROFILE,
  CLEAR_ADMIN_PROFILE,
  GET_ADMIN_PROFILE_ID
} from '../actions/types';

const initialState = {
  loading: true,
  error: {},
  listOfStudents: [],
  createStudent: [],
  staffList: [],
  classroomList: [],
  createClass: [],
  teacherList: [],
  gradeList: [],
  createGrade: [],
  createTeacher: [],
  courseList: [],
  createCourse: [],
  positionList: [],
  studentProfile: null,
  adminProfile: null,
  adminProfileById: null,
  staffProfile: null,
  studentProfileById: null,
  staffProfileById: null,
  getClassroomById: null,
  getGradeById: null,
  getCourseById: null,
  getStudentById: null,
  getTeacherById: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_STUDENT_PROFILE:
      return {
        ...state,
        createStudentProfile: payload,
        loading: false
      };
    case 'ADMIN_EDIT_STUDENT_PROFILE':
      return {
        ...state,
        adminEditStudent: payload,
        loading: false
      };
    case ADMIN_EDIT_STAFF_PROFILE:
      return {
        ...state,
        adminEditStaff: payload,
        loading: false
      };
    case GET_CURRENT_ADMIN_PROFILE:
      return {
        ...state,
        adminProfile: payload
      };
    case GET_ADMIN_PROFILE_ID:
      return {
        ...state,
        adminProfileById: payload,
        loading: false
      };
    case GET_CURRENT_STUDENT_PROFILE:
      return {
        ...state,
        studentProfile: payload
      };
    case CLEAR_STUDENT_PROFILE:
      return {
        ...state,
        studentProfile: null,
        loading: true
      };
    case CLEAR_ADMIN_PROFILE:
      return {
        ...state,
        adminProfile: null,
        loading: true
      };

    case GET_CURRENT_STAFF_PROFILE:
      return {
        ...state,
        staffProfile: payload
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case GET_STUDENT_PROFILE_LISTS:
      return {
        ...state,
        studentList: payload,
        loading: false
      };
    case GET_STAFF_PROFILE_LISTS:
      return {
        ...state,
        staffList: payload,
        loading: false
      };

    case GET_STUDENT_PROFILE_ID:
      return {
        ...state,
        studentProfileById: payload,
        loading: false
      };
    case GET_STAFF_PROFILE_ID:
      return {
        ...state,
        staffProfileById: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        studentList: [],
        staffList: [],
        loading: true,
        studentProfileById: null,
        staffProfileById: null,
        adminProfileById: null,
        adminProfile: null,
        staffProfile: null,
        studentProfile: null
      };
    case GET_CLASSROOM:
      return {
        ...state,
        classroomList: payload,
        loading: false
      };
    case CREATE_CLASS:
      return {
        ...state,
        createClass: payload,
        loading: false
      };
    case GET_CLASS_BY_ID:
      return {
        ...state,
        getClassroomById: payload,
        loading: false
      };

    case GET_TEACHER:
      return {
        ...state,
        teacherList: payload,
        loading: false
      };
    case CREATE_TEACHER:
      return {
        ...state,
        createTeacher: payload,
        loading: false
      };
    case GET_TEACHER_BY_ID:
      return {
        ...state,
        getTeacherById: payload,
        loading: false
      };
    case GET_GRADE:
      return {
        ...state,
        gradeList: payload,
        loading: false
      };
    case CREATE_GRADE:
      return {
        ...state,
        createGrade: payload,
        loading: false
      };
    case GET_GRADE_BY_ID:
      return {
        ...state,
        getGradeById: payload,
        loading: false
      };
    case GET_STUDENT:
      return {
        ...state,
        listOfStudents: payload,
        loading: false
      };
    case CREATE_STUDENT:
      return {
        ...state,
        createStudent: payload,
        loading: false
      };
    case GET_STUDENT_BY_ID:
      return {
        ...state,
        getStudentById: payload,
        loading: false
      };
    case GET_COURSE:
      return {
        ...state,
        courseList: payload,
        loading: false
      };
    case CREATE_COURSE:
      return {
        ...state,
        createCourse: payload,
        loading: false
      };
    case GET_COURSE_BY_ID:
      return {
        ...state,
        getCourseById: payload,
        loading: false
      };

    case GET_POSITION:
      return {
        ...state,
        positionList: payload,
        loading: false
      };
    case CREATE_POSITION:
      return {
        ...state,
        createPosition: payload,
        loading: false
      };
    case GET_POSITION_BY_ID:
      return {
        ...state,
        getPositionById: payload,
        loading: false
      };

    case CLEAR_CONFIG_DATA:
      return {
        ...state,
        getClassroomById: null,
        getGradeById: null,
        getCourseById: null,
        getStudentById: null,
        getTeacherById: null,
        getPositionById: null,
        createClass: [],
        createCourse: [],
        createGrade: [],
        createStudent: [],
        createTeacher: [],
        createPosition: [],
        teacherList: [],
        gradeList: [],
        listOfStudents: [],
        classroomList: [],
        positionList: [],
        courseList: [],
        loading: true
      };

    default:
      return state;
  }
};

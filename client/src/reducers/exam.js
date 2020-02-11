import {
  ADMIN_GET_OVERALL_EXAM_SCORE,
  GET_EXAM_SCORE_BY_ID,
  ADMIN_EDIT_EXAM_SCORE_BY_ID,
  STUDENT_INDIVIDUAL_EXAM_SCORE,
  GET_EXAM_SCORE_BY_STUDENT_ID,
  CLEAR_LIST_EXAM_SCORE,
  CLEAR_VIEW_EXAM_SCORE,
  ADMIN_DASHBOARD_EXAM,
  STUDENT_DASHBOARD_EXAM
} from '../actions/types';

const initialState = {
  examLists: [],
  examByOwnerId: [],
  getExamById: null,
  adminEditExamById: null,
  everyoneStudentExamByID: null,
  adminGetDashboardExam: [],
  studentGetExamArticleById: [],
  loading: true
};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_GET_OVERALL_EXAM_SCORE:
      return { ...state, examLists: payload, loading: false };
    case GET_EXAM_SCORE_BY_ID:
      return { ...state, getExamById: payload, loading: false };
    case STUDENT_INDIVIDUAL_EXAM_SCORE:
      return {
        ...state,
        examByOwnerId: payload
      };
    case GET_EXAM_SCORE_BY_STUDENT_ID:
      return {
        ...state,
        everyoneStudentExamByID: payload,
        loading: false
      };
    case STUDENT_DASHBOARD_EXAM:
      return {
        ...state,
        studentGetExamArticleById: payload,
        loading: false
      };
    case ADMIN_EDIT_EXAM_SCORE_BY_ID:
      return {
        ...state,
        adminEditExamById: payload,
        loading: false,
        success: payload.success
      };
    case ADMIN_DASHBOARD_EXAM:
      return {
        ...state,
        adminGetDashboardExam: payload,
        loading: false
      };
    case CLEAR_LIST_EXAM_SCORE:
      return {
        ...state,
        examLists: [],
        examByOwnerId: [],
        adminEditExamById: null,
        adminGetDashboardExam: [],
        studentGetExamArticleById: [],
        loading: true
      };
    case CLEAR_VIEW_EXAM_SCORE:
      return {
        ...state,
        getExamById: null,
        loading: true
      };
    default:
      return state;
  }
};

import {
  ADMIN_GET_OVERALL_EXAM_SCORE,
  GET_EXAM_SCORE_BY_ID,
  ADMIN_EDIT_EXAM_SCORE_BY_ID,
  STUDENT_INDIVIDUAL_EXAM_SCORE,
  GET_EXAM_SCORE_BY_STUDENT_ID,
  CLEAR_LIST_EXAM_SCORE,
  CLEAR_VIEW_EXAM_SCORE,
  ADMIN_DASHBOARD_EXAM,
  STUDENT_DASHBOARD_EXAM,
  ADMIN_GET_OVERALL_EIKEN_EXAM_SCORE,
  GET_EIKEN_EXAM_SCORE_BY_ID,
  ADMIN_EDIT_EIKEN_EXAM_SCORE_BY_ID,
  ADMIN_GET_OVERALL_JUNIOR_EIKEN_EXAM_SCORE,
  GET_JUNIOR_EIKEN_EXAM_SCORE_BY_ID,
  ADMIN_EDIT_JUNIOR_EIKEN_EXAM_SCORE_BY_ID,
  STUDENT_INDIVIDUAL_EIKEN_EXAM_SCORE,
  STUDENT_INDIVIDUAL_JUNIOR_EIKEN_EXAM_SCORE,
  GET_EIKEN_EXAM_SCORE_BY_STUDENT_ID,
  GET_JUNIOR_EIKEN_EXAM_SCORE_BY_STUDENT_ID
} from '../actions/types';

const initialState = {
  examLists: [],
  eikenExamLists: [],
  juniorEikenExamLists: [],
  examByOwnerId: [],
  eikenExamByOwnerId: [],
  juniorEikenExamByOwnerId: [],
  getExamById: null,
  getEikenExamById: null,
  getJuniorEikenExamById: null,
  adminEditExamById: null,
  adminEditEikenExamById: null,
  adminEditJuniorEikenExamById: null,
  everyoneStudentExamByID: null,
  everyoneEikenStudentExamByID: null,
  everyoneJuniorEikenStudentExamByID: null,
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
    case ADMIN_GET_OVERALL_EIKEN_EXAM_SCORE:
      return { ...state, eikenExamLists: payload, loading: false };
    case ADMIN_GET_OVERALL_JUNIOR_EIKEN_EXAM_SCORE:
      return { ...state, juniorEikenExamLists: payload, loading: false };
    case GET_EIKEN_EXAM_SCORE_BY_ID:
      return { ...state, getEikenExamById: payload, loading: false };
    case GET_JUNIOR_EIKEN_EXAM_SCORE_BY_ID:
      return { ...state, getJuniorEikenExamById: payload, loading: false };
    case STUDENT_INDIVIDUAL_EXAM_SCORE:
      return {
        ...state,
        examByOwnerId: payload
      };
    case STUDENT_INDIVIDUAL_EIKEN_EXAM_SCORE:
      return {
        ...state,
        eikenExamByOwnerId: payload
      };
    case STUDENT_INDIVIDUAL_JUNIOR_EIKEN_EXAM_SCORE:
      return {
        ...state,
        juniorEikenExamByOwnerId: payload
      };
    case GET_EXAM_SCORE_BY_STUDENT_ID:
      return {
        ...state,
        everyoneStudentExamByID: payload,
        loading: false
      };
    case GET_EIKEN_EXAM_SCORE_BY_STUDENT_ID:
      return {
        ...state,
        everyoneEikenStudentExamByID: payload,
        loading: false
      };
    case GET_JUNIOR_EIKEN_EXAM_SCORE_BY_STUDENT_ID:
      return {
        ...state,
        everyoneJuniorEikenStudentExamByID: payload,
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
    case ADMIN_EDIT_EIKEN_EXAM_SCORE_BY_ID:
      return {
        ...state,
        adminEditEikenExamById: payload,
        loading: false,
        success: payload.success
      };
    case ADMIN_EDIT_JUNIOR_EIKEN_EXAM_SCORE_BY_ID:
      return {
        ...state,
        adminEditJuniorEikenExamById: payload,
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
        eikenExamLists: [],
        juniorEikenExamLists: [],
        examByOwnerId: [],
        eikenExamByOwnerId: [],
        juniorEikenExamByOwnerId: [],
        adminEditExamById: null,
        adminEditEikenExamById: null,
        adminEditJuniorEikenExamById: null,
        adminGetDashboardExam: [],
        studentGetExamArticleById: [],
        loading: true
      };
    case CLEAR_VIEW_EXAM_SCORE:
      return {
        ...state,
        getExamById: null,
        getEikenExamById: null,
        getJuniorEikenExamById: null,
        everyoneStudentExamByID: null,
        everyoneEikenStudentExamByID: null,
        everyoneJuniorEikenStudentExamByID: null,
        loading: true
      };
    default:
      return state;
  }
};

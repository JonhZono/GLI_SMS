import {
  STUDENT_INDIVIDUAL_FEEDBACK_REPORT,
  ADMIN_GET_OVERALL_FEEDBACK,
  GET_STUDENT_REPORT_BY_ID,
  CLEAR_VIEW_EACH_FEEDBACK,
  ADMIN_DASHBOARD_FEEDBACK,
  STUDENT_DASHBOARD_FEEDBACK
} from '../actions/types';

const initialState = {
  loading: true,
  studentFeedback: null,
  feedbackLists: [],
  individualFeedbackLists: [],
  getStudentReportById: null,
  adminGetOverallReport: [],
  adminGetFeedbackArticles: [],
  studentGetFeedbackArticleById: []
};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case STUDENT_INDIVIDUAL_FEEDBACK_REPORT:
      return {
        ...state,
        individualFeedbackLists: payload,
        loading: false
      };
    case ADMIN_GET_OVERALL_FEEDBACK:
      return { ...state, adminGetOverallReport: payload, loading: false };
    case GET_STUDENT_REPORT_BY_ID:
      return { ...state, getStudentReportById: payload, loading: false };
    case ADMIN_DASHBOARD_FEEDBACK:
      return {
        ...state,
        adminGetFeedbackArticles: payload,
        loading: false
      };
    case STUDENT_DASHBOARD_FEEDBACK:
      return {
        ...state,
        studentGetFeedbackArticleById: payload,
        loading: false
      };
    case CLEAR_VIEW_EACH_FEEDBACK:
      return {
        ...state,
        getStudentReportById: null,
        adminGetOverallReport: [],
        adminGetFeedbackArticles: [],
        studentGetFeedbackArticleById: [],
        loading: true
      };
    default:
      return state;
  }
};

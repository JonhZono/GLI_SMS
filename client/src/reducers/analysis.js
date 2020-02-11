import {
  ADMIN_GET_OVERALL_PERFORMANCES,
  GET_PERFORMANCE_BY_ID,
  ADMIN_EDIT_PERFORMANCE_BY_ID,
  CLEAR_STATISTICS,
  CLEAR_VIEW_STATISTICS,
  STUDENT_INDIVIDUAL_DAILY_ANALYSIS,
  GET_STUDENT_PERFORMANCE_ME,
  ADMIN_GET_STUDENT_PERFORMANCE,
  GET_ANALYSIS_BY_STUDENT_ID
} from '../actions/types';

const initialState = {
  performanceLists: [],
  getPerformanceById: null,
  adminEditPerformanceById: null,
  individualDailyAnalysisLists: [],
  myStudentPerformance: null,
  studentDailyByOwnId: null,
  everyoneStudentAnalysisByID: null,
  adminGetStudentPerformance: null,
  loading: true
};
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_GET_OVERALL_PERFORMANCES:
      return { ...state, performanceLists: payload, loading: false };
    case GET_PERFORMANCE_BY_ID:
      return { ...state, getPerformanceById: payload, loading: false };
    case ADMIN_EDIT_PERFORMANCE_BY_ID:
      return {
        ...state,
        adminEditPerformanceById: payload,
        loading: false,
        success: payload.success
      };
    case GET_STUDENT_PERFORMANCE_ME:
      return {
        ...state,
        myStudentPerformance: payload,
        loading: false
      };
    case ADMIN_GET_STUDENT_PERFORMANCE:
      return {
        ...state,
        adminGetStudentPerformance: payload,
        loading: false
      };
    case 'STAFF_GET_STUDENT_PERFORMANCE':
      return {
        ...state,
        staffGetStudentPerformance: payload,
        loading: false
      };
    case STUDENT_INDIVIDUAL_DAILY_ANALYSIS:
      return {
        ...state,
        individualDailyAnalysisLists: payload,
        loading: false
      };
    case 'STUDENT_INDIVIDUAL_DAILY_BY_OWN_ID':
      return {
        ...state,
        studentDailyByOwnId: payload,
        loading: false
      };
    case GET_ANALYSIS_BY_STUDENT_ID:
      return {
        ...state,
        everyoneStudentAnalysisByID: payload,
        loading: false
      };
    case CLEAR_STATISTICS:
      return {
        ...state,
        performanceLists: [],
        adminEditPerformanceById: null,
        individualDailyAnalysisLists: [],
        loading: true
      };
    case CLEAR_VIEW_STATISTICS:
      return {
        ...state,
        getPerformanceById: null,
        //myStudentPerformance: null,
        adminGetStudentPerformance: null,
        //we need to clear the state after the user logout
        loading: true
      };
    default:
      return state;
  }
};

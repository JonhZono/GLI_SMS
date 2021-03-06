export const SHOW_ALERT = 'SHOW_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOAD_USER = 'LOAD_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOG_OUT = 'LOG_OUT';
export const GET_TEACHER = 'GET_TEACHER';
export const GET_STUDENT = 'GET_STUDENT';
export const GET_GRADE = 'GET_GRADE';
export const GET_COURSE = 'GET_COURSE';
export const CREATE_STUDENT_PROFILE = 'CREATE_STUDENT_PROFILE';
export const GET_CLASSROOM = 'GET_CLASSROOM';
export const GET_STUDENT_PROFILE_LISTS = 'GET_STUDENT_PROFILE_LISTS';
export const GET_STUDENT_PROFILE_ID = 'GET_STUDENT_PROFILE_ID';
export const EDIT_STUDENT_PROFILE_ID = 'EDIT_STUDENT_PROFILE_ID';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const PROFILE_ERROR = 'PROFILE-ERROR';
export const GET_STAFF_PROFILE_LISTS = 'GET_STAFF_PROFILE_LISTS';
export const GET_STAFF_PROFILE_ID = 'GET_STAFF_PROFILE_ID';
export const GET_POSITION = 'GET_POSITION';
export const ADMIN_EDIT_STAFF_PROFILE = 'ADMIN_EDIT_STAFF_PROFILE';
export const ADMIN_CREATE_USER = 'ADMIN_CREATE_USER';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';
export const ADMIN_GET_USER_ACCOUNT = 'ADMIN_GET_USER_ACCOUNT';
export const GET_POSTS = 'GET_POSTS';
export const UPDATE_LIKE = 'UPDATE_LIKE';
export const UPDATE_SNS = 'UPDATE_SNS';
export const POST_ERROR = 'POST_ERROR';
export const REMOVE_POST = 'REMOVE_POST';
export const CREATE_POST = 'CREATE_POST';
export const GET_LIKES = 'GET_LIKES';
export const GET_SNS = 'GET_SNS';
export const GET_POST_BY_ID = 'GET_POST_BY_ID';
export const CLEAR_VIEW_POST = 'CLEAR_VIEW_POST';
export const EDIT_POST = 'EDIT_POST';
export const CLEAR_EDIT_POST_FORM = 'CLEAR_EDIT_POST_FORM';
export const CREATE_CLASS = 'CREATE_CLASS';
export const GET_CLASS_BY_ID = 'GET_CLASS_BY_ID';
export const CREATE_GRADE = 'CREATE_GRADE';
export const GET_GRADE_BY_ID = 'GET_GRADE_BY_ID';
export const CLEAR_CONFIG_DATA = 'CLEAR_CONFIG_DATA';
export const CREATE_COURSE = 'CREATE_COURSE';
export const GET_COURSE_BY_ID = 'GET_COURSE_BY_ID';
export const CREATE_STUDENT = 'CREATE_STUDENT';
export const GET_STUDENT_BY_ID = 'GET_STUDENT_BY_ID';
export const CREATE_TEACHER = 'CREATE_TEACHER';
export const GET_TEACHER_BY_ID = 'GET_TEACHER_BY_ID';
export const CREATE_POSITION = 'CREATE_POSITION';
export const GET_POSITION_BY_ID = 'GET_POSITION_BY_ID';
export const ADMIN_GET_OVERALL_FEEDBACK = 'ADMIN_GET_OVERALL_FEEDBACK';
export const GET_STUDENT_REPORT_BY_ID = 'GET_STUDENT_REPORT_BY_ID';

export const GET_CURRENT_STAFF_PROFILE = 'GET_CURRENT_STAFF_PROFILE';
export const GET_CURRENT_ADMIN_PROFILE = 'GET_CURRENT_ADMIN_PROFILE';
export const GET_ADMIN_PROFILE_ID = 'GET_ADMIN_PROFILE_ID';
export const GET_CURRENT_STUDENT_PROFILE = 'GET_CURRENT_STUDENT_PROFILE';
export const CLEAR_STUDENT_PROFILE = 'CLEAR_STUDENT_PROFILE';
export const CLEAR_ADMIN_PROFILE = 'CLEAR_ADMIN_PROFILE';
/**Student only access */
export const STUDENT_INDIVIDUAL_FEEDBACK_REPORT =
  'STUDENT_INDIVIDUAL_FEEDBACK_REPORT';
export const GET_USER_AUTH = 'GET_USER_AUTH';
export const CLEAR_USER_LIST = 'CLEAR_USER_LIST';

export const ADMIN_GET_OVERALL_PERFORMANCES = 'ADMIN_GET_OVERALL_PERFORMANCES';
export const GET_PERFORMANCE_BY_ID = 'GET_PERFORMANCE_BY_ID';
export const ADMIN_EDIT_PERFORMANCE_BY_ID = 'ADMIN_EDIT_PERFORMANCE_BY_ID';
export const CLEAR_STATISTICS = 'CLEAR_STATISTICS';
export const CLEAR_VIEW_STATISTICS = 'CLEAR_VIEW_STATISTICS';

//GLI Exam Type
export const ADMIN_GET_OVERALL_EXAM_SCORE = 'ADMIN_GET_OVERALL_EXAM_SCORE';
export const GET_EXAM_SCORE_BY_ID = 'GET_EXAM_SCORE_BY_ID';
export const ADMIN_EDIT_EXAM_SCORE_BY_ID = 'ADMIN_EDIT_EXAM_SCORE_BY_ID';
export const CLEAR_LIST_EXAM_SCORE = 'CLEAR_LIST_EXAM_SCORE';
export const CLEAR_VIEW_EXAM_SCORE = 'CLEAR_VIEW_EXAM_SCORE';
export const CLEAR_VIEW_EACH_FEEDBACK = 'CLEAR_VIEW_EACH_FEEDBACK';

//Eiken Exam
export const GET_EIKEN_EXAM_SCORE_BY_ID = 'GET_EIKEN_EXAM_SCORE_BY_ID';
export const ADMIN_EDIT_EIKEN_EXAM_SCORE_BY_ID =
  'ADMIN_EDIT_EIKEN_EXAM_SCORE_BY_ID';
export const ADMIN_GET_OVERALL_EIKEN_EXAM_SCORE =
  'ADMIN_GET_OVERALL_EIKEN_EXAM_SCORE';
export const STUDENT_INDIVIDUAL_EIKEN_EXAM_SCORE =
  'STUDENT_INDIVIDUAL_EIKEN_EXAM_SCORE';
export const GET_EIKEN_EXAM_SCORE_BY_STUDENT_ID =
  'GET_EIKEN_EXAM_SCORE_BY_STUDENT_ID';

//Junior Eiken
export const ADMIN_GET_OVERALL_JUNIOR_EIKEN_EXAM_SCORE =
  'ADMIN_GET_OVERALL_JUNIOR_EIKEN_EXAM_SCORE';
export const GET_JUNIOR_EIKEN_EXAM_SCORE_BY_ID =
  'GET_JUNIOR_EIKEN_EXAM_SCORE_BY_ID';
export const ADMIN_EDIT_JUNIOR_EIKEN_EXAM_SCORE_BY_ID =
  'ADMIN_EDIT_JUNIOR_EIKEN_EXAM_SCORE_BY_ID';
export const STUDENT_INDIVIDUAL_JUNIOR_EIKEN_EXAM_SCORE =
  'STUDENT_INDIVIDUAL_JUNIOR_EIKEN_EXAM_SCORE';
export const GET_JUNIOR_EIKEN_EXAM_SCORE_BY_STUDENT_ID =
  'GET_JUNIOR_EIKEN_EXAM_SCORE_BY_STUDENT_ID';

/**Student Daily Analysis */
export const STUDENT_INDIVIDUAL_DAILY_ANALYSIS =
  'STUDENT_INDIVIDUAL_DAILY_ANALYSIS';
/**Student Exam Score */
export const STUDENT_INDIVIDUAL_EXAM_SCORE = 'STUDENT_INDIVIDUAL_EXAM_SCORE';
/**Student Dashboard Analysis */
export const GET_STUDENT_PERFORMANCE_ME = 'GET_STUDENT_PERFORMANCE_ME';
/**Admin Dashboard Analysis */
export const ADMIN_GET_STUDENT_PERFORMANCE = 'ADMIN_GET_STUDENT_PERFORMANCE';
/**Admin Create Due Fee */
export const ADMIN_CREATE_DUE_FEE = 'ADMIN_CREATE_DUE_FEE';
/**Everyone view daily analysis & exam score in viewEachFeedbackDetails */
export const GET_ANALYSIS_BY_STUDENT_ID = 'GET_ANALYSIS_BY_STUDENT_ID';
export const GET_EXAM_SCORE_BY_STUDENT_ID = 'GET_EXAM_SCORE_BY_STUDENT_ID';
export const INDIVIDUAL_FEE_LISTS = 'INDIVIDUAL_FEE_LISTS';

export const ALL_STUDENT_ACCOUNTS = 'ALL_STUDENT_ACCOUNTS';
export const ADMIN_DASHBOARD_FEEDBACK = 'ADMIN_DASHBOARD_FEEDBACK';
export const ADMIN_DASHBOARD_EXAM = 'ADMIN_DASHBOARD_EXAM';
export const STUDENT_DASHBOARD_FEEDBACK = 'STUDENT_DASHBOARD_FEEDBACK';
export const STUDENT_DASHBOARD_EXAM = 'STUDENT_DASHBOARD_EXAM';

/**Fee */
export const ADMIN_EDIT_FEE_BY_ID = 'ADMIN_EDIT_FEE_BY_ID';
export const ADMIN_GET_FEE_LISTS = 'ADMIN_GET_FEE_LISTS';
export const CLEAR_DUE_FEE = 'CLEAR_DUE_FEE';

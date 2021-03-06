import React, { useEffect } from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Layout from './hoc/Layout';
import Login from './components/home/Login';
import UserDashboard from './components/dashboard/UserDashboard';
import StudentProfile from './components/dashboard/student/StudentProfile';
import EditStudentProfile from './components/dashboard/student/EditStudentProfile';
import ViewStudent from './components/dashboard/student/ViewStudent';

//student profile
import CreateStudentProfile from './components/dashboard/user/studentProfile/CreateProfile';
import CheckStudentProfile from './components/dashboard/user/studentProfile/Index';
import EditProfileInfo from './components/dashboard/user/studentProfile/EditProfileInfo';

//Staff Profile
import CheckStaffProfile from './components/dashboard/user/staffProfile/Index';
import CreateStaffProfile from './components/dashboard/user/staffProfile/CreateProfileStaff';

//Admin Profile
import CheckAdminProfile from './components/dashboard/admin/Index';
import CreateAdminProfile from './components/dashboard/admin/CreateProfileAdmin';
import EditAdminProfile from './components/dashboard/admin/EditProfileAdmin';

import ViewStaff from './components/dashboard/humanResource/ViewStaffProfile';
import StaffProfiles from './components/dashboard/humanResource/StaffProfiles';
import EditStaffProfile from './components/dashboard/humanResource/EditStaffProfile';

import StudentFeedbacksHistory from './components/dashboard/feedback/StudentFeedbackHistory';
import EditFeedback from './components/dashboard/feedback/EditFeedback';
import GenerateUser from './components/dashboard/generateUser/GenerateUser';

import NewsLetterForm from './components/dashboard/newsLetter/NewsLetterForm';
import Posts from './components/dashboard/newsLetter/Posts';
import EditNewsLetter from './components/dashboard/newsLetter/EditNewsLetter';
import ViewPost from './components/dashboard/newsLetter/ViewPost';

import Configuration from './components/dashboard/configuration/Configuration';
import EditClassPopUp from './components/dashboard/configuration/classroom/EditClassPopUp';
import EditGradePopUp from './components/dashboard/configuration/grade/EditGradePopUp';
import EditCoursePopUp from './components/dashboard/configuration/course/EditCoursePopUp';
import EditStudentPopUp from './components/dashboard/configuration/student/EditStudentPopUp';
import EditTeacherPopUp from './components/dashboard/configuration/teacher/EditTeacherPopUp';

/**Student Feedback */
import Feedback from './components/dashboard/user/feedbackReport/Feedback';
import ViewFeedback from './components/dashboard/user/feedbackReport/ViewFeedback';
import ViewEachStudentFeedback from './components/dashboard/feedback/ViewEachFeedback';

/**Everyone View student daily analysis from viewEachFeedbackDetails*/
import IndexDailyAnalysisInViewEachFeedbackDetails from './components/dashboard/feedback/analysisGraph/IndexGraph';
import IndexExamScoreInViewEachFeedbackDetails from './components/dashboard/feedback/examGraph/IndexGraph';
import IndexEikenExamScoreInViewEachFeedbackDetails from './components/dashboard/feedback/eikenExamGraph/IndexGraph';
import IndexJuniorEikenExamScoreInViewEachFeedbackDetails from './components/dashboard/feedback/juniorEikenExamGraph/IndexGraph';

/**Student My Report Module */
import MyReport from './components/dashboard/user/myReport/MyReport';
import ViewDailyAnalysis from './components/dashboard/user/myReport/dailyAnalysis/ViewDailyAnalysis';
import IndexDailyAnalysisChart from './components/dashboard/user/myReport/dailyAnalysis/chart/Index';

/**admin analyze module */
import AnalyzeLists from './components/dashboard/analyze/AnalyzeLists';
import EditAnalyzeIndex from './components/dashboard/analyze/EditAnalyzeIndex';
import IndexAnalyzeChart from './components/dashboard/analyze/chart/Index';

//GLI exam route
import ExamLists from './components/dashboard/exam/ExamLists';
import EditExamIndex from './components/dashboard/exam/EditExamIndex';
import IndexExamChart from './components/dashboard/exam/chart/Index';

//Eiken exam route
import EikenExamLists from './components/dashboard/eikenExam/EikenExamLists';
import EditEikenExamIndex from './components/dashboard/eikenExam/EditExamIndex';
import IndexEikenExamChart from './components/dashboard/eikenExam/chart/Index';
import ViewListsEikenExamScoreByStudentID from './components/dashboard/user/myReport/studentEikenExamScore/ViewEikenExamScore';
import StudentViewEikenExamByID from './components/dashboard/user/myReport/studentEikenExamScore/chart/Index';

//Junior Eiken exam route
import JuniorEikenExamLists from './components/dashboard/juniorEikenExam/JuniorEikenExamLists';
import EditJuniorEikenExamIndex from './components/dashboard/juniorEikenExam/EditExamIndex';
import IndexJuniorEikenExamChart from './components/dashboard/juniorEikenExam/chart/Index';
import ViewListsJuniorEikenExamScoreByStudentID from './components/dashboard/user/myReport/studentJuniorEikenExamScore/ViewJuniorEikenExamScore';
import StudentViewJuniorEikenExamByID from './components/dashboard/user/myReport/studentJuniorEikenExamScore/chart/Index';

/**Student Exam Score Module */
import ViewExamScore from './components/dashboard/user/myReport/studentScore/ViewExamScore';
import IndexExamScoreChart from './components/dashboard/user/myReport/studentScore/chart/Index';
/**Admin Create Monthly Due Fee */
import AdminViewDueFee from './components/dashboard/dueFee/StudentFee';
import AdminEditDueFee from './components/dashboard/dueFee/IndexFee';
import AdminViewDueFeeById from './components/dashboard/dueFee/ViewEachFee';

import NotFound from './hoc/NotFound';

import { loadUser } from './actions/user';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './hoc/PrivateRoute';
import setGlobalToken from './components/utils/setGlobalToken';

//call global token
if (localStorage.token) {
  setGlobalToken(localStorage.token);
}

const Routes = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    console.log('always load first...');
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <PrivateRoute
              exact
              path='/user/student/profiles'
              component={StudentProfile}
            />
            <PrivateRoute
              exact
              path='/user/student/profile/:profile_id'
              component={ViewStudent}
            />
            <PrivateRoute
              exact
              path='/user/student/profile/edit/:profile_id'
              component={EditStudentProfile}
            />
            <PrivateRoute
              exact
              path='/user/staff/profile/:profile_id'
              component={ViewStaff}
            />
            <PrivateRoute
              exact
              path='/user/student/create/profile'
              component={CreateStudentProfile}
            />
            <PrivateRoute
              exact
              path='/user/student/profile'
              component={CheckStudentProfile}
            />
            <PrivateRoute
              exact
              path='/user/student/edit/:profile_id'
              component={EditProfileInfo}
            />
            {/**Staff profile */}
            <PrivateRoute
              exact
              path='/user/staff/profile'
              component={CheckStaffProfile}
            />
            <PrivateRoute
              exact
              path='/user/staff/create/profile'
              component={CreateStaffProfile}
            />
            {/**Admin profile */}
            <PrivateRoute
              exact
              path='/user/admin/profile'
              component={CheckAdminProfile}
            />
            <PrivateRoute
              exact
              path='/user/admin/create/profile'
              component={CreateAdminProfile}
            />
            <PrivateRoute
              exact
              path='/user/admin/profile/edit/:profile_id'
              component={EditAdminProfile}
            />

            {/**List of teacher profiles */}
            <PrivateRoute
              exact
              path='/user/staff/profiles'
              component={StaffProfiles}
            />
            <PrivateRoute
              exact
              path='/user/staff/profile/edit/:profile_id'
              component={EditStaffProfile}
            />

            <PrivateRoute
              exact
              path='/user/feedbacks/history'
              component={StudentFeedbacksHistory}
            />
            <PrivateRoute
              exact
              path='/user/student/feedback/edit/:report_id'
              component={EditFeedback}
            />
            <PrivateRoute
              exact
              path='/admin/create/newsletter'
              component={NewsLetterForm}
            />
            <PrivateRoute
              exact
              path='/admin/edit/post/:post_id'
              component={EditNewsLetter}
            />
            <PrivateRoute
              exact
              path='/user/view/newsletter'
              component={Posts}
            />
            <PrivateRoute
              exact
              path='/user/view/news/post/:post_id'
              component={ViewPost}
            />

            <PrivateRoute
              exact
              path='/admin/generate/user'
              component={GenerateUser}
            />

            <PrivateRoute
              exact
              path='/admin/config/data'
              component={Configuration}
            />

            <PrivateRoute
              exact
              path='/admin/edit/class/:class_id'
              component={EditClassPopUp}
            />
            <PrivateRoute
              exact
              path='/admin/edit/grade/:grade_id'
              component={EditGradePopUp}
            />
            <PrivateRoute
              exact
              path='/admin/edit/course/:course_id'
              component={EditCoursePopUp}
            />
            <PrivateRoute
              exact
              path='/admin/edit/student/:student_id'
              component={EditStudentPopUp}
            />
            <PrivateRoute
              exact
              path='/admin/edit/teacher/:teacher_id'
              component={EditTeacherPopUp}
            />

            {/**Student Access Only*/}

            <PrivateRoute
              exact
              path='/user/student/feedback/view'
              component={Feedback}
            />
            <PrivateRoute
              exact
              path='/user/student/view/report/:report_id'
              component={ViewFeedback}
            />
            {/**Available to all user*/}

            <PrivateRoute
              exact
              path='/user/student/feedback/view/:report_id'
              component={ViewEachStudentFeedback}
            />
            {/**Admin Access Only Analysis Module*/}
            <PrivateRoute
              exact
              path='/user/analysis'
              component={AnalyzeLists}
            />

            <PrivateRoute
              exact
              path='/user/analysis/edit/:performance_id'
              component={EditAnalyzeIndex}
            />
            <PrivateRoute
              exact
              path='/user/analysis/view/:performance_id'
              component={IndexAnalyzeChart}
            />
            {/**Everyone View student daily analysis & exam score from viewEachFeedbackDetails*/}
            <PrivateRoute
              exact
              path='/user/analysis/everyone/view/:student_id'
              component={IndexDailyAnalysisInViewEachFeedbackDetails}
            />
            <PrivateRoute
              exact
              path='/user/exam/score/everyone/view/:student_id'
              component={IndexExamScoreInViewEachFeedbackDetails}
            />
            <PrivateRoute
              exact
              path='/user/eiken_exam/score/everyone/view/:student_id'
              component={IndexEikenExamScoreInViewEachFeedbackDetails}
            />
            <PrivateRoute
              exact
              path='/user/junior_eiken_exam/score/everyone/view/:student_id'
              component={IndexJuniorEikenExamScoreInViewEachFeedbackDetails}
            />

            {/**Admin Access Only Exam Module*/}
            <PrivateRoute
              exact
              path='/user/exam/scores'
              component={ExamLists}
            />

            <PrivateRoute
              exact
              path='/user/exam/score/edit/:exam_id'
              component={EditExamIndex}
            />
            <PrivateRoute
              exact
              path='/user/exam/score/view/:exam_id'
              component={IndexExamChart}
            />
            {/**Admin Access Only Eiken Exam Module*/}
            <PrivateRoute
              exact
              path='/user/eiken_exam/scores'
              component={EikenExamLists}
            />

            <PrivateRoute
              exact
              path='/user/eiken_exam/score/edit/:exam_id'
              component={EditEikenExamIndex}
            />
            <PrivateRoute
              exact
              path='/user/eiken_exam/score/view/:exam_id'
              component={IndexEikenExamChart}
            />
            <PrivateRoute
              exact
              path='/user/eiken_exam/score/view/:exam_id'
              component={IndexEikenExamChart}
            />
            <PrivateRoute
              exact
              path='/user/student/eiken_exam/score/view/lists/:exam_id'
              component={ViewListsEikenExamScoreByStudentID}
            />
            <PrivateRoute
              exact
              path='/user/student/eiken_exam/score/view/:exam_id'
              component={StudentViewEikenExamByID}
            />

            {/**Admin Access Only Junior Eiken Exam Module*/}
            <PrivateRoute
              exact
              path='/user/junior_eiken_exam/scores'
              component={JuniorEikenExamLists}
            />

            <PrivateRoute
              exact
              path='/user/junior_eiken_exam/score/edit/:exam_id'
              component={EditJuniorEikenExamIndex}
            />
            <PrivateRoute
              exact
              path='/user/junior_eiken_exam/score/view/:exam_id'
              component={IndexJuniorEikenExamChart}
            />
            <PrivateRoute
              exact
              path='/user/student/junior_eiken_exam/score/view/lists/:exam_id'
              component={ViewListsJuniorEikenExamScoreByStudentID}
            />
            <PrivateRoute
              exact
              path='/user/student/junior_eiken_exam/score/view/:exam_id'
              component={StudentViewJuniorEikenExamByID}
            />

            {/**Student MyReport module */}
            <PrivateRoute
              exact
              path='/user/student/report'
              component={MyReport}
            />
            <PrivateRoute
              exact
              path='/user/student/daily/analysis/view/lists/:performance_id'
              component={ViewDailyAnalysis}
            />
            <PrivateRoute
              exact
              path='/user/student/performance/view/:performance_id'
              component={IndexDailyAnalysisChart}
            />
            <PrivateRoute
              exact
              path='/user/student/exam/score/view/lists/:exam_id'
              component={ViewExamScore}
            />
            <PrivateRoute
              exact
              path='/user/student/exam/score/view/:exam_id'
              component={IndexExamScoreChart}
            />
            {/**Admin Due Fee Module */}

            <PrivateRoute
              exact
              path='/admin/edit/due/fee/:fee_id'
              component={AdminEditDueFee}
            />
            <PrivateRoute
              exact
              path='/admin/view/duefee/lists'
              component={AdminViewDueFee}
            />
            <PrivateRoute
              exact
              path='/admin/view/due/fee/:fee_id'
              component={AdminViewDueFeeById}
            />
            {/**Student View Lists Due Fee Module */}
            <PrivateRoute
              exact
              path='/user/dashboard'
              component={UserDashboard}
            />

            <Route exact path='/' component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default Routes;

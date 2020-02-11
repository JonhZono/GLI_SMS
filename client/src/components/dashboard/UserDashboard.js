import React, { useEffect } from 'react';
import UserLayout from '../../hoc/User';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCurrentAdminProfile,
  getCurrentStudentProfile,
  getCurrentStaffProfile,
  getCourse,
  getTeacher
} from '../../actions/profile';
import { getUserAuth, adminGetUser } from '../../actions/user';
import {
  staffGetStudentPerformance,
  adminGetStudentPerformance,
  getStudentPerformanceMe
} from '../../actions/analysis';
import {
  adminDashboardFeedback,
  studentDashboardFeedbackById
} from '../../actions/feedback';
import {
  adminDashboardExam,
  studentDashboardExamById
} from '../../actions/exam';
import { getAllPosts } from '../../actions/post';
import NewsLists from '../dashboard/dashboadData/dispalyNews/NewsLists';
import Spinner from '../spinner/Spinner';
import ChartStaff from './dashboadData/staffGraph/Chart';
import ChartAdmin from './dashboadData/adminGraph/Chart';
import ChartStudent from './dashboadData/studentGraph/Chart';
import FeedbackLists from './dashboadData/recentFeedback/FeedbackLists';
import ExamLists from './dashboadData/examScore/ExamLists';
import StudentFeedbackLists from './dashboadData/studentRecentFeedback/StudentFeedbackLists';
import StudentExamScoreLists from './dashboadData/studentRecentExamScore/StudentExamScoreLists';

//add all the dashboard component and do validation base on user role & action CRUDs
const UserDashboard = props => {
  useEffect(() => {
    props.getCurrentStudentProfile();
    props.getCurrentAdminProfile();
    props.getCurrentStaffProfile();
    props.getAllPosts();
    props.adminGetUser();
    props.getCourse();
    props.getTeacher();
    props.getUserAuth();
    props.staffGetStudentPerformance();
    props.adminGetStudentPerformance();
    props.getStudentPerformanceMe();
    props.adminDashboardFeedback();
    props.adminDashboardExam();
    props.studentDashboardFeedbackById();
    props.studentDashboardExamById();
  }, [
    getCurrentStudentProfile,
    getCurrentAdminProfile,
    getCurrentStaffProfile,
    getAllPosts,
    adminGetUser,
    getCourse,
    getTeacher,
    getUserAuth,
    staffGetStudentPerformance,
    adminGetStudentPerformance,
    getStudentPerformanceMe,
    adminDashboardFeedback,
    adminDashboardExam,
    studentDashboardFeedbackById,
    studentDashboardExamById
  ]);

  const studentCount = props.user.userLists.filter(
    count => count.role === 'student'
  );

  const teacherCount = props.profile.teacherList.length;
  const courseCount = props.profile.courseList.length;
  const eventCount = props.post.posts.length;

  return props.profile.loading &&
    props.feedback.loading &&
    props.profile.studentProfile === null &&
    props.user === null &&
    props.analysis.staffGetStudentPerformance === null &&
    props.analysis.adminGetStudentPerformance === null &&
    props.feedback.adminGetFeedbackArticles === null &&
    props.feedback.studentGetFeedbackArticleById === null &&
    props.exam.studentGetExamArticleById === null ? (
    <UserLayout>
      <div
        className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'
        style={{
          background: '#fcfcfc',
          padding: 30,
          marginTop: 40
        }}
      >
        <Spinner />
      </div>
    </UserLayout>
  ) : (
    <UserLayout>
      <div
        className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'
        style={{
          background: '#fcfcfc',
          padding: 30,
          marginTop: 40
        }}
      >
        <div className='py-1'>
          {props.user.role === 'admin' ? (
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem',
                color: '#7a7a7a'
              }}
              className='has-text-weight-bold'
            >
              Admin Dashboard, Welcome back {props.user.name}&nbsp;
              <span>🤔</span>
            </h1>
          ) : props.user.role === 'student' ? (
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem',
                color: '#7a7a7a'
              }}
              className='has-text-weight-bold'
            >
              Welcome Back {props.user.name}&nbsp;<span>😃</span>
            </h1>
          ) : props.user.role === 'staff' ? (
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem',
                color: '#7a7a7a'
              }}
              className='has-text-weight-bold'
            >
              Welcome Back {props.user.name}&nbsp;<span>😃</span>
            </h1>
          ) : (
            ''
          )}
          <div className='columns'>
            {(props.user.role === 'admin' || props.user.role === 'staff') && (
              <div className='column'>
                <div
                  className='card has-text-centered'
                  style={{ fontSize: '20px' }}
                >
                  <Link to='/user/view/newsletter'>
                    <div className='card-content has-background-danger has-text-light'>
                      <div className='content'>
                        <i className='fas fa-newspaper fa-lg' /> &nbsp;
                        <span>{eventCount}</span>
                        <span style={{ padding: '40px' }}>
                          <i>Events</i>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {(props.user.role === 'admin' || props.user.role === 'staff') && (
              <div className='column'>
                <div
                  className='card has-text-centered'
                  style={{ fontSize: '20px' }}
                >
                  <Link to='/'>
                    <div className='card-content has-background-primary has-text-light'>
                      <i className='fab fa-discourse fa-lg' />
                      &nbsp;{courseCount}
                      <span style={{ padding: '40px' }}>
                        <i>Courses</i>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {(props.user.role === 'admin' || props.user.role === 'staff') && (
              <div className='column'>
                <div
                  className='card has-text-centered'
                  style={{ fontSize: '20px' }}
                >
                  <Link to='/user/student/profiles'>
                    <div className='card-content has-background-success has-text-light'>
                      <i className='fas fa-users fa-lg' />
                      &nbsp; <span>{studentCount.length}</span>
                      <span style={{ padding: '40px' }}>
                        <i>Students</i>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {(props.user.role === 'admin' || props.user.role === 'staff') && (
              <div className='column'>
                <div
                  className='card has-text-centered'
                  style={{ fontSize: '20px' }}
                >
                  <Link to='/user/staff/profiles'>
                    <div className='card-content has-background-link has-text-light'>
                      <i className='fas fa-chalkboard-teacher fa-lg' />
                      &nbsp;<span>{teacherCount}</span>
                      <span style={{ padding: '40px' }}>
                        <i>Teachers</i>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {props.user.role === 'student' && (
              <div className='column'>
                <div
                  className='card has-text-centered'
                  style={{ fontSize: '20px' }}
                >
                  <Link to='/user/staff/profiles'>
                    <div className='card-content has-background-danger has-text-light'>
                      <i className='fas fa-chalkboard-teacher fa-lg' />
                      &nbsp;<span>{teacherCount}</span>
                      <span style={{ padding: '40px' }}>
                        <i>Teachers</i>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {props.user.role === 'student' && (
              <div className='column'>
                <div
                  className='card has-text-centered'
                  style={{ fontSize: '20px' }}
                >
                  <Link to='/'>
                    <div className='card-content has-background-success has-text-light'>
                      <i className='fas fa-graduation-cap fa-lg' />
                      &nbsp;
                      <span>
                        {props.profile.studentProfile
                          ? props.profile.studentProfile.grade.name
                          : ''}
                      </span>
                      <span style={{ padding: '40px' }}>
                        <i>Grade</i>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {props.user.role === 'student' && (
              <div className='column'>
                <div
                  className='card has-text-centered'
                  style={{ fontSize: '20px' }}
                >
                  <Link to='/'>
                    <div className='card-content has-background-warning has-text-light'>
                      <i className='fab fa-discourse fa-lg' />
                      &nbsp;
                      <span>
                        {props.profile.studentProfile
                          ? props.profile.studentProfile.course.name
                          : ''}
                      </span>
                      <span style={{ padding: '40px' }}>
                        <i>Courses</i>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
            {props.user.role === 'student' && (
              <div className='column'>
                <div
                  className='card has-text-centered'
                  style={{ fontSize: '20px' }}
                >
                  <Link
                    to={`/user/student/exam/score/view/lists/${props.user.id}`}
                  >
                    <div className='card-content has-background-link has-text-light'>
                      <i className='far fa-edit fa-lg' />
                      <span style={{ padding: '40px' }}>
                        <i>Score Lists</i>
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/**Graph, Rule, Schedule, News Event */}
          <div className='columns'>
            <div className='column'>
              {props.user.isAuth &&
              props.user.role === 'student' &&
              props.analysis.myStudentPerformance ? (
                <ChartStudent
                  myStudentPerformance={props.analysis.myStudentPerformance}
                  loading={props.analysis.loading}
                />
              ) : props.user.isAuth &&
                props.user.role === 'admin' &&
                props.analysis.adminGetStudentPerformance ? (
                <ChartAdmin
                  adminGetStudentPerformance={
                    props.analysis.adminGetStudentPerformance
                  }
                  loading={props.analysis.loading}
                />
              ) : props.user.isAuth &&
                props.user.role === 'staff' &&
                props.analysis.staffGetStudentPerformance ? (
                <ChartStaff
                  staffGetStudentPerformance={
                    props.analysis.staffGetStudentPerformance
                  }
                  loading={props.analysis.loading}
                />
              ) : (
                <div className='card'>
                  <div className='card-content'>
                    <Spinner />
                  </div>
                </div>
              )}

              {/*<Chart user_id={props.user.id} loading={props.analysis.loading} />*/}
            </div>
            {props.user.role === 'admin' || props.user.role === 'staff' ? (
              <div className='column'>
                <div className='card'>
                  <header className='card-header'>
                    <p className='card-header-title has-text-grey'>
                      直近のレッスンレポート
                    </p>
                  </header>

                  <FeedbackLists
                    feedback={props.feedback.adminGetFeedbackArticles}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
            {props.user.role === 'student' ? (
              <div className='column'>
                <div className='card'>
                  <header className='card-header'>
                    <p className='card-header-title has-text-grey'>
                      直近のレッスンレポート
                    </p>
                  </header>
                  <StudentFeedbackLists
                    recentFeedback={
                      props.feedback.studentGetFeedbackArticleById
                    }
                  />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className='columns'>
            <div className='column'>
              <div className='card'>
                <header className='card-header'>
                  <p className='card-header-title has-text-grey'>
                    イベント＆News Letter
                  </p>
                </header>
                {props.post.posts && props.post.posts.length > 0 ? (
                  <NewsLists post={props.post.posts} />
                ) : (
                  <Spinner />
                )}
              </div>
            </div>

            {props.exam.adminGetDashboardExam &&
            props.exam.adminGetDashboardExam.length > 0 &&
            (props.user.role === 'admin' || props.user.role === 'staff') ? (
              <div className='column'>
                <div className='card'>
                  <header className='card-header'>
                    <p className='card-header-title has-text-grey'>
                      最新のテスト結果
                    </p>
                  </header>
                  <ExamLists exam={props.exam.adminGetDashboardExam} />
                </div>
              </div>
            ) : props.user.role === 'student' ? (
              <div className='column'>
                <div className='card'>
                  <header className='card-header'>
                    <p className='card-header-title has-text-grey'>
                      最新のテスト結果
                    </p>
                  </header>
                  <StudentExamScoreLists
                    recentExam={props.exam.studentGetExamArticleById}
                  />
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile,
  post: state.post,
  analysis: state.analysis,
  feedback: state.feedback,
  exam: state.exam
});

export default connect(mapStateToProps, {
  getCurrentAdminProfile,
  getCurrentStudentProfile,
  getCurrentStaffProfile,
  getAllPosts,
  adminGetUser,
  getCourse,
  getTeacher,
  getUserAuth,
  staffGetStudentPerformance,
  adminGetStudentPerformance,
  getStudentPerformanceMe,
  adminDashboardFeedback,
  adminDashboardExam,
  studentDashboardFeedbackById,
  studentDashboardExamById
})(UserDashboard);

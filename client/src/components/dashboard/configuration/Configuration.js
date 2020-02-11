import React from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../hoc/User';
import CreateClass from '../configuration/classroom/CreateClass';
import Classroom from '../configuration/classroom/Classroom';
import Course from '../configuration/course/Course';
import CreateCourse from '../configuration/course/CreateCourse';
import Grade from '../configuration/grade/Grade';
import CreateGrade from '../configuration/grade/CreateGrade';
import Student from '../configuration/student/Student';
import CreateStudent from '../configuration/student/CreateStudent';
import Teacher from '../configuration/teacher/Teacher';
import CreateTeacher from '../configuration/teacher/CreateTeacher';
import Alert from '../../alert/Alert';
import {
  getTeacher,
  getGrade,
  getStudent,
  getClassroom,
  getCourse,
  clearConfigData
} from '../../../actions/profile';
import Spinner from '../../spinner/Spinner';

class Configuration extends React.Component {
  componentDidMount = () => {
    this.props.dispatch(getTeacher());
    this.props.dispatch(getGrade());
    this.props.dispatch(getStudent());
    this.props.dispatch(getClassroom());
    this.props.dispatch(getCourse());
  };

  componentWillUnmount = () => {
    this.props.dispatch(clearConfigData());
  };
  render() {
    const profile = this.props.profile;
    return profile.loading &&
      profile.teacherList === null &&
      profile.gradeList === null &&
      profile.listOfStudents === null &&
      profile.classroomList === null &&
      profile.courseList === null ? (
      <UserLayout>
        <div
          className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'
          style={{
            background: '#fcfcfc',
            paddingLeft: 30,
            paddingRight: 50,
            paddingTop: 30,
            paddingBottom: 30,
            marginTop: 40
          }}
        >
          <div className='py-1'>
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem'
              }}
              className='has-text-weight-bold'
            >
              <i className='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Configuration
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header
                    className='card-header'
                    style={{
                      background: 'smoke'
                    }}
                  >
                    <p className='card-header-title'>List of Configuration</p>
                  </header>
                  <Spinner />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    ) : (
      <UserLayout>
        <div
          className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'
          style={{
            background: '#fcfcfc',
            paddingLeft: 30,
            paddingRight: 50,
            paddingTop: 30,
            paddingBottom: 30,
            marginTop: 40
          }}
        >
          <div className='py-1'>
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem'
              }}
              className='has-text-weight-bold'
            >
              <i className='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Configuration
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header
                    className='card-header'
                    style={{
                      background: 'whitesmoke'
                    }}
                  >
                    <p className='card-header-title'>List of Configuration</p>
                  </header>
                  <div className='card'>
                    <div className='card-content'>
                      <Alert />
                      <div className='columns'>
                        <div className='column'>
                          <div className='columns'>
                            <CreateCourse />
                          </div>
                          <Course
                            course={profile.courseList}
                            loading={profile.loading}
                          />
                        </div>
                        <div className='column'>
                          <div className='columns'>
                            <CreateStudent />
                          </div>
                          <Student
                            student={profile.listOfStudents}
                            loading={profile.loading}
                          />
                        </div>
                      </div>
                      <div className='columns'>
                        <div className='column'>
                          <div className='columns'>
                            <CreateGrade />
                          </div>
                          <Grade
                            grade={profile.gradeList}
                            loading={profile.loading}
                          />
                        </div>
                        <div className='column'>
                          <div className='columns'>
                            <CreateClass />
                          </div>

                          <Classroom
                            classroom={profile.classroomList}
                            loading={profile.loading}
                          />
                        </div>
                      </div>
                      <div className='columns'>
                        <div className='column'>
                          <div className='columns'>
                            <CreateTeacher />
                          </div>
                          <Teacher
                            teacher={profile.teacherList}
                            loading={profile.loading}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Configuration);

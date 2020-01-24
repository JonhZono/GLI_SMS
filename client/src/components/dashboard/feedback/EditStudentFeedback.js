import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getTeacher,
  getGrade,
  getClassroom,
  getStudent
} from '../../../actions/profile';
import { editStudentFeedback } from '../../../actions/feedback';
import { studentSelectField } from '../../../actions/user';
import Alert from '../../alert/Alert';
import UserLayout from '../../../hoc/User';
import FormField from '../../../components/utils/form/formField';
import {
  updates,
  generateFormData,
  populateFormField,
  populateFields
} from '../../utils/form/formActions';
import Spinner from '../../spinner/Spinner';

class EditStudentFeedback extends React.Component {
  state = {
    formData: {
      lessonID: {
        element: 'input',
        value: '',
        config: {
          name: 'lessonID',
          type: 'text',
          placeholder: 'YYY/MMM/DDD-Student'
        },
        showLabel: false
      },

      student: {
        element: 'select',
        value: '',
        config: {
          name: 'student',
          label: 'Choose Student Name',
          options: []
        },
        showLabel: true
      },

      termCode: {
        element: 'input',
        value: '',
        config: {
          name: 'termCode',
          type: 'text',
          placeholder: 'Input Classroom Code T2U11W24C1'
        },
        showLabel: false
      },
      teacher: {
        element: 'select',
        value: '',
        config: {
          name: 'teacher',
          label: 'Teacher Name',
          options: []
        },
        showLabel: true
      },
      classroom: {
        element: 'select',
        value: '',
        config: {
          name: 'classroom',
          label: 'Classroom Number',
          options: []
        },
        showLabel: true
      },
      grade: {
        element: 'select',
        value: '',
        config: {
          name: 'grade',
          label: 'Which Grade?',
          options: []
        },
        showLabel: true
      },
      ownerId: {
        element: 'select',
        value: '',
        config: {
          name: 'ownerId',
          label: 'Please Choose Right Student To Receive Feedback',
          options: []
        },
        showLabel: true
      },
      gliNews: {
        element: 'textarea',
        value: '',
        config: {
          name: 'gliNews',
          label: 'Please Enter GLI News',
          type: 'text',
          placeholder: 'Enter GLI News Here ...'
        },
        showLabel: true
      },

      lessonContent: {
        element: 'textarea',
        value: '',
        config: {
          name: 'lessonContent',
          label: 'Please Enter Feedback Content',
          type: 'text',
          placeholder: 'Enter Your student feedback here ...'
        },
        showLabel: true
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'text',
          placeholder: 'Please input students email'
        },
        showLabel: false
      }
    }
  };

  componentDidMount = () => {
    const formData = this.state.formData;

    this.props.dispatch(getClassroom()).then(() => {
      let newFormData = populateFormField(
        formData,
        this.props.profile.classroomList,
        'classroom'
      );
      this.updateFields(newFormData);
    });
    this.props.dispatch(getStudent()).then(() => {
      let newFormData = populateFormField(
        formData,
        this.props.profile.listOfStudents,
        'student'
      );
      this.updateFields(newFormData);
    });

    this.props.dispatch(getTeacher()).then(() => {
      let newFormData = populateFormField(
        formData,
        this.props.profile.teacherList,
        'teacher'
      );
      this.updateFields(newFormData);
    });
    this.props.dispatch(getGrade()).then(() => {
      let newFormData = populateFormField(
        formData,
        this.props.profile.gradeList,
        'grade'
      );
      this.updateFields(newFormData);
    });

    this.props.dispatch(studentSelectField()).then(() => {
      let newFormData = populateFormField(
        formData,
        this.props.user.allStudentSelectField,
        'ownerId'
      );
      this.updateFields(newFormData);
    });
    const newFormData = populateFields(formData, this.props.studentFeedback);
    this.setState({
      formData: newFormData
    });
  };

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  updateForm = element => {
    //target form input
    const newFormData = updates(
      element,
      this.state.formData,
      'EditStudentFeedback'
    );
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(
      this.state.formData,
      'EditStudentFeedback'
    );
    this.props.dispatch(
      editStudentFeedback(
        this.props.report_id,
        dataToSubmit,
        this.props.history
      )
    );
  };
  render() {
    $(document).ready(function() {
      $('#showModal').click(function() {
        $('.modal').addClass('is-active');
      });

      $('.modal-close').click(function() {
        $('.modal').removeClass('is-active');
      });
      $('.toggler').on('click', function() {
        $('.menu-container').toggleClass('active');
      });
      $('.nav-toggler').on('click', function() {
        $('.navbar-toggler').toggleClass('is-active');
        $('.navbar-menu').toggleClass('is-active');
      });
    });
    return this.props.feedback.loading &&
      this.props.feedback.getStudentReportById === null ? (
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
              <i class='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Student Feedbacks
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
                    <p className='card-header-title has-text-light'>
                      Edit Feedback
                    </p>
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
              <i class='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Student Feedbacks
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header className='card-header'>
                    <p
                      className='card-header-title'
                      style={{
                        backgroundColor: 'whitesmoke'
                      }}
                    >
                      Edit Feedback
                    </p>
                  </header>
                  <div className='card-content'>
                    <Alert />
                    <div className='content'>
                      <form onSubmit={event => this.submitForm(event)}>
                        <FormField
                          id={'email'}
                          formData={this.state.formData.email}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'lessonID'}
                          formData={this.state.formData.lessonID}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'student'}
                          formData={this.state.formData.student}
                          change={element => this.updateForm(element)}
                        />
                        <br />

                        <FormField
                          id={'termCode'}
                          formData={this.state.formData.termCode}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'teacher'}
                          formData={this.state.formData.teacher}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'classroom'}
                          formData={this.state.formData.classroom}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'grade'}
                          formData={this.state.formData.grade}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'ownerId'}
                          formData={this.state.formData.ownerId}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'lessonContent'}
                          formData={this.state.formData.lessonContent}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'gliNews'}
                          formData={this.state.formData.gliNews}
                          change={element => this.updateForm(element)}
                        />
                        <br />

                        <div className='field is-horizontal'>
                          <div className='field-label'></div>
                          <div className='field-body'>
                            <div className='field'>
                              <div className='control'>
                                <button
                                  type='submit'
                                  className='button is-normal buttonForm is-info is-outlined'
                                >
                                  UPDATE
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className='field-label'></div>
                          <div className='field-body'>
                            <div className='field'>
                              <div className='control'>
                                <Link
                                  to='/user/feedbacks/history'
                                  type='submit'
                                  className='button is-normal buttonForm is-info is-outlined'
                                >
                                  CANCEL
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
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
  user: state.user,
  feedback: state.feedback,
  profile: state.profile
});

export default connect(mapStateToProps)(EditStudentFeedback);

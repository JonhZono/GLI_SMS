import React, { Fragment } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { getTeacher, getGrade, getClassroom } from '../../../actions/profile';
import { createStudentFeedback } from '../../../actions/feedback';
import { studentSelectField } from '../../../actions/user';
import Alert from '../../alert/Alert';
import FeedbackField from '../../../components/utils/form/feedbackField';
import FileUpload from '../../utils/form/fileUpload';
import {
  updates,
  generateFormData,
  populateFormField
} from '../../utils/form/formActions';

class CreateStudentFeedback extends React.Component {
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
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Student Name'
        },
        showLabel: false
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
          label: 'Receivers Feedback',
          options: []
        },
        showLabel: true
      },
      gliNews: {
        element: 'textarea',
        value: '',
        config: {
          name: 'gliNews',
          label: 'GLI News',
          type: 'text',
          placeholder: 'Please Enter GLI News Here ...'
        },
        showLabel: true
      },

      lessonContent: {
        element: 'textarea',
        value: '',
        config: {
          name: 'lessonContent',
          label: 'Feedbacks Content',
          type: 'text',
          placeholder: 'Please Enter Your student feedback here ...'
        },
        showLabel: true
      },
      image: {
        value: []
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
  };

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  imageHandler = images => {
    const newFormData = { ...this.state.formData };

    newFormData['image'].value = images;

    this.setState({
      formData: newFormData
    });
  };

  updateForm = element => {
    //target form input
    const newFormData = updates(
      element,
      this.state.formData,
      'CreateStudentFeedback'
    );
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(
      this.state.formData,
      'CreateStudentFeedback'
    );
    this.props.dispatch(
      createStudentFeedback(dataToSubmit, this.props.history)
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
    return (
      <Fragment>
        <div className='columns has-text-center'>
          {/*Create User Popup Window Form*/}

          <div className='container'>
            <div className='modal'>
              <div
                className='modal-background'
                style={{ background: '#fcfcfc' }}
              ></div>
              <div className='modal-content'>
                {/*Any other Bulma elements you want*/}
                <Alert />
                <form onSubmit={event => this.submitForm(event)}>
                  <FileUpload
                    imageHandler={images => this.imageHandler(images)}
                  />
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FeedbackField
                      id={'lessonID'}
                      formData={this.state.formData.lessonID}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FeedbackField
                      id={'name'}
                      formData={this.state.formData.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FeedbackField
                      id={'termCode'}
                      formData={this.state.formData.termCode}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FeedbackField
                      id={'teacher'}
                      formData={this.state.formData.teacher}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FeedbackField
                      id={'classroom'}
                      formData={this.state.formData.classroom}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FeedbackField
                      id={'grade'}
                      formData={this.state.formData.grade}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FeedbackField
                      id={'ownerId'}
                      formData={this.state.formData.ownerId}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FeedbackField
                      id={'lessonContent'}
                      formData={this.state.formData.lessonContent}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FeedbackField
                      id={'gliNews'}
                      formData={this.state.formData.gliNews}
                      change={element => this.updateForm(element)}
                    />
                  </div>

                  <div className='field is-horizontal'>
                    <div className='field-label'></div>
                    <div className='field-body'>
                      <div className='field'>
                        <div className='control'>
                          <button
                            type='submit'
                            className='button is-normal buttonForm is-info is-outlined'
                          >
                            CREATE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <button className='modal-close' />
            </div>
          </div>
        </div>
        <div className='button is-small is-rounded' style={{marginTop: '14px'}}>
          <span style={{color: 'grey', fontSize: '14px'}}>Total Feedback &nbsp;{this.props.totalFeedback}</span>
        </div>
        {/*<div className='control has-icons-left'>
          <input
            className='input is-small buttonCardHeader'
            type='text'
            placeholder='Enter student name...'
            style={{
              borderRadius: '1px',
              fontSize: '0.9rem'
            }}
          />
          <span
            className='icon is-left'
            style={{
              paddingTop: '25px',
              paddingLeft: '25px',
              textAlign: 'center',
              color: 'smoke'
            }}
          >
            <i className='fas fa-search-plus' />
          </span>
          </div>*/}
        &nbsp;
        <button
          id='showModal'
          className='button is-small is-outlined buttonCardHeader'
          style={{
            borderRadius: '1px',
            fontSize: '0.9rem'
          }}
        >
          <i className='fas fa-plus-circle' />
          &nbsp; Generate Feedback
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, profile: state.profile });

export default connect(mapStateToProps)(CreateStudentFeedback);

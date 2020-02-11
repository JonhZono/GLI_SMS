import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import FormField from '../../utils/form/formField';
import {
  updates,
  populateFormField,
  populateFields,
  generateFormData
} from '../../utils/form/formActions';
import { adminEditExamById } from '../../../actions/exam';
import { studentSelectField } from '../../../actions/user';
import UserLayout from '../../../hoc/User';
import Alert from '../../alert/Alert';
import Spinner from '../../spinner/Spinner';
import { getTeacher } from '../../../actions/profile';

class EditExam extends React.Component {
  state = {
    formData: {
      writing: {
        element: 'input',
        value: '',
        config: {
          name: 'writing',
          type: 'text',
          placeholder: 'Writing 25/25'
        },
        showLabel: false
      },
      reading: {
        element: 'input',
        value: '',
        config: {
          name: 'reading',
          type: 'text',
          placeholder: 'Reading 25/25'
        },
        showLabel: false
      },
      listening: {
        element: 'input',
        value: '',
        config: {
          name: 'listening',
          type: 'text',
          placeholder: 'Listening 25/25'
        },
        showLabel: false
      },
      speaking: {
        element: 'input',
        value: '',
        config: {
          name: 'speaking',
          type: 'text',
          placeholder: 'Speaking 25/25'
        },
        showLabel: false
      },
      examName: {
        element: 'input',
        value: '',
        config: {
          name: 'examName',
          type: 'text',
          placeholder: 'Type of exam'
        },
        showLabel: false
      },
      gmail: {
        element: 'input',
        value: '',
        config: {
          name: 'gmail',
          type: 'text',
          placeholder: 'Please enter student@gmail.com'
        },
        showLabel: false
      },
      examDate: {
        element: 'input',
        value: '',
        config: {
          name: 'examDate',
          type: 'text',
          placeholder: 'Please enter date format YYYY/MM/DD'
        },
        showLabel: false
      },
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Student name'
        },
        showLabel: false
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
      teacher: {
        element: 'select',
        value: '',
        config: {
          name: 'teacher',
          label: 'Created By',
          options: []
        },
        showLabel: true
      }
    }
  };

  componentDidMount = () => {
    this.props.dispatch(studentSelectField()).then(() => {
      let newFormData = populateFormField(
        this.state.formData,
        this.props.user.allStudentSelectField,
        'ownerId'
      );
      this.updateFields(newFormData);
    });
    this.props.dispatch(getTeacher()).then(() => {
      let newFormData = populateFormField(
        this.state.formData,
        this.props.profile.teacherList,
        'teacher'
      );
      this.updateFields(newFormData);
    });
    const newFormData = populateFields(
      this.state.formData,
      this.props.studentExamById
    );
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
    const newFormData = updates(element, this.state.formData, 'EditExam');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'EditExam');
    this.props.dispatch(
      adminEditExamById(this.props.exam_id, dataToSubmit, this.props.history)
    );
  };

  render() {
    const formData = this.state.formData;
    return this.props.loading ? (
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
            >
              Student Exam Score
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header className='card-header'>
                    <p
                      className='card-header-title has-text-light'
                      style={{
                        backgroundColor: 'whitesmoke'
                      }}
                    >
                      My Information
                    </p>
                  </header>
                  <div className='card-content'>
                    <div className='card'>
                      <Spinner />
                    </div>
                  </div>
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
              &nbsp;&nbsp;Edit Exam
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
                    <p className='card-header-title'>Students Score</p>
                  </header>
                  <div className='card-content'>
                    <Alert />
                    <div className='content'>
                      <form onSubmit={event => this.submitForm(event)}>
                        <FormField
                          id={'name'}
                          formData={formData.name}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'writing'}
                          formData={formData.writing}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'reading'}
                          formData={formData.reading}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'listening'}
                          formData={formData.listening}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'speaking'}
                          formData={formData.speaking}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'examName'}
                          formData={formData.examName}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'examDate'}
                          formData={formData.examDate}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'teacher'}
                          formData={formData.teacher}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'gmail'}
                          formData={formData.gmail}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'ownerId'}
                          formData={formData.ownerId}
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
                                  UPDATE SCORE
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className='field-label'></div>
                          <div className='field-body'>
                            <div className='field'>
                              <div className='control'>
                                <Link
                                  to='/user/exam/scores'
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
  exam: state.exam,
  profile: state.profile
});
export default connect(mapStateToProps)(withRouter(EditExam));

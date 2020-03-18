import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/form/formField';
import {
  updates,
  generateFormData,
  populateFormField
} from '../../utils/form/formActions';
import { getTeacher } from '../../../actions/profile';
import { createEikenExam } from '../../../actions/exam';
import { studentSelectField } from '../../../actions/user';
import Alert from '../../alert/Alert';

class CreateExam extends React.Component {
  state = {
    formData: {
      writing: {
        element: 'input',
        value: '',
        config: {
          name: 'writing',
          type: 'text',
          placeholder: 'Writing 16/16'
        },
        showLabel: false
      },
      reading: {
        element: 'input',
        value: '',
        config: {
          name: 'reading',
          type: 'text',
          placeholder: 'Reading 38/38'
        },
        showLabel: false
      },
      listening: {
        element: 'input',
        value: '',
        config: {
          name: 'listening',
          type: 'text',
          placeholder: 'Listening 30/30'
        },
        showLabel: false
      },
      attitude: {
        element: 'input',
        value: '',
        config: {
          name: 'attitude',
          type: 'text',
          placeholder: 'Attitude 3/3'
        },
        showLabel: false
      },
      qna: {
        element: 'input',
        value: '',
        config: {
          name: 'qna',
          type: 'text',
          placeholder: 'Question & Answers 25/25'
        },
        showLabel: false
      },
      level: {
        element: 'select',
        value: '',
        config: {
          name: 'level',
          label: 'Exam Level',
          options: [
            {
              key: 'Eiken Level 5',
              value: 'Eiken Level 5'
            },
            {
              key: 'Eiken Level 4',
              value: 'Eiken Level 4'
            },
            {
              key: 'Eiken Level 3',
              value: 'Eiken Level 3'
            },
            {
              key: 'Eiken Level pre-2',
              value: 'Eiken Level pre-2'
            },
            {
              key: 'Eiken Level 2',
              value: 'Eiken Level 2'
            }
          ]
        },
        showLabel: true
      },
      ownerId: {
        element: 'select',
        value: '',
        config: {
          name: 'ownerId',
          label: 'Receivers of Exam Score',
          options: []
        },
        showLabel: true
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
      teacher: {
        element: 'select',
        value: '',
        config: {
          name: 'teacher',
          label: 'Created By',
          options: []
        },
        showLabel: true
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
      gmail: {
        element: 'input',
        value: '',
        config: {
          name: 'gmail',
          type: 'text',
          placeholder: 'Send To Parent with a@gmail.com'
        },
        showLabel: false
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
  };

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  updateForm = element => {
    //target form input
    const newFormData = updates(element, this.state.formData, 'CreateExam');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'CreateExam');
    this.props.dispatch(createEikenExam(dataToSubmit, this.props.history));
  };

  render() {
    const formData = this.state.formData;
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
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'name'}
                      formData={formData.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'writing'}
                      formData={formData.writing}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'reading'}
                      formData={formData.reading}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'listening'}
                      formData={formData.listening}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'attitude'}
                      formData={formData.attitude}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'qna'}
                      formData={formData.qna}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'level'}
                      formData={formData.level}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'examDate'}
                      formData={formData.examDate}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'teacher'}
                      formData={formData.teacher}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'ownerId'}
                      formData={formData.ownerId}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'gmail'}
                      formData={formData.gmail}
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
        <div
          className='button is-small is-rounded'
          style={{ marginTop: '14px' }}
        >
          <span style={{ color: 'grey', fontSize: '14px' }}>
            Total Eiken Exam &nbsp;{this.props.totalExam}
          </span>
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
          &nbsp; Generate Eiken Exam Score
        </button>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  profile: state.profile
});
export default connect(mapStateToProps)(CreateExam);

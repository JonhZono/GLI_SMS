import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/form/formField';
import {
  updates,
  generateFormData,
  populateFormField
} from '../../utils/form/formActions';
import { getTeacher } from '../../../actions/profile';
import { createStudentExam } from '../../../actions/exam';
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
    this.props.dispatch(createStudentExam(dataToSubmit, this.props.history));
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
                      id={'speaking'}
                      formData={formData.speaking}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'examName'}
                      formData={formData.examName}
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
            Total Exam &nbsp;{this.props.totalExam}
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
          &nbsp; Create Exam Data
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

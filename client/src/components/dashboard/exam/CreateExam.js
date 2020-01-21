import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/form/formField';
import {
  updates,
  generateFormData,
  populateFormField
} from '../../utils/form/formActions';
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
                      id={'ownerId'}
                      formData={formData.ownerId}
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
        <div className='control has-icons-left'>
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
        </div>
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
  user: state.user
});
export default connect(mapStateToProps)(CreateExam);
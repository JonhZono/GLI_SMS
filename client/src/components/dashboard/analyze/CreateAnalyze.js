import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import FormField from '../../utils/form/formField';
import {
  updates,
  generateFormData,
  populateFormField
} from '../../utils/form/formActions';
import { createStudentPerformance } from '../../../actions/analysis';
import { studentSelectField } from '../../../actions/user';
import Alert from '../../alert/Alert';

class CreateAnalyze extends React.Component {
  state = {
    formData: {
      writing: {
        element: 'input',
        value: '',
        config: {
          name: 'writing',
          type: 'text',
          placeholder: 'Writing 10/10'
        },
        showLabel: false
      },
      reading: {
        element: 'input',
        value: '',
        config: {
          name: 'reading',
          type: 'text',
          placeholder: 'Reading 10/10'
        },
        showLabel: false
      },
      listening: {
        element: 'input',
        value: '',
        config: {
          name: 'listening',
          type: 'text',
          placeholder: 'Listening 10/10'
        },
        showLabel: false
      },
      speaking: {
        element: 'input',
        value: '',
        config: {
          name: 'speaking',
          type: 'text',
          placeholder: 'Speaking 10/10'
        },
        showLabel: false
      },
      participation: {
        element: 'input',
        value: '',
        config: {
          name: 'participation',
          type: 'text',
          placeholder: 'Participation 10/10'
        },
        showLabel: false
      },
      active: {
        element: 'input',
        value: '',
        config: {
          name: 'active',
          type: 'text',
          placeholder: 'Active 10/10'
        },
        showLabel: false
      },
      attitude: {
        element: 'input',
        value: '',
        config: {
          name: 'attitude',
          type: 'text',
          placeholder: 'Attitude 10/10'
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
    const newFormData = updates(element, this.state.formData, 'CreateAnalysis');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'CreateAnalysis');
    console.log(dataToSubmit);
    this.props.dispatch(
      createStudentPerformance(dataToSubmit, this.props.history)
    );
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
                      id={'participation'}
                      formData={formData.participation}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <FormField
                      id={'active'}
                      formData={formData.active}
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
                            CREATE DAILY ANALYSIS
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
          &nbsp; Add Daily Analysis
        </button>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(CreateAnalyze);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormFieldConfig from '../../../utils/form/formFieldConfig';
import { updates, generateFormData } from '../../../utils/form/formActions';
import { addClassroom } from '../../../../actions/profile';

class CreateClass extends Component {
  state = {
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Enter Classroom'
        }
      }
    }
  };
  updateForm = element => {
    //target form input
    const newFormData = updates(element, this.state.formData, 'CreateClass');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'createClass');
    this.props.dispatch(addClassroom(dataToSubmit));
  };

  render() {
    const formData = this.state.formData;
    return (
      <form onSubmit={event => this.submitForm(event)}>
        <div className='columns'>
          <div className='column'>
            <div className='field'>
              <div className='control has-icons-left'>
                <FormFieldConfig
                  id={'name'}
                  formData={formData.name}
                  change={element => this.updateForm(element)}
                />
                <span
                  className='icon is-small is-left'
                  style={{
                    paddingLeft: '20px',
                    paddingRight: '10px',
                    paddingBottom: '2px',
                    color: '#000000'
                  }}
                >
                  <i className='fas fa-archway' />
                </span>
              </div>
            </div>
          </div>

          <div className='column'>
            <button
              type='submit'
              className='button btnConfig is-outlined buttonConfig'
              style={{
                borderRadius: '1px',
                fontSize: '0.9rem',
                marginLeft: '0px',
                marginTop: '11px'
              }}
            >
              <i className='fas fa-plus-circle' />
              &nbsp; CLASS
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect()(CreateClass);

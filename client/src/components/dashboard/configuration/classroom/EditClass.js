import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import FormField from '../../../utils/form/formField';
import {
  updates,
  generateFormData,
  populateFields
} from '../../../utils/form/formActions';
import { editClass, clearConfigData } from '../../../../actions/profile';

class EditClass extends Component {
  state = {
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Please Enter Classroom'
        }
      }
    }
  };
  componentDidMount = () => {
    const formData = this.state.formData;
    //Populate the edit field
    console.log(this.props.classroom);
    const newFormData = populateFields(formData, this.props.classroom);
    this.setState({
      formData: newFormData
    });
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearConfigData());
  };
  updateForm = element => {
    //target form input
    const newFormData = updates(element, this.state.formData, 'EditClass');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'EditClass');
    this.props.dispatch(editClass(this.props.class_id, dataToSubmit, this.props.history));
    console.log(dataToSubmit);
  };

  render() {
    const formData = this.state.formData;
    return (
      <div className='card-content'>
        <div className='content'>
          <form onSubmit={event => this.submitForm(event)}>
            <div className='columns'>
              <div className='column'>
                <FormField
                  id={'name'}
                  formData={formData.name}
                  change={element => this.updateForm(element)}
                />
              </div>

              <div className='column'>
                <div className='field-body'>
                  <button
                    type='submit'
                    className='button btnConfig is-outlined buttonEditConfig'
                  >
                    Update Class
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(withRouter(EditClass));

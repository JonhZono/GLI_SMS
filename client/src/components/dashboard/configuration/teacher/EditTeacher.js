import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../../../alert/Alert';
import FormField from '../../../utils/form/formField';
import {
  updates,
  generateFormData,
  populateFields
} from '../../../utils/form/formActions';
import { editTeacher, clearConfigData } from '../../../../actions/profile';

class EditTeacher extends Component {
  state = {
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Enter Teacher'
        }
      }
    }
  };
  componentDidMount = () => {
    const formData = this.state.formData;
    //Populate the edit field
    const newFormData = populateFields(formData, this.props.teacher);
    this.setState({
      formData: newFormData
    });
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearConfigData());
  };
  updateForm = element => {
    //target form input
    const newFormData = updates(element, this.state.formData, 'EditTeacherId');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'EditTeacherId');
    this.props.dispatch(
      editTeacher(this.props.teacher_id, dataToSubmit, this.props.history)
    );
  };

  render() {
    const formData = this.state.formData;
    return (
      <div className='card-content'>
        <Alert />
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
                    Update Teacher
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

export default connect(mapStateToProps)(withRouter(EditTeacher));

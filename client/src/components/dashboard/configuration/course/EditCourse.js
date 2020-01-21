import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../../../alert/Alert';
import FormField from '../../../utils/form/formField';
import {
  updates,
  generateFormData,
  populateFields
} from '../../../utils/form/formActions';
import { editCourse, clearConfigData } from '../../../../actions/profile';

class EditCourse extends Component {
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
    console.log(this.props.grade);
    const newFormData = populateFields(formData, this.props.course);
    this.setState({
      formData: newFormData
    });
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearConfigData());
  };
  updateForm = element => {
    //target form input
    const newFormData = updates(element, this.state.formData, 'EditCourse');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'EditCourse');
    this.props.dispatch(editCourse(this.props.course_id, dataToSubmit, this.props.history));
    console.log(dataToSubmit);
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
                    Update Course
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

export default connect(mapStateToProps)(withRouter(EditCourse));

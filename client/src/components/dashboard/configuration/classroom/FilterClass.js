import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormFieldConfig from '../../../utils/form/formFieldConfig';
import { updates } from '../../../utils/form/formActions';

class FilterClass extends Component {
  state = {
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Search Class'
        }
      }
    }
  };

  updateForm = element => {
    //target form input
    const newFormData = updates(element, this.state.formData, 'FilterClass');
    this.setState({
      formData: newFormData
    });
  };

  render() {
    const formData = this.state.formData;
    return (
      <div className='field'>
        <p className='control has-icons-left'>
          <FormFieldConfig
            id={'name'}
            formData={formData.name}
            change={element => this.updateForm(element)}
          />
          <span className='icon is-small is-left' style={{paddingLeft: '15px', color: '#000000'}}>
            <i className='fas fa-search-plus' />
          </span>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(FilterClass);

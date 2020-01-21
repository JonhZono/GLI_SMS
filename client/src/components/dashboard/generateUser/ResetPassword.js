import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminEditUserById } from '../../../actions/profile';
import Alert from '../../alert/Alert';
import UserLayout from '../../../hoc/User';
import ModalFormField from '../../utils/form/modalFormField';
import {
  updates,
  generateFormData,
  populateFields
} from '../../utils/form/formActions';

class EditUserForm extends React.Component {
  state = {
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Enter Username'
        }
      },
      role: {
        element: 'select',
        value: '',
        config: {
          name: 'role',
          options: [
            {
              key: 'student',
              value: 'student'
            },
            {
              key: 'staff',
              value: 'staff'
            },
            {
              key: 'admin',
              value: 'admin'
            }
          ]
        }
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password',
          type: 'text',
          placeholder: 'Please Enter Your Password'
        }
      },

      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'text',
          placeholder: 'Your email'
        }
      }
    }
  };

  componentDidMount() {
    console.log('component did mount');
    const newFormData = populateFields(this.state.formData, this.props.userAccount);
    this.setState({
      formData: newFormData
    });
  }

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  updateForm = element => {
    //target form input
    const newFormData = updates(element, this.state.formData, 'update_user');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'update_user');
    console.log(dataToSubmit);
    this.props.dispatch(
      adminEditUserById(this.props.match.params.user_id, dataToSubmit)
    );
  };
  render() {
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
                <form onSubmit={e => this.submitForm(e)}>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <p className='control has-icons-left'>
                      <ModalFormField
                        id={'name'}
                        formData={formData.name}
                        change={element => this.updateForm(element)}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-user' />
                      </span>
                    </p>
                  </div>

                  <div className='field' style={{ marginTop: '1rem' }}>
                    <p className='control has-icons-left'>
                      <ModalFormField
                        id={'email'}
                        formData={formData.email}
                        change={element => this.updateForm(element)}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-envelope' />
                      </span>
                    </p>
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <p className='control has-icons-left'>
                      <ModalFormField
                        id={'password'}
                        formData={formData.password}
                        change={element => this.updateForm(element)}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-lock' />
                      </span>
                    </p>
                  </div>
                  <div className='field-body' style={{ marginTop: '1rem' }}>
                    <div className='field'>
                      <p className='control has-icons-left'>
                        <ModalFormField
                          id={'role'}
                          formData={formData.role}
                          change={element => this.updateForm(element)}
                        />
                        <span className='icon is-small is-left'>
                          <i className='fas fa-chalkboard-teacher'></i>
                        </span>
                      </p>
                    </div>
                    <div className='field'>
                      <p className='control'>
                        <button
                          className='button buttonGenerateUser'
                          type='submit'
                        >
                        UPDATE
                        </button>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <button className='modal-close' />
            </div>
          </div>
        </div>
        
        
        
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ user: state.user});

export default connect(mapStateToProps)(EditUserForm);

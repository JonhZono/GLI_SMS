import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { adminCreateUser } from '../../../actions/user';
import Alert from '../../alert/Alert';
import ModalFormField from '../../utils/form/modalFormField';
import { updates, generateFormData } from '../../utils/form/formActions';

class CreateUser extends Component {
  state = {
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Please Username'
        }
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'text',
          placeholder: 'Please Enter Email'
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
          placeholder: 'Please Enter Secure Password'
        }
      }
    }
  };

  updateForm = element => {
    //target form input
    const newFormData = updates(element, this.state.formData, 'GenerateUser');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'GenerateUser');
    this.props.dispatch(adminCreateUser(dataToSubmit, this.props.history));
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
                <form onSubmit={e => this.submitForm(e)}>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <div className='control has-icons-left'>
                      <ModalFormField
                        id={'name'}
                        formData={formData.name}
                        change={element => this.updateForm(element)}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-user' />
                      </span>
                    </div>
                  </div>

                  <div className='field' style={{ marginTop: '1rem' }}>
                    <div className='control has-icons-left'>
                      <ModalFormField
                        id={'email'}
                        formData={formData.email}
                        change={element => this.updateForm(element)}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-envelope' />
                      </span>
                    </div>
                  </div>
                  <div className='field' style={{ marginTop: '1rem' }}>
                    <div className='control has-icons-left'>
                      <ModalFormField
                        id={'password'}
                        formData={formData.password}
                        change={element => this.updateForm(element)}
                      />
                      <span className='icon is-small is-left'>
                        <i className='fas fa-lock' />
                      </span>
                    </div>
                  </div>
                  <div className='field-body' style={{ marginTop: '1rem' }}>
                    <div className='field'>
                      <div className='control has-icons-left'>
                        <ModalFormField
                          id={'role'}
                          formData={formData.role}
                          change={element => this.updateForm(element)}
                        />
                        <span className='icon is-small is-left'>
                          <i className='fas fa-chalkboard-teacher'></i>
                        </span>
                      </div>
                    </div>
                    <div className='field'>
                      <div className='control'>
                        <button
                          className='button buttonGenerateUser is-outlined'
                          type='submit'
                        >
                          GENERATE USER
                        </button>
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
            Total Account &nbsp;{this.props.userLists}
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
          &nbsp; Generate User
        </button>
      </Fragment>
    );
  }
}

export default connect()(CreateUser);

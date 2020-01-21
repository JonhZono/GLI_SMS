import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStaffProfile, getPosition } from '../../../../actions/profile';
import Alert from '../../../alert/Alert';
import UserLayout from '../../../../hoc/User';
import FormField from '../../../utils/form/formField';
import {
  updates,
  generateFormData,
  populateFormField
} from '../../../utils/form/formActions';
import Spinner from '../../../spinner/Spinner';

class CreateStudentProfile extends React.Component {
  state = {
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Staff name'
        },
        showLabel: false
      },

      gender: {
        element: 'select',
        value: '',
        config: {
          label: 'Your Gender',
          name: 'gender',
          options: [
            {
              key: 'men',
              value: 'Men'
            },
            {
              key: 'women',
              value: 'Women'
            }
          ]
        },
        showLabel: true
      },
      birth: {
        element: 'input',
        value: '',
        config: {
          name: 'date',
          type: 'date',
          label: 'Birthday',
          placeholder: 'Your Birthday Date'
        },
        showLabel: true
      },
      marital_status: {
        element: 'input',
        value: '',
        config: {
          name: 'marital_status',
          type: 'text',
          placeholder: 'Are you single or married?'
        },
        showLabel: false
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          name: 'phone',
          type: 'text',
          placeholder: 'Phone number'
        },
        showLabel: false
      },
      bio: {
        element: 'input',
        value: '',
        config: {
          name: 'bio',
          type: 'text',
          placeholder: 'Please input your BIO'
        },
        showLabel: false
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Which Position',
          name: 'position',
          options: []
        },
        showLabel: true
      },
      admission: {
        element: 'input',
        value: '',
        config: {
          name: 'father',
          type: 'date',
          label: 'Enrollment Date',
          placeholder: 'Admission Date'
        },
        showLabel: true
      },

      country: {
        element: 'input',
        value: '',
        config: {
          name: 'country',
          type: 'text',
          placeholder: 'Your country name'
        },
        showLabel: false
      },
      work_experiences: {
        element: 'input',
        value: '',
        config: {
          name: 'work_experiences',
          type: 'text',
          placeholder: 'How many year?'
        },
        showLabel: false
      },
      bank_account_details: {
        element: 'input',
        value: '',
        config: {
          name: 'bank_account_details',
          type: 'text',
          placeholder: 'David, 93839483988, JP-bank...'
        },
        showLabel: false
      },
      addresses: {
        element: 'input',
        value: '',
        config: {
          name: 'addresses',
          type: 'text',
          placeholder: 'Your address name'
        },
        showLabel: false
      },
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email',
          type: 'text',
          placeholder: 'Your email'
        },
        showLabel: false
      }
    }
  };

  componentDidMount = () => {
    const formData = this.state.formData;

    this.props.dispatch(getPosition()).then(() => {
      let newFormData = populateFormField(
        formData,
        this.props.profile.positionList,
        'position'
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
    const newFormData = updates(
      element,
      this.state.formData,
      'CreateStaffProfileInfo'
    );
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(
      this.state.formData,
      'CreateStaffProfileInfo'
    );
    this.props.dispatch(createStaffProfile(dataToSubmit, this.props.history));
    //console.log(dataToSubmit);
  };

  render() {
    return this.props.profile.loading ? (
      <UserLayout>
        <div
          className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'
          style={{
            background: '#fcfcfc',
            paddingLeft: 30,
            paddingRight: 50,
            paddingTop: 30,
            paddingBottom: 30,
            marginTop: 40
          }}
        >
          <div className='py-1'>
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem'
              }}
              className='has-text-weight-bold'
            >
              <i class='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Staff Profile
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header
                    className='card-header'
                    style={{
                      background: 'whitesmoke'
                    }}
                  >
                    <p className='card-header-title'>Information Form</p>
                  </header>
                  <Spinner />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    ) : (
      <UserLayout>
        <div
          className='column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile'
          style={{
            background: '#fcfcfc',
            paddingLeft: 30,
            paddingRight: 50,
            paddingTop: 30,
            paddingBottom: 30,
            marginTop: 40
          }}
        >
          <div className='py-1'>
            <h1
              style={{
                fontSize: 20,
                paddingBottom: '1rem'
              }}
              className='has-text-weight-bold'
            >
              Staff Profile
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card has-text-centered'>
                  <header className='card-header'>
                    <p
                      className='card-header-title'
                      style={{
                        backgroundColor: 'whitesmoke'
                      }}
                    >
                      Information Form
                    </p>
                  </header>
                  <div className='card-content'>
                    <Alert />
                    <div className='content'>
                      <form onSubmit={event => this.submitForm(event)}>
                        <FormField
                          id={'name'}
                          formData={this.state.formData.name}
                          change={element => this.updateForm(element)}
                        />
                        <br />

                        <FormField
                          id={'gender'}
                          formData={this.state.formData.gender}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'birth'}
                          formData={this.state.formData.birth}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'bio'}
                          formData={this.state.formData.bio}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'phone'}
                          formData={this.state.formData.phone}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'marital_status'}
                          formData={this.state.formData.marital_status}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'admission'}
                          formData={this.state.formData.admission}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'work_experiences'}
                          formData={this.state.formData.work_experiences}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'position'}
                          formData={this.state.formData.position}
                          change={element => this.updateForm(element)}
                        />
                        <br />

                        <FormField
                          id={'country'}
                          formData={this.state.formData.country}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'email'}
                          formData={this.state.formData.email}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'addresses'}
                          formData={this.state.formData.addresses}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'bank_account_details'}
                          formData={this.state.formData.bank_account_details}
                          change={element => this.updateForm(element)}
                        />
                        <br />

                        <div className='field is-horizontal'>
                          <div className='field-label'></div>
                          <div className='field-body'>
                            <div className='field'>
                              <div className='control'>
                                <button
                                  type='submit'
                                  className='button is-normal buttonForm'
                                >
                                  CREATE
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className='field-label'></div>
                          <div className='field-body'>
                            <div className='field'>
                              <div className='control'>
                                <Link
                                  to='/user/staff/profile'
                                  type='submit'
                                  className='button is-normal buttonForm'
                                >
                                  CANCEL
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => ({ user: state.user, profile: state.profile });

export default connect(mapStateToProps)(CreateStudentProfile);

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminEditProfileById } from '../../../actions/profile';
import Alert from '../../alert/Alert';
import UserLayout from '../../../hoc/User';
import FormField from '../../../components/utils/form/formField';
import ProfileImage from '../../utils/form/profileImage';
import {
  updates,
  generateFormData,
  populateFields
} from '../../utils/form/formActions';
import Spinner from '../../spinner/Spinner';

class EditProfileInfoAdmin extends React.Component {
  state = {
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Admin name'
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
          name: 'birth',
          type: 'date',
          placeholder: 'Your Birthday Date'
        },
        showLabel: false
      },
      marital_status: {
        element: 'input',
        value: '',
        config: {
          name: 'marital_status',
          type: 'input',
          placeholder: 'Marital Status'
        },
        showLabel: false
      },
      position: {
        element: 'select',
        value: '',
        config: {
          label: 'Which Position',
          name: 'position',
          options: [
            {
              key: 'Administrator',
              value: 'Administrator'
            },
            {
              key: 'Head Teacher',
              value: 'Head Teacher'
            },
            {
              key: 'Full Time Teacher',
              value: 'Full Time Teacher'
            },
            {
              key: 'Part Time Teacher',
              value: 'Part Time Teacher'
            },
            {
              key: 'President',
              value: 'President'
            },
            {
              key: 'Supporting Teacher',
              value: 'Supporting Teacher'
            }
          ]
        },
        showLabel: true
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
      admission: {
        element: 'input',
        value: '',
        config: {
          name: 'admission',
          type: 'date',
          placeholder: 'Admission Date'
        },
        showLabel: false
      },
      work_experiences: {
        element: 'input',
        value: '',
        config: {
          name: 'work-experiences',
          type: 'input',
          placeholder: 'How many year?'
        },
        showLabel: false
      },
      bio: {
        element: 'textarea',
        value: '',
        config: {
          name: 'bio',
          label: 'Please Enter Your BIO',
          type: 'text',
          placeholder: 'Please enter your BIO that should describe about you...'
        },
        showLabel: true
      },
      bank_account_details: {
        element: 'input',
        value: '',
        config: {
          name: 'bank_account_details',
          type: 'text',
          placeholder: 'Account Name, Bank Name, Bank ID'
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
      country: {
        element: 'input',
        value: '',
        config: {
          name: 'country',
          type: 'input',
          placeholder: 'Where are you from?'
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
      },
      image: {
        value: []
      }
    }
  };
  componentDidMount = () => {
    const formData = this.state.formData;

    const newFormData = populateFields(formData, this.props.adminProfile);
    this.updateFields(newFormData);
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
      'EditProfileAdminInfo'
    );
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(
      this.state.formData,
      'EditProfileAdminInfo'
    );

    this.props.dispatch(
      adminEditProfileById(
        this.props.profile_id,
        dataToSubmit,
        this.props.history
      )
    );
  };
  imageHandler = images => {
    const newFormData = { ...this.state.formData };

    newFormData['image'].value = images;

    this.setState({
      formData: newFormData
    });
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
              &nbsp;&nbsp;Admin Profile
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
                    <p className='card-header-title'>Edit Information</p>
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
              Admin Profile
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
                      Edit Information
                    </p>
                  </header>
                  <div className='card-content'>
                    <Alert />
                    <div className='content'>
                      <form onSubmit={event => this.submitForm(event)}>
                        <ProfileImage
                          imageHandler={image => this.imageHandler(image)}
                        />
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
                          id={'position'}
                          formData={this.state.formData.position}
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
                          id={'phone'}
                          formData={this.state.formData.phone}
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
                          id={'country'}
                          formData={this.state.formData.country}
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
                                  UPDATE
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className='field-label'></div>
                          <div className='field-body'>
                            <div className='field'>
                              <div className='control'>
                                <Link
                                  to='/user/admin/profile'
                                  type='submit'
                                  className='button is-normal buttonForm'
                                >
                                  BACK
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

export default connect(mapStateToProps)(EditProfileInfoAdmin);

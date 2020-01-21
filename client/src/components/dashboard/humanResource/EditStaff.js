import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  adminEditStaffProfileById,
  getPosition
} from '../../../actions/profile';
import Alert from '../../alert/Alert';
import UserLayout from '../../../hoc/User';
import FormField from '../../utils/form/formField';
import FileUpload from '../../utils/form/fileUpload';
import {
  updates,
  generateFormData,
  populateFormField,
  populateFields
} from '../../utils/form/formActions';

class EditStaff extends React.Component {
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
          options: []
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
          name: 'father',
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
    //fetch existing profile info here

    this.props.dispatch(getPosition()).then(response => {
      let newFormData = populateFormField(
        formData,
        this.props.profile.positionList,
        'position'
      );

      this.updateFields(newFormData);
    });

    //Populate the edit field
    console.log(this.props.staffProfile);
    const newFormData = populateFields(formData, this.props.staffProfile);
    this.setState({
      formData: newFormData
    });
  };

  updateFields = newFormData => {
    this.setState({
      formData: newFormData
    });
  };

  updateForm = element => {
    //target form input
    const newFormData = updates(element, this.state.formData, 'update_staff');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'update_staff');
    console.log(dataToSubmit);
    this.props.dispatch(
      adminEditStaffProfileById(this.props.profile_id, dataToSubmit)
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
    $(document).ready(function() {
      $('#showModal').click(function() {
        $('.modal').addClass('is-active');
      });

      $('.modal-close').click(function() {
        $('.modal').removeClass('is-active');
      });
      $('.toggler').on('click', function() {
        $('.menu-container').toggleClass('active');
      });
      $('.nav-toggler').on('click', function() {
        $('.navbar-toggler').toggleClass('is-active');
        $('.navbar-menu').toggleClass('is-active');
      });
    });
    return (
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
                      Edit Information
                    </p>
                  </header>
                  <div className='card-content'>
                    <Alert />
                    <div className='content'>
                      <form onSubmit={event => this.submitForm(event)}>
                        <FileUpload
                          imageHandler={images => this.imageHandler(images)}
                        />
                        <FormField
                          id={'name'}
                          formData={this.state.formData.name}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'gender'}
                          formData={this.state.formData.gender}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'birth'}
                          formData={this.state.formData.birth}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'bio'}
                          formData={this.state.formData.bio}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'position'}
                          formData={this.state.formData.position}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'marital_status'}
                          formData={this.state.formData.marital_status}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'phone'}
                          formData={this.state.formData.phone}
                          change={element => this.updateForm(element)}
                        />

                        <FormField
                          id={'admission'}
                          formData={this.state.formData.admission}
                          change={element => this.updateForm(element)}
                        />

                        <FormField
                          id={'work_experiences'}
                          formData={this.state.formData.work_experiences}
                          change={element => this.updateForm(element)}
                        />

                        <FormField
                          id={'email'}
                          formData={this.state.formData.email}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'addresses'}
                          formData={this.state.formData.addresses}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'country'}
                          formData={this.state.formData.country}
                          change={element => this.updateForm(element)}
                        />

                        <div className='field is-horizontal'>
                          <div className='field-label'></div>
                          <div className='field-body'>
                            <div className='field'>
                              <div className='control'>
                                <button
                                  type='submit'
                                  className='button is-outlined buttonForm'
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
                                  to='/user/staff/profiles'
                                  type='submit'
                                  className='button is-outlined buttonForm'
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

export default connect(mapStateToProps)(EditStaff);

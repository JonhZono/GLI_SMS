import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  adminEditStudentProfileById,
  getTeacher,
  getGrade,
  getCourse,
  getClassroom
} from '../../../actions/profile';
import Alert from '../../alert/Alert';
import UserLayout from '../../../hoc/User';
import FormField from '../../../components/utils/form/formField';
import ProfileImage from '../../utils/form/profileImage';
import {
  updates,
  generateFormData,
  populateFormField,
  populateFields
} from '../../utils/form/formActions';

class EditStudentProfile extends React.Component {
  state = {
    formData: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name',
          type: 'text',
          placeholder: 'Student name'
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
              key: 'boy',
              value: 'Boy'
            },
            {
              key: 'girl',
              value: 'Girl'
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
      classroom: {
        element: 'select',
        value: '',
        config: {
          label: 'Which Classroom',
          name: 'classroom',
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
      course: {
        element: 'select',
        value: '',
        config: {
          label: 'Which Course',
          name: 'course',
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
          placeholder: 'Admission Date'
        },
        showLabel: false
      },
      teacher: {
        element: 'select',
        value: '',
        config: {
          label: 'Teacher',
          name: 'teacher',
          options: [
            /* fetch from api */
          ]
        },
        showLabel: true
      },
      grade: {
        element: 'select',
        value: '',
        config: {
          label: 'Your Grade',
          name: 'grade',
          options: [
            /* fetch from api */
          ]
        },
        showLabel: true
      },
      fee: {
        element: 'input',
        value: '',
        config: {
          name: 'fee',
          type: 'text',
          placeholder: 'Due Fee'
        },
        showLabel: false
      },
      father: {
        element: 'input',
        value: '',
        config: {
          name: 'father',
          type: 'text',
          placeholder: 'Your father name'
        },
        showLabel: false
      },
      father_occupation: {
        element: 'input',
        value: '',
        config: {
          name: 'father_occupation',
          type: 'text',
          placeholder: 'What is he doing?'
        },
        showLabel: false
      },
      mother: {
        element: 'input',
        value: '',
        config: {
          name: 'mother',
          type: 'text',
          placeholder: 'Your mother name'
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
      },
      image: { value: [] }
    }
  };

  imageHandler = images => {
    const newFormData = { ...this.state.formData };

    newFormData['image'].value = images;

    this.setState({
      formData: newFormData
    });
  };

  componentDidMount() {
    const formData = this.state.formData;

    this.props.dispatch(getClassroom()).then(response => {
      let newFormData = populateFormField(
        formData,
        this.props.profile.classroomList,
        'classroom'
      );

      this.updateFields(newFormData);
    });
    this.props.dispatch(getTeacher()).then(response => {
      let newFormData = populateFormField(
        formData,
        this.props.profile.teacherList,
        'teacher'
      );
      this.updateFields(newFormData);
    });
    this.props.dispatch(getGrade()).then(response => {
      let newFormData = populateFormField(
        formData,
        this.props.profile.gradeList,
        'grade'
      );
      this.updateFields(newFormData);
    });
    this.props.dispatch(getCourse()).then(response => {
      let newFormData = populateFormField(
        formData,
        this.props.profile.courseList,
        'course'
      );
      this.updateFields(newFormData);
    });
    //Populate the edit field
    console.log(this.props.studentProfile);
    const newFormData = populateFields(formData, this.props.studentProfile);
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
    const newFormData = updates(element, this.state.formData, 'update_student');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'update_student');
    console.log(dataToSubmit);
    this.props.dispatch(
      adminEditStudentProfileById(this.props.profile_id, dataToSubmit)
    );
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
              Student
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
                      Edit Profile Information
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
                          id={'classroom'}
                          formData={this.state.formData.classroom}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'phone'}
                          formData={this.state.formData.phone}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'course'}
                          formData={this.state.formData.course}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'admission'}
                          formData={this.state.formData.admission}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'grade'}
                          formData={this.state.formData.grade}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'teacher'}
                          formData={this.state.formData.teacher}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'fee'}
                          formData={this.state.formData.fee}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'father'}
                          formData={this.state.formData.father}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'father_occupation'}
                          formData={this.state.formData.father_occupation}
                          change={element => this.updateForm(element)}
                        />
                        <FormField
                          id={'mother'}
                          formData={this.state.formData.mother}
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
                                  to='/user/student/profiles'
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

export default connect(mapStateToProps)(EditStudentProfile);

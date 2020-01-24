import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editPostById } from '../../../actions/post';
import Alert from '../../alert/Alert';
import UserLayout from '../../../hoc/User';
import FormField from '../../utils/form/formField';
import FileUpload from '../../utils/form/fileUpload';
import {
  updates,
  generateFormData,
  populateFields
} from '../../utils/form/formActions';

class EditPost extends React.Component {
  state = {
    formData: {
      title: {
        element: 'input',
        value: '',
        config: {
          name: 'title',
          type: 'text',
          placeholder: 'What is your title?'
        },
        showLabel: false
      },
      descriptions: {
        element: 'textarea',
        value: '',
        config: {
          name: 'descriptions',
          label: 'Please Enter Your Content Body',
          type: 'text',
          placeholder: 'What is your content body?'
        },
        showLabel: true
      },
      status: {
        element: 'input',
        value: '',
        config: {
          name: 'status',
          type: 'text',
          placeholder: 'ex. starting, on-going, finished'
        },
        showLabel: false
      },
      gmailLists: {
        element: 'textarea',
        value: '',
        config: {
          name: 'gmailLists',
          label: 'Please input email lists',
          type: 'text',
          placeholder: 'Please enter email lists a@gmail.com, b@gmail.com'
        },
        showLabel: true
      },
      image: {
        value: []
      }
    }
  };

  componentDidMount = () => {
    const formData = this.state.formData;

    //Populate the edit field
    const newFormData = populateFields(formData, this.props.postById);
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
    const newFormData = updates(element, this.state.formData, 'update_post');
    this.setState({
      formData: newFormData
    });
  };

  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(this.state.formData, 'update_post');
    this.props.dispatch(editPostById(this.props.post_id, dataToSubmit));
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
              className='has-text-weight-bold'
            >
              <i class='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Edit News Letter
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
                      News Letter Form
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
                          id={'title'}
                          formData={this.state.formData.title}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'status'}
                          formData={this.state.formData.status}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'descriptions'}
                          formData={this.state.formData.descriptions}
                          change={element => this.updateForm(element)}
                        />
                        <br />
                        <FormField
                          id={'gmailLists'}
                          formData={this.state.formData.gmailLists}
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
                                  SAVE POST
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className='field-label'></div>
                          <div className='field-body'>
                            <div className='field'>
                              <div className='control'>
                                <Link
                                  to='/user/view/newsletter'
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

const mapStateToProps = state => ({ user: state.user, post: state.post });

export default connect(mapStateToProps)(EditPost);

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserLayout from '../../../hoc/User';
import Alert from '../../alert/Alert';
import FormField from '../../utils/form/formField';
import { updates, generateFormData } from '../../utils/form/formActions';
import { createPost, clearViewPost } from '../../../actions/post';
import FileUpload from '../../utils/form/fileUpload';
import FileUpload1 from '../../utils/form/fileUpload1';

class NewsLetterForm extends React.Component {
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
      status: {
        element: 'input',
        value: '',
        config: {
          name: 'status',
          type: 'text',
          placeholder: 'Status: upcoming, onGoing, finished'
        },
        showLabel: false
      },
      type: {
        element: 'input',
        value: '',
        config: {
          name: 'type',
          type: 'text',
          placeholder: 'Post Type: News Letter, Event'
        },
        showLabel: false
      },
      descriptions: {
        element: 'textarea',
        value: '',
        config: {
          name: 'descriptions',
          label: 'News Letter Descriptions',
          type: 'text',
          placeholder: 'What is your news letter content body?'
        },
        showLabel: true
      },
      event: {
        element: 'textarea',
        value: '',
        config: {
          name: 'event',
          label: 'Event Descriptions',
          type: 'text',
          placeholder: 'What is your event content body?'
        },
        showLabel: true
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
      },
      image1: {
        value: []
      }
    }
  };
  updateForm = element => {
    //target form input
    const newFormData = updates(
      element,
      this.state.formData,
      'CreateNewsLetter'
    );
    this.setState({
      formData: newFormData
    });
  };
  submitForm = event => {
    event.preventDefault();
    let dataToSubmit = generateFormData(
      this.state.formData,
      'CreateNewsLetter'
    );
    this.props.dispatch(createPost(dataToSubmit, this.props.history));
  };

  imageHandler = images => {
    const newFormData = { ...this.state.formData };

    newFormData['image'].value = images;

    this.setState({
      formData: newFormData
    });
  };

  imageHandler1 = images => {
    const newFormData = { ...this.state.formData };

    newFormData['image1'].value = images;

    this.setState({
      formData: newFormData
    });
  };

  componentWillUnmount = () => {
    this.props.dispatch(clearViewPost());
  };

  render() {
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
              <i className='fas fa-arrow-circle-right' />
              &nbsp;&nbsp;Create News Letter
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
                          id={'type'}
                          formData={this.state.formData.type}
                          change={element => this.updateForm(element)}
                        />
                        <br />
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
                        <FileUpload1
                          imageHandler1={images => this.imageHandler1(images)}
                        />
                        <FormField
                          id={'event'}
                          formData={this.state.formData.event}
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
                                  className='button is-outlined buttonForm'
                                >
                                  SEND POST
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

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps)(NewsLetterForm);

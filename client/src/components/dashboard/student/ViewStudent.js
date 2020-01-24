import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import UserLayout from '../../../hoc/User';
import { connect } from 'react-redux';
import {
  getStudentProfileById,
  clearProfileDetails,
  deleteStudentProfileById
} from '../../../actions/profile';

class ViewStudent extends Component {
  componentDidMount = () => {
    const profile_id = this.props.match.params.profile_id;
    this.props.dispatch(getStudentProfileById(profile_id));
  };

  deleteStudentProfile = () => {
    this.props.dispatch(
      deleteStudentProfileById(
        this.props.match.params.profile_id,
        this.props.history
      )
    );
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearProfileDetails());
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
    const profile = this.props.profile;
    return (
      <Fragment>
        {profile.studentProfileById === null || profile.loading ? (
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
                  Student Profile
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
                          Student Information
                        </p>
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
                >
                  <i class='fas fa-arrow-circle-right' />
                  &nbsp;&nbsp; Student Profile
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
                          Student Information
                        </p>
                      </header>
                      <div className='card-content'>
                        <div className='content'>
                          <div className='columns is-variable is-desktop p-1'>
                            {/* Profile Picture */}
                            <div className='column is-2'>
                              <article className='media'>
                                <div className='media-left'>
                                  <figure className='image is-128x128'>
                                    {profile.studentProfileById.image ? (
                                      profile.studentProfileById.image.map(
                                        item => (
                                          <img
                                            key={item.public_id}
                                            src={item.url}
                                            className='is-rounded'
                                          />
                                        )
                                      )
                                    ) : (
                                      <img
                                        className='is-rounded'
                                        src={
                                          profile.studentProfileById.user.avatar
                                        }
                                        alt='user'
                                      />
                                    )}

                                    <u>
                                      {profile.studentProfileById.name}&nbsp;
                                      {profile.studentProfileById.school}
                                    </u>
                                  </figure>
                                  <br />
                                  {this.props.user.role === 'admin' && (
                                    <nav className='level is-mobile py-1 has-text-centered'>
                                      <Link
                                        to={`/user/student/profile/edit/${this.props.match.params.profile_id}`}
                                        className='tag is-primary'
                                        style={{ margin: '3px' }}
                                      >
                                        <span className='icon is-small'>
                                          <i
                                            className='fas fa-pencil-alt'
                                            aria-hidden='true'
                                          />
                                        </span>
                                        <span>Edit</span>
                                      </Link>

                                      <button
                                        onClick={this.deleteStudentProfile}
                                        className='tag is-danger'
                                        style={{ margin: '3px' }}
                                      >
                                        <span className='icon is-small'>
                                          <i
                                            className='fas fa-trash-alt'
                                            aria-hidden='true'
                                          />
                                        </span>
                                        <span>Delete Profile</span>
                                      </button>
                                    </nav>
                                  )}
                                </div>
                              </article>
                            </div>

                            <div className='column is-desktop'>
                              <div className='columns'>
                                <div className='column'>
                                  <div className='card'>
                                    <header className='card-header'>
                                      <p
                                        className='card-header-title'
                                        style={{
                                          color: '#004973',
                                          textTransform: 'uppercase'
                                        }}
                                      >
                                        Profile
                                      </p>
                                    </header>
                                    <div className='card-content'>
                                      <div className='content'>
                                        <table className='table is-striped is-hoverable is-fullwidth'>
                                          <tbody>
                                            <tr>
                                              <td>Student</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .name
                                                }
                                                &nbsp;
                                                <i>
                                                  {
                                                    profile.studentProfileById
                                                      .school
                                                  }
                                                </i>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Date of Birth</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .birth
                                                }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Gender</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .gender
                                                }
                                              </td>
                                            </tr>

                                            <tr>
                                              <td>Classroom</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .classroom.name
                                                }
                                              </td>
                                            </tr>

                                            <tr>
                                              <td>Grade</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .grade.name
                                                }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Teacher</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .teacher.name
                                                }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Course</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .course.name
                                                }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Admission Date</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .admission
                                                }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Due Fee</td>
                                              <td>
                                                {profile.studentProfileById.fee}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Father</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .father
                                                }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Father Occupation</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .father_occupation
                                                }
                                              </td>
                                            </tr>

                                            <tr>
                                              <td>Mother</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .mother
                                                }
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className='column'>
                                  <div className='card'>
                                    <header className='card-header'>
                                      <p
                                        className='card-header-title'
                                        style={{
                                          color: '#004973',
                                          textTransform: 'uppercase'
                                        }}
                                      >
                                        Contact Information
                                      </p>
                                    </header>
                                    <div className='card-content'>
                                      <div className='content'>
                                        <table className='table is-striped is-hoverable is-fullwidth'>
                                          <tbody>
                                            <tr>
                                              <td>Addresses</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .addresses
                                                }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Phone Number</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .phone
                                                }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Email</td>
                                              <td>
                                                {
                                                  profile.studentProfileById
                                                    .email
                                                }
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UserLayout>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ profile: state.profile, user: state.user });

export default connect(mapStateToProps)(ViewStudent);

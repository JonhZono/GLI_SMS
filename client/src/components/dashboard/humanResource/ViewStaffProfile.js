import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getStaffProfileById,
  deleteStaffProfileById,
  clearProfileDetails
} from '../../../actions/profile';
import UserLayout from '../../../hoc/User';
import Spinner from '../../spinner/Spinner';

class ViewStaffProfile extends Component {
  componentDidMount = () => {
    const profile_id = this.props.match.params.profile_id;
    this.props.dispatch(getStaffProfileById(profile_id));
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearProfileDetails());
  };
  deleteStaffProfile = () => {
    const profile_id = this.props.match.params.profile_id;
    this.props.dispatch(deleteStaffProfileById(profile_id, this.props.history));
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
        {profile.staffProfileById === null || profile.loading ? (
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
                  &nbsp;&nbsp; Staff Profile
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
                          Staff Information
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
                  className='has-text-weight-bold'
                >
                  <i className='fas fa-arrow-circle-right' />
                  &nbsp;&nbsp; Staff Profile
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
                          My Information
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
                                    {profile.staffProfileById.image ? (
                                      profile.staffProfileById.image.map(
                                        item => (
                                          <img
                                            key={item.public_id}
                                            src={item.url}
                                            alt='user'
                                            className='is-rounded'
                                          />
                                        )
                                      )
                                    ) : (
                                      <img
                                        className='is-rounded'
                                        src={
                                          profile.staffProfileById.user.avatar
                                        }
                                        alt='user'
                                      />
                                    )}

                                    <u>
                                      {profile.staffProfileById.name}&nbsp;
                                      {profile.staffProfileById.company}
                                    </u>
                                  </figure>
                                  <br />
                                  {this.props.user.role === 'admin' ||
                                  this.props.user.role === 'staff' ? (
                                    <nav className='level is-mobile py-1 has-text-centered'>
                                      <Link
                                        to={`/user/staff/profile/edit/${this.props.match.params.profile_id}`}
                                        className='button is-small is-primary'
                                        style={{
                                          margin: '3px',
                                          fontSize: '12px'
                                        }}
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
                                        onClick={this.deleteStaffProfile}
                                        className='button is-small is-danger'
                                        style={{
                                          margin: '3px',
                                          fontSize: '12px'
                                        }}
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
                                  ) : (
                                    ''
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
                                          color: '#004973'
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
                                              <td>Staff</td>
                                              <td>
                                                {profile &&
                                                  profile.staffProfileById.name}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Gender</td>
                                              <td>
                                                {profile &&
                                                  profile.staffProfileById
                                                    .gender}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Date of Birth</td>
                                              <td>
                                                {profile &&
                                                  profile.staffProfileById
                                                    .birth}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Marital Status</td>
                                              <td>
                                                {profile &&
                                                  profile.staffProfileById
                                                    .marital_status}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Position</td>
                                              <td>
                                                {profile.staffProfileById ? (
                                                  profile.staffProfileById
                                                    .position
                                                ) : (
                                                  <p>Position Not Select</p>
                                                )}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Experience</td>
                                              <td>
                                                {profile &&
                                                  profile.staffProfileById
                                                    .work_experiences}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Admission Date</td>
                                              <td>
                                                {profile &&
                                                  profile.staffProfileById
                                                    .admission}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/**End of columns 1 */}

                              <div className='columns'>
                                <div className='column'>
                                  <div className='card'>
                                    <header className='card-header'>
                                      <p
                                        className='card-header-title'
                                        style={{
                                          color: '#004973'
                                        }}
                                      >
                                        Employee Habit
                                      </p>
                                    </header>
                                    <div className='card-content'>
                                      <div className='content'>
                                        <table className='table is-striped is-hoverable is-fullwidth'>
                                          <tbody>
                                            <tr>
                                              <td>Bio</td>
                                              <td>
                                                <p>
                                                  {profile.staffProfileById.bio}
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/**End of parent columns of 2*/}

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
                                                {profile.staffProfileById.addresses.join(
                                                  ', '
                                                )}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Country</td>
                                              <td>
                                                {
                                                  profile.staffProfileById
                                                    .country
                                                }
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Phone Number</td>
                                              <td>
                                                {profile.staffProfileById.phone}
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>Email</td>
                                              <td>
                                                {profile.staffProfileById.email}
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/**End of columns 3 */}
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
                                        Bank Account Details
                                      </p>
                                    </header>
                                    <div className='card-content'>
                                      <div className='content'>
                                        <table className='table is-striped is-hoverable is-fullwidth'>
                                          <tbody>
                                            <tr>
                                              <td>Bank</td>
                                              <td>
                                                <p>
                                                  {profile.staffProfileById.bank_account_details.join(
                                                    ',  '
                                                  )}
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/**End of parent columns of 4*/}
                            </div>
                            {/**End of parent columns of 1, 2, 3 & 4*/}
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

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});
export default connect(mapStateToProps)(ViewStaffProfile);

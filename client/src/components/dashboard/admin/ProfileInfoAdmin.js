import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../../spinner/Spinner';
import {
  clearAdminProfile,
  adminDeleteProfileById
} from '../../../actions/profile';

class ProfileInfoAdmin extends Component {
  componentWillUnmount = () => {
    this.props.dispatch(clearAdminProfile());
  };
  deleteAdminProfile = () => {
    this.props.dispatch(
      adminDeleteProfileById(this.props.adminProfile._id, this.props.history)
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
    const adminProfile = this.props.adminProfile;

    return (
      <Fragment>
        {adminProfile === null ? (
          <Spinner />
        ) : (
          <div className='card-content'>
            <div className='content'>
              <div className='columns is-variable is-desktop p-1'>
                {/* Profile Picture */}
                <div className='column is-2'>
                  <article className='media'>
                    <div className='media-left'>
                      <figure className='image is-128x128'>
                        {adminProfile.image ? (
                          adminProfile.image.map(item => (
                            <img
                              key={item.public_id}
                              src={item.url}
                              alt='user'
                              className='is-rounded'
                            />
                          ))
                        ) : (
                          <img
                            className='is-rounded'
                            src={adminProfile.user.avatar}
                            alt='user'
                          />
                        )}
                        <u>
                          {adminProfile.name}&nbsp;
                          {adminProfile.company}
                        </u>
                      </figure>
                      <br />
                      <nav className='level is-mobile py-1 has-text-centered'>
                        <Link
                          to={`/user/admin/profile/edit/${adminProfile._id}`}
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
                          onClick={this.deleteAdminProfile}
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
                                  <td>Admin</td>
                                  <td>{adminProfile.name}</td>
                                </tr>
                                <tr>
                                  <td>Gender</td>
                                  <td>{adminProfile.gender}</td>
                                </tr>
                                <tr>
                                  <td>Date of Birth</td>
                                  <td>{adminProfile.birth}</td>
                                </tr>
                                <tr>
                                  <td>Marital Status</td>
                                  <td>{adminProfile.marital_status}</td>
                                </tr>
                                <tr>
                                  <td>Position</td>
                                  <td>
                                    {adminProfile ? (
                                      adminProfile.position
                                    ) : (
                                      <p>Position Not Select</p>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Experience</td>
                                  <td>{adminProfile.work_experiences}</td>
                                </tr>
                                <tr>
                                  <td>Admission Date</td>
                                  <td>{adminProfile.admission}</td>
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
                                    <p>{adminProfile.bio}</p>
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
                              color: '#004973'
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
                                  <td>{adminProfile.addresses.join(', ')}</td>
                                </tr>
                                <tr>
                                  <td>Country</td>
                                  <td>{adminProfile.country}</td>
                                </tr>
                                <tr>
                                  <td>Phone Number</td>
                                  <td>{adminProfile.phone}</td>
                                </tr>
                                <tr>
                                  <td>Email</td>
                                  <td>{adminProfile.email}</td>
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
                              color: '#004973'
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
                                      {adminProfile &&
                                        adminProfile.bank_account_details.join(
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
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps)(withRouter(ProfileInfoAdmin));

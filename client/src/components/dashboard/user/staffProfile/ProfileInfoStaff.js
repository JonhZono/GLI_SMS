import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserLayout from '../../../../hoc/User';
import Spinner from '../../../spinner/Spinner';

class ProfileInfoStaff extends Component {
  componentDidMount = () => {
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
  };
  componentWillUnmount = () => {
    //this.props.dispatch(clearProfileDetails());
  };
  /*deleteStaffProfile = () => {
    const profile_id = this.props.match.params.profile_id;
    this.props.dispatch(deleteStaffProfileById(profile_id, this.props.history));
  };*/
  render() {
    const staffProfile = this.props.staffProfile;
    return (
      <Fragment>
        {staffProfile === null ? (
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
                        {staffProfile.image ? (
                          staffProfile.image.map(item => (
                            <img
                              key={item.public_id}
                              src={item.url}
                              className='is-rounded'
                            />
                          ))
                        ) : (
                          <img
                            className='is-rounded'
                            src={staffProfile.user.avatar}
                            alt='user'
                          />
                        )}
                        <u>
                          {staffProfile.name}&nbsp;
                          {staffProfile.company}
                        </u>
                      </figure>
                      <br />
                      <nav className='level is-mobile py-1 has-text-centered'>
                        <Link
                          to={`/user/staff/profile/edit/${staffProfile._id}`}
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
                          onClick={this.deleteStaffProfile}
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
                                  <td>Staff</td>
                                  <td>{staffProfile.name}</td>
                                </tr>
                                <tr>
                                  <td>Gender</td>
                                  <td>{staffProfile.gender}</td>
                                </tr>
                                <tr>
                                  <td>Date of Birth</td>
                                  <td>{staffProfile.birth}</td>
                                </tr>
                                <tr>
                                  <td>Marital Status</td>
                                  <td>{staffProfile.marital_status}</td>
                                </tr>
                                <tr>
                                  <td>Position</td>
                                  <td>
                                    {staffProfile.position ? (
                                      staffProfile.position.name
                                    ) : (
                                      <p>Position Not Select</p>
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Experience</td>
                                  <td>{staffProfile.work_experiences}</td>
                                </tr>
                                <tr>
                                  <td>Admission Date</td>
                                  <td>{staffProfile.admission}</td>
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
                                    <p>{staffProfile.bio}</p>
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
                                  <td>{staffProfile.addresses.join(', ')}</td>
                                </tr>
                                <tr>
                                  <td>Country</td>
                                  <td>{staffProfile.country}</td>
                                </tr>
                                <tr>
                                  <td>Phone Number</td>
                                  <td>{staffProfile.phone}</td>
                                </tr>
                                <tr>
                                  <td>Email</td>
                                  <td>{staffProfile.email}</td>
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
                                      {staffProfile &&
                                        staffProfile.bank_account_details.join(
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
export default connect(mapStateToProps)(ProfileInfoStaff);

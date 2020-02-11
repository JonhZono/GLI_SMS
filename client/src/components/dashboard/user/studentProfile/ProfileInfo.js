import React, { useEffect } from 'react';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { studentDeleteProfileById } from '../../../../actions/profile';

//get props.studentProfile from parent Index.js
const ViewStudent = props => {
  useEffect(() => {
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
  }, []);

  const deleteStudentProfile = () => {
    props.studentDeleteProfileById(props.studentProfile._id, props.history);
  };

  return (
    <div className='card-content'>
      <div className='content'>
        <div className='columns is-variable is-desktop p-1'>
          {/* Profile Picture */}
          <div className='column is-2'>
            <article className='media'>
              <div className='media-left'>
                <figure className='image is-128x128'>
                  {props.studentProfile.image ? (
                    props.studentProfile.image.map(item => (
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
                      src={props.studentProfile.user.avatar}
                      alt='user'
                    />
                  )}
                  <u>
                    {props.studentProfile.name}&nbsp;
                    {props.studentProfile.school}
                  </u>
                </figure>
                <nav className='level is-mobile py-1 has-text-centered'>
                  <Link
                    to={`/user/student/edit/${props.studentProfile._id}`}
                    className='button is-small is-primary'
                    style={{
                      margin: '3px',
                      fontSize: '12px'
                    }}
                  >
                    <span className='icon is-small'>
                      <i className='fas fa-pencil-alt' aria-hidden='true' />
                    </span>
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={deleteStudentProfile}
                    className='button is-small is-danger'
                    style={{
                      margin: '3px',
                      fontSize: '12px'
                    }}
                  >
                    <span className='icon is-small'>
                      <i className='fas fa-trash-alt' aria-hidden='true' />
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

                  <table className='table is-striped is-hoverable is-fullwidth'>
                    <tbody>
                      <tr>
                        <td>Student</td>
                        <td>
                          {props.studentProfile.name}
                          &nbsp;
                          <i>{props.studentProfile.school}</i>
                        </td>
                      </tr>
                      <tr>
                        <td>Date of Birth</td>
                        <td>{props.studentProfile.birth}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{props.studentProfile.gender}</td>
                      </tr>

                      <tr>
                        <td>Classroom</td>
                        <td>
                          {props.studentProfile.classroom &&
                            props.studentProfile.classroom.name}
                        </td>
                      </tr>

                      <tr>
                        <td>Grade</td>
                        <td>
                          {props.studentProfile.grade &&
                            props.studentProfile.grade.name}
                        </td>
                      </tr>
                      <tr>
                        <td>Teacher</td>
                        <td>
                          {props.studentProfile.teacher &&
                            props.studentProfile.teacher.name}
                        </td>
                      </tr>
                      <tr>
                        <td>Course</td>
                        <td>
                          {props.studentProfile.course &&
                            props.studentProfile.course.name}
                        </td>
                      </tr>
                      <tr>
                        <td>Admission Date</td>
                        <td>{props.studentProfile.admission}</td>
                      </tr>

                      <tr>
                        <td>Father</td>
                        <td>{props.studentProfile.father}</td>
                      </tr>
                      <tr>
                        <td>Father Occupation</td>
                        <td>{props.studentProfile.father_occupation}</td>
                      </tr>

                      <tr>
                        <td>Mother</td>
                        <td>{props.studentProfile.mother}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

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

                  <table className='table is-striped is-hoverable is-fullwidth'>
                    <tbody>
                      <tr>
                        <td>Addresses</td>
                        <td>{props.studentProfile.addresses}</td>
                      </tr>
                      <tr>
                        <td>Phone Number</td>
                        <td>{props.studentProfile.phone}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{props.studentProfile.email}</td>
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
  );
};

const mapStateToProps = state => ({ profile: state.profile });

export default connect(mapStateToProps, { studentDeleteProfileById })(
  withRouter(ViewStudent)
);

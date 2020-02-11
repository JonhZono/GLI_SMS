import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import UserLayout from '../../../hoc/User';
import { connect } from 'react-redux';
import {
  getStudentProfileLists,
  clearProfileDetails
} from '../../../actions/profile';
import StudentTableListInfo from '../../utils/tableLists/StudentTableListInfo';
import Spinner from '../../spinner/Spinner';

class StudentProfile extends Component {
  componentDidMount = () => {
    this.props.dispatch(getStudentProfileLists());
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
    if (profile.loading && profile.studentList === null) {
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
                &nbsp;&nbsp; Student Profiles
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
                      <p className='card-header-title'>Student Lists</p>
                      {/*<div className='control'>
                        <span>Search</span>&nbsp;
                        <input
                          className='input is-link is-small buttonCardHeader'
                          type='text'
                          placeholder='Enter student name...'
                          style={{
                            borderRadius: '0.1rem',
                            fontSize: '0.9rem'
                          }}
                        />
                        </div>*/}
                    </header>
                    <Spinner />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UserLayout>
      );
    }
    return (
      <Fragment>
        (
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
                <i className='fas fa-arrow-circle-right' />
                &nbsp;&nbsp; Student Profiles
              </h1>
              <div className='columns'>
                <div className='column'>
                  <div className='card has-text-centered'>
                    <header
                      className='card-header'
                      style={{
                        backgroundColor: 'whitesmoke'
                      }}
                    >
                      <p className='card-header-title'>Student Lists</p>
                      {/*<span style={{ marginTop: '15px', fontSize: '17px' }}>
                        Search:
                      </span>
                      &nbsp;&nbsp;
                      <p
                        className='control has-icons-left'
                        style={{ marginRight: '25px' }}
                      >
                        <input
                          className='input is-small buttonCardHeader'
                          type='text'
                          placeholder='Enter student name...'
                          style={{
                            borderRadius: '0.1rem',
                            fontSize: '0.9rem',
                            marginRight: '100px'
                          }}
                        />
                        <span
                          className='icon is-left'
                          style={{
                            paddingTop: '25px',
                            paddingLeft: '25px',
                            textAlign: 'center',
                            color: 'smoke'
                          }}
                        >
                          <i className='fas fa-search-plus' />
                        </span>
                        </p>*/}
                    </header>
                    <StudentTableListInfo
                      lists={this.props.profile.studentList}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UserLayout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});

export default connect(mapStateToProps)(StudentProfile);

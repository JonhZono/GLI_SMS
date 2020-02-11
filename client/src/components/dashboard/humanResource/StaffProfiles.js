import React, { Component } from 'react';
import $ from 'jquery';
import UserLayout from '../../../hoc/User';
import { connect } from 'react-redux';
import LoadMoreStaff from '../humanResource/LoadMoreStaff';
import {
  getStaffProfileLists,
  clearProfileDetails
} from '../../../actions/profile';

/**
 * StaffProfiles
 */
class StaffProfiles extends Component {
  componentDidMount = () => {
    this.props.dispatch(getStaffProfileLists());
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
              &nbsp;&nbsp;Human Resource
            </h1>
            <div className='columns'>
              <div className='column'>
                <div className='card'>
                  <header
                    className='card-header'
                    style={{
                      backgroundColor: 'whitesmoke'
                    }}
                  >
                    <p className='card-header-title'>Teacher Lists</p>
                  </header>

                  <div className='columns is-variable is-desktop p-1'>
                    <div className='staff-container'>
                      <LoadMoreStaff profiles={profile.staffList} />
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
  profile: state.profile
});

export default connect(mapStateToProps)(StaffProfiles);

import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import EditStaff from './EditStaff';
import { getStaffProfileById } from '../../../actions/profile';
import Spinner from '../../spinner/Spinner';
import UserLayout from '../../../hoc/User';

class EditStaffProfile extends Component {
  componentDidMount() {
    const match = this.props.match;
    this.props.dispatch(getStaffProfileById(match.params.profile_id));
  }

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
    return this.props.profile.staffProfileById === null ? (
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
              Staff Profile
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
                  <Spinner />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    ) : (
      <EditStaff
        profile_id={this.props.match.params.profile_id}
        staffProfile={this.props.profile.staffProfileById}
      />
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps)(EditStaffProfile);

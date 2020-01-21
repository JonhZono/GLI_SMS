import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../hoc/User';
import Spinner from '../../../spinner/Spinner';
import { getCurrentStaffProfile } from '../../../../actions/profile';

import { Link } from 'react-router-dom';
import ProfileInfoStaff from './ProfileInfoStaff';

/** Check if user already has profile or not, show Create Profile Button*/

const StaffProfile = props => {
  useEffect(() => {
    props.getCurrentStaffProfile();
  }, [getCurrentStaffProfile]);

  return props.profile.loading && props.profile.staffProfile === null ? (
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
            &nbsp;&nbsp;Staff Profile
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
                  <p className='card-header-title'>Profile Information</p>
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
            <i class='fas fa-arrow-circle-right' />
            &nbsp;&nbsp;Staff Profile
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
                  <p className='card-header-title'>Profile Information</p>
                </header>
                {props.profile.staffProfile !== null ? (
                  <ProfileInfoStaff staffProfile={props.profile.staffProfile} />
                ) : (
                  <div className='card-content'>
                    <div className='content'>
                      <div className='columns'>
                        <div
                          className='column'
                          style={{ marginTop: '14px', fontSize: '18px' }}
                        >
                          <span>
                            <i class='far fa-hand-point-right' />
                            &nbsp;&nbsp;Please set up your own profile here...
                          </span>
                        </div>
                        <div className='column'>
                          <Link
                            to='/user/staff/create/profile'
                            className='button is-outlined buttonForm'
                          >
                            Create Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentStaffProfile })(
  StaffProfile
);

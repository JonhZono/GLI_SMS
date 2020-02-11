import React from 'react';
import { connect } from 'react-redux';
import UserLayout from '../../../../hoc/User';
import Spinner from '../../../spinner/Spinner';
import RenderFeedback from './RenderFeedback';
const Report = props => {
  return props.user.loading && props.user === null ? (
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
            &nbsp;&nbsp;Information
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
                  <p className='card-header-title'>Options List</p>
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
            <i className='fas fa-arrow-circle-right' />
            &nbsp;&nbsp;Information
          </h1>
          <div className='columns'>
            <div className='column'>
              <div className='card has-text-centered'>
                <div className='card'>
                  <div className='card-content'>
                    <RenderFeedback
                      user_id={props.user.id}
                      name={props.user.name}
                      loading={props.user.loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(Report);

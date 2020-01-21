import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { adminGetUser } from '../../../actions/user';
import UserLayout from '../../../hoc/User';
import CreateUser from './CreateUser';
import UserLists from './UserLists';
import Spinner from '../../spinner/Spinner';

class GenerateUser extends Component {
  state = {};
  componentWillMount = () => {
    this.props.dispatch(adminGetUser());
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
    if (this.props.user.loading && this.props.user.userLists.length > 0) {
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
                &nbsp;&nbsp;Generate User
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
                      <p className='card-header-title'>Lists of User</p>
                      <CreateUser />
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
              &nbsp;&nbsp;Generate User
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
                    <p className='card-header-title'>Lists of User</p>
                    <CreateUser />
                  </header>

                  <UserLists
                    userLists={this.props.user.userLists}
                    loading={this.props.user.loading}
                  />
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
  user: state.user
});

export default connect(mapStateToProps)(GenerateUser);

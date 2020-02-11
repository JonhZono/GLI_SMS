import React, { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { adminGetUser } from '../../../actions/user';
import { adminGetDueFeeLists, clearFee } from '../../../actions/duefee';
import UserLayout from '../../../hoc/User';
import CreateFee from './CreateFee';
import FeeLists from './FeeLists';
import Spinner from '../../spinner/Spinner';

class StudentFee extends Component {
  state = {};
  componentWillMount = () => {
    this.props.dispatch(adminGetUser());
    this.props.dispatch(adminGetDueFeeLists());
  };
  componentWillUnmount = () => {
    this.props.dispatch(clearFee());
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
    if (this.props.fee.loading && this.props.fee.adminGetFeeLists === null) {
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
                &nbsp;&nbsp;Monthly Fee
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
                      <p className='card-header-title'>Fee Lists</p>
                      <CreateFee
                        feeLists={this.props.fee.adminGetFeeLists.length}
                      />
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
              &nbsp;&nbsp;Monthly Fee
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
                    <p className='card-header-title'>Fee Lists</p>

                    <CreateFee
                      feeLists={this.props.fee.adminGetFeeLists.length}
                    />
                  </header>

                  <FeeLists
                    feeLists={this.props.fee.adminGetFeeLists}
                    loading={this.props.fee.loading}
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
  user: state.user,
  fee: state.fee
});

export default connect(mapStateToProps)(StudentFee);

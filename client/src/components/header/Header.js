import React, { Component } from 'react';
import $ from 'jquery';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions/user';
import { ReactComponent as Logo } from '../../assets/headerLogo.svg';

class Header extends Component {
  state = {
    user: [
      {
        name: 'Log In',
        linkTo: '/user/notifications',
        public: true
      },
      {
        name: 'Profile',
        linkTo: '/user/student/profile',
        public: false
      },
      {
        name: 'Profile_Admin',
        linkTo: '/user/admin/profile',
        public: false
      },
      {
        name: 'Profile_Staff',
        linkTo: '/user/staff/profile',
        public: false
      },
      {
        name: 'Log Out',
        linkTo: '/',
        public: false
      }
    ]
  };

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

      /*function setMenuHeight() {
              var navbarHeight = $('.navbar').outerHeight();
              $('.menu-wrapper')
                .outerHeight(document.documentElement.clientHeight - navbarHeight)
                .niceScroll({
                  emulatetouch: true
                });
            }
            setMenuHeight();
            $(window).on('resize', function() {
              setMenuHeight();
            });*/
    });
  };

  showNavLink = type => {
    let lists = [];
    if (this.props.user) {
      type.forEach(item => {
        if (!this.props.user.isAuth) {
          if (item.public === true) {
            lists.push(item);
          }
        } else {
          if (item.name !== 'Log in') {
            lists.push(item);
          }
        }
      });
    }

    return lists.map((item, i) => {
      return this.defaultLink(item, i);
    });
  };
  logOutHandler = () => {
    this.props.dispatch(logOut(this.props.history));
  };

  defaultLink = (item, i) =>
    item.name === 'Log Out' ? (
      <Link
        to={item.linkTo}
        onClick={this.logOutHandler}
        key={i}
        style={{ color: 'hsl(0, 0%, 29%)' }}
        className='has-text-centered'
      >
        &nbsp;{' '}
        {item.name === 'Log Out' && (
          <span className='headerDivider'>
            <span className='tag is-warning'>
              <i className='fas fa-sign-out-alt has-text-whitesmoke' />
              &nbsp; {item.name}
            </span>
          </span>
        )}
        &nbsp;&nbsp;&nbsp; {/* Login here after we have landing page */}
      </Link>
    ) : (
      <Link
        to={item.linkTo}
        key={i}
        style={{ color: 'hsl(0, 0%, 29%)' }}
        className='has-text-centered'
      >
        &nbsp;{' '}
        {item.name === 'Profile' && this.props.user.role === 'student' ? (
          <span className='tag is-link'>
            <i className='far fa-user-circle has-text-whitesmoke' />
            &nbsp; {this.props.user.name}
          </span>
        ) : item.name === 'Profile_Staff' &&
          this.props.user.role === 'staff' ? (
          <span className='tag is-link'>
            <i className='far fa-user-circle has-text-whitesmoke' />
            &nbsp; {this.props.user.name}
          </span>
        ) : item.name === 'Profile_Admin' &&
          this.props.user.role === 'admin' ? (
          <span className='tag is-link'>
            <i className='far fa-user-circle has-text-whitesmoke' />
            &nbsp; {this.props.user.name}
          </span>
        ) : (
          ''
        )}
        &nbsp;&nbsp;&nbsp;
        {/* Login here after we have landing page */}
      </Link>
    );

  render() {
    return (
      <nav
        className='navbar box-shadow-y'
        style={{
          overflow: 'auto',
          backgroundColor: '#f9f7f1',
          height: 'auto',
          position: 'fixed',
          top: 0,
          width: '100%'
        }}
      >
        <div className='navbar-brand'>
          <Link to='#' className='navbar-burger toggler'>
            <span></span>
            <span></span>
            <span></span>
          </Link>

          <Link
            to='/user/dashboard'
            className='navbar-item has-text-danger has-text-weight-bold'
          ></Link>
          {/*<Logo style={{ width: '160px', height: 'auto', margin: '0' }} />*/}
          <Link to='/user/dashboard' style={{ paddingTop: '13px' }}>
            <span
              style={{
                color: '#546b91',
                textAlign: 'center',
                fontSize: '18px'
              }}
            >
              <b>
                <i class='fas fa-book-reader' />&nbsp;
                Global Learner's Institute
              </b>
            </span>
          </Link>
          <Link to='#' className='navbar-burger nav-toggler'>
            <span></span>
            <span></span>
            <span></span>
          </Link>
        </div>
        <div className='navbar-menu has-background-lighter'>
          <div className='navbar-start'>{/* Start */}</div>
          <div className='navbar-end'>
            <div className='navbar-item'>
              {this.showNavLink(this.state.user)}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(mapStateToProps)(withRouter(Header));

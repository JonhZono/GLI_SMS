import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const links = [
  {
    name: 'Dashboard',
    linkTo: '/user/dashboard'
  },
  {
    name: 'Student',
    linkTo: '/user/student/profiles'
  },
  {
    name: 'Information',
    linkTo: '/user/student/feedback/view'
  },
  {
    name: 'Human Resource',
    linkTo: '/user/staff/profiles'
  },
  {
    name: 'My Report',
    linkTo: '/user/student/report'
  },
  {
    name: 'Analysis',
    linkTo: '/user/analysis'
  },
  {
    name: 'Exam Score',
    linkTo: '/user/exam/scores'
  },
  {
    name: 'Payment',
    linkTo: '/user/view/payment'
  },
  {
    name: 'News & Events',
    linkTo: '/user/view/newsletter'
  },
  {
    name: 'Daily Feedback',
    linkTo: '/user/feedbacks/history'
  }
];
const admin = [
  {
    name: 'Generate User',
    linkTo: '/admin/generate/user'
  },
  {
    name: 'Configuration',
    linkTo: '/admin/config/data'
  },
  {
    name: 'Create News Letter',
    linkTo: '/admin/create/newsletter'
  },
  {
    name: 'Monthly Fee',
    linkTo: '/admin/view/duefee/lists'
  }
];

const UserLayout = props => {
  const generateAsideLink = links =>
    links.map((item, i) =>
      item.name === 'Dashboard' ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i
            className='fas fa-tachometer-alt'
            style={{ marginRight: '10px' }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Generate User' ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='fas fa-user-cog' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Configuration' ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='fas fa-cogs' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Student' &&
        (props.user.role === 'admin' || props.user.role === 'staff') ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='fas fa-user-graduate' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Information' && props.user.role === 'student' ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='fas fa-user-graduate' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Human Resource' ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='fas fa-id-card' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Analysis' &&
        (props.user.role === 'admin' || props.user.role === 'staff') ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='fas fa-chart-line' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'My Report' && props.user.role === 'student' ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='fas fa-chart-line' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Exam Score' &&
        (props.user.role === 'admin' || props.user.role === 'staff') ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='far fa-edit' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Payment' && props.user.role === 'student' ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='far fa-edit' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'News & Events' ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='fas fa-newspaper' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Daily Feedback' &&
        (props.user.role === 'admin' || props.user.role === 'staff') ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='fas fa-history' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Create News Letter' ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i className='fas fa-history' style={{ marginRight: '10px' }} />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : item.name === 'Monthly Fee' ? (
        <Link to={item.linkTo} key={i} className='has-text-light'>
          <i
            className='far fa-money-bill-alt'
            style={{ marginRight: '10px' }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;{item.name}
        </Link>
      ) : (
        ''
      )
    );

  return (
    <Fragment>
      <div className='columns is-variable is-3'>
        <div className='column'>
          <div className='menu-container'>
            {/* style={{backgroundColor: '#89ABE3FF'}} */}
            <div
              className='menu-wrapper py-1 fontStyle'
              style={{
                minHeight: '93vh',
                backgroundColor: '#273746'
              }}
            >
              <aside
                className='menu'
                style={{
                  fontSize: '16px'
                }}
              >
                <p className='menu-label has-text-light has-text-weight-bold'>
                  User Module
                </p>
                <ul className='menu-list'>{generateAsideLink(links)}</ul>

                <br />
                {props.user.role === 'admin' ? (
                  <Fragment>
                    <p className='menu-label has-text-light has-text-weight-bold'>
                      Admin Module
                    </p>
                    <ul className='menu-list'>{generateAsideLink(admin)}</ul>
                  </Fragment>
                ) : null}
              </aside>
            </div>
          </div>
        </div>

        {props.children}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UserLayout);

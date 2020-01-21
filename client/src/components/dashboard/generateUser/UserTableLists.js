import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminDeleteUserAccountById } from '../../../actions/user';
import Moment from 'react-moment';

class UserTableLists extends Component {
  deleteUserAccount = () => {
    console.log(this.props._id);
    this.props.dispatch(adminDeleteUserAccountById(this.props._id));
  };

  render() {
    const props = this.props;
    return (
      <tbody className='CenterText'>
        <tr>
          <td>{props && props.name}</td>
          <td>{props && props.email}</td>
          <td>
            {props && <Moment format='YYYY/MM/DD'>{props.createdAt}</Moment>}
          </td>
          {props.role === 'student' && (
            <td>
              <span class='tag is-warning'>{props.role}</span>
            </td>
          )}
          {props.role === 'staff' && (
            <td>
              <span class='tag is-primary'>{props.role}</span>
            </td>
          )}
          {props.role === 'admin' && (
            <td>
              <span class='tag is-link'>{props.role}</span>
            </td>
          )}

          <td>
            <span>
              <Link
                to={`/admin/user/reset/password/${props._id}`}
                className='tag is-primary'
                style={{ margin: '3px' }}
              >
                <span className='icon is-small'>
                  <i className='fas fa-pencil-alt' />
                </span>
                <span>Edit</span>
              </Link>
              {props.user.role === 'admin' && (
                <button
                  onClick={this.deleteUserAccount}
                  className='tag is-danger'
                  style={{ margin: '3px' }}
                >
                  <span className='icon is-small'>
                    <i className='fas fa-times' aria-hidden='true' />
                  </span>
                  <span>Delete</span>
                </button>
              )}
            </span>
          </td>
        </tr>
      </tbody>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});

export default connect(mapStateToProps)(withRouter(UserTableLists));

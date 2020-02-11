import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminDeleteUserAccountById } from '../../../actions/user';
import Moment from 'react-moment';

class UserTableLists extends Component {
  deleteUserAccount = () => {
    this.props.dispatch(adminDeleteUserAccountById(this.props._id));
  };

  render() {
    const props = this.props;
    return (
      <tbody className='CenterText'>
        <tr>
          <td>{props && props.name}</td>
          <td>{props && props.email}</td>
          <td style={{ color: 'grey', fontSize: '12px' }}>
            {props && <Moment format='LLLL'>{props.createdAt}</Moment>}
          </td>
          {props.role === 'student' && (
            <td>
              <span className='tag is-warning'>{props.role}</span>
            </td>
          )}
          {props.role === 'staff' && (
            <td>
              <span className='tag is-primary'>{props.role}</span>
            </td>
          )}
          {props.role === 'admin' && (
            <td>
              <span className='tag is-link'>{props.role}</span>
            </td>
          )}

          <td>
            <span>
              {/*<Link
                to={`/admin/user/reset/password/${props._id}`}
                className='tag is-primary'
                style={{ margin: '3px' }}
              >
                <span className='icon is-small'>
                  <i className='fas fa-pencil-alt' />
                </span>
                <span>Edit</span>
              </Link>*/}
              {props.user.role === 'admin' && (
                <button
                  onClick={this.deleteUserAccount}
                  className='button is-small is-danger'
                  style={{ margin: '3px', fontSize: '10px' }}
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
  user: state.user
});

export default connect(mapStateToProps)(withRouter(UserTableLists));

import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStaffProfileById } from '../../../actions/profile';
import Moment from 'react-moment';

class StaffCard extends Component {
  deleteStaffProfile = () => {
    this.props.dispatch(
      deleteStaffProfileById(this.props._id, this.props.history)
    );
  };
  render() {
    const props = this.props;

    return (
      <div className='staff_card_block'>
        <div className='column'>
          <div className='card'>
            <div className='card-content'>
              <div className='media'>
                <div className='media-left'>
                  <figure className='image is-48x48'>
                    {props.image ? (
                      props.image.map(item => (
                        <img
                          key={item.public_id}
                          src={item.url}
                          alt='user'
                          className='is-rounded'
                        />
                      ))
                    ) : (
                      <img
                        className='is-rounded'
                        src={props.user.avatar}
                        alt='user'
                      />
                    )}
                  </figure>
                </div>
                <div className='media-content'>
                  <p className='title is-4'>{props.name}</p>
                </div>
              </div>
              <div className='content'>
                {props.bio}
                <br />
                <p style={{ fontSize: '12px', color: 'grey' }}>
                  <Moment format='LLLL'>{props.createdAt}</Moment>
                </p>
              </div>
            </div>
            {/**Button Available Edit and delete to only admin and staff */}
            <footer className='card-footer'>
              <Link
                to={`/user/staff/profile/${props._id}`}
                className='card-footer-item'
                style={{ color: '#004973' }}
              >
                <span className='icon is-small'>
                  <i className='fas fa-info' aria-hidden='true' />
                  &nbsp;&nbsp;View
                </span>
              </Link>
              {props.user.role === 'admin' || props.user.role === 'staff' ? (
                <Fragment>
                  <Link
                    to={`/user/staff/profile/edit/${props._id}`}
                    className='card-footer-item'
                    style={{ color: '#004973' }}
                  >
                    <span className='icon is-small has-text-success'>
                      <i className='fas fa-pencil-alt' />
                      &nbsp;&nbsp;Edit
                    </span>
                  </Link>
                  <button
                    onClick={this.deleteStaffProfile}
                    className='card-footer-item'
                    style={{ color: '#004973', background: 'none' }}
                  >
                    <span className='icon is-small has-text-danger'>
                      <i className='fas fa-trash-alt' aria-hidden='true' />
                      &nbsp;&nbsp;Remove
                    </span>
                  </button>
                </Fragment>
              ) : (
                ''
              )}
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withRouter(StaffCard));

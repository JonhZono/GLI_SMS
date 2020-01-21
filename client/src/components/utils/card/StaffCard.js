import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStaffProfileById } from '../../../actions/profile';

class StaffCard extends Component {
  deleteStaffProfile = () => {
    this.props.dispatch(
      deleteStaffProfileById(this.props._id, this.props.history)
    );
  };
  render() {
    const props = this.props;
    console.log(props);
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
                  <p className='subtitle is-6'>@{props.user.name}</p>
                </div>
              </div>
              <div className='content'>
                {props.bio}
                <br />
                <time datetime='2016-1-1'>11:09 PM - 1 Jan 2016</time>
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
                </span>
              </Link>
              <Link
                to={`/user/staff/profile/edit/${props._id}`}
                className='card-footer-item'
                style={{ color: '#004973' }}
              >
                <span className='icon is-small has-text-success'>
                  <i className='fas fa-pencil-alt' />
                </span>
              </Link>
              <button
                onClick={this.deleteStaffProfile}
                className='card-footer-item'
                style={{ color: '#004973', background: 'none' }}
              >
                <span className='icon is-small has-text-danger'>
                  <i className='fas fa-trash-alt' aria-hidden='true' />
                </span>
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(StaffCard));

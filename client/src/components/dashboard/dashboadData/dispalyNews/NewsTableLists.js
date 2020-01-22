import React, { Component } from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../../../../actions/post';

class NewsTableLists extends Component {
  deletePost = () => {
    this.props.dispatch(deletePost(this.props._id, this.props.history));
  };
  render() {
    const props = this.props; //post props

    return (
      <tr>
        <td>
          <Link to={`/user/view/news/post/${this.props._id}`}>
            <span className='has-text-link' style={{ fontSize: '14px' }}>
              <b>{props && props.title}</b>
            </span>
          </Link>
        </td>
        <td>
          <Link to={`/user/view/news/post/${this.props._id}`}>
            <span className='has-text-grey' style={{ fontSize: '11px' }}>
              <Moment format='LLLL'>{props && props.createdAt}</Moment>
            </span>
          </Link>
        </td>
        <td>
          {props.status === 'starting' ? (
            <p
              className='has-text-centered'
              style={{ fontSize: '14px', color: 'grey' }}
            >
              Status:{' '}
              <span className='tag is-grey'>
                {' '}
                <b>{props.status}</b>
              </span>
            </p>
          ) : props.status === 'on-going' ? (
            <p style={{ fontSize: '14px', color: 'grey' }}>
              Status:
              <span className='tag is-info'>
                <b>{props.status}</b>
              </span>
            </p>
          ) : props.status === 'finished' ? (
            <p
              className='has-text-centered'
              style={{ fontSize: '14px', color: 'grey' }}
            >
              Status:
              <span className='tag is-danger'>
                <b>{props.status}</b>
              </span>
            </p>
          ) : (
            ''
          )}
        </td>
      </tr>
    );
  }
}

export default connect()(NewsTableLists);

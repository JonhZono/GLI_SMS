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
              {props && props.title}
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
          {props.status === 'upcoming' ? (
            <p
              className='has-text-centered'
              style={{ fontSize: '14px', color: 'grey' }}
            >
              <span className='tag is-primary'> 準備中</span>
            </p>
          ) : props.status === 'onGoing' ? (
            <p
              style={{ fontSize: '14px', color: 'grey' }}
              className='has-text-centered'
            >
              <span className='tag is-info'>受付中</span>
            </p>
          ) : props.status === 'finished' ? (
            <p
              className='has-text-centered'
              style={{ fontSize: '14px', color: 'grey' }}
            >
              <span className='tag is-danger'>受付終了</span>
            </p>
          ) : (
            ''
          )}
        </td>
        <td>
          <span
            className='has-text-centered'
            style={{ fontSize: '14px', color: 'grey' }}
          >
            {props && props.type}
          </span>
        </td>
      </tr>
    );
  }
}

export default connect()(NewsTableLists);

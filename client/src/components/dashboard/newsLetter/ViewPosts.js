import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addInterest, removeInterest, deletePost } from '../../../actions/post';

const ViewPosts = ({
  history,
  posts: { name, title, comments, _id, avatar, date, image, status },
  deletePost,
  user: { role }
}) => {
  const adminDeletePost = _id => {
    console.log('delete');
    deletePost(_id, history);
  };
  console.log(status);
  return (
    <div className='cardRecord'>
      <div className='image'>
        {image.map(item => (
          <img key={item.public_id} src={item.url} />
        ))}
      </div>
      <div className='title'>
        <h1>
          <b>{title}</b>
        </h1>
      </div>

      <span style={{ fontSize: '14px', color: 'grey' }}>
        Posted By: <b>{name}</b> <br />
        <Moment format='LLLL'>{date}</Moment>
        {status === 'starting' ? (
          <p
            className='has-text-centered'
            style={{ fontSize: '14px', color: 'grey' }}
          >
            Event Status:{' '}
            <span className='tag is-grey'>
              {' '}
              <b>{status}</b>
            </span>
          </p>
        ) : status === 'onGoing' ? (
          <p style={{ fontSize: '14px', color: 'grey' }}>
            Event Status:
            <span className='tag is-info'>
              <b>{status}</b>
            </span>
          </p> ? (
            status === 'finished'
          ) : (
            <p
              className='has-text-centered'
              style={{ fontSize: '14px', color: 'grey' }}
            >
              Event Status:
              <span className='tag is-danger'>
                <b>{status}</b>
              </span>
            </p>
          )
        ) : (
          ''
        )}
      </span>
      <div className='nav-button'>
        <Link
          to={`/user/view/news/post/${_id}`}
          className='cardButton has-text-light'
        >
          <span className='icon is-small'>
            <i class='far fa-hand-point-right' />
            &nbsp;Check
          </span>
        </Link>
        <Link
          to={`/admin/edit/post/${_id}`}
          className='cardButton has-text-light'
        >
          <span className='icon is-small'>
            <i class='far fa-hand-point-right' />
            &nbsp;Edit
          </span>
        </Link>
        <button
          className='cardButton has-text-light'
          onClick={e => adminDeletePost(_id)}
        >
          <span className='icon is-small'>
            <i class='far fa-hand-point-right' />
            &nbsp;Delete
          </span>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {
  addInterest,
  removeInterest,
  deletePost
})(withRouter(ViewPosts));

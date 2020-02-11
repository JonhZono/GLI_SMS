import React, { Fragment, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost } from '../../../actions/post';

class ViewPosts extends Component {
  adminDeletePost = _id => {
    this.props.dispatch(deletePost(this.props.posts._id, this.props.history));
  };
  //Important Noticed: Can not clearViewPost here, since it affect delete function

  render() {
    const posts = this.props.posts;

    return (
      <div className='cardRecord'>
        <div className='image'>
          {posts.image.map(item => (
            <img key={item.public_id} src={item.url} alt='user' />
          ))}
        </div>
        <div className='title'>
          <Link to={`/user/view/news/post/${posts._id}`}>
            <h1>
              <b>{posts.title}</b>
            </h1>
          </Link>
        </div>

        <span style={{ fontSize: '14px', color: 'grey' }}>
          Posted By: <b>{posts.name}</b> <br />
          <Moment format='LLLL'>{posts.date}</Moment>
          {posts.status === 'upcoming' ? (
            <p
              className='has-text-centered'
              style={{ fontSize: '14px', color: 'grey' }}
            >
              Status:{' '}
              <span className='tag is-primary'>
                {' '}
                準備中
              </span>
            </p>
          ) : posts.status === 'onGoing' ? (
            <p
              style={{ fontSize: '14px', color: 'grey' }}
              className='has-text-centered'
            >
              Status:{' '}
              <span className='tag is-info'>
                受付中
              </span>
            </p>
          ) : posts.status === 'finished' ? (
            <p
              className='has-text-centered'
              style={{ fontSize: '14px', color: 'grey' }}
            >
              Status:{' '}
              <span className='tag is-danger'>
                受付終了
              </span>
            </p>
          ) : (
            ''
          )}
        </span>
        
        <div style={{marginTop: '12px'}}>
          <Link
            to={`/user/view/news/post/${posts._id}`}
            className='button is-small is-link'
            style={{ marginRight: '16px', fontSize: '13px' }}
          >
            <i className='far fa-hand-point-right' />
            &nbsp; Check
          </Link>
          {this.props.user.role === 'admin' && (
            <Fragment>
              <Link
                to={`/admin/edit/post/${posts._id}`}
                className='button is-small is-primary'
                style={{ marginRight: '16px', fontSize: '13px' }}
              >
                <i className='fas fa-pencil-alt' />
                &nbsp;Edit
              </Link>
              <button
                className='button is-small is-danger has-text-light'
                onClick={this.adminDeletePost}
                style={{ marginRight: '16px', fontSize: '13px' }}
              >
                <i className='far fa-trash-alt' />
                &nbsp;Delete
              </button>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withRouter(ViewPosts));

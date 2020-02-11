import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import {
  clearViewPost,
  getPostLikes,
  removeLike,
  getSnsLikes,
  removeSns
} from '../../../actions/post';
import ListOfLikes from './ListOfLikes';
import SnsLists from './SnsLists';

class RenderPostArticle extends Component {
  componentWillUnmount = () => {
    this.props.dispatch(clearViewPost());
  };

  getLikes = () => {
    this.props.dispatch(getPostLikes(this.props.post._id));
  };
  unLike = () => {
    this.props.dispatch(removeLike(this.props.post._id));
  };

  getSns = () => {
    this.props.dispatch(getSnsLikes(this.props.post._id));
  };
  noSns = () => {
    this.props.dispatch(removeSns(this.props.post._id));
  };
  render() {
    const post = this.props.post;
    const getLikes = this.props.getLikes;
    const getSns = this.props.getSns;
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
    });
    return post.type === 'Event' ? (
      <Fragment>
        <section className='hero is-info is-bold is-small promo-block'>
          {post.image.map(item => (
            <img key={item.public_id} src={item.url} alt='user' />
          ))}
        </section>

        <div className='section'>
          <h1 className='has-text-centered' style={{ fontSize: '30px' }}>
            <b>{post.title}</b>
          </h1>
          <p
            className='has-text-centered'
            style={{ fontSize: '14px', color: 'grey' }}
          >
            Posted By: <b>{post.name}</b> -{' '}
            <Moment format='LLLL'>{post.date}</Moment>
          </p>
          <p
            className='has-text-centered'
            style={{ fontSize: '14px', color: 'grey' }}
          >
            Post Type: <b>{post.type}</b>
          </p>
          {post.status === 'upcoming' ? (
            <p
              className='has-text-centered'
              style={{ fontSize: '14px', color: 'grey' }}
            >
              Event Status:{' '}
              <span className='tag is-primary'>
                {' '}
                準備中
              </span>
            </p>
          ) : post.status === 'onGoing' ? (
            <p
              style={{ fontSize: '14px', color: 'grey' }}
              className='has-text-centered'
            >
              Event Status:{' '}
              <span className='tag is-info'>
                受付中
              </span>
            </p>
          ) : post.status === 'finished' ? (
            <p
              className='has-text-centered'
              style={{ fontSize: '14px', color: 'grey' }}
            >
              Event Status:{' '}
              <span className='tag is-danger'>
                受付終了
              </span>
            </p>
          ) : (
            ''
          )}

          <br />
          <p className='p_wrap'>{post.event}</p>
          <br />
          <section className='hero is-info is-bold is-small promo-block'>
            {post.image1.map(item => (
              <img key={item.public_id} src={item.url} alt='user' />
            ))}
          </section>
          <br />
          {/**Button SNS & Join */}
          <div className='card'>
            <div className='content'>
              <p style={{ fontSize: '17px', padding: '5px' }}>
                &nbsp;
                <i className='far fa-hand-point-right' />
                &nbsp;下記のボタンをクリック
              </p>
              <div className='columns is-fullwidth has-text-centered'>
                <div className='column'>
                  <button
                    onClick={this.getLikes}
                    className='button is-success is-small'
                  >
                    参加&nbsp;<span>🙂</span>
                  </button>
                  &nbsp;&nbsp;
                  {getLikes.length > 0 && (
                    <span style={{ fontSize: '12px' }} className='button is-small is-warning is-rounded'>{getLikes.length}</span>
                  )}
                  {getLikes.length > 0
                    ? getLikes.map(like => (
                        <ListOfLikes key={like._id} {...like} />
                      ))
                    : ''}
                </div>
                <div className='column'>
                  <button
                    onClick={this.unLike}
                    className='button is-danger is-small'
                  >
                    不参加 &nbsp;<span>🙁</span>
                  </button>
                </div>
                <div className='column'>
                  <button
                    onClick={this.getSns}
                    className='button is-success is-small'
                  >
                    SNS(顔出しOK)&nbsp;<span>🙂</span>
                  </button>
                  &nbsp;&nbsp;
                  {getSns.length > 0 && (
                    <span style={{ fontSize: '12px' }} className='button is-small is-warning is-rounded'>{getSns.length}</span>
                  )}
                  {getSns.length > 0
                    ? getSns.map(sns => <SnsLists key={sns._id} {...sns} />)
                    : ''}
                </div>
                <div className='column'>
                  <button
                    onClick={this.noSns}
                    className='button is-danger is-small'
                  >
                    SNS(顔出しNG)&nbsp;<span>🙁</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    ) : post.type === 'News Letter' ? (
      <Fragment>
        <section className='hero is-info is-bold is-small promo-block'>
          {post.image.map(item => (
            <img key={item.public_id} src={item.url} alt='user' />
          ))}
        </section>
        <div className='section'>
          <h1 className='has-text-centered' style={{ fontSize: '30px' }}>
            <b>{post.title}</b>
          </h1>
          <p
            className='has-text-centered'
            style={{ fontSize: '14px', color: 'grey' }}
          >
            Posted By: <b>{post.name}</b> -{' '}
            <Moment format='LLLL'>{post.date}</Moment>
          </p>
          <p
            className='has-text-centered'
            style={{ fontSize: '14px', color: 'grey' }}
          >
            Post Type: <b>{post.type}</b>
          </p>
          <br />
          <p className='p_wrap'>{post.descriptions}</p>
          <br />
          <section className='hero is-info is-bold is-small promo-block'>
            {post.image1.map(item => (
              <img key={item.public_id} src={item.url} alt='user' />
            ))}
          </section>
        </div>{' '}
      </Fragment>
    ) : (
      <p>Nothing Here</p>
    );
  }
}

export default connect(null)(withRouter(RenderPostArticle));

import React, { Fragment, useEffect } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { addInterest, removeInterest } from '../../../actions/post';

const RenderPostArticle = ({
  post: {
    name,
    title,
    comments,
    status,
    _id,
    avatar,
    date,
    descriptions,
    image
  }
}) => {
  useEffect(() => {
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
  }, []);
  return (
    <Fragment>
      <section className='hero is-info is-bold is-small promo-block'>
        {image.map(item => (
          <figure className='image is-5by3'>
            <img key={item.public_id} src={item.url} />
          </figure>
        ))}
      </section>

      <div className='section'>
        <h1 className='has-text-centered' style={{ fontSize: '30px' }}>
          <b>{title}</b>
        </h1>
        <p
          className='has-text-centered'
          style={{ fontSize: '14px', color: 'grey' }}
        >
          Posted By: <b>{name}</b> - <Moment format='LLLL'>{date}</Moment>
        </p>
        {status === 'starting' ? (
          <p
            className='has-text-centered'
            style={{ fontSize: '14px', color: 'grey' }}
          >
            Status:{' '}
            <span className='tag is-grey'>
              {' '}
              <b>{status}</b>
            </span>
          </p>
        ) : status === 'on-going' ? (
          <p style={{ fontSize: '14px', color: 'grey' }}>
            Status:
            <span className='tag is-info'>
              <b>{status}</b>
            </span>
          </p>
        ) : status === 'finished' ? (
          <p
            className='has-text-centered'
            style={{ fontSize: '14px', color: 'grey' }}
          >
            Status:
            <span className='tag is-danger'>
              <b>{status}</b>
            </span>
          </p>
        ) : (
          ''
        )}

        <br />
        <p style={{ fontSize: '20px' }}>{descriptions}</p>
      </div>
      {/**If you interest please leave a comment below the article, thank you from GLI*/}
    </Fragment>
  );
};

export default connect(null, {
  addInterest,
  removeInterest
})(withRouter(RenderPostArticle));

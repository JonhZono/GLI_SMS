import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { addInterest, removeInterest } from '../../../actions/post';

const RenderPostArticle = ({
  post: {
    name,
    title,
    likes,
    comments,
    status,
    _id,
    avatar,
    date,
    descriptions,
    image
  },
  addInterest,
  removeInterest
}) => {
  console.log(likes.length);
  console.log(image);
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

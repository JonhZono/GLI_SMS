import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import Moment from 'react-moment';

const ViewDetailsFeedback = props => {
  return props.studentFeedback === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='hero is-info is-bold is-small promo-block'>
        {props.studentFeedback.image.length > 0 &&
          props.studentFeedback.image.map(item => (
            <img key={item.public_id} src={item.url} alt='user' />
          ))}
      </section>
      <div className='section'>
        <div style={{ fontSize: '18px' }}>
          <p>
            <b>Send To Parents: </b>
            {props.studentFeedback && props.studentFeedback.email}
          </p>
          <p>
            <b>Lesson ID:</b>{' '}
            {props.studentFeedback && props.studentFeedback.lessonID}
          </p>
          <p>
            <b>Student:</b>{' '}
            {props.studentFeedback && props.studentFeedback.name}
          </p>
          <p>
            <b>Term Code: </b>
            {props.studentFeedback && (
              <span className='tag is-success'>
                {props.studentFeedback.termCode}
              </span>
            )}
          </p>
          <p>
            <b>Created At: </b>
            {props.studentFeedback && (
              <Moment format='LLLL'>{props.studentFeedback.createdAt}</Moment>
            )}
          </p>
          <p>
            <b>Grade: </b>
            {props.studentFeedback.grade && props.studentFeedback.grade.name}
          </p>
          <p>
            <b>Teacher: </b>
            {props.studentFeedback.teacher &&
              props.studentFeedback.teacher.name}
          </p>
        </div>

        <br />

        {props.studentFeedback && (
          <p className='p_wrap_feedback' style={{ fontSize: '18px' }}>
            {props.studentFeedback.lessonContent}
          </p>
        )}

        <p style={{ fontSize: '18px', marginTop: '20px'}}>
          <b>GLI News </b>
          {props.studentFeedback && (
            <p className='p_wrap_feedback'>{props.studentFeedback.gliNews}</p>
          )}
        </p>
        <div style={{ marginTop: '15px' }}>
          <Link
            to={`/user/analysis/everyone/view/${props.studentFeedback.ownerId &&
              props.studentFeedback.ownerId._id}`}
            className='tag is-info'
            style={{ margin: '3px' }}
          >
            <span className='icon is-small'>
              <i className='fas fa-info' aria-hidden='true' />
            </span>
            <span>
              View {props.studentFeedback && props.studentFeedback.name} Monthly
              Analysis
            </span>
          </Link>
          <Link
            to={`/user/exam/score/everyone/view/${props.studentFeedback
              .ownerId && props.studentFeedback.ownerId._id}`}
            className='tag is-primary'
            style={{ margin: '3px' }}
          >
            <span className='icon is-small'>
              <i className='fas fa-info' aria-hidden='true' />
            </span>
            <span>
              View {props.studentFeedback && props.studentFeedback.name} Exam
              Score
            </span>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ViewDetailsFeedback;

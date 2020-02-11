import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import Moment from 'react-moment';

const ViewDetailsFeedback = props => {
  return props.studentFeedback === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='image'>
        {props.studentFeedback.image.length > 0 &&
          props.studentFeedback.image.map(item => (
            <img key={item.public_id} src={item.url} alt='user' />
          ))}
      </div>
      <table className='table is-striped is-hoverable is-fullwidth'>
        <tbody>
          <tr>
            <th>Send To Parent</th>
            <td>{props.studentFeedback && props.studentFeedback.email}</td>
          </tr>
          <tr>
            <th>Lesson ID</th>
            <td>{props.studentFeedback && props.studentFeedback.lessonID}</td>
          </tr>
          <tr>
            <th>Student</th>
            <td>{props.studentFeedback && props.studentFeedback.name}</td>
          </tr>
          <tr>
            <th>Term Code</th>
            <td>
              {props.studentFeedback && (
                <span className='tag is-success'>
                  {props.studentFeedback.termCode}
                </span>
              )}
            </td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>
              {props.studentFeedback && (
                <Moment format='LLLL'>{props.studentFeedback.createdAt}</Moment>
              )}
            </td>
          </tr>
          <tr>
            <th>Grade</th>
            <td>
              {props.studentFeedback.grade && props.studentFeedback.grade.name}
            </td>
          </tr>
          <tr>
            <th>Classroom</th>
            <td>
              {props.studentFeedback.classroom &&
                props.studentFeedback.classroom.name}
            </td>
          </tr>
          <tr>
            <th>Teacher</th>
            <td>
              {props.studentFeedback.teacher &&
                props.studentFeedback.teacher.name}
            </td>
          </tr>
          <tr>
            <th>GLI News</th>
            <td>
              {props.studentFeedback && (
                <p className='p_wrap_feedback'>
                  {props.studentFeedback.gliNews}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <th>Lesson Content</th>
            <td>
              {props.studentFeedback && (
                <p className='p_wrap_feedback'>
                  {props.studentFeedback.lessonContent}
                </p>
              )}
            </td>
          </tr>
          <tr>
            <th>
              Please Check <i className='far fa-hand-point-right' />
            </th>
            <td>
              <Link
                to={`/user/analysis/everyone/view/${props.studentFeedback
                  .ownerId && props.studentFeedback.ownerId._id}`}
                className='tag is-info'
                style={{ margin: '3px' }}
              >
                <span className='icon is-small'>
                  <i className='fas fa-info' aria-hidden='true' />
                </span>
                <span>
                  View {props.studentFeedback && props.studentFeedback.name}{' '}
                  Monthly Analysis
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
                  View {props.studentFeedback && props.studentFeedback.name}{' '}
                  Exam Score
                </span>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default ViewDetailsFeedback;

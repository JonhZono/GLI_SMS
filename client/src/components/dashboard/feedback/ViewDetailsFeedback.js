import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../spinner/Spinner';
import Moment from 'react-moment';

const ViewDetailsFeedback = props => {
  console.log(props.studentFeedback);
  return props.studentFeedback === null ? (
    <Spinner />
  ) : (
    <table className='table is-striped is-hoverable is-fullwidth'>
      <tbody>
        <tr>
          <th>Lesson ID</th>
          <td>{props.studentFeedback && props.studentFeedback.lessonID}</td>
        </tr>
        <tr>
          <th>Student</th>
          <td>{props.studentFeedback && props.studentFeedback.ownerId.name}</td>
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
              <Moment format='YYYY-MM-DD'>
                {props.studentFeedback.createdAt}
              </Moment>
            )}
          </td>
        </tr>
        <tr>
          <th>Grade</th>
          <td>{props.studentFeedback && props.studentFeedback.grade.name}</td>
        </tr>
        <tr>
          <th>Classroom</th>
          <td>
            {props.studentFeedback && props.studentFeedback.classroom.name}
          </td>
        </tr>
        <tr>
          <th>Teacher</th>
          <td>{props.studentFeedback && props.studentFeedback.teacher.name}</td>
        </tr>
        <tr>
          <th>GLI News</th>
          <td>{props.studentFeedback && props.studentFeedback.gliNews}</td>
        </tr>
        <tr>
          <th>Lesson Content</th>
          <td>
            {props.studentFeedback && props.studentFeedback.lessonContent}
          </td>
        </tr>
        <tr>
          <th>
            Please Check <i className='far fa-hand-point-right' />
          </th>
          <td>
            <Link
              to={`/user/analysis/everyone/view/${props.studentFeedback.ownerId._id}`}
              className='tag is-info'
              style={{ margin: '3px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-info' aria-hidden='true' />
              </span>
              <span>
                View{' '}
                {props.studentFeedback && props.studentFeedback.ownerId.name}{' '}
                Daily Performance
              </span>
            </Link>
            <Link
              to={`/user/exam/score/everyone/view/${props.studentFeedback.ownerId._id}`}
              className='tag is-primary'
              style={{ margin: '3px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-info' aria-hidden='true' />
              </span>
              <span>
                View{' '}
                {props.studentFeedback && props.studentFeedback.ownerId.name}{' '}
                Exam Score
              </span>
            </Link>
            <Link
              to={`/user/duefee/everyone/view/${props.studentFeedback.ownerId._id}`}
              className='tag is-danger'
              style={{ margin: '3px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-link' aria-hidden='true' />
              </span>
              <span>
                View{' '}
                {props.studentFeedback && props.studentFeedback.ownerId.name}{' '}
                Monthly Fee
              </span>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ViewDetailsFeedback;

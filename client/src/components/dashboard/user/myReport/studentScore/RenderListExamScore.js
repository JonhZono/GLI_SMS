import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const RenderListExamScore = props => {
  return (
    <tr>
      <td>
        <Link to={`/user/student/exam/score/view/${props._id}`}>
          {props ? (
            <Moment format='LLLL'>{props.createdAt}</Moment>
          ) : (
            <p>Please select date</p>
          )}
        </Link>
      </td>

      <td>
        {props.ownerId ? (
          <span className='tag is-primary'>{props.ownerId.name}</span>
        ) : (
          <p>Please put receiver</p>
        )}
      </td>
      <td>
        {props.teacher ? (
          <Link to={`/user/student/exam/score/view/${props._id}`}>
            {props.teacher.name}
          </Link>
        ) : (
          <p>Please put name</p>
        )}
      </td>
      <td>
        {props ? (
          <Moment format='LLLL'>{props.date}</Moment>
        ) : (
          <p>Date of exam</p>
        )}
      </td>
      <td>{props ? props.examName : <p>Name not available</p>}</td>
      <td>
        {props ? (
          <span className='tag is-whitesmoke'>
            <b>{props.listening} Points</b>
          </span>
        ) : (
          <p>Please put listening</p>
        )}
      </td>
      <td>
        {props ? (
          <span className='tag is-whitesmoke'>
            <b>{props.writing} Points</b>
          </span>
        ) : (
          <p>Please put writing</p>
        )}
      </td>
    </tr>
  );
};

export default connect()(RenderListExamScore);

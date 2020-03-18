import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const RenderListExamScore = props => {
  console.log(props.teacher);
  return (
    <tr>
      <td>
        <Link to={`/user/student/junior_eiken_exam/score/view/${props._id}`}>
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
          <Link to={`/user/student/junior_eiken_exam/score/view/${props._id}`}>
            {props.teacher.name}
          </Link>
        ) : (
          <p>Please put name</p>
        )}
      </td>
      <td>{props ? <p>{props.examDate}</p> : <p>Date of exam</p>}</td>
      <td>{props ? props.level : <p>Exam Level not selected</p>}</td>
      <td>
        {props ? (
          <span className='tag is-whitesmoke'>
            <b>{props.writing} Points</b>
          </span>
        ) : (
          <p>Please put writing</p>
        )}
      </td>
      <td>
        {props ? (
          <span className='tag is-whitesmoke'>
            <b>{props.alphabet} Points</b>
          </span>
        ) : (
          <p>Please put alphabet</p>
        )}
      </td>
    </tr>
  );
};

export default connect()(RenderListExamScore);

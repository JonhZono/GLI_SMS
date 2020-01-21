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
            <Moment format='YYYY/MM/DD'>{props.createdAt}</Moment>
          ) : (
            <p>Please select date</p>
          )}
        </Link>
      </td>

      <td>
        {props.ownerId ? (
          <span class='tag is-primary'>{props.ownerId.name}</span>
        ) : (
          <p>Please put receiver</p>
        )}
      </td>
      <td>
        {props ? (
          <Moment format='YYYY-MM-DD'>{props.date}</Moment>
        ) : (
          <p>Date of exam</p>
        )}
      </td>
      <td>{props ? props.examName : <p>Name not available</p>}</td>
      <td>
        {props ? (
          <span class='tag is-whitesmoke'>
            <b>{props.listening} Points</b>
          </span>
        ) : (
          <p>Please put listening</p>
        )}
      </td>
      <td>
        {props ? (
          <span class='tag is-whitesmoke'>
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

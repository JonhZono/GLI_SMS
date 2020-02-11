import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const RenderListsFeedback = props => {
  return (
    <tr>
      <td>
        <Link to={`/user/student/feedback/view/${props._id}`}>
          {props ? props.termCode : <p>Please put termCode</p>}
        </Link>
      </td>
      <td>{props ? props.lessonID : <p>Please put lessonID</p>}</td>
      <td>
        {props ? (
          <span style={{ fontSize: '14px', color: 'grey' }}>
            <Moment format='LLLL'>{props.createdAt}</Moment>
          </span>
        ) : (
          <p>Please select date</p>
        )}
      </td>
      <td>
        {props.user ? (
          <span className='tag is-primary'>{props.user.name}</span>
        ) : (
          <p>Please put is View By</p>
        )}
      </td>
      <td>{props.teacher ? props.teacher.name : <p>Please put teacher</p>}</td>
      <td>{props.ownerId ? props.ownerId.name : <p>Please put receiver</p>}</td>
    </tr>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(RenderListsFeedback);

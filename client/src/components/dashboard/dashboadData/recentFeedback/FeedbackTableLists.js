import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const NewsTableLists = props => {
  return (
    <tr>
      <td>
        <Link to={`/user/student/feedback/view/${props._id}`}>
          <span style={{ fontSize: '14px', color: '#69D420' }}>
            <b> {props.teacher && props.teacher.name}</b>
          </span>
          <br />
          <span className='has-text-grey' style={{ fontSize: '14px' }}>
            {props && props.termCode} - <b>{props && props.name}</b>
          </span>
        </Link>
      </td>
      <td>
        <Link to={`/user/student/feedback/view/${props._id}`}>
          <span className='has-text-grey' style={{ fontSize: '11px' }}>
            <Moment format='LLLL'>{props && props.createdAt}</Moment>
          </span>
        </Link>
      </td>
    </tr>
  );
};

export default connect()(NewsTableLists);

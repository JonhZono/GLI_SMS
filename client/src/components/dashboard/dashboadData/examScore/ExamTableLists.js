import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const NewsTableLists = props => {
  return (
    <tr>
      <td>
        <Link to={`/user/exam/score/view/${props._id}`}>
          <span className='has-text-grey' style={{ fontSize: '14px' }}>
            <span style={{ color: '#934cb7' }}>
              <b>{props && props.examName}</b>
            </span>{' '}
            - <b>{props.ownerId && props.ownerId.name}</b>
          </span>
        </Link>
      </td>
      <td>
        <Link to={`/user/exam/score/view/${props._id}`}>
          <span className='has-text-grey' style={{ fontSize: '12px' }}>
            <Moment format='LLLL'>{props && props.createdAt}</Moment>
          </span>
        </Link>
      </td>
      <td>
        <Link to={`/user/exam/score/view/${props._id}`}>
          <span className='has-text-grey' style={{ fontSize: '12px' }}>
            Speaking - <b>{props && props.speaking}</b>
          </span>
        </Link>
      </td>
      <td>
        <Link to={`/user/exam/score/view/${props._id}`}>
          <span className='has-text-grey' style={{ fontSize: '12px' }}>
            Listening - <b>{props && props.listening}</b>
          </span>
        </Link>
      </td>
    </tr>
  );
};

export default connect()(NewsTableLists);

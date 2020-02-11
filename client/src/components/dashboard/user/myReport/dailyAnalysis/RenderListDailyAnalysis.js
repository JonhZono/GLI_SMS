import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const RenderListsDailyAnalysis = props => {
  return (
    <tr>
      <td>
        <Link to={`/user/student/performance/view/${props._id}`}>
          {props ? (
            <Moment format='YYYY-MM-DD'>{props.createdAt}</Moment>
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
      <td>{props.user.userData ? <span>admin</span> : ''}</td>
      <td>
        {props ? (
          <span className='tag is-whitesmoke'><b>{props.speaking} Points</b></span>
        ) : (
          <p>Please put speaking</p>
        )}
      </td>
      <td>
        {props ? (
          <span className='tag is-whitesmoke'><b>{props.active} Points</b></span>
        ) : (
          <p>Please put active</p>
        )}
      </td>
      <td>
        {props ? (
          <span className='tag is-whitesmoke'><b>{props.attitude} Points</b></span>
        ) : (
          <p>Please put attitude</p>
        )}
      </td>
    </tr>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(RenderListsDailyAnalysis);

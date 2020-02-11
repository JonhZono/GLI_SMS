import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const RenderFeedback = props => {
  console.log(props)
  return (
    <Fragment>
      <Link
        to={`/user/student/profile`}
        className='button buttonInformation is-outlined'
        style={{ marginBottom: '12px' }}
      >
        <span>View {props.name} &nbsp;Profile</span>
      </Link>
      <Link
        to={`/user/student/view/report/${props.user_id}`}
        className='button buttonInformation is-info is-outlined'
      >
        Check {props.name} &nbsp;Feedback
      </Link>
    </Fragment>
  );
};

export default RenderFeedback;

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const RenderDAES = props => {
  return (
    <Fragment>
      <Link
        to={`/user/student/daily/analysis/view/lists/${props.user_id}`}
        className='button buttonInformation is-outlined'
        style={{ marginBottom: '12px' }}
      >
        {props.name}&nbsp;Monthly Performance
      </Link>
      <Link
        to={`/user/student/exam/score/view/lists/${props.user_id}`}
        className='button buttonInformation is-info is-outlined'
      >
        {props.name}&nbsp;Exam Score
      </Link>
    </Fragment>
  );
};

export default RenderDAES;

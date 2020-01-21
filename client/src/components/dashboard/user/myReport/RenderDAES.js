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
        Student Daily Analysis
      </Link>
      <Link
        to={`/user/student/exam/score/view/lists/${props.user_id}`}
        className='button buttonInformation is-info is-outlined'
      >
        Check Student Exam Score
      </Link>
    </Fragment>
  );
};

export default RenderDAES;

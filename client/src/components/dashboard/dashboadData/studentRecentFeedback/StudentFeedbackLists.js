import React from 'react';
import Spinner from '../../../spinner/Spinner';
import StudentFeedbackTableLists from './StudentFeedbackTableLists';

const StudentFeedbackLists = props => {
  const renderFeedbacks = recentFeedback =>
    recentFeedback.length > 0 ? (
      recentFeedback.map(feedback => (
        <StudentFeedbackTableLists key={feedback._id} {...feedback} />
      ))
    ) : (
      <Spinner />
    );

  return (
    <table className='fixed_header'>
      <tbody>{renderFeedbacks(props.recentFeedback)}</tbody>
    </table>
  );
};

export default StudentFeedbackLists;

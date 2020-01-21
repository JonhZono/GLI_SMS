import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import FeedbackTableLists from './FeedbackTableLists';

const FeedbackLists = props => {
  const renderFeedbacks = feedback =>
    feedback.length > 0 ? (
      feedback.map(feedback => (
        <FeedbackTableLists key={feedback._id} {...feedback} />
      ))
    ) : feedback.length === 0 ? (
      <Spinner />
    ) : (
      <div>No Feedback available</div>
    );

  return (
    <table className='fixed_header'>
      <tbody>{renderFeedbacks(props.feedback)}</tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(FeedbackLists);

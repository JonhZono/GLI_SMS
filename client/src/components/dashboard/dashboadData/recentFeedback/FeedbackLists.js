import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import FeedbackTableLists from './FeedbackTableLists';
import { clearViewEachFeedback } from '../../../../actions/feedback';

class FeedbackLists extends Component {
  componentWillUnmount = () => {
    this.props.dispatch(clearViewEachFeedback());
  };
  renderFeedbacks = feedback =>
    feedback.length > 0 ? (
      feedback.map(feedback => (
        <FeedbackTableLists key={feedback._id} {...feedback} />
      ))
    ) : feedback.length === 0 ? (
      <Spinner />
    ) : (
      <div>No Feedback available</div>
    );
  render() {
    return (
      <table className='fixed_header'>
        <tbody>{this.renderFeedbacks(this.props.feedback)}</tbody>
      </table>
    );
  }
}

export default connect(null)(FeedbackLists);

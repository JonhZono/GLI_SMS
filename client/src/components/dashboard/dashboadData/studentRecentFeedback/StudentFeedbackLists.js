import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import StudentFeedbackTableLists from './StudentFeedbackTableLists';

class StudentFeedbackLists extends Component {
  
  studentRenderFeedbacks = recentFeedback =>
    recentFeedback.length > 0 ? (
      recentFeedback.map(student_feedback => (
        <StudentFeedbackTableLists
          key={student_feedback._id}
          {...student_feedback}
        />
      ))
    ) : (
      <Spinner />
    );
  render() {
    console.log(this.props.recentFeedback)
    return (
      <table className='fixed_header'>
        <tbody>{this.studentRenderFeedbacks(this.props.recentFeedback)}</tbody>
      </table>
    );
  }
}

export default connect()(StudentFeedbackLists);

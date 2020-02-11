import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import StudentExamScoreTableLists from './StudentExamScoreTableLists';
import { clearExam } from '../../../../actions/exam';

class StudentExamScoreLists extends Component {
  renderExamScore = recentExam =>
    recentExam.length > 0 ? (
      recentExam.map(exam => (
        <StudentExamScoreTableLists key={exam._id} {...exam} />
      ))
    ) : (
      <Spinner />
    );
  componentWillUnmount = () => {
    this.props.dispatch(clearExam());
  };

  render() {
    return (
      <table className='fixed_header'>
        <tbody>{this.renderExamScore(this.props.recentExam)}</tbody>
      </table>
    );
  }
}

export default connect(null)(StudentExamScoreLists);

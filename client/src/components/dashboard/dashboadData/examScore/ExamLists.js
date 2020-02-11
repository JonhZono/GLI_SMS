import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import ExamTableLists from './ExamTableLists';
import { clearExam } from '../../../../actions/exam';

class ExamLists extends Component {
  renderExams = () =>
    this.props.exam.length > 0 ? (
      this.props.exam.map(exam => <ExamTableLists key={exam._id} {...exam} />)
    ) : this.props.exam.length === 0 ? (
      <Spinner />
    ) : (
      <div>No post available</div>
    );
  componentWillUnmount = () => {
    this.props.dispatch(clearExam());
  };
  render() {
    return (
      <table className='table is-fullwidth is-striped fixed_header'>
        <thead></thead>
        <tbody>{this.renderExams()}</tbody>
      </table>
    );
  }
}

export default connect()(ExamLists);

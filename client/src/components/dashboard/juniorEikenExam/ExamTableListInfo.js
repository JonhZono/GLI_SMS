import React, { Fragment } from 'react';
import ExamListComponent from './ExamListComponent';
import { connect } from 'react-redux';
import Spinner from '../../spinner/Spinner';

const ExamTableListInfo = props => {
  const renderExamLists = () =>
    props.lists ? (
      props.lists.map((exam, i) => <ExamListComponent key={i} {...exam} />)
    ) : (
      <Spinner />
    );

  return (
    <table className='table is-striped student_fixed_header is-hoverable has-text-centered'>
      <thead style={{ background: 'whitesmoke' }}>
        <tr>
          <td>Student</td>
          <td>Created By</td>
          <td>Created At</td>
          <td>Vocabulary</td>
          <td>Sentence</td>
          <td>Exam Level</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {props.user.role === 'admin' || props.user.role === 'staff' ? (
          <Fragment>{renderExamLists(props.lists)}</Fragment>
        ) : (
          <Fragment>{renderExamLists(props.lists)}</Fragment>
        )}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(ExamTableListInfo);

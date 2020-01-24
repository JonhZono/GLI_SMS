import React, { Fragment } from 'react';
import ExamListComponent from './ExamListComponent';
import { connect } from 'react-redux';

const ExamTableListInfo = props => {
  const renderExamLists = () =>
    props.lists
      ? props.lists.map((exam, i) => <ExamListComponent key={i} {...exam} />)
      : null;

  return (
    <table className='table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered'>
      <thead style={{ background: 'whitesmoke' }}>
        <tr>
          <td>Student</td>
          <td>Created By</td>
          <td>Created At</td>
          <td>Reading</td>
          <td>Speaking</td>
          <td>Exam Type</td>
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

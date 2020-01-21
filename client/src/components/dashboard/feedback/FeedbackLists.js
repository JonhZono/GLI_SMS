import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import RenderReportTable from './RenderReportTable';
import Spinner from '../../spinner/Spinner';

const FeedbackLists = props => {
  const renderLists = () =>
    props.feedbacks.length > 0 ? (
      props.feedbacks.map(feedback => (
        <RenderReportTable key={feedback._id} {...feedback} />
      ))
    ) : (
      <Spinner />
    );
  return (
    <table className='table is-striped student_fixed_header is-hoverable'>
      <thead style={{ background: 'whitesmoke' }}>
        <tr>
          <td>Term Code</td>
          <td>LessonID</td>
          <td>Created At</td>
          <td>Sender</td>
          <td>Receiver</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {props.user.role === 'admin' || props.user.role === 'staff' ? (
          <Fragment>{renderLists()}</Fragment>
        ) : (
          <Fragment>{renderLists()}</Fragment>
        )}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(FeedbackLists);

import React, { Fragment } from 'react';
import PerformanceListComponent from './PerformanceListComponent';
import { connect } from 'react-redux';
import Spinner from '../../spinner/Spinner';

const AnalyzeTableListInfo = props => {
  const renderPerformanceLists = () =>
    props.lists ? (
      props.lists.map((performance, i) => (
        <PerformanceListComponent key={i} {...performance} />
      ))
    ) : (
      <Spinner />
    );

  return (
    <table className='table is-striped student_fixed_header is-hoverable has-text-centered'>
      <thead style={{ background: 'whitesmoke' }}>
        <tr>
          <td>Authorized To</td>
          <td>Created By</td>
          <td>Created At</td>
          <td>活動</td>
          <td>出席率</td>
          <td>Actions</td>
          <td>Listening</td>
          <td>Speaking</td>
        </tr>
      </thead>
      <tbody>
        {props.user.role === 'admin' || props.user.role === 'staff' ? (
          <Fragment>{renderPerformanceLists(props.lists)}</Fragment>
        ) : (
          <Fragment>{renderPerformanceLists(props.lists)}</Fragment>
        )}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AnalyzeTableListInfo);

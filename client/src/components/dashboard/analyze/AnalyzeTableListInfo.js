import React, { Fragment } from 'react';
import PerformanceListComponent from './PerformanceListComponent';
import { connect } from 'react-redux';

const AnalyzeTableListInfo = props => {
  const renderPerformanceLists = () =>
    props.lists
      ? props.lists.map((performance, i) => (
          <PerformanceListComponent key={i} {...performance} />
        ))
      : null;

  return (
    <table className='table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered'>
      <thead style={{ background: 'whitesmoke' }}>
        <tr>
          <td>Authorized To</td>
          <td>Created By</td>
          <td>Created At</td>
          <td>Active</td>
          <td>Participation</td>
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

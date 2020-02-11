import React, { Fragment } from 'react';
//import PropTypes from 'prop-types';
import StudentListComponent from './StudentListComponent';
import { connect } from 'react-redux';

const StudentTableListInfo = props => {
  const renderStudentLists = () =>
    props.lists
      ? props.lists.map((student, i) => (
          <StudentListComponent key={i} {...student} />
        ))
      : null;
  return (
    <table className='table is-striped student_fixed_header is-hoverable                                       '>
      <thead style={{ background: 'whitesmoke' }}>
        <tr>
          <td>Student Name</td>
          <td>Course</td>
          <td>Enrollment</td>
          <td>Teacher</td>
          <td>Classroom</td>
          <td>Phone Number</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {props.user.role === 'admin' || props.user.role === 'staff' ? (
          <Fragment>{renderStudentLists(props.lists)}</Fragment>
        ) : (
          <Fragment>{renderStudentLists(props.lists)}</Fragment>
        )}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(StudentTableListInfo);

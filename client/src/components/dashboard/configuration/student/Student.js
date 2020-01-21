import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import RenderStudent from './RenderStudent';

class Student extends Component {
  renderStudent = student =>
    !this.props.loading && student.length > 0 ? (
      student.map(student => <RenderStudent key={student._id} {...student} />)
    ) : student.length === 0 ? (
      <Spinner />
    ) : (
      <div>No student available</div>
    );

  render() {
    const student = this.props.student;
    return (
      <table className='fixed_header'>
        <thead style={{ background: 'whitesmoke' }}>
          <tr>
            <td style={{ textAlign: 'center' }}>Student</td>
            <td style={{ textAlign: 'center' }}>Actions</td>
          </tr>
        </thead>
        <tbody>{this.renderStudent(student)}</tbody>
      </table>
    );
  }
}

export default connect()(Student);

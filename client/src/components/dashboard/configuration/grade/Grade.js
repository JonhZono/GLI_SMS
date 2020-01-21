import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import RenderGrade from './RenderGrade';

class Grade extends Component {
  renderClassroom = grade =>
    !this.props.loading && grade.length > 0 ? (
      grade.map(grade => <RenderGrade key={grade._id} {...grade} />)
    ) : grade.length === 0 ? (
      <Spinner />
    ) : (
      <div>No grade available</div>
    );

  render() {
    const grade = this.props.grade;
    return (
      <div className='table-container'>
        <table className='fixed_header is-stripped'>
          <thead style={{ background: 'whitesmoke' }}>
            <tr>
              <td style={{ textAlign: 'center' }}>Grade</td>
              <td style={{ textAlign: 'center' }}>Action</td>
            </tr>
          </thead>
          <tbody style={{ height: '200px' }}>
            {this.renderClassroom(grade)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect()(Grade);

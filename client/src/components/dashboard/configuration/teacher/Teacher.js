import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import RenderTeacher from './RenderTeacher';

class Teacher extends Component {
  renderTeacher = teacher =>
    !this.props.loading && teacher.length > 0 ? (
      teacher.map(teacher => <RenderTeacher key={teacher._id} {...teacher} />)
    ) : teacher.length === 0 ? (
      <Spinner />
    ) : (
      <div>No teacher available</div>
    );

  render() {
    const teacher = this.props.teacher;
    return (
      <div className='table-container'>
        <table className='fixed_header'>
          <thead style={{ background: 'whitesmoke' }}>
            <tr>
              <td style={{ textAlign: 'center' }}>Teacher</td>
              <td style={{ textAlign: 'center' }}>Actions</td>
            </tr>
          </thead>
          <tbody style={{ height: '200px' }}>
            {this.renderTeacher(teacher)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect()(Teacher);

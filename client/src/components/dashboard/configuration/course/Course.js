import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import RenderCourse from './RenderCourse';

class Course extends Component {
  renderCourse = course =>
    !this.props.loading && course.length > 0 ? (
      course.map(course => <RenderCourse key={course._id} {...course} />)
    ) : course.length === 0 ? (
      <Spinner />
    ) : (
      <div>No course available</div>
    );

  render() {
    const course = this.props.course;
    return (
      <div className='table-container'>
        <table className='fixed_header'>
          <thead style={{ background: 'whitesmoke' }}>
            <tr>
              <td style={{ textAlign: 'center' }}>Course</td>
              <td style={{ textAlign: 'center' }}>Action</td>
            </tr>
          </thead>
          <tbody style={{ height: '200px' }}>{this.renderCourse(course)}</tbody>
        </table>
      </div>
    );
  }
}

export default connect()(Course);

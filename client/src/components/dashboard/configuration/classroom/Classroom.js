import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import RenderClass from './RenderClass';

class Classroom extends Component {
  renderClassroom = classroom =>
    !this.props.loading && classroom.length > 0 ? (
      classroom.map(classroom => (
        <RenderClass key={classroom._id} {...classroom} />
      ))
    ) : classroom.length === 0 ? (
      <Spinner />
    ) : (
      <div>No classroom available</div>
    );

  render() {
    const classCount = this.props.classroom.length;
    const classroom = this.props.classroom;
    return (
      <table className='fixed_header'>
        <thead style={{ background: 'whitesmoke' }}>
          <tr>
            <td style={{ textAlign: 'center' }}>Classroom</td>
            <td style={{ textAlign: 'center' }}>Action</td>
          </tr>
        </thead>
        <tbody>{this.renderClassroom(classroom)}</tbody>
      </table>
    );
  }
}

export default connect()(Classroom);

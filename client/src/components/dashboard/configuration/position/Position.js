import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../spinner/Spinner';
import RenderPosition from './RenderPosition';

class Position extends Component {
  renderPosition = position =>
    !this.props.loading && position.length > 0 ? (
      position.map(position => (
        <RenderPosition key={position._id} {...position} />
      ))
    ) : position.length === 0 ? (
      <Spinner />
    ) : (
      <div>No position available</div>
    );

  render() {
    const position = this.props.position;
    return (
      <div className='table-container'>
        <table className='fixed_header'>
          <thead style={{ background: 'whitesmoke' }}>
            <tr>
              <td style={{ textAlign: 'center' }}>Position</td>
              <td style={{ textAlign: 'center' }}>Actions</td>
            </tr>
          </thead>
          <tbody style={{ height: '200px' }}>
            {this.renderPosition(position)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect()(Position);

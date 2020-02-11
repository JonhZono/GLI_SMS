import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteClass } from '../../../../actions/profile';

class RenderClass extends Component {
  deleteClassroom = () => {
    this.props.dispatch(deleteClass(this.props._id));
  };
  render() {
    const props = this.props; //classroom props
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>{props.name}</td>
        <td style={{ textAlign: 'center' }}>
          <span>
            <Link
              to={`/admin/edit/class/${props._id}`}
              className='button is-small is-success'
              style={{ margin: '1px', borderRadius: '1px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-pencil-alt' />
              </span>
            </Link>
            <button
              onClick={this.deleteClassroom}
              className='button is-small is-danger'
              style={{ margin: '1px', borderRadius: '1px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-times' aria-hidden='true' />
              </span>
            </button>
          </span>
        </td>
      </tr>
    );
  }
}

export default connect(null)(RenderClass);

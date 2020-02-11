import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteTeacher } from '../../../../actions/profile';

class RenderTeacher extends Component {
  deleteTeacher = () => {
    this.props.dispatch(deleteTeacher(this.props._id));
  };
  render() {
    const props = this.props; //teacher props
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>{props.name}</td>
        <td style={{ textAlign: 'center' }}>
          <span>
            <Link
              to={`/admin/edit/teacher/${props._id}`}
              className='button is-small is-success'
              style={{ margin: '1px', borderRadius: '1px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-pencil-alt' />
              </span>
            </Link>
            <button
              onClick={this.deleteTeacher}
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

export default connect()(RenderTeacher);

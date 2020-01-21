import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteGrade } from '../../../../actions/profile';

class RenderGrade extends Component {
  deleteGrade = () => {
    this.props.dispatch(deleteGrade(this.props._id));
  };
  render() {
    const props = this.props; //grade props
    return (
      <tr>
        <td style={{ textAlign: 'center' }}>{props.name}</td>
        <td style={{ textAlign: 'center' }}>
          <span>
            <Link
              to={`/admin/edit/grade/${props._id}`}
              className='button is-small buttonProfileEdit'
              style={{ margin: '1px', borderRadius: '1px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-pencil-alt' />
              </span>
            </Link>
            <button
              onClick={this.deleteGrade}
              className='button is-small buttonProfileDelete'
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

export default connect(null)(RenderGrade);

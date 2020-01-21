import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudentReportById } from '../../../actions/feedback';
import Moment from 'react-moment';

class RenderReportTable extends Component {
  deleteReportStudent = () => {
    console.log('Delete feedback');
    this.props.dispatch(
      deleteStudentReportById(this.props._id, this.props.history)
    );
  };

  render() {
    const props = this.props;
    return (
      <tr>
        <td>
          {props ? (
            <Link to={`/user/student/feedback/view/${props._id}`}>
              {props.termCode}
            </Link>
          ) : (
            <p>Please put termCode</p>
          )}
        </td>
        <td>
          {props ? (
            <span className='has-text-grey' style={{ fontSize: '14px' }}>
              {props.lessonID}
            </span>
          ) : (
            <p>Please put lessonID</p>
          )}
        </td>
        <td>
          {props ? (
            <span className='has-text-grey' style={{ fontSize: '14px' }}>
              <Moment format='LLLL'>{props.date}</Moment>{' '}
            </span>
          ) : (
            <p>Please select date</p>
          )}
        </td>

        <td>{props ? props.teacher.name : <p>Please put teacher</p>}</td>
        <td>{props ? props.ownerId.name : <p>Please put receiver</p>}</td>

        <td>
          <span>
            <Link
              to={`/user/student/feedback/view/${props._id}`}
              className='tag is-info'
              style={{ margin: '3px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-info' aria-hidden='true' />
              </span>
              <span>View</span>
            </Link>
            <Link
              to={`/user/student/feedback/edit/${props._id}`}
              className='tag is-primary'
              style={{ margin: '3px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-pencil-alt' />
              </span>
              <span>Edit</span>
            </Link>
            {props.user.role === 'admin' && (
              <button
                onClick={this.deleteReportStudent}
                className='tag is-danger'
                style={{ margin: '3px' }}
              >
                <span className='icon is-small'>
                  <i className='fas fa-trash-alt' aria-hidden='true' />
                </span>
                <span>Delete</span>
              </button>
            )}
          </span>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withRouter(RenderReportTable));

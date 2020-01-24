import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminDeleteExam } from '../../../actions/exam';
import Moment from 'react-moment';

class ExamListComponent extends Component {
  deleteStudentExamByID = () => {
    this.props.dispatch(adminDeleteExam(this.props._id, this.props.history));
  };

  render() {
    const props = this.props;
    return (
      <tr>
        <td>
          {props.ownerId ? (
            <Link to={`/user/exam/score/view/${props._id}`}>
              {props.ownerId.name}
            </Link>
          ) : (
            <p>Please put name</p>
          )}
        </td>
        <td>
          {props.teacher ? (
            <Link to={`/user/exam/score/view/${props._id}`}>
              {props.teacher.name}
            </Link>
          ) : (
            <p>Please put name</p>
          )}
        </td>
        <td style={{ fontSize: '14px', color: 'grey' }}>
          {props ? (
            <Moment format='LLLL'>{props.createdAt}</Moment>
          ) : (
            <p>Please Choose date</p>
          )}
        </td>
        <td>
          {props ? (
            <span className='tag is-whitesmoke'>
              <b>{props.reading} Points</b>
            </span>
          ) : (
            <p>Please put reading</p>
          )}
        </td>
        <td>
          {props ? (
            <span className='tag is-whitesmoke'>
              <b>{props.speaking} Points</b>
            </span>
          ) : (
            <p>Please put speaking</p>
          )}
        </td>
        <td>
          {props ? (
            <span className='tag is-success'>
              <b>{props.examName}</b>
            </span>
          ) : (
            <p>Please put exam name</p>
          )}
        </td>
        <td>
          <span>
            <Link
              to={`/user/exam/score/view/${props._id}`}
              className='tag is-info'
              style={{ margin: '3px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-info' aria-hidden='true' />
              </span>
              <span>View</span>
            </Link>
            <Link
              to={`/user/exam/score/edit/${props._id}`}
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
                onClick={this.deleteStudentExamByID}
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

export default connect(mapStateToProps)(withRouter(ExamListComponent));

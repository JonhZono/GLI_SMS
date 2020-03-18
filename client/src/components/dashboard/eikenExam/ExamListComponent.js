import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminDeleteEikenExam } from '../../../actions/exam';
import Moment from 'react-moment';

class ExamListComponent extends Component {
  deleteStudentExamByID = () => {
    this.props.dispatch(
      adminDeleteEikenExam(this.props._id, this.props.history)
    );
  };

  render() {
    const props = this.props;
    return (
      <tr>
        <td>
          {props ? (
            <Link to={`/user/eiken_exam/score/view/${props._id}`}>
              {props.name}
            </Link>
          ) : (
            <p>Please put name</p>
          )}
        </td>
        <td>
          {props.teacher ? (
            <Link to={`/user/eiken_exam/score/view/${props._id}`}>
              {props.teacher.name}
            </Link>
          ) : (
            <p>Please put name</p>
          )}
        </td>
        <td style={{ fontSize: '12px', color: 'grey' }}>
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
              <b>{props.writing} Points</b>
            </span>
          ) : (
            <p>Please put writing</p>
          )}
        </td>

        <td>
          {props && props.level === 'Eiken Level 5' ? (
            <span
              className='tag'
              style={{ backgroundColor: '#E74C3C', color: 'white' }}
            >
              <b>{props.level}</b>
            </span>
          ) : props && props.level === 'Eiken Level 4' ? (
            <span
              className='tag'
              style={{ backgroundColor: '#9B59B6', color: 'white' }}
            >
              <b>{props.level}</b>
            </span>
          ) : props && props.level === 'Eiken Level 3' ? (
            <span
              className='tag'
              style={{ backgroundColor: '#3498DB', color: 'white' }}
            >
              <b>{props.level}</b>
            </span>
          ) : props && props.level === 'Eiken Level pre-2' ? (
            <span
              className='tag'
              style={{ backgroundColor: '#3498DB', color: 'white' }}
            >
              <b>{props.level}</b>
            </span>
          ) : props && props.level === 'Eiken Level 2' ? (
            <span
              className='tag'
              style={{ backgroundColor: '#E67E22', color: 'white' }}
            >
              <b>{props.level}</b>
            </span>
          ) : (
            <p>Level Not Selected</p>
          )}
        </td>
        <td>
          <span>
            <Link
              to={`/user/eiken_exam/score/view/${props._id}`}
              className='button is-small is-info'
              style={{ margin: '3px', fontSize: '10px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-info' aria-hidden='true' />
              </span>
              <span>View</span>
            </Link>
            <Link
              to={`/user/eiken_exam/score/edit/${props._id}`}
              className='button is-small is-primary'
              style={{ margin: '3px', fontSize: '10px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-pencil-alt' />
              </span>
              <span>Edit</span>
            </Link>
            {props.user.role === 'admin' && (
              <button
                onClick={this.deleteStudentExamByID}
                className='button is-small is-danger'
                style={{ margin: '3px', fontSize: '10px' }}
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

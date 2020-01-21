import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteStudentProfileById } from '../../../actions/profile';

class StudentListComponent extends Component {
  deleteStudentProfile = () => {
    this.props.dispatch(
      deleteStudentProfileById(this.props._id, this.props.history)
    );
  };

  render() {
    const props = this.props;
    console.log(props.user.avatar);
    return (
      <tr>
        <td>
          {props ? (
            <Link to={`/user/student/profile/${props._id}`}>{props.name}</Link>
          ) : (
            <p>Please put name</p>
          )}
        </td>
        <td>{props.course ? props.course.name : <p>Course Not Select</p>}</td>
        <td>{props ? props.admission : <p>Please put admission date</p>}</td>
        <td>
          {props.teacher ? props.teacher.name : <p>Teacher Not Select</p>}
        </td>
        <td>
          {props.classroom ? props.classroom.name : <p>Classroom Not Select</p>}
        </td>
        <td>{props ? props.phone : <p>Please put phone number</p>}</td>
        <td>
          <span>
            <Link
              to={`/user/student/profile/${props._id}`}
              className='tag is-info'
              style={{ margin: '3px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-info' aria-hidden='true' />
              </span>
              <span>View</span>
            </Link>
            {props.user.role === 'admin' && (
              <Fragment>
                <Link
                  to={`/user/student/profile/edit/${props._id}`}
                  className='tag is-primary'
                  style={{ margin: '3px' }}
                >
                  <span className='icon is-small'>
                    <i className='fas fa-pencil-alt' aria-hidden='true' />
                  </span>
                  <span>Edit</span>
                </Link>

                <button
                  onClick={this.deleteStudentProfile}
                  className='tag is-danger'
                  style={{ margin: '3px' }}
                >
                  <span className='icon is-small'>
                    <i className='fas fa-trash-alt' aria-hidden='true' />
                  </span>
                  <span>Delete</span>
                </button>
              </Fragment>
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

export default connect(mapStateToProps)(withRouter(StudentListComponent));

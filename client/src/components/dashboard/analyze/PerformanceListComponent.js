import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminDeleteStatistic } from '../../../actions/analysis';
import Moment from 'react-moment';

class PerformanceListComponent extends Component {
  deleteStudentPerformance = () => {
    console.log('statistic');
    this.props.dispatch(
      adminDeleteStatistic(this.props._id, this.props.history)
    );
  };

  render() {
    const props = this.props;
    return (
      <tr>
        <td>
          {props.ownerId ? (
            <Link to={`/user/analysis/view/${props._id}`}>
              {props.ownerId.name}
            </Link>
          ) : (
            <p>Please put name</p>
          )}
        </td>
        <td>
          {props.teacher ? (
            <Link to={`/user/analysis/view/${props._id}`}>
              {props.teacher.name}
            </Link>
          ) : (
            <p>Please put teacher name</p>
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
              <b>{props.active} Points</b>
            </span>
          ) : (
            <p>Please put active</p>
          )}
        </td>
        <td>
          {props ? (
            <span className='tag is-whitesmoke'>
              <b>{props.participation} Points</b>
            </span>
          ) : (
            <p>Please put participation</p>
          )}
        </td>
        <td>
          {props ? (
            <span className='tag is-whitesmoke'>
              <b>{props.listening} Points</b>
            </span>
          ) : (
            <p>Please put listening</p>
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
          <span>
            <Link
              to={`/user/analysis/view/${props._id}`}
              className='tag is-info'
              style={{ margin: '3px' }}
            >
              <span className='icon is-small'>
                <i className='fas fa-info' aria-hidden='true' />
              </span>
              <span>View</span>
            </Link>
            <Link
              to={`/user/analysis/edit/${props._id}`}
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
                onClick={this.deleteStudentPerformance}
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
  analysis: state.analysis,
  user: state.user
});

export default connect(mapStateToProps)(withRouter(PerformanceListComponent));

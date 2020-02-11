import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link, withRouter } from 'react-router-dom';
import { adminRemoveDueFeeLists } from '../../../actions/duefee';

class RenderFeeTable extends Component {
  adminRemoveDueFeeById = () => {
    this.props.dispatch(
      adminRemoveDueFeeLists(this.props._id, this.props.history)
    );
  };
  render() {
    const props = this.props;
    return (
      <Fragment>
        <tr>
          <td>
            <span>
              <Link to={`/admin/view/due/fee/${props._id}`}>
                Check Detail Receiver
              </Link>
            </span>
          </td>

          <td style={{ fontSize: '12px', color: 'grey' }}>
            {props && (
              <Moment format='LLLL'>
                <span>{props.createdAt}</span>
              </Moment>
            )}
          </td>

          <td style={{ fontSize: '13px', color: 'grey' }}>
            {props && props.month}
          </td>
          <td>
            {props && (
              <p style={{ fontSize: '13px', color: '#db4067' }}>
                <i>{props.additional}</i>
              </p>
            )}
          </td>
          <td>
            {props && (
              <span style={{ fontSize: '13px', color: '#db4067' }}>
                <i>{props.amount}</i>
              </span>
            )}
          </td>

          <td>
            <span>
              <Link
                to={`/admin/edit/due/fee/${props._id}`}
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
                  onClick={this.adminRemoveDueFeeById}
                  className='button is-small is-danger'
                  style={{ margin: '3px', fontSize: '10px' }}
                >
                  <span className='icon is-small'>
                    <i className='fas fa-times' aria-hidden='true' />
                  </span>
                  <span>Delete</span>
                </button>
              )}
            </span>
          </td>
        </tr>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withRouter(RenderFeeTable));

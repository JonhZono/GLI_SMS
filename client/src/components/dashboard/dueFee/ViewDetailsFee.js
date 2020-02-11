import React from 'react';
import Spinner from '../../spinner/Spinner';
import Moment from 'react-moment';

const ViewDetailsFeedback = props => {
  return props.studentFeedback === null ? (
    <Spinner />
  ) : (
    <table className='table is-striped is-hoverable is-fullwidth'>
      <tbody>
        <tr>
          <th>Lists of Receiver</th>
          <td>
            {props.studentFee && (
              <p style={{ fontSize: '14px' }}>{props.studentFee.gmailLists}</p>
            )}
          </td>
        </tr>
        <tr>
          <th>Created At</th>
          <td style={{ fontSize: '14px', color: 'grey' }}>
            {props.studentFee && (
              <Moment format='LLLL'>{props.studentFee.createdAt}</Moment>
            )}
          </td>
        </tr>
        <tr>
          <th>Monthly Paid</th>
          <td style={{ fontSize: '14px', color: 'grey' }}>
            {props.studentFee && props.studentFee.month}
          </td>
        </tr>
        <tr>
          <th>Additional Fee</th>
          <td>
            <span
              className='tag is-grey'
              style={{ fontSize: '14px', color: '#db4067' }}
            >
              {props.studentFee && props.studentFee.additional}
            </span>
          </td>
        </tr>
        <tr>
          <th>Total Fee</th>
          <td>
            {props.studentFee && (
              <span
                className='tag is-grey'
                style={{ fontSize: '14px', color: '#db4067' }}
              >
                <i>{props.studentFee.amount}</i>
              </span>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ViewDetailsFeedback;

import React, { Fragment } from 'react';
import Moment from 'react-moment';

const RenderFeeTable = props => {
  return (
    <Fragment>
      <tr>
        <td>{props && props.gmailLists}</td>

        <td>
          {props && (
            <Moment format='LLLL'>
              <span style={{ fontSize: '14px', color: 'grey' }}>
                {props.createdAt}
              </span>
            </Moment>
          )}
        </td>

        <td>{props && props.month}</td>
        <td>
          {props && <span style={{ fontSize: '14px' }}>{props.amount}</span>}
        </td>
      </tr>
    </Fragment>
  );
};

export default RenderFeeTable;

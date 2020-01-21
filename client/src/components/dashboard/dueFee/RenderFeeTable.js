import React, { Fragment } from 'react';

const RenderFeeTable = props => {
  return (
    <Fragment>
      <tr>
        <td>{props && props.gmailLists}</td>

        <td>{props && props.createdAt}</td>

        <td>{props && props.amount}</td>

        <td>{props && props.month}</td>
      </tr>
    </Fragment>
  );
};

export default RenderFeeTable;

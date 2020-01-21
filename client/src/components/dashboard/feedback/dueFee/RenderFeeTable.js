import React, { Fragment } from 'react';

const RenderFeeTable = props => {
  return (
    <Fragment>
      <tr>
        <td>{props && props.title}</td>

        <td>{props && props.createdAt}</td>

        <td>{props && props.receiver.name}</td>

        <td>{props && props.amount}</td>

        <td>{props && props.month}</td>
      </tr>
    </Fragment>
  );
};

export default RenderFeeTable;

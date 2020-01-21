import React from 'react';
import RenderFeeTable from './RenderFeeTable';
import Spinner from '../../../spinner/Spinner';

const RenderFee = props => {
  console.log(props.studentFee);
  const renderLists = () =>
    props.studentFee.length > 0 ? (
      props.studentFee.map((studentFee, i) => (
        <RenderFeeTable key={i} {...studentFee} />
      ))
    ) : (
      <Spinner />
    );
  return (
    <table className='table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered'>
      <thead style={{ background: 'whitesmoke' }}>
        <tr>
          <td>Title</td>
          <td>Created At</td>
          <td>Receiver</td>
          <td>Month</td>
          <td>Amount</td>
        </tr>
      </thead>
      <tbody>{renderLists()}</tbody>
    </table>
  );
};

export default RenderFee;

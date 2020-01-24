import React from 'react';
import RenderFeeTable from './RenderFeeTable';
import Spinner from '../../spinner/Spinner';

const FeeLists = props => {
  console.log(props.feeLists);
  const renderLists = () =>
    props.feeLists.length > 0 ? (
      props.feeLists.map((fee, i) => <RenderFeeTable key={i} {...fee} />)
    ) : (
      <Spinner />
    );
  return (
    <table className='table is-striped is-bordered is-narrow is-hoverable is-fullwidth has-text-centered'>
      <thead style={{ background: 'whitesmoke' }}>
        <tr>
          <td>Receiver</td>
          <td>Created At</td>
          <td>Monthly Paid</td>
          <td>Total Amount</td>
        </tr>
      </thead>
      <tbody>{renderLists()}</tbody>
    </table>
  );
};

export default FeeLists;

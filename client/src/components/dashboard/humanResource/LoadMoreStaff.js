import React, { Fragment } from 'react';
import StaffCard from '../../utils/card/StaffCard';
import Spinner from '../../spinner/Spinner';

const LoadMoreStaff = props => {
  const renderStaffProfile = () =>
    props.profiles.map(card => <StaffCard key={card._id} {...card} />);
  console.log(props.profiles);
  return (
    <Fragment>
      {props.profiles ? (
        props.profiles.length === 0 ? (
          <Spinner />
        ) : null
      ) : <div>Teacher Profile is not available!</div>}
      {renderStaffProfile(props.profiles)}
    </Fragment>
  );
};

export default LoadMoreStaff;

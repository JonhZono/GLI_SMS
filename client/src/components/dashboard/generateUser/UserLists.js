import React from 'react';
import UserTableLists from './UserTableLists';
import Spinner from '../../spinner/Spinner';

const UserLists = props => {
  const renderLists = () =>
    props.userLists && props.userLists.length > 0 ? (
      props.userLists.map((item, i) => <UserTableLists key={i} {...item} />)
    ) : (
      <Spinner />
    );

  return props.loading ? (
    <Spinner />
  ) : (
    <table className='table is-striped is-bordered is-narrow is-hoverable is-fullwidth'>
      <thead style={{ background: 'whitesmoke' }}>
        <tr>
          <td>User</td>
          <td>Email</td>
          <td>Created At</td>
          <td>Privilege</td>
          <td>Actions</td>
        </tr>
      </thead>

      {renderLists()}
    </table>
  );
};

export default UserLists;

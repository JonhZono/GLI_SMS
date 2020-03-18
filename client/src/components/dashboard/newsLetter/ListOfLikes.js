import React from 'react';
import Moment from 'react-moment';

const ListOfLikes = props => {
 
  return props.user ? (
    <div>
      <span style={{ fontSize: '12px', color: 'rgb(84, 107, 145)' }}>
        {props.user.name}
      </span>
      &nbsp;
      <span style={{ fontSize: '12px', color: 'grey' }}>
        <Moment format='YYYY-MM-DD'>{props.date}</Moment>
      </span>
    </div>
  ) : (
    ''
  );
};

export default ListOfLikes;
